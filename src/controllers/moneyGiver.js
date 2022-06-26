/* eslint-disable linebreak-style */
import Transfert from '../models/transfert.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';

//CHECK TRANSFERT INTO DATABASE AND AUTOMATICALLY CHANGE TRUE TO HASTAKEMONEY FIELD SO THAT WE KNOW THAT PEOPLE HAVE TAKE THE MONEY
const validateTransfertPage = async (req, res, next) => {
    try {
        const { code } = req.body;
        const { moneyGiverCity } = req.user;
        const transfert = await Transfert.findOne({ code });
        if (!transfert) {
            return next(new NotFoundError('Aucun transfert trouvé'));
        }

        if (transfert.hasTakeMoney) {
            return next(
                new BadRequestError(
                    '`Le transfert Recherché a déjà été validé à la date du ${transfert.payoutDay}`'
                )
            );
        }
        if (transfert.city != moneyGiverCity) {
            return next(
                new BadRequestError('Vous ne pouvez pas gérer ce transfert')
            );
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const moneyTaken = async (req, res, next) => {
    try {
        const { moneyGiverCity } = req.user;

        let { page, size, clientName, senderName, start, end, moneyTypes } =
            req.query;

        let queryObj = {};

        if (clientName)
            queryObj.clientName = { $regex: clientName, $options: 'i' };

        if (senderName)
            queryObj.senderName = { $regex: senderName, $options: 'i' };

        if (moneyTypes) queryObj.moneyTypes = moneyTypes;

        if (start && end) {
            const endYear = Number(end.split('-')[0]);
            const endMonth = Number(end.split('-')[1]) - 1;
            const endDay = Number(end.split('-')[2]);
            const date = {
                start: new Date(start),
                end: new Date(endYear, endMonth, endDay, 25, 59, 59, 999),
            };
            queryObj.date = {
                $gte: date.start,
                $lte: date.end,
            };
        }

        page = page ? Number(page) : 1;
        size = size ? Number(size) : 10;

        //TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET

        let sum = await Transfert.aggregate([
            {
                $match: {
                    ...queryObj,
                    city: moneyGiverCity,
                    hasTakeMoney: true,
                },
            },
            { $group: { _id: null, sum: { $sum: '$amountOfMoneyInEuro' } } },
        ]);
        if (sum[0] !== undefined) {
            sum = sum[0].sum;
        }

        const limit = size;
        const skip = (page - 1) * size;
        const transferts = await Transfert.find({
            city: moneyGiverCity,
            hasTakeMoney: true,
            ...queryObj,
        })
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await Transfert.count({
            city: moneyGiverCity,
            hasTakeMoney: true,
            ...queryObj,
        });

        let totalPages = Math.ceil(count / limit);
        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
            iterator + 9 <= totalPages
                ? iterator + 9
                : page + (totalPages - page);

        res.status(200).jsonr({
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            sum,
        });
    } catch (error) {
        next(error);
    }
};

// VALIDATE TRANSFERT
const validateTransfert = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { contactNumber } = req.body;

        const transfert = await Transfert.findById(id);
        const { hasTakeMoney, payoutDay } = transfert;
        if (hasTakeMoney)
            return next(
                new BadRequestError(
                    `Transfert déjà validé à la date du ${payoutDay.toLocaleDateString()}`
                )
            );

        if (!transfert) {
            return next(
                new NotFoundError(`Le transfert avec l'ID : ${id} n'existe pas`)
            );
        }

        await Transfert.findOneAndUpdate(
            { _id: id },
            {
                hasTakeMoney: true,
                contactNumber: contactNumber,
                payoutDay: new Date(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: 'Transfert validé !',
            status: 'sucess',
            transfert,
        });
    } catch (error) {
        next(error);
    }
};

export { validateTransfert, validateTransfertPage, moneyTaken };

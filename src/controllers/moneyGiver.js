/* eslint-disable linebreak-style */
import Transfert from '../models/transfert.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';

//CHECK TRANSFERT INTO DATABASE AND AUTOMATICALLY CHANGE TRUE TO HASTAKEMONEY FIELD SO THAT WE KNOW THAT PEOPLE HAVE TAKE THE MONEY
const validateTransfertPage = async (req, res, next) => {
    try {
        const { code } = req.body;
        const user = req.session.user;
        const transfert = await Transfert.findOne({ code });
        let errors = undefined;
        if (!transfert) {
            errors = {
                // eslint-disable-next-line no-useless-escape
                message: `Le transfert avec le code : ${code} n\'existe pas`,
            };
            return res.status(200).render('users/regular-user/search-clients', {
                title: "Diak's Project - Details",
                transfert,
                errors,
            });
        }

        if (transfert.hasTakeMoney) {
            errors = {
                message: `Le transfert Recherché a déjà été validé à la date du ${transfert.payoutDay}`,
            };
            return res.status(200).render('users/regular-user/search-clients', {
                title: "Diak's Project - Details",
                transfert,
                errors,
            });
        }
        if (transfert.city != user.username) {
            errors = {
                message: "Vous N'êtes pas autorisés à valider ce transfert",
            };
            return res.status(200).render('users/regular-user/search-clients', {
                title: "Diak's Project - Details",
                transfert,
                errors,
            });
        }
        res.status(200).render('users/regular-user/details-transfert', {
            title: "Diak's Project - Details",
            transfert,
        });
    } catch (error) {
        next(error);
    }
};

const moneyTaken = async (req, res, next) => {
    try {
        const user = req.session.user;

        let { page, size, clientName, senderName, start, end, moneyTypes } =
            req.query;

        let queryObj = {};
        let qObj = {};

        if (clientName) {
            queryObj.clientName = { $regex: clientName, $options: 'i' };
            qObj.clientName = clientName;
        }

        if (senderName) {
            queryObj.senderName = { $regex: senderName, $options: 'i' };
            qObj.senderName = senderName;
        }

        if (moneyTypes) {
            queryObj.moneyTypes = moneyTypes;
            qObj.moneyTypes = moneyTypes;
        }

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
            qObj.start = start;
            qObj.end = end;
        }

        page = page ? Number(page) : 1;
        size = size ? Number(size) : 10;

        //TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET

        let sum = await Transfert.aggregate([
            {
                $match: {
                    ...queryObj,
                    city: user.username,
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
            city: user.username,
            hasTakeMoney: true,
            ...queryObj,
        })
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await Transfert.count({
            city: user.username,
            hasTakeMoney: true,
            ...queryObj,
        });

        let totalPages = Math.ceil(count / limit);
        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
            iterator + 9 <= totalPages
                ? iterator + 9
                : page + (totalPages - page);

        res.status(200).render('users/regular-user/list-money-taken', {
            title: "Diak's Project - Argent récupéré",
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            q,
            user,
            sum,
            qObj,
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

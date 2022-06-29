import Transfert from '../models/transfert.js';
import mongoose from 'mongoose';

//RENDER ALL TRANSFERTS FOR A SPECIFIC LOGGED USER (EXEMPLE IF DIAKHOUMBA IS LOGGED IN IT WILL REDIRECT HER TO HER DASHBOARD WHICH WILL SHOW ALL OF HER TRANSFERT DONE SO FAR)
const getUserAgentTransfert = async (req, res, next) => {
    try {
        const { userAgentId } = req.user;
        let {
            page,
            size,
            clientName,
            start,
            end,
            city,
            moneyTypes,
            hasTakeMoney,
        } = req.query;

        //ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
        // THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

        let queryObj = {};

        if (hasTakeMoney)
            queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;

        if (clientName)
            queryObj.clientName = { $regex: clientName, $options: 'i' };

        if (moneyTypes && moneyTypes !== 'Tous') {
            queryObj.moneyTypes = moneyTypes;
        }

        if (city && city !== 'Tous') {
            queryObj.city = city;
        }

        if (start && end) {
            const date = {
                start: new Date(start).setHours(0, 0, 0),
                end: new Date(end).setHours(23, 59, 59),
            };
            queryObj.date = {
                $gte: date.start,
                $lte: date.end,
            };
        }

        page = page ? Number(page) : 1;
        size = size ? Number(size) : 11;

        //TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET

        const limit = size;
        const skip = (page - 1) * size;

        //FIND ONLY TRANSFERTS WHERE SENDERNAME IS EQUAL TO LOGGED USER
        const transferts = await Transfert.find({
            ...queryObj,
            createdBy: mongoose.Types.ObjectId(userAgentId),
        })
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);

        const count = await Transfert.count({
            queryObj,
            createdBy: mongoose.Types.ObjectId(userAgentId),
        });
        let totalPages = Math.ceil(count / limit);

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
            iterator + 9 <= totalPages
                ? iterator + 9
                : page + (totalPages - page);

        let sum = await Transfert.aggregate([
            {
                $match: {
                    createdBy: mongoose.Types.ObjectId(userAgentId),
                    ...queryObj,
                },
            },
            {
                $group: {
                    _id: null,
                    sum: { $sum: '$amountOfMoneyInEuro' },
                },
            },
        ]);
        if (sum[0] !== undefined) {
            sum = sum[0].sum;
        }

        res.status(200).json({
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            sum
        });
    } catch (error) {
        next(error);
    }
};


export { getUserAgentTransfert };

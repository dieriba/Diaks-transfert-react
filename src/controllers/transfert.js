/* eslint-disable linebreak-style */
import Transfert from '../models/transfert.js';
import Agent from '../models/agent.js';

//RENDER ALL TRANSFERT OF DB
const getAllTransferts = async (req, res, next) => {
    try {
        let {
            page,
            size,
            clientName,
            senderName,
            start,
            end,
            city,
            moneyTypes,
            hasTakeMoney,
            hasTakeFilter,
        } = req.query;
        //ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
        // THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

        let queryObj = {};

        if (city && city !== 'Tous') {
            queryObj.city = city;
        }
        if (hasTakeFilter !== 'false') {
            if (hasTakeMoney) {
                queryObj.hasTakeMoney = hasTakeMoney === 'true' ? false : true;
            }
        }
        if (clientName) {
            queryObj.clientName = { $regex: clientName, $options: 'i' };
        }
        if (senderName && senderName !== 'Tous') {
            queryObj.senderName = { $regex: senderName, $options: 'i' };
        }
        if (moneyTypes && moneyTypes !== 'Tous') {
            queryObj.moneyTypes = moneyTypes;
        }

        const endYear = Number(end.split('-')[0]);
        const endMonth = Number(end.split('-')[1]) - 1;
        const endDay = Number(end.split('-')[2]);
        const date = {
            start: new Date(start),
            end: new Date(endYear, endMonth, endDay, 25, 59, 59, 999),
        };

        if (start && end) {
            queryObj.date = {
                $gte: date.start,
                $lte: date.end,
            };
        }
        if (start) queryObj.date = { $gte: date.start };
        if (end) queryObj.date = { $lte: date.end };
        page = page ? Number(page) : 1;
        size = size ? Number(size) : 11;

        const limit = size;
        const skip = (page - 1) * size;
        const agent = await Agent.find({});
        const transferts = await Transfert.find(queryObj)
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await Transfert.count(queryObj);

        let totalPages = Math.ceil(count / limit);

        let iterator = page - 2 < 1 ? 1 : page - 2;
        let endingLink =
            iterator + 4 <= totalPages
                ? iterator + 4
                : page + (totalPages - page);

        let sum = await Transfert.aggregate([
            { $match: queryObj },
            {
                $group: {
                    _id: null,
                    sum: { $sum: '$amountOfMoneyInEuro' },
                },
            },
        ]);

        sum = sum[0] ? sum[0].sum : '';


        res.status(200).json({
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            agent,
            sum,
        });
    } catch (error) {
        next(error);
    }
};

const getAllMediumAdminTransferts = async (req, res, next) => {
    try {
        let {
            page,
            size,
            clientName,
            senderName,
            start,
            end,
            city,
            moneyTypes,
            hasTakeMoney,
            hasTakeFilter,
        } = req.query;

        //ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
        // THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS
        let queryObj = {};
        if (city && city !== 'Tous') {
            queryObj.city = city;
        }
        if (hasTakeFilter !== 'false') {
            if (hasTakeMoney) {
                queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
            }
        }
        if (clientName) {
            queryObj.clientName = { $regex: clientName, $options: 'i' };
        }
        if (senderName && senderName !== 'Tous') {
            queryObj.senderName = { $regex: senderName, $options: 'i' };
        }
        if (moneyTypes && moneyTypes !== 'Tous') {
            queryObj.moneyTypes = moneyTypes;
        }

        const endYear = Number(end.split('-')[0]);
        const endMonth = Number(end.split('-')[1]) - 1;
        const endDay = Number(end.split('-')[2]);
        const date = {
            start: new Date(start),
            end: new Date(endYear, endMonth, endDay, 25, 59, 59, 999),
        };

        if (start && end) {
            queryObj.date = {
                $gte: date.start,
                $lte: date.end,
            };
        }
        if (start) queryObj.date = { $gte: date.start };
        if (end) queryObj.date = { $lte: date.end };
        page = page ? Number(page) : 1;
        size = size ? Number(size) : 13;

        //TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET

        const limit = size;
        const skip = (page - 1) * size;
        const agent = await Agent.find({});
        const transferts = await Transfert.find({
            city: ['BOKE', 'CONAKRY', 'KINDIA'],
            ...queryObj,
        })
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await Transfert.count({
            city: ['BOKE', 'CONAKRY', 'KINDIA'],
            ...queryObj,
        });

        let sum = await Transfert.aggregate([
            {
                $match: {
                    city: { $in: ['BOKE', 'CONAKRY', 'KINDIA'] },
                    ...queryObj,
                },
            },
            { $group: { _id: null, sum: { $sum: '$amountOfMoneyInEuro' } } },
        ]);
        if (sum[0] !== undefined) {
            sum = sum[0].sum;
        }
        let totalPages = Math.ceil(count / limit);
        let iterator = page - 2 < 1 ? 1 : page - 2;
        let endingLink =
            iterator + 4 <= totalPages
                ? iterator + 4
                : page + (totalPages - page);

        res.status(200).json({
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            agent,
            sum,
        });
    } catch (error) {
        next(error);
    }
};

export { getAllTransferts, getAllMediumAdminTransferts };

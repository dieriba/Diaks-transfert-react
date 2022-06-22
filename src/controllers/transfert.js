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
        } = req.query;

        //ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
        // THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

        let queryObj = {};

        if (city) {
            queryObj.city = city;
        }
        if (hasTakeMoney) {
            queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
        }
        if (clientName) {
            queryObj.clientName = { $regex: clientName, $options: 'i' };
        }
        if (senderName) {
            queryObj.senderName = { $regex: senderName, $options: 'i' };
        }
        if (moneyTypes) {
            queryObj.moneyTypes = moneyTypes;
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
        }

        page = page ? Number(page) : 1;
        size = size ? Number(size) : 18;

        const limit = size;
        const skip = (page - 1) * size;
        const agent = await Agent.find({});
        const transferts = await Transfert.find(queryObj)
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await Transfert.count(queryObj);

        let totalPages = Math.ceil(count / limit);

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
            iterator + 9 <= totalPages
                ? iterator + 9
                : page + (totalPages - page);

        res.status(200).json({
            transferts,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            agent,
        });
    } catch (error) {
        next(error);
    }
};

export { getAllTransferts };

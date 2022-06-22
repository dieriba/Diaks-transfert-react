/* eslint-disable linebreak-style */
import MoneyTaker from '../models/moneyTaker.js';
import { NotFoundError } from '../../errors/index.js';

//Render LIST OF MONEY TAKERS
const getAllMoneyTakers = async (req, res, next) => {
    try {
        const user = req.session.user;

        let { page, size, hasTakeMoney, name } = req.query;

        let queryObj = {};

        if (hasTakeMoney) {
            queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
            qObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
        }

        if (name) {
            queryObj.name = { $regex: name, $options: 'i' };
        }

        page = page ? Number(page) : 1;
        size = size ? Number(size) : 18;

        //TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET

        const limit = size;
        const skip = (page - 1) * size;

        const moneyTaker = await MoneyTaker.find(queryObj)
            .sort({ date: -1 })
            .limit(limit)
            .skip(skip);
        const count = await MoneyTaker.count(queryObj);
        let totalPages = Math.ceil(count / limit);

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
            iterator + 9 <= totalPages
                ? iterator + 9
                : page + (totalPages - page);

        res.status(200).render('users/med-admin/list-money-takers', {
            title: "Diak's Project - Récupérateurs",
            moneyTaker,
            totalPages,
            currentPage: page,
            iterator,
            endingLink,
            user,
        });
    } catch (error) {
        next(error);
    }
};

//CREATE A NEW MONEY TAKER IN DATABASE
const addMoneyTaker = async (req, res, next) => {
    try {
        const moneyTaker = await MoneyTaker.create(req.body);
        const { code } = moneyTaker;
        res.status(201).json({
            message: `Nouveau Récupérateur crée avec le code : ${code}`,
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

//

// EDIT FORM ONLY AVAILABLE FOR SPECIFIC LEVEL OF USER LIKE HIGH LEVEL ADMIN OR LOW LEVEL ADMIN
const editMoneyTaker = async (req, res, next) => {
    try {
        const { id } = req.params;
        const moneyTaker = await MoneyTaker.findOneAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!moneyTaker) {
            return next(
                new NotFoundError(
                    "Il n'existe pas de récupérateurs avec cet ID"
                )
            );
        }

        res.status(200).json({
            message: 'Money Taker succesfully modified',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

//DELETE SPECIFIC MONEY TAKER OF DB ONLY AVAILABLE FOR HIGH USER ADMIN AND MED LEVEL ADMIN
const deleteMoneyTaker = async (req, res, next) => {
    try {
        const { id } = req.params;
        const moneyTaker = await MoneyTaker.findByIdAndDelete(id);

        if (!moneyTaker) {
            return next(
                new NotFoundError(
                    "Il n'existe pas de récupérateurs avec cet ID"
                )
            );
        }

        res.status(200).json({
            message: 'Money Taker has been deleted with success',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

export { addMoneyTaker, getAllMoneyTakers, editMoneyTaker, deleteMoneyTaker };

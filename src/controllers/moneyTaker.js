/* eslint-disable linebreak-style */
const MoneyTaker = require('../models/moneyTaker');
const { serializeObject } = require('../../utils/stringToQuery');
const CustomError = require('../../errors');

//Render LIST OF MONEY TAKERS
const getAllMoneyTakers = async (req, res, next) => {
	try {
		const user = req.session.user;

		let { page, size, hasTakeMoney, name } = req.query;

		let queryObj = {};
		let qObj = {};

		if (hasTakeMoney) {
			queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
			qObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
		}

		if (name) {
			queryObj.name = { $regex: name, $options: 'i' };
			qObj.name = name;
		}

		page = page ? Number(page) : 1;
		size = size ? Number(size) : 18;

		//TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET
		const q = serializeObject(qObj);

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
      iterator + 9 <= totalPages ? iterator + 9 : page + (totalPages - page);

		res
			.status(200)
			.render('users/med-admin/list-money-takers', {
				title: 'Diak\'s Project - Récupérateurs',
				moneyTaker,
				totalPages,
				currentPage: page,
				iterator,
				endingLink,
				q,
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
const MoneyTakerPage = (req, res) => {
	res.render('users/med-admin/createMoneyTaker', {
		title: 'Diak\'s Transfert - Ajouter Récupérateur',
	});
};

//RENDER DETAILS PAGE OF A SPECIFIT MONEYTAKERS WHICH SHOW ADDITION INFORMATION ABOUT IT
const getMoneyTakersDetails = async (req, res) => {
	const user = req.session.user;
	const { id } = req.params;
	const moneyTaker = await MoneyTaker.findById(id);
	res.render('transferts/detailMoneyTaker', {
		moneyTaker,
		user,
		title: 'Diak\'s Project - Details',
	});
};

//RENDER EDIT FORM PAGE
const editMoneyTakerForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const moneyTaker = await MoneyTaker.findById(id);

		if (!moneyTaker) {
			return next(
				new CustomError.notFound('Il n\'existe pas de récupérateurs avec cet ID')
			);
		}

		res.render('transferts/edit-money-takers', {
			moneyTaker,
			title: 'Diak\'s Project - Edit Form',
			user,
		});
	} catch (error) {
		next(error);
	}
};

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
				new CustomError.notFound('Il n\'existe pas de récupérateurs avec cet ID')
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

const deleteMoneyTakerForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const moneyTaker = await MoneyTaker.findById(id);

		if (!moneyTaker) {
			return next(
				new CustomError.notFound('Il n\'existe pas de récupérateurs avec cet ID')
			);
		}

		res.render('transferts/delete-money-taker', {
			moneyTaker,
			title: 'Diak\'s Project - Delete Form',
			user,
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
				new CustomError.notFound('Il n\'existe pas de récupérateurs avec cet ID')
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

module.exports = {
	addMoneyTaker,
	MoneyTakerPage,
	getAllMoneyTakers,
	getMoneyTakersDetails,
	editMoneyTaker,
	editMoneyTakerForm,
	deleteMoneyTaker,
	deleteMoneyTakerForm,
};

/* eslint-disable linebreak-style */
const Transfert = require('../models/transfert');
const Agent = require('../models/agent');
const Rate = require('../models/rates');
const User = require('../models/user');
const { serializeObject } = require('../../utils/stringToQuery');
const { calculFees } = require('../../utils/rate');
const CustomError = require('../../errors');
const bcrypt = require('bcryptjs');

//RENDER ALL TRANSFERT OF DB
const totalAmountTransfert = async (req, res, next) => {
	try {
		const user = req.session.user;

		let { senderName, start, end, city, page, size, moneyTypes } =
            req.query;

		//ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
		// THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

		let queryObj = {};
		let qObj = {};

		if (city) {
			qObj.city = city;
			queryObj.city = city;
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
		size = size ? Number(size) : 18;

		//TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET
		const q = serializeObject(qObj);

		const limit = size;
		const skip = (page - 1) * size;

		const transferts = await Transfert.find(queryObj)
			.sort({ date: -1 })
			.limit(limit)
			.skip(skip);
		const count = await Transfert.count(queryObj);
		const agents = await Agent.find({});

		let sum = await Transfert.aggregate([
			{ $match: queryObj },
			{ $group: { _id: null, sum: { $sum: '$amountOfMoneyInEuro' } } },
		]);
		if (sum[0] !== undefined) {
			sum = sum[0].sum;
		}
		let totalPages = Math.ceil(count / limit);

		let iterator = page - 5 < 1 ? 1 : page - 5;
		let endingLink =
            iterator + 9 <= totalPages
            	? iterator + 9
            	: page + (totalPages - page);

		res.status(200).render('transferts/calcul', {
			title: 'Diak\'s Project - Dashboard',
			transferts,
			totalPages,
			currentPage: page,
			iterator,
			endingLink,
			q,
			user,
			sum,
			qObj,
			agents,
		});
	} catch (error) {
		next(error);
	}
};

//RENDER CONVERTER CURRENCY PAGE
const getConverter = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { rate } = await Rate.findById('62764205c1cf091846cea5c6');

		let { euro, gnf } = req.query;

		if (euro != '') gnf = Number(euro) * rate;
		if (gnf != '') euro = Number(gnf) / rate;

		//SECURITY TO REMOVE NAN VALUE FROM INPUT WHEN FERCHING THE PAGE
		if (!Number(euro)) euro = '';
		if (!Number(gnf)) gnf = '';

		res.render('transferts/converter', {
			title: 'Diak\'s Projet - Converter',
			user,
			rate,
			euro,
			gnf,
		});
	} catch (error) {
		next(error);
	}
};

//CONVERT VALUE FOR CLIENT
const Convert = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { rate } = await Rate.findById('62764205c1cf091846cea5c6');
		let { euro, gnf } = req.body;
		euro = euro.replace(/\s+/g, '');
		gnf = gnf.replace(/\s+/g, '');

		if (euro != '') {
			gnf = Number(euro) * rate;
		}
		if (gnf != '') {
			euro = Number(gnf) / rate;
		}

		const fee = calculFees(euro);

		res.render('transferts/converter', {
			title: 'Diak\'s Projet - Converter',
			user,
			rate,
			euro,
			gnf,
			fee,
		});
	} catch (error) {
		next(error);
	}
};

//CREATE A NEW TRANSFERT INTO DB ONLY HIGH LEVEL USER AND LOW LEVEL USER CAN CREATE A NEW TRANSFERT
const createTransfert = async (req, res, next) => {
	try {
		const user = req.session.user;

		const transfertInfo = req.body;

		const { senderName } = transfertInfo;

		if (user.isAgent && senderName != user.senderName) {
			return next(
				new CustomError.BadRequestError('Vous devez être le même agent')
			);
		}

		const transfert = await Transfert.create(transfertInfo);
		const { code } = transfert;
		res.status(201).send({
			message: `Nouveau Transfert Ajouté avec le code : ${code}`,
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

//RENDER FORM PAGE
const getTransfertForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const agent = await Agent.find({});
		res.render('transferts/transfert-form', {
			title: 'Diak\'s Project - Add Transfert',
			user,
			agent,
		});
	} catch (error) {
		next(error);
	}
};

//RENDER DETAILS PAGE OF A SPECIFIT TRANSFERTS WHICH SHOW ADDITION INFORMATION ABOUT IT
const getTransfertDetails = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.params;
		const transfert = await Transfert.findById(id);

		if (!transfert) {
			return next(new CustomError.notFound('Le transfert n\'existe pas'));
		}

		res.render('transferts/details-transfert', {
			transfert,
			user,
			title: 'Diak\'s Project - Details',
			layout: false,
		});
	} catch (error) {
		next(error);
	}
};

const getChangePasswordPage = async (req, res, next) => {
	try {
		const user = req.session.user;

		res.render('transferts/change-password', {
			user,
			title: 'Diak\'s Project - Change Password',
		});
	} catch (error) {
		next(error);
	}
};

const editPassword = async (req, res, next) => {
	try {
		const userLogged = req.session.user;
		const user = await User.findOne({ username: userLogged.username });
		const { actualPassword, newPassword, confirmNewPassword } = req.body;

		const isSamePassword = await user.comparePassword(actualPassword);

		if (!isSamePassword) {
			return next(
				new CustomError.notFound('Mot de passe actuel Incorrect')
			);
		}

		if (newPassword !== confirmNewPassword) {
			return next(
				new CustomError.notFound(
					'Les mots de passes ne correspondent pas'
				)
			);
		}
		if (newPassword.length < 8) {
			return next(
				new CustomError.notFound(
					'Le mot de passe doit au moins conternir 8 caractères'
				)
			);
		}

		//HASH PASSWORD
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(newPassword, salt);

		await User.findOneAndUpdate(
			{ username: userLogged.username },
			{ password },
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: 'sucess',
			message: 'Mot de passe modifié avec succès',
		});
	} catch (error) {
		next(error);
	}
};

//RENDER EDIT FORM PAGE
const editForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const agent = await Agent.find({});
		const { id } = req.query;
		const transfert = await Transfert.findById(id);

		if (!transfert) {
			return next(new CustomError.notFound('Le transfert n\'existe pas'));
		}

		res.render('transferts/edit-form-transfert', {
			transfert,
			title: 'Diak\'s Project - Edit Form',
			user,
			agent,
		});
	} catch (error) {
		next(error);
	}
};

// EDIT FORM ONLY AVAILABLE FOR SPECIFIC LEVEL OF USER LIKE HIGH LEVEL ADMIN OR LOW LEVEL ADMIN
const editTransfert = async (req, res, next) => {
	try {
		const date = Date.now();
		const { id } = req.params;
		const transfert = await Transfert.findOneAndUpdate(
			{ _id: id },
			{ ...req.body, hasBeenModified: true, updatedDate: date },
			{
				new: true,
				runValidators: true,
			}
		);

		if (!transfert) {
			return next(
				new CustomError.notFound(
					`Le transfert avec l'ID : ${id} n'existe pas`
				)
			);
		}

		res.status(200).json({
			message: 'Transfert succesfully modified',
			status: 'sucess',
			transfert,
		});
	} catch (error) {
		next(error);
	}
};

//RENDER DELETE FORM
const deleteForm = async (req, res, next) => {
	try {
		const { id } = req.query;
		const user = req.session.user;
		const transfert = await Transfert.findById(id);
		if (!transfert) {
			return next(
				new CustomError.notFound(
					`Le transfert avec l'ID : ${id} n'existe pas`
				)
			);
		}
		res.render('transferts/delete-transfert-form', {
			user,
			transfert,
			title: 'Diak\'s Project - Delete Form',
		});
	} catch (error) {
		next(error);
	}
};

//DELETE SPECIFIC TRANSFERT OF DB ONLY AVAILABLE FOR HIGH USER ADMIN
const deleteTransfert = async (req, res, next) => {
	try {
		const { id } = req.params;
		const transfert = await Transfert.findByIdAndDelete(id);

		//CHECK IF A TRANSFERT IS LINKED TO THE GIVEN ID IF NOT AN ERROR IS RETURNED
		if (!transfert) {
			return next(
				new CustomError.notFound(
					`Le transfert avec l'ID : ${id} n'existe pas`
				)
			);
		}

		res.status(200).json({
			message: 'Transfert supprimé avec succès',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getConverter,
	totalAmountTransfert,
	createTransfert,
	getTransfertForm,
	getTransfertDetails,
	getChangePasswordPage,
	editPassword,
	editForm,
	editTransfert,
	deleteForm,
	deleteTransfert,
	Convert,
};

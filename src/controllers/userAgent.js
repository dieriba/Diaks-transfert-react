const Transfert = require('../models/transfert');
const { serializeObject } = require('../../utils/stringToQuery');

//RENDER ALL TRANSFERTS FOR A SPECIFIC LOGGED USER (EXEMPLE IF DIAKHOUMBA IS LOGGED IN IT WILL REDIRECT HER TO HER DASHBOARD WHICH WILL SHOW ALL OF HER TRANSFERT DONE SO FAR)
const getUserAgentTransfert = async (req, res, next) => {
	try {
		const user = req.session.user;

		let { page, size, clientName, start, end, city, moneyTypes, hasTakeMoney } = req.query;

		//ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
		// THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

		let queryObj = {};
		let qObj = {};

		if (city) {
			qObj.city = city;
			queryObj.city = city;
		}
		if (hasTakeMoney) {
			queryObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
			qObj.hasTakeMoney = hasTakeMoney === 'true' ? true : false;
		}
		if (clientName) {
			queryObj.clientName = { $regex: clientName, $options: 'i' };
			qObj.clientName = clientName;
		}
		if (moneyTypes) {
			queryObj.moneyTypes = moneyTypes;
			qObj.moneyTypes = moneyTypes;
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
			qObj.start = start;
			qObj.end = end;
		}

		page = page ? Number(page) : 1;
		size = size ? Number(size) : 18;

		//TRANSFORM QUERY INTO URI ENCODE STRING TO BE ABLE TO QUERY NEXT PAGE WITHOUT GETTING RESET
		const q = serializeObject(qObj);

		const limit = size;
		const skip = (page - 1) * size;

		//FIND ONLY TRANSFERTS WHERE SENDERNAME IS EQUAL TO LOGGED USER
		const transferts = await Transfert.find({
			...queryObj,
			senderName: user.senderName,
		})
			.sort({ date: -1 })
			.limit(limit)
			.skip(skip);

		const count = await Transfert.count({
			queryObj,
			senderName: { $regex: user.senderName, $options: 'i' },
		});
		let totalPages = Math.ceil(count / limit);

		let iterator = page - 5 < 1 ? 1 : page - 5;
		let endingLink =
      iterator + 9 <= totalPages ? iterator + 9 : page + (totalPages - page);

		res.render('users/agent/agent', {
			title: 'Diak\'s Project - Dashboard',
			transferts,
			totalPages,
			currentPage: page,
			iterator,
			endingLink,
			q
		});
	} catch (error) {
		next(error);
	}
};

const totalAgentTransfert = async (req, res, next) => {
	try {
		const user = req.session.user;

		let { start, end, city, page, size, moneyTypes } = req.query;

		//ADD 2 OBJECT THE FIRST ONE IS USED AS QUERY PARAMETER FOR MONGOOSE FUNCTION
		// THE SECOND ONE IS HERE TO PAGINATION SYSTEM AND SEND QUERY STRING TO LINK BUT WITHOUT THE PAGE QUERY TO AVOID BUGS

		let queryObj = {};
		let qObj = {};

		if (city) {
			qObj.city = city;
			queryObj.city = city;
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

		const transferts = await Transfert.find({...queryObj,senderName : user.senderName})
			.sort({ date: -1 })
			.limit(limit)
			.skip(skip);
		const count = await Transfert.count({...queryObj,senderName : user.senderName});

		let sum = await Transfert.aggregate([
			{ $match: {
				...queryObj,
				senderName : user.senderName
			} },
			{ $group: { _id: null, sum: { $sum: '$amountOfMoneyInEuro' } } },
		]);
		if (sum[0] !== undefined) {
			sum = sum[0].sum;
		}
		let totalPages = Math.ceil(count / limit);

		let iterator = page - 5 < 1 ? 1 : page - 5;
		let endingLink =
      iterator + 9 <= totalPages ? iterator + 9 : page + (totalPages - page);

		res
			.status(200)
			.render('transferts/calcul', {
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
			});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getUserAgentTransfert,
	totalAgentTransfert
};

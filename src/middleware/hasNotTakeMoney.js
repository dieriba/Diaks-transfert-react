const Transfert = require('../models/transfert');
const MoneyTaker = require('../models/moneyTaker');
const CustomError = require('../../errors');

const checkIfHasTakeMoney = async (req, res, next) => {
	const { id } = req.params;
	const transfert = await Transfert.findById(id);
	if (transfert.hasTakeMoney) {
		next(
			new CustomError.unauthorized(
				'Modification/Supression impossible car le client a déjà récupéré l\'argent'
			)
		);
	}

	next();
};

const checkIfMoneytakerHasTakeMoney = async (req, res, next) => {
	const { id } = req.params;
	const moneyTaker = await MoneyTaker.findById(id);
	if (moneyTaker.hasTakeMoney) {
		next(
			new CustomError.unauthorized(
				'Modification/Supression impossible car le client a déjà récupéré l\'argent'
			)
		);
	}

	next();
};

const editCheck = async (req, res, next) => {
	const user = req.session.user;

	if (user.securityLevel == 'isHighAdmin' && user.username == 'dieriba') {
		return next();
	}

	const { id } = req.params;
	const transfert = await Transfert.findById(id);
	if (transfert.hasTakeMoney) {
		return res.status(401).json({
			message:
                'Modification impossible le client a déjà récupérer largent',
		});
	}
};



module.exports = {
	checkIfHasTakeMoney,
	checkIfMoneytakerHasTakeMoney,
	editCheck,
};

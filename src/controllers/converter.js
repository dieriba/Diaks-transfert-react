/* eslint-disable linebreak-style */
const Rate = require('../models/rates');
const CustomError = require('../../errors');

const rate = async (req, res, next) => {
	try {
		const rate = await Rate.findOneAndUpdate(
			{ _id: '62764205c1cf091846cea5c6' },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!rate) {
			return next(
				new CustomError.notFound(
					'Il n\'existe pas de récupérateurs avec cet ID'
				)
			);
		}

		res.status(200).json({
			message: 'Taux modifié avec succès',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	rate,
};

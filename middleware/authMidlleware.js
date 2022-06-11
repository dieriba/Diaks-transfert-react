const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		res.locals.user = null;
		return res.status(400).json({ message: "You're not allowed" });
	}

	jwt.verify(token, process.env.TOKEN_SECRET, async function (err, decoded) {
		if (err) {
			res.locals.user = null;
			res.clearCookie('jwt');
			return res.status(400).json({ message: 'Invalid Token' });
		} else {
			const { id } = decoded;
			const user = await User.findById(id);
			res.locals.user = user;
			next();
		}
	});
};

const requireAuth = (req, res, next) => {
	next();
};

module.exports = {
	authController,
	requireAuth
};

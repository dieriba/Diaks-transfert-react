/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const User = require('../models/user');
const CustomError = require('../../errors');

//RENDER LOGIN PAGE
const loginPage = (req, res) => {
	res.render('transferts/login', {
		title: "Diak's Project - Login",
	});
};

//LOGIN WHERE ALL USER WILL BE REDIRECT IF THEY DO NOT HAVE COOKIES YET, IF THEY HAVE THEY WILL BE REDIRECT TO THEIR MAIN DASHBOARD AND THEY Can't ACESS OTHERS DASHBOARD
const auth = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		let errors = undefined;

		if (!username || !password) {
			errors = {
				message:
                    "Veuillez entrez un nom d'utilisateur et un mot de passe",
			};

			return res.render('transferts/login', {
				title: "Diak's Project - Login",
				errors,
			});
		}

		const user = await User.findOne({ username });
		if (!user) {
			errors = {
				message: "Veuillez entrez un nom d'utilisateur valide",
			};

			return res.render('transferts/login', {
				title: "Diak's Project - Login",
				errors,
			});
		}

		const isSamePassword = await user.comparePassword(password);
		if (!isSamePassword) {
			errors = {
				message: 'Mot de passe Incorrect',
			};

			return res.render('transferts/login', {
				title: "Diak's Project - Login",
				errors,
			});
		}
		req.session.user = user;
		if (user.isHighAdmin) return res.redirect('/admin/dashboard');
		if (user.isAgent) return res.redirect('/agent/dashboard');
		if (user.isMediumAdmin) return res.redirect('/med-admin/dashboard');
		if (user.isMoneyGiver) return res.redirect('/money/search');

		next(
			new CustomError.UnauthenticatedError(
				'Vous ne pouvez pas encore accéder au site'
			)
		);
	} catch (error) {
		next(error);
	}
};

//LOGOUT USER FROM WEBSITE MEANING CLEANING USER COOKIE
const logout = (req, res) => {
	res.clearCookie('user');
	res.redirect('/user/login');
};

module.exports = {
	loginPage,
	auth,
	logout,
};

/* eslint-disable linebreak-style */
const User = require('../models/user');
const CustomError = require('../../errors');

//CREATE A NEW USER INTO DB ONLY HIGH LEVEL CAN CREATE A NEW USER
const addUser = async (req, res, next) => {
	try {
		await User.create(req.body);
		res.status(201).json({
			message: 'Nouveau utilisateur crée',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

//DELETE USER FROM DATABASE

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const users = await User.findByIdAndDelete(id);

		if (!users)
			return next(new CustomError.notFound('Aucun utilisateurs trouvés'));

		res.status(200).json({
			message: 'Utilisateur supprimé avec succès',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

const deleteFormUser = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const users = await User.findById(id);

		if (!users)
			return next(new CustomError.notFound('Aucun utilisateurs trouvés'));

		res.render('users/admin/delete-form-user', {
			users,
			user,
			title: 'Diak\'s Project - Delete Form',
		});
	} catch (error) {
		next(error);
	}
};

const editUser = async (req, res, next) => {
	// try {
	//     if(!users) return next(new CustomError.notFound(`Aucun utilisateurs trouvés`));
	// } catch (error) {
	//     next(error)
	// }
};

const editFormUser = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const users = await User.findById(id);

		if (!users)
			return next(new CustomError.notFound('Aucun utilisateurs trouvés'));

		res.render('users/admin/edit-user', {
			users,
			title: 'Diak\'s Project - Edit Form',
			user,
		});
	} catch (error) {
		next(error);
	}
};

//GET USER SPECIFIC DETAILS AND RENDERS IT
const getUserDetails = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.params;
		const users = await User.findById(id);
		res.render('users/admin/details-user', {
			users,
			title: 'Diak\'s Project - Details Utilisateurs',
			user,
		});
	} catch (error) {
		next(error);
	}
};

//RENDER THE PAGE TO CREATE USER ONLY HIGH LEVEL ADMIN LIKE DIERIBA CAN DO IT
const getUserPage = (req, res, next) => {
	const user = req.session.user;

	try {
		res.status(200).render('users/admin/create-user', {
			title: 'Diak\'s Projet - Add User',
			user,
		});
	} catch (error) {
		next(error);
	}
};

//RENDER ALL USERS OF THE WEB APP PAGE ONLY FOR ADMIN
const getAllUsers = async (req, res, next) => {
	try {
		const user = req.session.user;
		const users = await User.find();
		res.status(200).render('users/admin/users', {
			user,
			title: 'Diak\'s Project - Utilisateus',
			users,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addUser,
	deleteUser,
	deleteFormUser,
	editUser,
	editFormUser,
	getUserDetails,
	getUserPage,
	getAllUsers,
};

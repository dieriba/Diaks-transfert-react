/* eslint-disable linebreak-style */
import User from '../models/user.js';
import { NotFoundError } from '../../errors/index.js';

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
            return next(new NotFoundError('Aucun utilisateurs trouvés'));

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
            return next(new NotFoundError('Aucun utilisateurs trouvés'));

        res.render('users/admin/delete-form-user', {
            users,
            user,
            title: "Diak's Project - Delete Form",
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

//RENDER ALL USERS OF THE WEB APP PAGE ONLY FOR ADMIN
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export { addUser, deleteUser, deleteFormUser, editUser, getAllUsers };

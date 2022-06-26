/* eslint-disable linebreak-style */
import User from '../models/user.js';
import Agent from '../models/agent.js';
import Transfert from '../models/transfert.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';

//CREATE A NEW USER INTO DB ONLY HIGH LEVEL CAN CREATE A NEW USER
const addUser = async (req, res, next) => {
    try {

        const {
            phoneNumber,
            senderName,
            senderCode,
            username,
            password,
            confirmPassword,
            role,
        } = req.body;

        if (password !== confirmPassword) {
            return next(
                new BadRequestError('Les mots de passe ne correspondents pas')
            );
        }
        if (role === 'agent') {
            if (!senderName || !senderCode)
                return next(
                    new BadRequestError('Veuillez remplir tous les champs')
                );
            const agent = await Agent.findOne({ senderName });
            const code = await Agent.findOne({ senderCode });
            if (agent)
                return next(new BadRequestError("Nom d'agent déjà pris"));
            if (code) return next(new BadRequestError('Code agent déjà pris'));
        }

        const user = await User.create({
            username,
            password,
            role,
        });

        if (role === 'agent') {
            let phone = '';

            if (phoneNumber) {
                for (let i = 0; i < phoneNumber.length; i++) {
                    const number = phoneNumber[i];
                    if (i % 2 !== 0 && i !== 0 && i !== 9) {
                        phone += number + '.';
                        continue;
                    }
                    phone += number;
                }
            }

            const agent = await Agent.create({
                senderName,
                phoneNumber: phoneNumber ? phone : '',
                senderCode,
                LinkedToUserId: user._id,
            });

            await User.findByIdAndUpdate(
                user._id,
                {
                    LinkedToAgentId: agent._id,
                },
                { new: true, runValidators: true }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Utilisateur crée avec succès !',
        });
    } catch (error) {
        next(error);
    }
};

//DELETE USER FROM DATABASE

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return next(new NotFoundError('Aucun utilisateurs trouvés'));

        await User.deleteOne({ _id: id });

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { senderName, senderCode, username, role } = req.body;

        const user = await User.findById(id);
        const transferts = await Transfert.find({
            createdBy: id,
        });

        //CHECK IF AGENT EXIST
        if (!user) {
            return next(
                new NotFoundError(
                    `Il n'existe aucun utilisateurs avec l'id : ${id}`
                )
            );
        }

        if (user.role === 'agent') {
            const transferts = await Transfert.find({
                createdBy: req.user.userAgentId,
            });
            //CHECK IF THERE IS TRANSFERT LINKED TO THIS AGENT IF IT THE CASE THEN SENDERNAME WILL BE UPDATED THROUGH ALL OF THE PREVIOUS TRANSFERT LINKED TO THAT AGENT
            if (transferts) {
                await Transfert.updateMany(
                    { createdBy: req.user.userAgentId },
                    {
                        senderName: senderName,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
        }

        //THEN UPDATE THE AGENT
        await Agent.findByIdAndUpdate(req.user.userAgentId, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            message: 'User modifié avec succès',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

//RENDER ALL USERS OF THE WEB APP PAGE ONLY FOR ADMIN
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({users});
    } catch (error) {
        next(error);
    }
};

export { addUser, deleteUser, editUser, getAllUsers };

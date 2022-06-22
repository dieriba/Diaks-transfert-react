/* eslint-disable linebreak-style */
import Agent from '../models/agent.js';
import Transfert from '../models/transfert.js';
import { NotFoundError } from '../../errors/index.js';

//RENDER ALL AGENTS OF THE WEB APP PAGE ONLY FOR ADMIN
const getAllAgents = async (req, res, next) => {
    try {
        const agents = await Agent.find({});
        res.status(200).json({
            agents,
        });
    } catch (error) {
        next(error);
    }
};

//CREATE NEW AGENT INTO DATABASE
const createAgent = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;
        let phone = '';
        for (let i = 0; i < phoneNumber.length; i++) {
            const number = phoneNumber[i];
            if (i % 2 !== 0 && i !== 0 && i !== 9) {
                phone += number + '.';
                continue;
            }
            phone += number;
        }

        await Agent.create({ ...req.body, phoneNumber: phone });
        res.status(201).json({
            message: 'Nouveaul Agent crée',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

//DELETE AGENT FROM DATABASE
const deleteAgent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agent = await Agent.findByIdAndDelete(id);

        if (!agent) {
            return next(
                new NotFoundError(`Il n'existe aucun agent avec l'id : ${id}`)
            );
        }

        res.status(200).json({
            message: 'Agent supprimé avec succès',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

// EDIT FORM ONLY AVAILABLE FOR SPECIFIC LEVEL OF USER LIKE HIGH LEVEL ADMIN OR LOW LEVEL ADMIN
const editAgent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { senderName, phoneNumber } = req.body;
        const agent = await Agent.findById(id);
        const transfert = await Transfert.find({
            senderName: agent.senderName,
        });
        const count = transfert.length;

        let phone = '';

        for (let i = 0; i < phoneNumber.length; i++) {
            const number = phoneNumber[i];
            if (i % 2 !== 0 && i !== 0 && i !== 9) {
                phone += number + '.';
                continue;
            }
            phone += number;
        }

        //CHECK IF AGENT EXIST
        if (!agent) {
            return next(
                new NotFoundError(`Il n'existe aucun agent avec l'id : ${id}`)
            );
        }

        //CHECK IF THERE IS TRANSFERT LINKED TO THIS AGENT IF IT THE CASE THEN SENDERNAME WILL BE UPDATED THROUGH ALL OF THE PREVIOUS TRANSFERT LINKED TO THAT AGENT
        if (count !== 0) {
            await Transfert.updateMany(
                { senderName: agent.senderName },
                {
                    senderName: senderName,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

        //THEN UPDATE THE AGENT
        await Agent.updateOne(
            { _id: id },
            { ...req.body, phoneNumber: phone },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: 'Agent modifié avec succès',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

export { getAllAgents, createAgent, deleteAgent, editAgent };

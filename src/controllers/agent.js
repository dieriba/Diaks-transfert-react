/* eslint-disable linebreak-style */
const Agent = require('../models/agent');
const Transfert = require('../models/transfert');
const CustomError = require('../../errors');

//RENDER ALL AGENTS OF THE WEB APP PAGE ONLY FOR ADMIN
const getAllAgents = async (req, res, next) => {
	try {
		const user = req.session.user;
		const agents = await Agent.find({});
		res.status(200).render('users/admin/list-agent', {
			user,
			title: 'Diak\'s Project - Agents',
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
			if (i % 2 !== 0 && ( i !== 0 && i !== 9)){
				phone += number + '.';
				continue;
			} 	 
			phone += number;			
		}

		await Agent.create({...req.body, phoneNumber : phone});
		res.status(201).json({
			message: 'Nouveaul Agent crée',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

//RENDER ADD AGENT PAGE
const createAgentPage = (req, res, next) => {
	try {
		const user = req.session.user;

		res.render('users/admin/create-agent', {
			user,
			title: 'Diak\'s Project - Add Agent',
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
				new CustomError.notFound(
					`Il n'existe aucun agent avec l'id : ${id}`
				)
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

//RENDER DELETE FORM AGENT
const deleteFormAgent = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const agent = await Agent.findById(id);

		if (!agent) {
			return next(
				new CustomError.notFound(
					`Il n'existe aucun agent avec l'id : ${id}`
				)
			);
		}

		res.render('users/admin/delete-form-agent', {
			agent,
			user,
			title: 'Diak\'s Project - Delete Form',
		});
	} catch (error) {
		next(error);
	}
};

//GET AGENT SPECIFIC DETAILS AND RENDERS IT
const getAgentDetails = async (req, res) => {
	const user = req.session.user;
	const { id } = req.params;
	const agent = await Agent.findById(id);
	res.render('users/admin/details-agents', {
		title: 'Diak\'s Project - Details Agent',
		user,
		agent,
	});
};

//RENDER EDIT FORM PAGE
const editFormAgent = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { id } = req.query;
		const agent = await Agent.findById(id);

		if (!agent) {
			return next(
				new CustomError.notFound(
					`Il n'existe aucun agent avec l'id : ${id}`
				)
			);
		}

		res.render('users/admin/edit-agent', {
			agent,
			title: 'Diak\'s Project - Edit Agent',
			user,
		});
	} catch (error) {
		next(error);
	}
};

// EDIT FORM ONLY AVAILABLE FOR SPECIFIC LEVEL OF USER LIKE HIGH LEVEL ADMIN OR LOW LEVEL ADMIN
const editAgent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { senderName , phoneNumber } = req.body;
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
				new CustomError.notFound(
					`Il n'existe aucun agent avec l'id : ${id}`
				)
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
		await Agent.updateOne({ _id: id }, {...req.body,phoneNumber : phone}, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			message: 'Agent modifié avec succès',
			status: 'sucess',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllAgents,
	createAgent,
	createAgentPage,
	deleteAgent,
	deleteFormAgent,
	getAgentDetails,
	editAgent,
	editFormAgent,
};

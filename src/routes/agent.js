const express = require('express');
const router = express.Router();

const {
	getAllAgents,
	createAgent,
	createAgentPage,
	editFormAgent,
	editAgent,
	deleteAgent,
	deleteFormAgent,
	getAgentDetails,
} = require('../controllers/agent');

//RENDERS ALL AGENTS
router.route('/agents').get(getAllAgents);

//GET FORM THAT CREATE A NEW AGENT TO DATABASE
router.route('/add-agent').get(createAgentPage);

//CREATE NEW AGENT IN THE DATABASE
router.route('/add-agent').post(createAgent);

//GET EDIT FORM THAT WILL MODIFY USER TO DATABASE
router.route('/edit-agent').get(editFormAgent);

//UPDATE NEW AGENT INFO INTO DATABASE
router.route('/edit-agent/:id').patch(editAgent);

//GET DELETE FORM THAT WILL DELETE  AGENT   TO DATABASE
router.route('/delete-agent').get(deleteFormAgent);

//DELETE AGENT FROM DATABASE
router.route('/delete-agent/:id').delete(deleteAgent);

//GET SPECIFIC DETAILS OF AN AGENT
router.route('/agents/details/:id').get(getAgentDetails);

module.exports = router;

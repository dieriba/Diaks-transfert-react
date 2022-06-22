import express from 'express';
const router = express.Router();

import {
    getAllAgents,
    createAgent,
    editAgent,
    deleteAgent,
} from '../controllers/agent.js';

//RENDERS ALL AGENTS
router.route('/agents').get(getAllAgents);
//CREATE NEW AGENT IN THE DATABASE
router.route('/add-agent').post(createAgent);
//UPDATE NEW AGENT INFO INTO DATABASE
router.route('/edit-agent/:id').patch(editAgent);
//DELETE AGENT FROM DATABASE
router.route('/delete-agent/:id').delete(deleteAgent);

export default router;

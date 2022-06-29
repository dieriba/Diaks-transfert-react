import express from 'express';
const router = express.Router();

import {
    getUserAgentTransfert,
} from '../controllers/userAgent.js';

//RENDERS AGENT PAGE
router.route('/transferts').get(getUserAgentTransfert);

export default router;

import express from 'express';
const router = express.Router();

import {
    getUserAgentTransfert,
    totalAgentTransfert,
} from '../controllers/userAgent.js';

//RENDERS AGENT PAGE
router.route('/transferts').get(getUserAgentTransfert);
router.route('/calcul').get(totalAgentTransfert);

export default router;

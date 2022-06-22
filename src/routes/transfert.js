/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();

import { getAllTransferts } from '../controllers/transfert.js';

//RENDERS ALL TRANSFERTS FROM DATABASE ONLY ACCESSIBLE FOR MED ADMIN AND HIGH LEVEL ADMIN
router.route('/dashboard').get(getAllTransferts);

export default router;

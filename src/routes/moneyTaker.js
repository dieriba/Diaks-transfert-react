/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();
import { getAllMediumAdminTransferts } from '../controllers/transfert.js';
import { addMoneyTaker } from '../controllers/moneyTaker.js';
import { rate } from '../controllers/converter.js';

//MODIFY NEW RATE OF MONEY
router.route('/new-rate').post(rate);

//RENDER MEDIUM ADMIN PAGE
router.route('/transferts').get(getAllMediumAdminTransferts);

//RENDER MED ADMIN PAGE TO RENDER MONEY TAKER CREATE FORM
//POST NEW MONEY TAKER AND CREATE NEW ONE INTO DATABASE
router.route('/add-money-taker').post(addMoneyTaker);

export default router;

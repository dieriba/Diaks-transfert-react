/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();
import {
    createTransfert,
    totalAmountTransfert,
    editPassword,
    getAgentNames,
} from '../controllers/shared.js';
import {
    editMoneyTaker,
    getAllMoneyTakers,
    deleteMoneyTaker,
} from '../controllers/moneyTaker.js';

import {
    deleteTransfert,
    editTransfert,
    Convert,
} from '../controllers/shared.js';
import { getRate } from '../controllers/converter.js';

//CREATE NEW TRANSFERT INTO DB
router.route('/add-transfert').post(createTransfert);

router.route('/convertisseur').post(Convert);
router.route('/taux').get(getRate);
//RENDERS ALL MONEY TAKERS OF THE DATABASE
router.route('/list-money-takers').get(getAllMoneyTakers);

//GET DELETE FORM THAT WILL DELETE MONEYTAKER TO DATABASE ONLY HIGH LEVEL ADMIN CAN DELETE TRANSFERT
//TMONEY TAKER WILL ONLY BE DELETED IF MIDDLEARE CHECKIFHASTAKEMONEY HAS BEEN PASSED
router.route('/delete-money-taker/:id').delete(deleteMoneyTaker);

router.route('/edit-money-taker/:id').patch(editMoneyTaker);

//RENNDER PAGE TO CALCUL ALL MONEY THAT HAS BEEN TRANSFERED, CAN BE NARROWED WITH QUERY
router.route('/calcul').get(totalAmountTransfert);

//RENDER CHANGE PASSWORD PAGES
router.route('/change-password').patch(editPassword);

//TRANSFERT WILL ONLY BE DELETED IF MIDDLEARE CHECKIFHASTAKEMONEY HAS BEEN PASSED
router.route('/delete-transfert/:id').delete(deleteTransfert);

//GET EDIT FORM THAT WILL MODIFY TRANSFERT TO DATABASE
router.route('/edit-transfert/:id').patch(editTransfert);
router.route('/agents').get(getAgentNames);

export default router;

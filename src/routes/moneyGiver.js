/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();
import {
    validateTransfertPage,
    validateTransfert,
    moneyTaken,
} from '../controllers/moneyGiver.js';

//RENDER MONEYGIVER USER PAGE

//ROUTE TO VALIDATE TRANSFERT
router.route('/validate/:id').patch(validateTransfert);

//SEARCH TRANSFERT BY ID AND AUTOMATICALY CHANGE HASTAKEMONEY FIELD TO TRUE
router.route('/search').post(validateTransfertPage);

//SEARCH FOR ALL MONEY THAT HAS BEEN TAKEN AND RENDERS IT
router.route('/all-transferts').get(moneyTaken);

export default router;

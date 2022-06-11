/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const {
	searchTransfertPage,
	validateTransfertPage,
	validateTransfert,
	moneyTaken
} = require('../controllers/moneyGiver');

//RENDER MONEYGIVER USER PAGE
router.route('/search').get(searchTransfertPage);

//ROUTE TO VALIDATE TRANSFERT
router.route('/validate/:id').patch(validateTransfert);

//SEARCH TRANSFERT BY ID AND AUTOMATICALY CHANGE HASTAKEMONEY FIELD TO TRUE
router.route('/search').post(validateTransfertPage);

//SEARCH FOR ALL MONEY THAT HAS BEEN TAKEN AND RENDERS IT 
router.route('/taken').get(moneyTaken);

module.exports = router;

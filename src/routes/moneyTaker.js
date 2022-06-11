const express = require('express');
const router = express.Router();
const { getAllTransferts } = require('../controllers/transfert');
const { MoneyTakerPage, addMoneyTaker } = require('../controllers/moneyTaker');
const { rate } = require('../controllers/converter');

//MODIFY NEW RATE OF MONEY
router.route('/new-rate').patch(rate);

//RENDER MEDIUM ADMIN PAGE
router.route('/dashboard').get(getAllTransferts);

//RENDER MED ADMIN PAGE TO RENDER MONEY TAKER CREATE FORM
router.route('/add-money-taker').get(MoneyTakerPage);
//POST NEW MONEY TAKER AND CREATE NEW ONE INTO DATABASE
router.route('/add-money-taker').post(addMoneyTaker);

module.exports = router;

/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const {
    createTransfert,
    getTransfertForm,
    getConverter,
    getTransfertDetails,
    totalAmountTransfert,
	getChangePasswordPage,
	editPassword
} = require('../controllers/shared');
const {
    editMoneyTaker,
    editMoneyTakerForm,
    getAllMoneyTakers,
    getMoneyTakersDetails,
    deleteMoneyTaker,
    deleteMoneyTakerForm,
} = require('../controllers/moneyTaker');

const {
	deleteForm,
	deleteTransfert,
	editTransfert,
	editForm,
    Convert
} = require('../controllers/shared');


//GET DETAIS FORM THAT WILL SHOW ADDITIONAL INFORMATION OF A  TRANSFERT STORED IN  DATABASE
router.route('/details/:id').get(getTransfertDetails);

//CREATE NEW TRANSFERT INTO DB
router.route('/add-transfert').post( createTransfert);
//RENDER FORM TO POST NEW Transfert In the DATABASE
router.route('/add-transfert').get( getTransfertForm);

//RENDER THE MONEY CONVERTER
router.route('/convertisseur').get( getConverter);
router.route('/convertisseur').post( Convert);

//RENDERS ALL MONEY TAKERS OF THE DATABASE
router.route('/list-money-takers').get(getAllMoneyTakers);

//RENDERS MONEY TAKERS DETAILS
router.route('/money-taker/details/:id').get(getMoneyTakersDetails);

//GET DELETE FORM THAT WILL DELETE MONEYTAKER TO DATABASE ONLY HIGH LEVEL ADMIN CAN DELETE TRANSFERT
//TMONEY TAKER WILL ONLY BE DELETED IF MIDDLEARE CHECKIFHASTAKEMONEY HAS BEEN PASSED
router.route('/delete-money-taker').get(deleteMoneyTakerForm);
router.route('/delete-money-taker/:id').delete(deleteMoneyTaker);

//GET EDIT FORM THAT WILL MODIFY MONEYTAKERS TO DATABASE
router.route('/edit-money-taker').get(editMoneyTakerForm);
router.route('/edit-money-taker/:id').patch(editMoneyTaker);

//RENNDER PAGE TO CALCUL ALL MONEY THAT HAS BEEN TRANSFERED, CAN BE NARROWED WITH QUERY
router.route('/calcul').get(totalAmountTransfert);

//RENDER CHANGE PASSWORD PAGES
router.route('/change-password').get(getChangePasswordPage);
router.route('/change-password').patch(editPassword);

//GET DELETE FORM THAT WILL DELETE TRANSFERT TO DATABASE ONLY HIGH LEVEL ADMIN CAN DELETE TRANSFERT
//TRANSFERT WILL ONLY BE DELETED IF MIDDLEARE CHECKIFHASTAKEMONEY HAS BEEN PASSED
router.route('/delete-form').get(deleteForm);
router.route('/delete-form/:id').delete(deleteTransfert);

//GET EDIT FORM THAT WILL MODIFY TRANSFERT TO DATABASE
router.route('/edit-form').get(editForm);
router.route('/edit-form/:id').patch(editTransfert);

module.exports = router;

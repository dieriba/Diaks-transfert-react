/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();

const {
	getAllTransferts,
} = require('../controllers/transfert');

//RENDERS ALL TRANSFERTS FROM DATABASE ONLY ACCESSIBLE FOR MED ADMIN AND HIGH LEVEL ADMIN
router.route('/dashboard').get(getAllTransferts);



module.exports = router;

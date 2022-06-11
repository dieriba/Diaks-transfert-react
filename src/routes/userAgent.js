const express = require('express');
const router = express.Router();

const {
	getUserAgentTransfert,
	totalAgentTransfert,
} = require('../controllers/userAgent');

//RENDERS AGENT PAGE
router.route('/dashboard').get(getUserAgentTransfert);
router.route('/calcul').get(totalAgentTransfert);
module.exports = router;

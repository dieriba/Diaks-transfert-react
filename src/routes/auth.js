const express = require('express');
const router = express.Router();

const { auth, loginPage, logout } = require('../controllers/auth');


//RENDER LOGIN PAGE
router.route('/login').post(auth);
//Redirect TO USER PAGE IF USER EXIST
router.route('/login').get(loginPage);

//LOGOUT FROM WEBSITE
router.route('/logout').get(logout);

module.exports = router;

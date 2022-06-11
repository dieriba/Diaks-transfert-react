const express = require('express');
const router = express.Router();

const {
	addUser,
	getUserPage,
	deleteFormUser,
	deleteUser,
	editFormUser,
	editUser,
	getUserDetails,
	getAllUsers,
} = require('../controllers/user');

//GET FORM THAT CREATE A NEW USER TO DATABASE
router.route('/add-user').get(getUserPage);
//CREATE USER IN THE DATABASE
router.route('/add-user').post(addUser);

//GET DELETE FORM THAT WILL DELETE TRANSFERT TO DATABASE
router.route('/delete-user').get(deleteFormUser);
//DELETE A GIVEN USER INTO DATABASE ONLY ACCRESSIBLE TO HIGH LEVEL ADMIN
router.route('/delete-user/:id').delete(deleteUser);

//GET EDIT FORM THAT WILL MODIFY USER TO DATABASE
router.route('/edit-user').get(editFormUser);
//EDIT USER INFO INTO DATABASE
router.route('/edit-form/:id').patch(editUser);

//RENDER USER DETAILS PAGE
router.route('/users/details/:id').get(getUserDetails);
//RENDERS ALL CURENT USER USING THE WEB APPLICATION
router.route('/users').get(getAllUsers);

module.exports = router;

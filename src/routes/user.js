import express from 'express';

const router = express.Router();

import {
    addUser,
    deleteUser,
    editUser,
    getAllUsers,
} from '../controllers/user.js';
//CREATE USER IN THE DATABASE
router.route('/add-user').post(addUser);

//DELETE A GIVEN USER INTO DATABASE ONLY ACCRESSIBLE TO HIGH LEVEL ADMIN
router.route('/delete-user/:id').delete(deleteUser);

//EDIT USER INFO INTO DATABASE
router.route('/edit-form/:id').patch(editUser);

//RENDERS ALL CURENT USER USING THE WEB APPLICATION
router.route('/users').get(getAllUsers);

export default router;

import express from 'express';

const router = express.Router();

import { auth } from '../controllers/auth.js';

router.route('/login').post(auth);


export default router;

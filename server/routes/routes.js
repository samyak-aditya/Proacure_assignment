import express from 'express';
import loginUser from '../controllers/login.js';
import {signupUser, verifyEmail}  from '../controllers/signup.js';
import { getUserInfo } from '../controllers/userInfo.js';

const router = express.Router();


router.post('/login', loginUser);

router.post('/signup', signupUser);
router.post('/verification', verifyEmail);
router.get('/userinfo', getUserInfo);

export default router;

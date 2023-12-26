import express from 'express';

import usersRouter from './profile/users.js';
import verificationRouter from './profile/verification.js';
import authRouter from './profile/auth.js';
import ratingRouter from './profile/rating.js';
import statsRouter from './profile/stats.js';

//! create a router
const router = express.Router();

router.use('/users', usersRouter);
router.use('/verification', verificationRouter);
router.use('/auth', authRouter);
router.use('/rating', ratingRouter);
router.use('/stats', statsRouter);

export default router;
import express from 'express';
import intrestsRouter from './intrests/intrests.js';

//! create a router
const router = express.Router();

router.use('/', intrestsRouter);

export default router;
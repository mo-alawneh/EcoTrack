import express from 'express';
import { verifyEmail } from '../../controllers/verification.js';

//! create a router
const router = express.Router();

router.get('/:email', verifyEmail);

export default router;
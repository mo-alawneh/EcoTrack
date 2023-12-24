import express from 'express';
import { login } from '../../controllers/auth.js';
import { createHash } from 'crypto';

//! create a router
const router = express.Router();

router.post('/login', login);

export default router;
import express from 'express';

import { generateUserReport } from '../controllers/report.js';

import authenticateUser from '../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.get('/:username', authenticateUser, generateUserReport);

export default router;
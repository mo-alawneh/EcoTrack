import express from 'express';

import { generateUserReport } from '../controllers/report.js';

//! create a router
const router = express.Router();

router.get('/:username', generateUserReport);

export default router;
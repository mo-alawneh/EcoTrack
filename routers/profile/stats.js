import express from 'express';
import { getTimeStatistics } from '../../controllers/time-statistics.js';
import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.get('/time/:username', getTimeStatistics);

export default router;
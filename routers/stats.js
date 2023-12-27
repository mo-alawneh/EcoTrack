import express from 'express';
import { getUserTimeStatistics, getTimeStatistics } from '../controllers/time-statistics.js';
import { getTopRatedUsers } from '../controllers/rating.js';
import { getTopScoreUsers } from '../controllers/users.js';
import authenticateUser from '../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.get('/time', getTimeStatistics);
router.get('/time/:username', getUserTimeStatistics);
router.get('/rating', getTopRatedUsers);
router.get('/score', getTopScoreUsers);

export default router;
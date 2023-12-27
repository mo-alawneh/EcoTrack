import express from 'express';
import {
    rateUser,
    calculateUserRating,
    getTopRatedUsers
} from '../../controllers/rating.js';
import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.post('/', authenticateUser, rateUser);
router.get('/:username',  authenticateUser, calculateUserRating);

export default router;
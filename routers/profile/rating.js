import express from 'express';
import {
    rateUser,
    calculateUserRating,
    getTopRatedUsers,
    countRatingClasses
} from '../../controllers/rating.js';
import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.post('/', authenticateUser, rateUser);
router.get('/specific/:username',  authenticateUser, calculateUserRating);
router.get('/top', getTopRatedUsers);
router.get('/classes', countRatingClasses); 

export default router;
import express from 'express';
import {
    rateUser,
    calculateUserRating,
    getTopRatedUsers
} from '../controllers/rating.js';

//! create a router
const router = express.Router();

router.post('/', rateUser);
router.get('/:username', calculateUserRating);
router.get('/', getTopRatedUsers);

export default router;
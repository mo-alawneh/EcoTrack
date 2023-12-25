import express from 'express';

import {
    addIntrest,
    getAllUserIntrests,
    getIntrestById,
    deleteIntrest,
    updateUserIntrest,
    search
} from '../../controllers/intrests.js';

//! create a router
const router = express.Router();

router.post('/', addIntrest);
router.get('/:username', getAllUserIntrests);
router.post('/:id', getIntrestById);
router.delete('/:id', deleteIntrest);
router.patch('/:id', updateUserIntrest);
router.patch('/', updateUserIntrest);

export default router;
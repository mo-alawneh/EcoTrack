import express from 'express';

import {
    addIntrest,
    getAllUserIntrests,
    getIntrestById,
    deleteIntrest,
    updateUserIntrest,
    search
} from '../controllers/intrests.js';

import authenticateUser from '../middleware/authenticate.js'; 

//! create a router
const router = express.Router();

router.post('/', authenticateUser, addIntrest);
router.get('/:username', authenticateUser, getAllUserIntrests);
router.post('/:id', authenticateUser, getIntrestById);
router.delete('/:id', authenticateUser, deleteIntrest);
router.patch('/:id', authenticateUser, updateUserIntrest);
router.post('/', authenticateUser, search);

export default router;
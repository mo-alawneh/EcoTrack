import express from 'express';
import {
    getAllUsers,
    getUserByUsername
} from '../controllers/users.js';

//! create a router
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);

export default router;
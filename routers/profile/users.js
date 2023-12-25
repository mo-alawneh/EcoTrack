import express from 'express';
import {
    getAllUsers,
    getUserByUsername,
    registerUser,
    deleteUser,
    updateUserInfo,
    search,
    handleForgetPassword
} from '../../controllers/users.js';

import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.get('/', authenticateUser, getAllUsers);
router.get('/:username', authenticateUser, getUserByUsername);
router.put('/:username', registerUser);
router.delete('/:username', authenticateUser, deleteUser);
router.post('/:username', authenticateUser, updateUserInfo);
router.post('/', authenticateUser, search);
router.patch('/:username', handleForgetPassword);

export default router;
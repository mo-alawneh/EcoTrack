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

//! create a router
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.put('/:username', registerUser);
router.delete('/:username', deleteUser);
router.post('/:username', updateUserInfo);
router.post('/', search);
router.patch('/:username', handleForgetPassword);

export default router;
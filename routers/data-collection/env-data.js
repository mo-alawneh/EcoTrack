import express from 'express';
import {
    addEnvData,
    getAllEnvData,
    getUserEnvData,
    deleteEnvData,
    updateEnvData,
    search,
    storeData
} from '../../controllers/env-data.js';
import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.post('/', authenticateUser, addEnvData);
router.post('/excel-sheet', authenticateUser, storeData);
router.get('/', getAllEnvData);
router.get('/:username', authenticateUser, getUserEnvData);
router.delete('/:id', authenticateUser, deleteEnvData);
router.patch('/:id', authenticateUser, updateEnvData);
router.patch('/', search); //! requires body and post already used :)!

export default router;
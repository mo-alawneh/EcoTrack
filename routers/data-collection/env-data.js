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

//! create a router
const router = express.Router();

router.post('/', addEnvData);
router.post('/excel-sheet', storeData);
router.get('/', getAllEnvData);
router.get('/:username', getUserEnvData);
router.delete('/:id', deleteEnvData);
router.patch('/:id', updateEnvData);
router.patch('/', search); //! requires body and post already used :)!

export default router;
import express from 'express';
import {
    getAllTypes,
    getTypeById,
    addType,
    deleteType,
    updateType,
    search,
    getAllDirtyTypes,
    acceptType,
    rejectType
} from '../../controllers/types.js';

//! create a router
const router = express.Router();

router.get('/', getAllTypes);
router.get('/dirty', getAllDirtyTypes);
router.get('/:id', getTypeById);
router.post('/', addType);
router.delete('/:id', deleteType);
router.post('/:id', updateType);
router.patch('/', search);
router.patch('/acceptance/:id', acceptType);
router.patch('/rejection/:id', rejectType);

export default router;
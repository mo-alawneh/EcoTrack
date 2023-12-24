import express from 'express';
import {
    getAllTypes,
    getTypeById,
    addType,
    deleteType,
    updateType,
    search
} from '../controllers/types.js';

//! create a router
const router = express.Router();

router.get('/', getAllTypes);
router.get('/:id', getTypeById);
router.post('/', addType);
router.delete('/:id', deleteType);
router.post('/:id', updateType);
router.patch('/', search);

export default router;
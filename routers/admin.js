import express from 'express';
import {
    getAllDirtyTypes,
    acceptType,
    rejectType
} from '../controllers/admin.js';

//! create a router
const router = express.Router();

router.get('/', getAllDirtyTypes);
router.patch('/accept/:id', acceptType);
router.patch('/reject/:id', rejectType);

export default router;
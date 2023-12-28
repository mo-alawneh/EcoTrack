import express from 'express';
import {
    getAllTypes,
    getTypeById,
    addType,
    deleteType,
    updateType,
    search,
    getAllDirtyTypes,
    getAllAcceptedTypes,
    acceptType,
    rejectType
} from '../../controllers/types.js';
import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.get('/', authenticateUser, getAllTypes);
router.get('/dirty',  authenticateUser, getAllDirtyTypes);
router.get('/accepted', authenticateUser, getAllAcceptedTypes);
router.get('/:id', authenticateUser, getTypeById);
router.post('/', authenticateUser, addType);
router.delete('/:id', authenticateUser, deleteType);
router.post('/:id', authenticateUser, updateType);
router.patch('/', authenticateUser, search);
router.patch('/acceptance/:id', authenticateUser, acceptType);
router.patch('/rejection/:id', authenticateUser, rejectType);

export default router;
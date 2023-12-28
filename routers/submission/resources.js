import express from 'express';

import { addResource,
        getAllResources,
        getAllUserResources,
        getResourceById,
        deleteResource,
        updateResource,
        search, 
        getRecentResources } from '../../controllers/resources.js';

import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

//! TRADE-OFF: violate methods best-practice vs. long URIs :)
router.post('/', authenticateUser, addResource);
router.get('/', authenticateUser, getAllResources);
router.get('/:username', authenticateUser, getAllUserResources);
router.get('/specific/:id', authenticateUser, getResourceById);
router.delete('/:id', authenticateUser, deleteResource);
router.patch('/:id', authenticateUser, updateResource);
router.patch('/', authenticateUser, search);
router.get('/time/recent', authenticateUser, getRecentResources);

export default router;

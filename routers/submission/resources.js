import express from 'express';

import { addResource,
        getAllResources,
        getAllUserResources,
        getResourceById,
        deleteResource,
        updateResource,
        search} from '../../controllers/resources.js';

//! create a router
const router = express.Router();

//! TRADE-OFF: violate methods best-practice vs. long URIs :)
router.post('/', addResource);
router.get('/', getAllResources);
router.get('/:username', getAllUserResources);
router.post('/:id', getResourceById);
router.delete('/:id', deleteResource);
router.patch('/:id', updateResource);
router.patch('/', search);

export default router;
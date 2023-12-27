import express from 'express';

import { addIssue,
        getAllIssues,
        getAllUserIssues,
        getIssueById,
        deleteIssue,
        updateIssueInfo,
        search,
        getRecentIssues } from '../../controllers/issues.js';

//! create a router
const router = express.Router();

//! TRADE-OFF: violate methods best-practice vs. long URIs :)
router.post('/', addIssue);
router.get('/', getAllIssues);
router.get('/:username', getAllUserIssues);
router.post('/:id', getIssueById);
router.delete('/:id', deleteIssue);
router.patch('/:id', updateIssueInfo);
router.patch('/', search);
router.get('/recent', getRecentIssues);

export default router;
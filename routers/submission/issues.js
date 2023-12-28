import express from 'express';

import { addIssue,
        getAllIssues,
        getAllUserIssues,
        getIssueById,
        deleteIssue,
        updateIssueInfo,
        search,
        getRecentIssues } from '../../controllers/issues.js';

import authenticateUser from '../../middleware/authenticate.js';

//! create a router
const router = express.Router();

//! TRADE-OFF: violate methods best-practice vs. long URIs :)
router.post('/', authenticateUser, addIssue);
router.get('/', authenticateUser, getAllIssues);
router.get('/:username', authenticateUser, getAllUserIssues);
router.get('/specific/:id', authenticateUser, getIssueById);
router.delete('/:id', authenticateUser, deleteIssue);
router.patch('/:id', authenticateUser, updateIssueInfo);
router.patch('/', authenticateUser, search);
router.get('/time/recent', authenticateUser, getRecentIssues);

export default router;

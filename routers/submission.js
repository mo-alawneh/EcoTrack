import express from 'express';
import issuesRouter from './submission/issues.js';
import resourcesRouter from './submission/resources.js';

//! create a router
const router = express.Router();

router.use('/issues', issuesRouter);
router.use('/resources', resourcesRouter);

export default router;
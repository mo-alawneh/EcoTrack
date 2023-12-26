import express from 'express';
import issuesRouter from './submission/issues.js';

//! create a router
const router = express.Router();

router.use('/issues', issuesRouter);
// router.use('/resources', );

export default router;
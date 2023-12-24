import express from 'express';
import typesRouter from './data-collection/types.js';
import envDataRouter from './data-collection/env-data.js';

//! create a router
const router = express.Router();

router.use('/types', typesRouter);
router.use('/env-data', envDataRouter);

export default router;
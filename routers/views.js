import express from 'express';
import { startViews } from '../controllers/views.js';

const router = express.Router();

router.get('/', startViews);

export default router;
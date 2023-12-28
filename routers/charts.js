import express from 'express';
import { startViews } from '../controllers/charts.js';

const router = express.Router();

router.get('/', startViews);

export default router;
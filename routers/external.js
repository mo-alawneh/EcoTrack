import express from 'express';
import { fetchWeather, fetchArticles } from '../controllers/external.js';
import authenticateUser from '../middleware/authenticate.js';

//! create a router
const router = express.Router();

router.use('/weather/:username', authenticateUser, fetchWeather);
router.use('/articles/:topic', authenticateUser, fetchArticles);

export default router;
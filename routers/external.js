import express from 'express';
import { fetchWeather, fetchArticles } from '../controllers/external.js';

//! create a router
const router = express.Router();

router.use('/weather/:username', fetchWeather);
router.use('/articles/:topic', fetchArticles);

export default router;
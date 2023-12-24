import express from 'express';
import {
    storeData
} from '../controllers/excel-sheet.js';

//! create a router
const router = express.Router();

router.post('/', storeData);

export default router;
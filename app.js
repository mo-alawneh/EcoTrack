import express from 'express';
import dotenv from 'dotenv/config';

import usersRouter from './routers/users.js';
import verificationRouter from './routers/verification.js';
import authRouter from './routers/auth.js';
import typesRoyter from './routers/types.js';
import ratingRouter from './routers/rating.js';
import adminRouter from './routers/admin.js';
import envRouter from './routers/env-data.js';
import excelSheetRouter from './routers/excel-sheet.js';

//! app 
const app = express();
const PORT = process.env.PORT || 3000;

//! middleware
app.use(express.json());

//! start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//! routers
app.use('/users', usersRouter);
app.use('/verification', verificationRouter);
app.use('/auth', authRouter);
app.use('/types', typesRoyter);
app.use('/rating', ratingRouter);
app.use('/admin', adminRouter);
app.use('/env-data', envRouter);
app.use('/excel-sheet', excelSheetRouter);
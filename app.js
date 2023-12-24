import express from 'express';
import dotenv from 'dotenv/config';

import profileRouter from './routers/profile.js';
import dataCollectionRouter from './routers/data-collection.js';

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
app.use('/profile', profileRouter);
app.use('/data-collection', dataCollectionRouter);
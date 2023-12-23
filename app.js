import express from 'express';
import dotenv from 'dotenv/config';

import usersRouter from './routers/users.js';

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
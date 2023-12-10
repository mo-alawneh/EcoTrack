import express from 'express';
import dotenv from 'dotenv/config';

//! app 
const app = express();
const PORT = process.env.PORT || 8000;

//! middleware
app.use(express.json());

//! start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config';

//! Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_TOKEN
    }
});

export default transporter;
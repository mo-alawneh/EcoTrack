import CodeGenerator from './CodeGenerator.js';
import EmailSender from '../services/EmailSender.js';
import fs from 'fs';

//! Function to read the HTML content from the file
const readHtmlTemplate = filename => {
    try {
        return fs.readFileSync(filename, 'utf-8');

    } catch (error) {
        console.error('Error reading HTML template:', error);
        return null;
        
    }
};

class EmailVerifer {
    /**
     * @param {string} email 
     */
    static async verifyEmail(email) {
        const verificationCode = CodeGenerator.generateVerificationCode();
        //! Read the HTML content from the file
        const htmlTemplate = readHtmlTemplate('resources\\html\\verification-email.html');

        if (htmlTemplate) {

            const emailOptions = {
                to: email,
                subject: 'Verification Code',
                html: htmlTemplate.replace('{{verificationCode}}', verificationCode)
            };
            EmailSender.sendEmail(emailOptions);

            return verificationCode;
        }
    }
}

export default EmailVerifer;
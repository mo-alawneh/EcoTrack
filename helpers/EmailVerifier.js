import CodeGenerator from './CodeGenerator.js';
import EmailSender from '../services/EmailSender.js';

class EmailVerifer {
    /**
     * @param {string} email 
     */
    static async verifyEmail(email) {
        //! 1- generate a verification code
       const verificationCode = CodeGenerator.generateVerificationCode();
       
       //! 2- send the new password via email
       const emailOptions = {
           to: email,
           subject: 'Verification Code',
           text: `You verification code is ${verificationCode}`
       }
       EmailSender.sendEmail(emailOptions);

       //! return it
       return verificationCode;
   }
}

export default EmailVerifer;
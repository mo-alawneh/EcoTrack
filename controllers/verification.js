import EmailVerifier from '../helpers/EmailVerifier.js';

export const verifyEmail = async (req, res, next) => { 
    const email = req.params.email;
    const verificationCode = await EmailVerifier.verifyEmail(email);

    if (verificationCode) {
        res.status(200).json({verificationCode: verificationCode});

    } else {
        res.status(500).json({message: 'Error during the verification'});

    }
}
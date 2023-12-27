import User from '../models/User.js';
import EmailSender from '../services/EmailSender.js';
import fs from 'fs';

export const getAllUsers = async (req, res, next) => {
    const [users, _] = await User.getAllUsers();
    if (users.length != 0 ) {
        res.status(200).json(users);

    } else {
        res.status(404).json({message: 'There are no users!'});
    }
};

export const getUserByUsername = async (req, res, next) => { 
    const username = req.params.username;
    const [user, _] = await User.getUserByUsername(username);
    if (user.length != 0) {
        res.status(200).json(user[0]);

    } else {
        res.status(404).json({message: 'User not found!'});

    }
};

export const registerUser = async (req, res, next) => {
    try {
        const user = new User(
            req.body.name,
            req.params.username,
            req.body.email,
            req.body.password,
            req.body.birthDate,
            req.body.permission,
            req.body.category,
            req.body.location
        );

        const [result, _] = await user.registerUser();
        res.status(201).json( {message : 'User is registered successfully!'} );

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};

export const deleteUser = async (req, res, next) => { 
    try {
        const username = req.params.username;
        const [result, _] = await User.deleteUser(username);
        res.status(204).json({message : 'User deleted successfully!'});

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};

export const updateUserInfo = async (req, res, next) => { 
    try {
        const username = req.params.username;
        const info = req.body;
        const [result, _] = await User.updateUserInfo(username, info);
        res.status(200).json( {message : 'User info are updated successfully!'} );

    } catch(error) {
        res.status(400).json({ error: error.message });

    }
};

export const search = async (req, res, next) => { 
    const fields = req.body;

    const [users, _] = await User.search(fields);

    if (users.length!= 0) {  
        res.status(200).json(users); 

    } else {
        res.status(404).json({message: 'User not found!'});

    }
}

export const handleForgetPassword = async (req, res, next) => { 
    const username = req.body.username;
    const { email, newPassword } = await User.handleForgetPassword(username);

    //! Function to read the HTML content from the file
    const readHtmlTemplate = filename => {
        try {
            return fs.readFileSync(filename, 'utf-8');

        } catch (error) {
            console.error('Error reading HTML template:', error);
            return null;
            
        }
    };

    //! Read the HTML content from the file
    const htmlTemplate = readHtmlTemplate('resources\\html\\new-password-email.html');

    if (htmlTemplate) {

        const emailOptions = {
            to: email,
            subject: 'New Password',
            html: htmlTemplate.replace('{{newPassword}}', newPassword)
        };
        EmailSender.sendEmail(emailOptions);

    }

    if (email) { //! email not null
        res.status(200).json({message : 'Your new password is on the email!'});

    } else {
        res.status(404).json({message: 'User not found!'});

    }
}

export const getTopScoreUsers = async (req, res, next) => { 
    const [users, _] = await User.getTopScoreUsers();
    res.status(200).json(users);
};
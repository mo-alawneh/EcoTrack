import User from '../models/User.js';
import { WeakPasswordError, AdminCannotBeRemovedError } from '../errors/user.js';

export const getAllUsers = async (req, res, next) => {
    const [users, _] = await User.getAllUsers();
    res.status(200).json(users);
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
        res.status(200).json(user);

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
        res.status(201).json(result);

    } catch (error) {
        if (error instanceof WeakPasswordError) {
            res.status(400).json({ error: error.message });

        } else {
            res.status(409).json({ error: 'Already used username!' });

        }
    }
};

export const deleteUser = async (req, res, next) => { 
    try {
        const username = req.params.username;
        const [result, _] = await User.deleteUser(username);
        res.status(204).json({message : 'User deleted successfully!'});

    } catch (error) {
        if (error instanceof AdminCannotBeRemovedError) { 
            res.status(403).json({ error: 'Admin cannot be removed!' });
        }
    }
};

export const updateUserInfo = async (req, res, next) => { 
    try {
        const username = req.params.username;
        const info = req.body;
        const [result, _] = await User.updateUserInfo(username, info);
        res.status(200).json(result);

    } catch(WeakPasswordError) {
        res.status(400).json({ error: 'Weak password! Please choose a stronger password.' });

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
    const username = req.params.username;
    const [result, _] = await User.handleForgetPassword(username);
    if (result.affectedRows != 0) {
        res.status(200).json({message : 'Your new password is on the email!'});

    } else {
        res.status(404).json({message: 'User not found!'});

    }
}
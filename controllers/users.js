import User from '../models/User.js';

export const getAllUsers = async (req, res, next) => {
    const [users, _] = await User.getAllUsers();
    res.status(200).json(users);
};

export const getUserByUsername = async (req, res, next) => { 
    const username = req.params.username;
    const [user, _] = await User.getUserByUsername(username);
    if (user.length != 0) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found!'});
    }
}
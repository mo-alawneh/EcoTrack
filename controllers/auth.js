import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { AuthKeys } from '../config/auth.js';
import { createHash } from 'crypto';

export const login = async (req, res, next) => { 
    const { username, password } = req.body;

    //! check the username
    const [user, _] = await User.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username!' });

    }

    //! check the password
    const hasedPassword = createHash('sha256').update(password).digest('hex');
    if (hasedPassword != user[0].password) {
        return res.status(401).json({ error: 'Invalid password!' });

    }

    //! generate the token
    const token = jwt.sign({ username: user.username }, AuthKeys.jwtSecretKey , { expiresIn: AuthKeys.jwtExpiresIn });

    //! Send the token in the response
    res.status(200).json({ token });
};
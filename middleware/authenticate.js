import jwt from 'jsonwebtoken';
import { AuthKeys } from '../config/auth.js';
import { revokedTokens } from '../controllers/auth.js';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
    
  }

  if (revokedTokens.has(token)) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  jwt.verify(token, AuthKeys.jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });

    }

    req.user = decoded;
    next();
  });
};

export default authenticateUser;
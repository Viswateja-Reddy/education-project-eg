import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Read Authorization header safely
    const authHeader = req.headers.authorization;

    if (authHeader && typeof authHeader === 'string') {
      const parts = authHeader.split(' ');

      if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        token = parts[1].trim();
      }
    }

    // 2. If token is missing
    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token provided',
      });
    }

    // 3. Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'JWT_SECRET is not configured',
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Fetch user
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    // 6. Attach user and continue
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired',
      });
    }

    return res.status(401).json({
      message: 'Authentication failed',
    });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: insufficient permissions',
      });
    }

    next();
  };
};

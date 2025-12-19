import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', protect, (req, res) => {
  res.status(200).json({
    message: 'Access granted to protected route',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get('/admin-only', protect, authorizeRoles('ADMIN'), (req, res) => {
  res.status(200).json({
    message: 'Access granted to admin-only route',
    role: req.user.role,
  });
});

router.get('/student-only', protect, authorizeRoles('STUDENT'), (req, res) => {
  res.status(200).json({
    message: 'Access granted to student-only route',
    role: req.user.role,
  });
});

router.get(
  '/staff-only',
  protect,
  authorizeRoles('ADMIN', 'SEATING_MANAGER'),
  (req, res) => {
    res.status(200).json({
      message: 'Access granted to staff-only route',
      role: req.user.role,
    });
  }
);

export default router;


import express from 'express';
import { allocateSeating, getExamSeating, getMySeat } from '../controllers/seatingController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/seating/allocate', protect, authorizeRoles('SEATING_MANAGER'), allocateSeating);
router.get('/seating/exam/:examName', protect, authorizeRoles('ADMIN'), getExamSeating);
router.get('/seating/me/:examName', protect, authorizeRoles('STUDENT'), getMySeat);

export default router;

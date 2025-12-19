import express from 'express';
import {
  createCalendarEntry,
  getAllCalendarEntries,
  getStudentCalendar,
  getUnifiedCalendar,
} from '../controllers/academicCalendarController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('ADMIN'), createCalendarEntry);
router.get('/', protect, authorizeRoles('ADMIN'), getAllCalendarEntries);
router.get('/student', protect, authorizeRoles('STUDENT'), getStudentCalendar);
router.get('/all', protect, authorizeRoles('ADMIN', 'STUDENT'), getUnifiedCalendar);

export default router;

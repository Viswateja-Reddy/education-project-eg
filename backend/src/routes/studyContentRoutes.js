import express from 'express';
import {
  createStudyContent,
  getAllStudyContent,
  getStudentStudyContent,
} from '../controllers/studyContentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('ADMIN'), createStudyContent);
router.get('/', protect, authorizeRoles('ADMIN'), getAllStudyContent);
router.get('/student', protect, authorizeRoles('STUDENT'), getStudentStudyContent);

export default router;

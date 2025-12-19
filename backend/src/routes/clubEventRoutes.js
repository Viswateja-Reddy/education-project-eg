import express from 'express';
import {
  createClubEvent,
  getMyClubEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getApprovedEvents,
} from '../controllers/clubEventController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('CLUB_COORDINATOR'), createClubEvent);
router.get('/my', protect, authorizeRoles('CLUB_COORDINATOR'), getMyClubEvents);
router.get('/pending', protect, authorizeRoles('ADMIN'), getPendingEvents);
router.put('/:id/approve', protect, authorizeRoles('ADMIN'), approveEvent);
router.put('/:id/reject', protect, authorizeRoles('ADMIN'), rejectEvent);
router.get('/approved', protect, authorizeRoles('STUDENT'), getApprovedEvents);

export default router;

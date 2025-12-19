import express from 'express';
import { createHallTicket, getMyHallTicket, downloadMyHallTicketPDF } from '../controllers/hallTicketController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/hall-tickets', protect, authorizeRoles('ADMIN'), createHallTicket);
router.get('/hall-tickets/me', protect, authorizeRoles('STUDENT'), getMyHallTicket);
router.get('/hall-tickets/me/pdf', protect, authorizeRoles('STUDENT'), downloadMyHallTicketPDF);

export default router;

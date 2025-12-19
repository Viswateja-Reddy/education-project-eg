import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import testProtectedRoutes from './routes/testProtectedRoutes.js';
import hallTicketRoutes from './routes/hallTicketRoutes.js';
import seatingRoutes from './routes/seatingRoutes.js';
import clubEventRoutes from './routes/clubEventRoutes.js';
import academicCalendarRoutes from './routes/academicCalendarRoutes.js';
import studyContentRoutes from './routes/studyContentRoutes.js';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected test routes
app.use('/api', testProtectedRoutes);

// Hall ticket routes
app.use('/api', hallTicketRoutes);

// Seating routes
app.use('/api', seatingRoutes);

// Club event routes
app.use('/api/club-events', clubEventRoutes);

// Academic calendar routes
app.use('/api/calendar', academicCalendarRoutes);

// Study content routes
app.use('/api/study-content', studyContentRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;

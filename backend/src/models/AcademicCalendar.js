import mongoose from 'mongoose';

const academicCalendarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ['ACADEMIC', 'EXAM', 'HOLIDAY'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

academicCalendarSchema.index({ eventDate: 1 });

const AcademicCalendar = mongoose.model('AcademicCalendar', academicCalendarSchema);

export default AcademicCalendar;

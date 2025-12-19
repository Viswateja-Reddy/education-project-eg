import mongoose from 'mongoose';

const seatAllocationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamRoom',
    required: true,
  },
  benchNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  seatNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  allocatedAt: {
    type: Date,
    default: Date.now,
  },
});

seatAllocationSchema.index({ studentId: 1, examName: 1 }, { unique: true });
seatAllocationSchema.index(
  { examName: 1, roomId: 1, benchNumber: 1, seatNumber: 1 },
  { unique: true }
);

const SeatAllocation = mongoose.model('SeatAllocation', seatAllocationSchema);

export default SeatAllocation;

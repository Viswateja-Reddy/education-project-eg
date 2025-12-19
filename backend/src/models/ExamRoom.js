import mongoose from 'mongoose';

const examRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  totalBenches: {
    type: Number,
    required: true,
    min: 1,
  },
  seatsPerBench: {
    type: Number,
    required: true,
    min: 1,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

examRoomSchema.pre('save', function (next) {
  if (this.isModified('totalBenches') || this.isModified('seatsPerBench') || this.isNew) {
    this.totalSeats = this.totalBenches * this.seatsPerBench;
  }
  next();
});

const ExamRoom = mongoose.model('ExamRoom', examRoomSchema);

export default ExamRoom;

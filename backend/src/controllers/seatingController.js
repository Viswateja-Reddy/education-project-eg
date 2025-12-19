import User from '../models/User.js';
import ExamRoom from '../models/ExamRoom.js';
import SeatAllocation from '../models/SeatAllocation.js';
import { allocateSeats } from '../services/seatingAllocator.js';

export const allocateSeating = async (req, res) => {
  try {
    const { examName } = req.body;

    if (!examName) {
      return res.status(400).json({
        message: 'examName is required',
      });
    }

    const existingAllocations = await SeatAllocation.find({ examName });

    if (existingAllocations && existingAllocations.length > 0) {
      return res.status(400).json({
        message: 'Seating has already been allocated for this exam',
      });
    }

    const students = await User.find({ role: 'STUDENT' }).select('_id name');
    const rooms = await ExamRoom.find({});

    if (!students || students.length === 0) {
      return res.status(400).json({
        message: 'No students found to allocate seats',
      });
    }

    if (!rooms || rooms.length === 0) {
      return res.status(400).json({
        message: 'No exam rooms available for seating allocation',
      });
    }

    const allocationsData = allocateSeats({
      examName,
      students,
      rooms,
      existingAllocations: [],
    });

    const createdAllocations = await SeatAllocation.insertMany(
      allocationsData.map((allocation) => ({
        ...allocation,
        allocatedAt: new Date(),
      }))
    );

    const roomsUsed = Array.from(
      new Set(createdAllocations.map((allocation) => String(allocation.roomId)))
    );

    return res.status(201).json({
      message: 'Seating allocated successfully',
      examName,
      totalStudents: students.length,
      totalAllocated: createdAllocations.length,
      roomsUsed,
    });
  } catch (error) {
    if (error && error.message && error.message.includes('Not enough seats')) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Server error while allocating seating',
    });
  }
};

export const getExamSeating = async (req, res) => {
  try {
    const { examName } = req.params;

    if (!examName) {
      return res.status(400).json({
        message: 'examName is required',
      });
    }

    const allocations = await SeatAllocation.find({ examName })
      .populate('studentId', 'name email')
      .populate('roomId', 'roomName');

    return res.status(200).json({
      examName,
      allocations,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching exam seating',
    });
  }
};

export const getMySeat = async (req, res) => {
  try {
    const { examName } = req.params;

    if (!examName) {
      return res.status(400).json({
        message: 'examName is required',
      });
    }

    const studentId = req.user._id;

    const allocation = await SeatAllocation.findOne({ examName, studentId }).populate(
      'roomId',
      'roomName'
    );

    if (!allocation) {
      return res.status(200).json({
        message: 'No seat allocated for this exam',
        allocation: null,
      });
    }

    return res.status(200).json({
      allocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching seat allocation',
    });
  }
};

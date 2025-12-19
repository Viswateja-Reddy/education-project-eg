import AcademicCalendar from '../models/AcademicCalendar.js';
import ClubEvent from '../models/ClubEvent.js';

export const createCalendarEntry = async (req, res) => {
  try {
    const { title, description, eventDate, eventType } = req.body;

    if (!title || !description || !eventDate || !eventType) {
      return res.status(400).json({
        message: 'Please provide all required fields: title, description, eventDate, eventType',
      });
    }

    const calendarEntry = await AcademicCalendar.create({
      title,
      description,
      eventDate,
      eventType,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: 'Calendar entry created successfully',
      calendarEntry,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while creating calendar entry',
    });
  }
};

export const getAllCalendarEntries = async (req, res) => {
  try {
    const entries = await AcademicCalendar.find({}).sort({ eventDate: 1 });

    return res.status(200).json({
      entries,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching calendar entries',
    });
  }
};

export const getStudentCalendar = async (req, res) => {
  try {
    const entries = await AcademicCalendar.find({}).sort({ eventDate: 1 });

    return res.status(200).json({
      entries,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching calendar entries',
    });
  }
};

export const getUnifiedCalendar = async (req, res) => {
  try {
    const academicEntries = await AcademicCalendar.find({}).sort({ eventDate: 1 });
    const clubEvents = await ClubEvent.find({ status: 'APPROVED' })
      .populate('club', 'name')
      .sort({ eventDate: 1 });

    const normalizedAcademic = academicEntries.map((entry) => ({
      id: entry._id.toString(),
      title: entry.title,
      description: entry.description,
      eventDate: entry.eventDate,
      eventType: entry.eventType,
      source: 'ACADEMIC',
    }));

    const normalizedClub = clubEvents.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,
      eventType: 'CLUB_EVENT',
      source: 'CLUB',
    }));

    const merged = [...normalizedAcademic, ...normalizedClub].sort((a, b) => {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });

    return res.status(200).json({
      entries: merged,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching unified calendar',
    });
  }
};

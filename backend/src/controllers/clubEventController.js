import ClubEvent from '../models/ClubEvent.js';
import Club from '../models/Club.js';


export const createClubEvent = async (req, res) => {
  try {
    const { club, title, description, eventDate, eventTime, venue } = req.body;

    if (!club || !title || !description || !eventDate || !eventTime || !venue) {
      return res.status(400).json({
        message: 'Please provide all required fields: club, title, description, eventDate, eventTime, venue',
      });
    }

    const clubEvent = await ClubEvent.create({
      club,
      title,
      description,
      eventDate,
      eventTime,
      venue,
      status: 'PENDING',
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: 'Club event created successfully',
      clubEvent,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while creating club event',
    });
  }
};

export const getMyClubEvents = async (req, res) => {
  try {
    const events = await ClubEvent.find({ createdBy: req.user._id })
      .populate('club', 'name')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching club events',
    });
  }
};

export const getPendingEvents = async (req, res) => {
  try {
    const events = await ClubEvent.find({ status: 'PENDING' })
      .populate('club', 'name')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching pending events',
    });
  }
};

export const approveEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await ClubEvent.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    if (event.status !== 'PENDING') {
      return res.status(400).json({
        message: 'Event has already been reviewed',
      });
    }

    event.status = 'APPROVED';
    event.reviewedBy = req.user._id;
    event.reviewedAt = new Date();

    await event.save();

    return res.status(200).json({
      message: 'Event approved successfully',
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while approving event',
    });
  }
};

export const rejectEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await ClubEvent.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    if (event.status !== 'PENDING') {
      return res.status(400).json({
        message: 'Event has already been reviewed',
      });
    }

    event.status = 'REJECTED';
    event.reviewedBy = req.user._id;
    event.reviewedAt = new Date();

    await event.save();

    return res.status(200).json({
      message: 'Event rejected successfully',
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while rejecting event',
    });
  }
};

export const getApprovedEvents = async (req, res) => {
  try {
    const events = await ClubEvent.find({ status: 'APPROVED' })
      .populate('club', 'name')
      .sort({ eventDate: 1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching approved events',
    });
  }
};

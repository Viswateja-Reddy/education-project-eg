import StudyContent from '../models/StudyContent.js';

export const createStudyContent = async (req, res) => {
  try {
    const { subject, unit, mindMap, references } = req.body;

    if (!subject || !unit || !mindMap) {
      return res.status(400).json({
        message: 'Please provide all required fields: subject, unit, mindMap',
      });
    }

    const studyContent = await StudyContent.create({
      subject,
      unit,
      mindMap,
      references: references || [],
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: 'Study content created successfully',
      studyContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while creating study content',
    });
  }
};

export const getAllStudyContent = async (req, res) => {
  try {
    const studyContent = await StudyContent.find({}).sort({ subject: 1, unit: 1 });

    return res.status(200).json({
      studyContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching study content',
    });
  }
};

export const getStudentStudyContent = async (req, res) => {
  try {
    const studyContent = await StudyContent.find({}).sort({ subject: 1, unit: 1 });

    return res.status(200).json({
      studyContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching study content',
    });
  }
};

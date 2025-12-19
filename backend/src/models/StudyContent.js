import mongoose from 'mongoose';

const studyContentSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    mindMap: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    references: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudyContent = mongoose.model('StudyContent', studyContentSchema);

export default StudyContent;

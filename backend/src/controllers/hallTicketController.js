import HallTicket from '../models/HallTicket.js';
import User from '../models/User.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export const createHallTicket = async (req, res) => {
  try {
    const { studentId, examName, examDate, examTime, venue, seatNumber } = req.body;

    if (!studentId || !examName || !examDate || !examTime || !venue || !seatNumber) {
      return res.status(400).json({
        message: 'Please provide all required fields: studentId, examName, examDate, examTime, venue, seatNumber',
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    if (student.role !== 'STUDENT') {
      return res.status(400).json({
        message: 'Hall tickets can only be created for users with STUDENT role',
      });
    }

    const existingTicket = await HallTicket.findOne({
      studentId,
      examName,
    });

    if (existingTicket) {
      return res.status(400).json({
        message: 'Hall ticket for this student and exam already exists',
      });
    }

    const hallTicket = await HallTicket.create({
      studentId,
      examName,
      examDate,
      examTime,
      venue,
      seatNumber,
      generatedBy: req.user._id,
    });

    return res.status(201).json({
      message: 'Hall ticket created successfully',
      hallTicket,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while creating hall ticket',
    });
  }
};

export const getMyHallTicket = async (req, res) => {
  try {
    const studentId = req.user._id;

    const hallTicket = await HallTicket.findOne({ studentId });

    if (!hallTicket) {
      return res.status(200).json({
        message: 'No hall ticket found for this student',
        hallTicket: null,
      });
    }

    return res.status(200).json({
      hallTicket,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching hall ticket',
    });
  }
};

export const downloadMyHallTicketPDF = async (req, res) => {
  try {
    const studentId = req.user._id;

    const hallTicket = await HallTicket.findOne({ studentId }).populate('studentId', 'name');

    if (!hallTicket) {
      return res.status(404).json({
        message: 'No hall ticket found for this student',
      });
    }

    const qrPayload = {
      studentId: hallTicket.studentId._id.toString(),
      examName: hallTicket.examName,
      seatNumber: hallTicket.seatNumber,
    };

    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));

    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
    const qrBuffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="hall-ticket.pdf"');

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc.fontSize(20).text('Hall Ticket', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Student Name: ${hallTicket.studentId.name}`);
    doc.text(`Exam Name: ${hallTicket.examName}`);
    doc.text(`Exam Date: ${new Date(hallTicket.examDate).toLocaleDateString()}`);
    doc.text(`Exam Time: ${hallTicket.examTime}`);
    doc.text(`Venue: ${hallTicket.venue}`);
    doc.text(`Seat Number: ${hallTicket.seatNumber}`);

    doc.moveDown();
    doc.text('Scan the QR code below for verification:', { marginTop: 20 });

    doc.moveDown();
    doc.image(qrBuffer, {
      fit: [120, 120],
      align: 'left',
    });

    doc.end();
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        message: 'Server error while generating hall ticket PDF',
      });
    }
  }
};

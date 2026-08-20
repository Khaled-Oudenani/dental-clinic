import ContactMessage from '../models/ContactMessage.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

// @desc    إرسال رسالة تواصل جديدة
// @route   POST /api/contact
// @access  عام
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const contactMessage = await ContactMessage.create({ name, email, message });

  res.status(201).json({ success: true, data: contactMessage });
});

// @desc    عرض كل رسائل التواصل
// @route   GET /api/contact
// @access  خاص (Admin)
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: messages.length, data: messages });
});

// @desc    تعليم رسالة كمقروءة
// @route   PATCH /api/contact/:id/read
// @access  خاص (Admin)
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!message) throw new ApiError(404, 'الرسالة غير موجودة');

  res.status(200).json({ success: true, data: message });
});
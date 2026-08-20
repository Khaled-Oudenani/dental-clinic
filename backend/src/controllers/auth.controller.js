import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    تسجيل دخول الأدمن
// @route   POST /api/auth/login
// @access  عام
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'البريد الإلكتروني وكلمة المرور مطلوبان');
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'بيانات الدخول غير صحيحة');
  }

  const token = generateToken(admin._id);

  res.status(200).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
});

// @desc    بيانات الأدمن المسجل دخوله حالياً (يعتمد على middleware "protect")
// @route   GET /api/auth/me
// @access  خاص (Admin)
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
});
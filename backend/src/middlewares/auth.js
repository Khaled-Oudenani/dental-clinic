import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

// يتحقق من وجود JWT صالح فـ header (Authorization: Bearer <token>)
// ويربط حساب الأدمن بـ req.admin باش تقدر تستعملو الـ controllers الجاية
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'غير مصرح لك بالدخول، الرجاء تسجيل الدخول');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, 'رمز الدخول غير صالح أو منتهي الصلاحية');
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    throw new ApiError(401, 'الحساب المرتبط بهذا الرمز غير موجود');
  }

  req.admin = admin;
  next();
});
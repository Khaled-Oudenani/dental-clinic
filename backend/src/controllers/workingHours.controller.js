import WorkingHours from '../models/WorkingHours.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    عرض أوقات العمل لكل أيام الأسبوع
// @route   GET /api/working-hours
// @access  عام
export const getWorkingHours = asyncHandler(async (req, res) => {
  const workingHours = await WorkingHours.find().sort({ dayOfWeek: 1 });
  res.status(200).json({ success: true, data: workingHours });
});

// @desc    تعديل أوقات العمل ليوم معين (ينشئه إذا ما كانش موجود)
// @route   PUT /api/working-hours/:dayOfWeek
// @access  خاص (Admin)
export const updateWorkingHours = asyncHandler(async (req, res) => {
  const dayOfWeek = Number(req.params.dayOfWeek);

  if (Number.isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new ApiError(400, 'رقم اليوم يجب أن يكون بين 0 و 6');
  }

  const updated = await WorkingHours.findOneAndUpdate(
    { dayOfWeek },
    { ...req.body, dayOfWeek },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: updated });
});
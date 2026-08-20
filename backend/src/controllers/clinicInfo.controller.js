import ClinicInfo from '../models/ClinicInfo.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    عرض معلومات العيادة
// @route   GET /api/clinic-info
// @access  عام
export const getClinicInfo = asyncHandler(async (req, res) => {
  const info = await ClinicInfo.findOne();
  res.status(200).json({ success: true, data: info });
});

// @desc    تعديل معلومات العيادة (document واحد فقط - upsert)
// @route   PUT /api/clinic-info
// @access  خاص (Admin)
export const updateClinicInfo = asyncHandler(async (req, res) => {
  const info = await ClinicInfo.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: info });
});
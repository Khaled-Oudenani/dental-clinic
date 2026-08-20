import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import generateAvailableSlots from '../utils/generateAvailableSlots.js';

// @desc    عرض الأوقات المتاحة ليوم وخدمة معينين (الخطوة 2 في صفحة الحجز)
// @route   GET /api/appointments/available-slots?date=2026-08-25&serviceId=...
// @access  عام
export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date, serviceId } = req.query;

  if (!date || !serviceId) {
    throw new ApiError(400, 'التاريخ والخدمة مطلوبان');
  }

  const slots = await generateAvailableSlots(date, serviceId);
  res.status(200).json({ success: true, data: slots });
});

// @desc    حجز موعد جديد (الخطوة 3 في صفحة الحجز)
// @route   POST /api/appointments
// @access  عام
export const createAppointment = asyncHandler(async (req, res) => {
  const { patientName, phone, notes, service, date, timeSlot } = req.body;

  const serviceExists = await Service.findById(service);
  if (!serviceExists) throw new ApiError(404, 'الخدمة المختارة غير موجودة');

  try {
    const appointment = await Appointment.create({
      patientName,
      phone,
      notes,
      service,
      date,
      timeSlot,
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    // خطأ 11000 = تعارض على الـ index الفريد (date + timeSlot) => الوقت محجوز مسبقاً
    if (error.code === 11000) {
      throw new ApiError(409, 'هذا الموعد محجوز مسبقاً، الرجاء اختيار وقت آخر');
    }
    throw error;
  }
});

// @desc    عرض كل الحجوزات (فلترة اختيارية حسب الحالة أو التاريخ)
// @route   GET /api/appointments?status=pending&date=2026-08-20
// @access  خاص (Admin)
export const getAppointments = asyncHandler(async (req, res) => {
  const { status, date } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    filter.date = { $gte: start, $lt: end };
  }

  const appointments = await Appointment.find(filter)
    .populate('service', 'name price durationMinutes')
    .sort({ date: 1, timeSlot: 1 });

  res.status(200).json({ success: true, count: appointments.length, data: appointments });
});

// @desc    تغيير حالة الحجز (تأكيد / إلغاء / إكمال)
// @route   PATCH /api/appointments/:id/status
// @access  خاص (Admin)
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'حالة الحجز غير صالحة');
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!appointment) throw new ApiError(404, 'الحجز غير موجود');

  res.status(200).json({ success: true, data: appointment });
});

// @desc    حذف حجز
// @route   DELETE /api/appointments/:id
// @access  خاص (Admin)
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) throw new ApiError(404, 'الحجز غير موجود');

  res.status(200).json({ success: true, message: 'تم حذف الحجز' });
});
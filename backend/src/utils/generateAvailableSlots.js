import Appointment from '../models/Appointment.js';
import WorkingHours from '../models/WorkingHours.js';
import Service from '../models/Service.js';

const SLOT_INTERVAL_MINUTES = 30; // الفاصل الزمني بين كل موعد ممكن والآخر

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (totalMinutes) => {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * يحسب الأوقات المتاحة ليوم معين وخدمة معينة، بالاعتماد على:
 * - أوقات عمل العيادة لذلك اليوم (WorkingHours)
 * - مدة الخدمة المختارة (Service.durationMinutes)
 * - الحجوزات الموجودة مسبقاً لنفس اليوم (باستثناء الملغاة)
 *
 * @param {Date|string} date - اليوم المطلوب
 * @param {string} serviceId - معرّف الخدمة
 * @returns {Promise<string[]>} قائمة الأوقات المتاحة بصيغة "HH:mm"
 */
const generateAvailableSlots = async (date, serviceId) => {
  const targetDate = new Date(date);
  const dayOfWeek = targetDate.getDay(); // 0 = الأحد ... 6 = السبت

  const [workingHours, service] = await Promise.all([
    WorkingHours.findOne({ dayOfWeek }),
    Service.findById(serviceId),
  ]);

  if (!workingHours || !workingHours.isOpen) return []; // العيادة مغلقة هذا اليوم
  if (!service) return [];

  const serviceDuration = service.durationMinutes;
  const openMinutes = timeToMinutes(workingHours.openTime);
  const closeMinutes = timeToMinutes(workingHours.closeTime);

  // نطاق اليوم كامل (من 00:00 إلى 23:59) لجلب حجوزاته
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAppointments = await Appointment.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: 'cancelled' },
  }).populate('service', 'durationMinutes');

  // نحول كل حجز إلى نطاق [بداية، نهاية] بالدقائق باش نسهّل فحص التداخل
  const bookedRanges = existingAppointments.map((appt) => {
    const start = timeToMinutes(appt.timeSlot);
    const duration = appt.service?.durationMinutes || SLOT_INTERVAL_MINUTES;
    return { start, end: start + duration };
  });

  // إذا كان اليوم المطلوب هو اليوم الحالي، نستثني الأوقات لي فاتت
  const now = new Date();
  const isToday = targetDate.toDateString() === now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const availableSlots = [];

  for (
    let slotStart = openMinutes;
    slotStart + serviceDuration <= closeMinutes;
    slotStart += SLOT_INTERVAL_MINUTES
  ) {
    if (isToday && slotStart <= nowMinutes) continue;

    const slotEnd = slotStart + serviceDuration;

    const hasOverlap = bookedRanges.some(
      (range) => slotStart < range.end && range.start < slotEnd
    );

    if (!hasOverlap) {
      availableSlots.push(minutesToTime(slotStart));
    }
  }

  return availableSlots;
};

export default generateAvailableSlots;
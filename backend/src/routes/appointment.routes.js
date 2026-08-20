import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAvailableSlots,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointment.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// ملاحظة: "/available-slots" لازم يتحط قبل "/:id" باش Express ما يفهمهاش
// "available-slots" على أنها قيمة لـ :id فأي route فيها معرّف
router.get('/available-slots', getAvailableSlots);

router.post('/', createAppointment);
router.get('/', protect, getAppointments);
router.patch('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);

export default router;
import express from 'express';
import authRoutes from './auth.routes.js';
import serviceRoutes from './service.routes.js';
import appointmentRoutes from './appointment.routes.js';
import workingHoursRoutes from './workingHours.routes.js';
import clinicInfoRoutes from './clinicInfo.routes.js';
import contactRoutes from './contact.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/working-hours', workingHoursRoutes);
router.use('/clinic-info', clinicInfoRoutes);
router.use('/contact', contactRoutes);

export default router;
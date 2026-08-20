import express from 'express';
import { getClinicInfo, updateClinicInfo } from '../controllers/clinicInfo.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getClinicInfo);
router.put('/', protect, updateClinicInfo);

export default router;
import express from 'express';
import { getWorkingHours, updateWorkingHours } from '../controllers/workingHours.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getWorkingHours);
router.put('/:dayOfWeek', protect, updateWorkingHours);

export default router;
import express from 'express';
import { createMessage, getMessages, markAsRead } from '../controllers/contact.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);

export default router;
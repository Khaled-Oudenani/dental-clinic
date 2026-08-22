import express from 'express';
import multer from 'multer';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  uploadServiceImage,
} from '../controllers/service.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// multer in-memory storage for temporary upload to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

// protected route to upload an image via server (signed upload)
router.post('/upload', protect, upload.single('image'), uploadServiceImage);

export default router;
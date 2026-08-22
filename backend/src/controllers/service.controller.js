// import Service from '../models/Service.js';
// import asyncHandler from '../utils/asyncHandler.js';
// import ApiError from '../utils/ApiError.js';

// // @desc    عرض كل الخدمات (مع إمكانية الفلترة حسب التصنيف)
// // @route   GET /api/services?category=تجميلي
// // @access  عام
// export const getServices = asyncHandler(async (req, res) => {
//   const { category } = req.query;

//   const filter = { isActive: true };
//   if (category) filter.category = category;

//   const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });

//   res.status(200).json({ success: true, count: services.length, data: services });
// });

// // @desc    عرض خدمة واحدة
// // @route   GET /api/services/:id
// // @access  عام
// export const getServiceById = asyncHandler(async (req, res) => {
//   const service = await Service.findById(req.params.id);
//   if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

//   res.status(200).json({ success: true, data: service });
// });

// // @desc    إضافة خدمة جديدة
// // @route   POST /api/services
// // @access  خاص (Admin)
// export const createService = asyncHandler(async (req, res) => {
//   const service = await Service.create(req.body);
//   res.status(201).json({ success: true, data: service });
// });

// // @desc    تعديل خدمة
// // @route   PUT /api/services/:id
// // @access  خاص (Admin)
// export const updateService = asyncHandler(async (req, res) => {
//   const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

//   res.status(200).json({ success: true, data: service });
// });

// // @desc    حذف خدمة
// // @route   DELETE /api/services/:id
// // @access  خاص (Admin)
// export const deleteService = asyncHandler(async (req, res) => {
//   const service = await Service.findByIdAndDelete(req.params.id);
//   if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

//   res.status(200).json({ success: true, message: 'تم حذف الخدمة' });
// });


// new 

import Service from '../models/Service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import cloudinary from '../utils/cloudinary.js';

// @desc    عرض كل الخدمات (مع إمكانية الفلترة حسب التصنيف)
// @route   GET /api/services?category=تجميلي&includeInactive=true
// @access  عام (includeInactive تُستعمل من لوحة التحكم باش الأدمن يشوف الخدمات المعطّلة أيضاً)
export const getServices = asyncHandler(async (req, res) => {
  const { category, includeInactive } = req.query;

  const filter = {};
  if (!includeInactive) filter.isActive = true;
  if (category) filter.category = category;

  const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });

  res.status(200).json({ success: true, count: services.length, data: services });
});

// @desc    عرض خدمة واحدة
// @route   GET /api/services/:id
// @access  عام
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

  res.status(200).json({ success: true, data: service });
});

// @desc    إضافة خدمة جديدة
// @route   POST /api/services
// @access  خاص (Admin)
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

// @desc    تعديل خدمة
// @route   PUT /api/services/:id
// @access  خاص (Admin)
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

  res.status(200).json({ success: true, data: service });
});

// @desc    رفع صورة خدمة عبر الخادم (ترجع رابط public_id)
// @route   POST /api/services/upload
// @access  خاص (Admin)
export const uploadServiceImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'الملف مطلوب');

  const streamUpload = (buffer) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'services' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(buffer);
    });

  const result = await streamUpload(req.file.buffer);

  res.status(201).json({
    success: true,
    data: {
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
    },
  });
});

// @desc    حذف خدمة
// @route   DELETE /api/services/:id
// @access  خاص (Admin)
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'الخدمة غير موجودة');

  // إذا كانت الصورة مرفوعة على Cloudinary، نحاول حذفها أولاً
  if (service.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(service.imagePublicId);
    } catch (err) {
      // لا نفرمل الحذف المحلي في حال فشل حذف الصورة، نكتفي بتسجيل الخطأ
      console.error('Cloudinary deletion error:', err);
    }
  }

  await Service.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'تم حذف الخدمة' });
});
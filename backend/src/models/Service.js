import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم الخدمة مطلوب'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['عام', 'تجميلي', 'جراحي', 'أطفال'],
      required: [true, 'تصنيف الخدمة مطلوب'],
    },
    price: {
      type: Number,
      min: 0,
      default: null, // null = السعر "يحدد بعد الفحص" (مثال: التقويم)
    },
    priceLabel: {
      type: String,
      default: 'ابتداءً من',
    },
    durationMinutes: {
      type: Number,
      required: true,
      default: 30, // تُستخدم لاحقاً في حساب الأوقات المتاحة بصفحة الحجز
    },
    icon: {
      type: String, // اسم أيقونة Material Symbols، مثال: dentistry, auto_awesome
      default: 'dentistry',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // للتحكم في ترتيب ظهور الخدمات
    },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
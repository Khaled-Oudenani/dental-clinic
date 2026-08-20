import mongoose from 'mongoose';

const workingHoursSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: Number, // 0 = الأحد ... 6 = السبت
      required: true,
      unique: true,
      min: 0,
      max: 6,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    openTime: {
      type: String, // "09:00"
      default: '09:00',
    },
    closeTime: {
      type: String, // "20:00"
      default: '20:00',
    },
  },
  { timestamps: true }
);

export default mongoose.model('WorkingHours', workingHoursSchema);
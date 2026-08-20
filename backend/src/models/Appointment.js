import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'اسم المريض مطلوب'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'رقم الهاتف مطلوب'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'الخدمة مطلوبة'],
    },
    date: {
      type: Date,
      required: [true, 'تاريخ الموعد مطلوب'],
    },
    timeSlot: {
      type: String, // مثال: "11:30" - يُستخدم مع date لمنع الحجز المزدوج
      required: [true, 'وقت الموعد مطلوب'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// يمنع حجز نفس اليوم ونفس الوقت مرتين على مستوى قاعدة البيانات
// (partialFilterExpression يتجاهل الحجوزات الملغاة، باش يقدر حد آخر ياخذ نفس الموعد)
appointmentSchema.index(
  { date: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'confirmed', 'completed'] } },
  }
);

export default mongoose.model('Appointment', appointmentSchema);
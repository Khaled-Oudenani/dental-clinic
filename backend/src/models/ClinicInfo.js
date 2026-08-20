import mongoose from 'mongoose';

// ملاحظة: هذا الموديل يُستعمل كـ "document واحد فقط" (singleton) —
// عند إنشاء الـ controller غادي نستعمل findOneAndUpdate({}, data, { upsert: true })
// باش نضمن ما يتكررش أكثر من سجل واحد لمعلومات العيادة.
const clinicInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Lumina Dental',
    },
    phone: String,
    whatsapp: String,
    email: String,
    address: String,
    mapLat: Number,
    mapLng: Number,
    socialLinks: {
      facebook: String,
      instagram: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ClinicInfo', clinicInfoSchema);
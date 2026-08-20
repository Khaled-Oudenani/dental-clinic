import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import WorkingHours from '../models/WorkingHours.js';
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '1.0.0.1']);

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ لازم تحط ADMIN_NAME و ADMIN_EMAIL و ADMIN_PASSWORD فـ .env');
    return;
  }

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('ℹ️  حساب الأدمن موجود مسبقاً، تم التجاوز');
    return;
  }

  await Admin.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD, // يتشفر أوتوماتيكياً بفضل pre('save') الموجودة فـ الموديل
  });

  console.log(`✅ تم إنشاء حساب الأدمن: ${ADMIN_EMAIL}`);
};

// مطابقة لجدول أوقات العمل الموجود فتصميم Stitch (صفحة اتصل بنا)
const defaultWorkingHours = [
  { dayOfWeek: 0, isOpen: true, openTime: '09:00', closeTime: '20:00' }, // الأحد
  { dayOfWeek: 1, isOpen: true, openTime: '09:00', closeTime: '20:00' }, // الاثنين
  { dayOfWeek: 2, isOpen: true, openTime: '09:00', closeTime: '20:00' }, // الثلاثاء
  { dayOfWeek: 3, isOpen: true, openTime: '09:00', closeTime: '20:00' }, // الأربعاء
  { dayOfWeek: 4, isOpen: true, openTime: '09:00', closeTime: '20:00' }, // الخميس
  { dayOfWeek: 5, isOpen: true, openTime: '10:00', closeTime: '16:00' }, // الجمعة
  { dayOfWeek: 6, isOpen: false, openTime: '09:00', closeTime: '20:00' }, // السبت (مغلق)
];

const seedWorkingHours = async () => {
  const count = await WorkingHours.countDocuments();
  if (count > 0) {
    console.log('ℹ️  أوقات العمل موجودة مسبقاً، تم التجاوز');
    return;
  }

  await WorkingHours.insertMany(defaultWorkingHours);
  console.log('✅ تم إنشاء أوقات العمل الافتراضية (7 أيام)');
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ متصل بقاعدة البيانات');

    await seedAdmin();
    await seedWorkingHours();
  } catch (error) {
    console.error('❌ خطأ أثناء الـ seed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
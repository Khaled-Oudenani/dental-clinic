import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import WorkingHours from '../models/WorkingHours.js';
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '1.0.0.1']);

const seedAdmin = async () => {
  const suffixes = new Set(['']);
  for (const key of Object.keys(process.env)) {
    const match = key.match(/^ADMIN_(?:NAME|EMAIL|PASSWORD)(\d+)$/);
    if (match) suffixes.add(match[1]);
  }

  const admins = [...suffixes].map((suffix) => ({
    name: process.env[`ADMIN_NAME${suffix}`],
    email: process.env[`ADMIN_EMAIL${suffix}`],
    password: process.env[`ADMIN_PASSWORD${suffix}`],
    label: suffix || '1',
  }));
  const configuredAdmins = admins.filter(({ name, email, password }) =>
    [name, email, password].some((value) => value)
  );

  if (configuredAdmins.length === 0) {
    throw new Error('لازم تضيف بيانات مشرف واحد على الأقل في ملف .env');
  }

  for (const admin of configuredAdmins) {
    const { name, email, password, label } = admin;
    if (!name || !email || !password) {
      throw new Error(
        `بيانات المشرف ${label} غير مكتملة؛ أدخل الاسم والبريد وكلمة المرور`
      );
    }
    if (password.length < 6) {
      throw new Error(`كلمة مرور المشرف ${label} يجب أن تكون 6 أحرف على الأقل`);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Admin.findOne({ email: normalizedEmail });
    if (existing) {
      console.log(`ℹ️  حساب الأدمن ${normalizedEmail} موجود مسبقاً، تم التجاوز`);
      continue;
    }

    await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password, // يتشفر أوتوماتيكياً بفضل pre('save') الموجودة فـ الموديل
    });

    console.log(`✅ تم إنشاء حساب الأدمن: ${normalizedEmail}`);
  }
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
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
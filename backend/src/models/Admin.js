// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const adminSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false, // ما يرجعش مع الاستعلامات العادية إلا إذا طلبناه صراحةً
//     },
//     role: {
//       type: String,
//       enum: ['admin'],
//       default: 'admin',
//     },
//   },
//   { timestamps: true }
// );

// // تشفير كلمة المرور تلقائياً قبل الحفظ (فقط إذا تغيّرت)
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // مقارنة كلمة المرور المُدخلة عند تسجيل الدخول بالمشفّرة في القاعدة
// adminSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('Admin', adminSchema);

// new code

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // ما يرجعش مع الاستعلامات العادية إلا إذا طلبناه صراحةً
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

// تشفير كلمة المرور تلقائياً قبل الحفظ (فقط إذا تغيّرت)
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// مقارنة كلمة المرور المُدخلة عند تسجيل الدخول بالمشفّرة في القاعدة
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Admin', adminSchema);
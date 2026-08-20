import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`✅ متصل بقاعدة البيانات MongoDB: ${conn.connection.host}`);

  // نتابع حالة الاتصال بعد أول نجاح (مفيد أثناء التشغيل، ماشي فقط عند البداية)
  mongoose.connection.on('error', (err) => {
    console.error('❌ خطأ في اتصال MongoDB:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ انقطع الاتصال بـ MongoDB');
  });
};

export default connectDB;
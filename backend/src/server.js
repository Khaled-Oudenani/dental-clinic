import 'dotenv/config';
import app from './app.js';
import dns from 'node:dns';
import connectDB from './config/db.js';

dns.setServers(['1.1.1.1', '1.0.0.1']);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ فشل تشغيل السيرفر:', error.message);
    process.exit(1);
  }
};

startServer();

// معالجة الأخطاء غير المتوقعة التي لا يتم اصطيادها (unhandled promise rejections)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
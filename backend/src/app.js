import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// ===== Middlewares أساسية =====
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Health check - للتأكد أن السيرفر شغال =====
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dental Clinic API is running' });
});

// ===== Routes =====
app.use('/api', routes);

app.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is awake",
  });
});

// ===== 404 - أي route غير موجود =====
app.use(notFound);

// ===== معالج الأخطاء المركزي =====
app.use(errorHandler);

export default app;
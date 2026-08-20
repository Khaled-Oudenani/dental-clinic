const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'خطأ في السيرفر';

  // أخطاء التحقق من Mongoose (required, enum, min...) → كانت بتخرج كـ 500 غلط
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // معرّف MongoDB بصيغة غير صالحة (مثال: /api/services/xyz)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'معرّف غير صالح';
  }

  // تكرار قيمة فريدة (unique index) - بريد أدمن مستعمل، أو خانة موعد محجوزة مسبقاً
  if (err.code === 11000) {
    statusCode = 409;
    message = 'هذه القيمة مستعملة مسبقاً';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
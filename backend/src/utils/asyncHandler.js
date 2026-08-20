// يلف أي async controller ويمرر أي خطأ لـ next() تلقائياً
// بدل ما نكتب try/catch فـ كل controller يدوياً
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
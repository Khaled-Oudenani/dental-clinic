# Lumina Dental — نظام حجوزات عيادة أسنان

موقع MERN كامل لعيادة أسنان: يعرض الخدمات والأسعار، يتيح حجز المواعيد أونلاين حسب أوقات العمل الفعلية، ويحتوي على لوحة تحكم لإدارة الخدمات والحجوزات والرسائل.

## البنية العامة

المشروع عبارة عن مجلدين مستقلين (backend منفصل عن frontend، بلا مشاركة كود بينهما):

```
dentist/
├── backend/     # Express API + MongoDB
├── frontend/    # React + Vite (الموقع العام + لوحة التحكم)
└── README.md
```

## التقنيات المستخدمة

**Backend:** Node.js (ES Modules), Express, MongoDB / Mongoose, JWT (مصادقة الأدمن), bcryptjs

**Frontend:** React 19، Vite، React Router، Axios، Tailwind CSS v4 (بدون `tailwind.config.js`، الإعداد كامل عبر `@theme` في `index.css`)

## المميزات

- **موقع عام (4 صفحات):** الرئيسية، الخدمات والأسعار (بفلترة حسب التصنيف)، الحجز (3 خطوات: خدمة ← تاريخ ووقت ← بيانات المريض)، اتصل بنا (نموذج تواصل + خريطة + واتساب)
- **حجز ذكي:** الأوقات المتاحة تُحسب تلقائياً حسب أوقات عمل العيادة، مدة كل خدمة، والحجوزات الموجودة مسبقاً — بلا تعارض ممكن بفضل index فريد في قاعدة البيانات
- **لوحة تحكم محمية بـ JWT:** إدارة الخدمات (CRUD كامل + رفع صورة لكل خدمة عبر Cloudinary)، عرض/تأكيد/إلغاء الحجوزات، رسائل التواصل، معلومات العيادة
- **كل البيانات ديناميكية** — لا يوجد محتوى وهمي (mock)، كل شيء يُجلب من قاعدة البيانات الحقيقية

## متطلبات التشغيل

- Node.js v18 أو أحدث
- حساب [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (أو MongoDB محلي)

## التثبيت والتشغيل

### 1. الباك اند

```bash
cd backend
npm install
cp .env.example .env
# عبّي القيم الحقيقية في .env (خصوصاً MONGO_URI و JWT_SECRET)

npm run seed   # ينشئ حساب الأدمن الأول + أوقات العمل الافتراضية (مرة واحدة فقط)
npm run dev    # يشغل السيرفر على http://localhost:5000
```

### 2. الفرونت اند

```bash
cd frontend
npm install
npm run dev    # يشغل الموقع على http://localhost:5173
```

## متغيرات البيئة

### `backend/.env`

| المتغير | الوصف |
|---|---|
| `PORT` | منفذ السيرفر (افتراضي 5000) |
| `MONGO_URI` | رابط الاتصال بـ MongoDB |
| `CLIENT_URL` | رابط الفرونت اند (لإعدادات CORS) |
| `JWT_SECRET` | مفتاح سري لتوقيع الـ tokens |
| `JWT_EXPIRES_IN` | مدة صلاحية الـ token (مثال: `7d`) |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | بيانات حساب الأدمن الأول، تُستعمل مرة واحدة فقط عبر `npm run seed` |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | بيانات حساب Cloudinary، تُستعمل لرفع وحذف صور الخدمات |

### `frontend/.env`

| المتغير | الوصف |
|---|---|
| `VITE_API_URL` | رابط الـ API الخلفي (مثال: `http://localhost:5000/api`) |

## خريطة الصفحات

**عامة:** `/` · `/services` · `/booking` · `/contact`

**لوحة التحكم (تتطلب تسجيل دخول):** `/admin/login` · `/admin` · `/admin/services` · `/admin/appointments` · `/admin/working-hours` · `/admin/messages` · `/admin/clinic-info`

## أهم مسارات الـ API

| المسار | الوصف | الوصول |
|---|---|---|
| `POST /api/auth/login` | تسجيل دخول الأدمن | عام |
| `GET /api/services` | قائمة الخدمات (`?category=` `?includeInactive=`) | عام |
| `GET /api/appointments/available-slots` | الأوقات المتاحة (`?date=` `&serviceId=`) | عام |
| `POST /api/appointments` | حجز موعد جديد | عام |
| `GET /api/appointments` | كل الحجوزات | أدمن |
| `GET /api/working-hours` | أوقات العمل لكل الأسبوع | عام |
| `GET /api/clinic-info` | معلومات العيادة (عنوان، هاتف، خريطة...) | عام |
| `POST /api/contact` | إرسال رسالة تواصل | عام |

## ملاحظات تقنية

- الباك اند والفرونت اند يستعملان **ES Modules** (`import`/`export`)، ماشي CommonJS
- Tailwind v4: لا يوجد `tailwind.config.js` ولا `postcss.config.js` — كل الألوان والخطوط معرّفة كـ CSS variables داخل `@theme` في `frontend/src/index.css`
- الأيقونات عبر Material Symbols (اسم الأيقونة يُخزّن كنص في قاعدة البيانات لكل خدمة)
- لا يوجد endpoint عمومي لإنشاء حساب أدمن جديد (لأسباب أمنية) — الحساب الأول يُنشأ حصرياً عبر `npm run seed`

## أمور لسا ناقصة / قابلة للتحسين

- قائمة الموبايل الكاملة (drawer) في الهيدر ما زالت غير مكتملة الوظائف
- لا يوجد نظام إشعارات (بريد إلكتروني / SMS) عند تأكيد أو تغيير حالة الحجز
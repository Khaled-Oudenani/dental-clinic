import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// نزيد الـ token تلقائياً فكل طلب إذا كان موجود (يخدم مع كل الـ routes الخاصة بالأدمن)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// إذا رجع 401 (token منتهي أو غير صالح)، نمسح البيانات ونرجّع الأدمن لصفحة الدخول
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');

      const isOnAdminArea = window.location.pathname.startsWith('/admin');
      const isOnLoginPage = window.location.pathname === '/admin/login';

      if (isOnAdminArea && !isOnLoginPage) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

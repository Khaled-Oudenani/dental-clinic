import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'نظرة عامة', end: true },
  { to: '/admin/services', label: 'الخدمات' },
  { to: '/admin/appointments', label: 'الحجوزات' },
  { to: '/admin/working-hours', label: 'أوقات العمل' },
  { to: '/admin/messages', label: 'الرسائل' },
  { to: '/admin/clinic-info', label: 'معلومات العيادة' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#F4FBFA]">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 right-0 z-40 flex w-72 max-w-[85vw] flex-col border-l border-[#E0F2F1] bg-white transition-transform duration-300 lg:static lg:z-auto lg:min-h-screen lg:w-64 lg:max-w-none lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-5 border-b border-[#E0F2F1]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F766E]">khaled Dental</h2>
              <p className="text-xs text-gray-500 mt-0.5">لوحة التحكم</p>
            </div>
            <button type="button" onClick={() => setIsSidebarOpen(false)} className="text-2xl leading-none text-gray-400 lg:hidden" aria-label="إغلاق القائمة">×</button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#0F766E] text-white' : 'text-gray-600 hover:bg-[#E0F2F1]'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[#E0F2F1]">
          <p className="text-sm text-gray-700 truncate mb-2">{admin?.name}</p>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg py-2 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg border border-[#B2DFDB] bg-white px-3 py-2 text-sm font-medium text-[#0F766E] shadow-sm"
            aria-label="فتح القائمة"
          >
            ☰ <span className="mr-1">القائمة</span>
          </button>
        </div>
        <Outlet />
      </main>

      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
              !
            </div>
            <h2 id="logout-title" className="text-xl font-bold text-gray-800">
              تأكيد تسجيل الخروج
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              هل أنت متأكد من رغبتك في تسجيل الخروج من لوحة التحكم؟
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
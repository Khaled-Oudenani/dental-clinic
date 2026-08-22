import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminWorkingHoursPage from './pages/admin/AdminWorkingHoursPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminClinicInfoPage from './pages/admin/AdminClinicInfoPage';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Routes>
       <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      {/* <Route path="/" element={<div>الموقع قيد الإنشاء 🦷</div>} /> */}

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
          <Route path="/admin/working-hours" element={<AdminWorkingHoursPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/clinic-info" element={<AdminClinicInfoPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // نستنى نعرفو الحالة قبل ما نقرر - يتفادى "فلاش" لصفحة الدخول عند كل رفريش
  if (isLoading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
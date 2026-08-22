import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest } from '../api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(true);

  // عند تحميل التطبيق، نسترجع بيانات الأدمن المحفوظة (إذا كانت موجودة) بدل ما نطلبها من جديد
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminData');
    if (token && storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const { token: newToken, admin: adminData } = await loginRequest(email, password);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth يجب أن يُستعمل داخل <AuthProvider>');
  }
  return context;
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authState = localStorage.getItem('abhilasha_admin_auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === 'admin@abhilasha.com' && password === 'password123') {
      localStorage.setItem('abhilasha_admin_auth', 'true');
      setIsAuthenticated(true);
      navigate('/admin/dashboard', { replace: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('abhilasha_admin_auth');
    setIsAuthenticated(false);
    navigate('/admin', { replace: true });
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

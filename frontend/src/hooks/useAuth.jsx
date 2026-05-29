import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewRole, setPreviewRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking local storage
    const storedUser = localStorage.getItem('hcm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedPreview = sessionStorage.getItem('hcm_preview_role');
    if (storedPreview) {
      setPreviewRole(storedPreview);
    }
    setLoading(false);
  }, []);

  const login = (email, password, role = 'admin') => {
    // Mock login
    const userData = {
      id: '1',
      name: 'John Doe',
      email,
      role, // Defaulting to admin for demo if not specified
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    setUser(userData);
    localStorage.setItem('hcm_user', JSON.stringify(userData));
    navigate(`/${role}/dashboard`);
  };

  const logout = () => {
    setUser(null);
    setPreviewRole(null);
    localStorage.removeItem('hcm_user');
    sessionStorage.removeItem('hcm_preview_role');
    sessionStorage.setItem('logged_out', 'true');
    navigate('/login');
  };

  const enterPreview = (role) => {
    setPreviewRole(role);
    sessionStorage.setItem('hcm_preview_role', role);
    navigate(`/${role}/dashboard`);
  };

  const exitPreview = () => {
    setPreviewRole(null);
    sessionStorage.removeItem('hcm_preview_role');
    if (user?.role) {
      navigate(`/${user.role}/dashboard`);
    } else {
      navigate('/login');
    }
  };

  const effectiveRole = previewRole || user?.role;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, previewRole, effectiveRole, enterPreview, exitPreview }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

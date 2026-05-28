import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking local storage
    const storedUser = localStorage.getItem('hcm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    localStorage.removeItem('hcm_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

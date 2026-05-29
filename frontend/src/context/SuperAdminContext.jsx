import React, { createContext, useContext, useState, useEffect } from 'react';

// Context for Super Admin
const SuperAdminContext = createContext();

export const SuperAdminProvider = ({ children }) => {
  // Basic state: list of users, roles, departments, etc. Stored in localStorage for now
  const defaultUsers = [
    { id: '1', name: 'John Doe', email: 'superuser@hcm.ai', role: 'superuser', department: 'Executive', status: 'active' },
    { id: '2', name: 'Sarah Connor', email: 'admin@hcm.ai', role: 'admin', department: 'Operations', status: 'active' },
    { id: '3', name: 'Michael Scott', email: 'hr.manager@hcm.ai', role: 'hr', department: 'Human Resources', status: 'active' },
    { id: '4', name: 'Dwight Schrute', email: 'dept.head@hcm.ai', role: 'manager', department: 'Sales', status: 'active' },
    { id: '5', name: 'Jim Halpert', email: 'joshua.m@hcm.ai', role: 'employee', department: 'Sales', status: 'active' },
  ];

  const defaultRoles = [
    { id: '1', name: 'Super User', description: 'Full access to all systems and settings', permissionsCount: 15 },
    { id: '2', name: 'Admin', description: 'Manage organization setup and configuration', permissionsCount: 12 },
    { id: '3', name: 'HR Manager', description: 'Recruitment, onboarding, and employee records', permissionsCount: 9 },
    { id: '4', name: 'Manager', description: 'Approve leave requests, track team KPIs', permissionsCount: 6 },
    { id: '5', name: 'Employee', description: 'Self-service dashboard, attendance, and leave', permissionsCount: 3 },
  ];

  const defaultDepts = [
    { id: '1', name: 'Executive', head: 'John Doe', count: 1 },
    { id: '2', name: 'Human Resources', head: 'Michael Scott', count: 3 },
    { id: '3', name: 'Sales', head: 'Dwight Schrute', count: 8 },
    { id: '4', name: 'Engineering', head: 'Sarah Connor', count: 12 },
    { id: '5', name: 'Finance', head: 'Oscar Martinez', count: 4 },
  ];

  const defaultLogs = [
    { id: '1', user: 'John Doe', action: 'Created new user: Pam Beesly', time: '10 mins ago', type: 'user' },
    { id: '2', user: 'System', action: 'Automated backup completed', time: '1 hour ago', type: 'system' },
    { id: '3', user: 'Sarah Connor', action: 'Updated payroll configuration', time: '2 hours ago', type: 'config' },
    { id: '4', user: 'John Doe', action: 'Changed permissions for HR role', time: '4 hours ago', type: 'security' },
  ];

  const [users, setUsers] = useState(() => {
    const data = localStorage.getItem('superadmin_users');
    return data ? JSON.parse(data) : defaultUsers;
  });
  const [departments, setDepartments] = useState(() => {
    const data = localStorage.getItem('superadmin_departments');
    return data ? JSON.parse(data) : defaultDepts;
  });
  const [roles, setRoles] = useState(() => {
    const data = localStorage.getItem('superadmin_roles');
    return data ? JSON.parse(data) : defaultRoles;
  });
  const [activityLogs, setActivityLogs] = useState(() => {
    const data = localStorage.getItem('superadmin_logs');
    return data ? JSON.parse(data) : defaultLogs;
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('superadmin_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('superadmin_departments', JSON.stringify(departments));
  }, [departments]);
  useEffect(() => {
    localStorage.setItem('superadmin_roles', JSON.stringify(roles));
  }, [roles]);
  useEffect(() => {
    localStorage.setItem('superadmin_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  const addRole = (role) => setRoles((prev) => [...prev, role]);
  const updateRole = (id, updates) => setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  const deleteRole = (id) => setRoles((prev) => prev.filter((r) => r.id !== id));

  const addDept = (dept) => setDepartments((prev) => [...prev, dept]);
  const updateDept = (id, updates) => setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  const deleteDept = (id) => setDepartments((prev) => prev.filter((d) => d.id !== id));

  const addUser = (user) => setUsers((prev) => [...prev, user]);
  const updateUser = (id, updates) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  const deleteUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  // Similar CRUD helpers for departments and roles could be added here

  const value = {
    users,
    departments,
    roles,
    addUser,
    updateUser,
    deleteUser,
    // Role helpers
    addRole,
    updateRole,
    deleteRole,
    addDept,
    updateDept,
    deleteDept,
    activityLogs,
  };

  return <SuperAdminContext.Provider value={value}>{children}</SuperAdminContext.Provider>;
};

export const useSuperAdmin = () => useContext(SuperAdminContext);

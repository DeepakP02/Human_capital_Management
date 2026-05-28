import React from 'react';
import { Link } from 'react-router-dom';
import { useSuperAdmin } from '../../context/SuperAdminContext';

const SuperAdminDashboard = () => {
  const { users, roles, departments } = useSuperAdmin();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/superadmin/users" className="block bg-primary-100 dark:bg-primary-900 p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium mb-2">Users</h2>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{users.length}</p>
        </Link>
        <Link to="/superadmin/roles" className="block bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium mb-2">Roles</h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{roles.length}</p>
        </Link>
        <Link to="/superadmin/departments" className="block bg-amber-100 dark:bg-amber-900 p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium mb-2">Departments</h2>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{departments.length}</p>
        </Link>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

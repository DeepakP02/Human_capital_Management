import React, { useState } from 'react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import {
  Users,
  UserPlus,
  Trash2,
  Edit3,
  Search,
  X,
  Shield,
  Building2,
  Mail,
  UserCheck,
  Power,
  RefreshCw,
  Activity
} from 'lucide-react';
import PageHeader from '../../shared/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser, departments, roles } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showToastMsg, setShowToastMsg] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Employee');
  const [selectedDept, setSelectedDept] = useState('Sales');

  const ROLE_OPTIONS = ['Super Admin', 'Admin', 'HR Manager', 'Manager', 'Employee', 'Candidate'];
  const DEPT_OPTIONS = ['Executive', 'Human Resources', 'Sales', 'Engineering', 'Finance', 'Operations'];

  const openAddModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setSelectedRole('Employee');
    setSelectedDept(departments[0]?.name || 'Engineering');
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setSelectedRole(user.role);
    setSelectedDept(user.department);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingUser) {
      updateUser(editingUser.id, {
        name,
        email,
        role: selectedRole,
        department: selectedDept
      });
    } else {
      addUser({
        id: Date.now().toString(),
        name,
        email,
        role: selectedRole,
        department: selectedDept,
        status: 'active'
      });
    }
    setIsModalOpen(false);
  };

  const toggleStatus = (user) => {
    updateUser(user.id, {
      status: user.status === 'suspended' ? 'active' : 'suspended'
    });
  };

  const showMockAction = (msg) => {
    setShowToastMsg(msg);
    setTimeout(() => setShowToastMsg(null), 3000);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="hcm-page-title">
            <Users className="text-primary-600" size={32} />
            User Management
          </h1>
          <p className="hcm-page-subtitle">
            Manage users, assign security roles, and map organization departments.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name, email, department, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          Showing {filteredUsers.length} of {users.length} Users
        </div>
      </div>

      <AnimatePresence>
        {showToastMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-3 rounded-xl text-sm font-bold shadow-sm">
            {showToastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Table / Grid */}
      <div className="hcm-table-container">
        <div className="hidden sm:block min-w-[640px]">
          <table className="hcm-table">
            <thead className="hcm-thead">
              <tr className="hcm-tr">
                <th className="hcm-th p-4 pl-6">User Info</th>
                <th className="hcm-th p-4">Department</th>
                <th className="hcm-th p-4">System Role</th>
                <th className="hcm-th p-4">Status</th>
                <th className="hcm-th p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              <AnimatePresence>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hcm-tr"
                    >
                      <td className="hcm-td p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-black flex items-center justify-center text-sm shadow-inner uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                              <Mail size={12} />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hcm-td p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                          <Building2 size={12} />
                          {user.department}
                        </span>
                      </td>
                      <td className="hcm-td p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/25 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
                          <Shield size={12} />
                          {user.role}
                        </span>
                      </td>
                      <td className="hcm-td p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${user.status === 'suspended' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                      <td className="hcm-td p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleStatus(user)}
                            className={`p-2 rounded-xl transition-all ${user.status === 'suspended' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                            title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            onClick={() => showMockAction(`Reset password link sent to ${user.email}`)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all"
                            title="Reset Password"
                          >
                            <RefreshCw size={16} />
                          </button>
                          <button
                            onClick={() => showMockAction(`Viewing activity logs for ${user.name}`)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all"
                            title="View Activity Logs"
                          >
                            <Activity size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all"
                            title="Edit User"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-400 font-medium text-sm">
                      No users match your search criteria.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800/50">
          <AnimatePresence>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-black flex items-center justify-center text-sm shadow-inner uppercase shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5 mt-0.5 truncate">
                        <Mail size={12} className="shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-[10px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                      <Building2 size={10} />
                      {user.department}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary-50 dark:bg-primary-950/25 text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase">
                      <Shield size={10} />
                      {user.role}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${user.status === 'suspended' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                      {user.status || 'active'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-50 dark:border-slate-800/40">
                    <button
                      onClick={() => toggleStatus(user)}
                      className={`p-2 rounded-xl transition-all ${user.status === 'suspended' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                      title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                    >
                      <Power size={16} />
                    </button>
                    <button
                      onClick={() => showMockAction(`Reset password link sent to ${user.email}`)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all"
                      title="Reset Password"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => showMockAction(`Viewing activity logs for ${user.name}`)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all"
                      title="View Activity Logs"
                    >
                      <Activity size={16} />
                    </button>
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all"
                      title="Edit User"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 font-medium text-sm">
                No users match your search criteria.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="hcm-modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="hcm-modal"
            >
              <div className="p-6 border-b border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                <h3 className="hcm-section-heading flex items-center gap-2.5">
                  <UserCheck className="text-primary-600" size={22} />
                  {editingUser ? 'Edit User details' : 'Create New User'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field font-semibold"
                  />
                </div>

                <div>
                  <label className="form-label">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">System Role</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="input-field font-semibold capitalize"
                    >
                      {roles.map(r => {
                        const val = r.name.toLowerCase().replace(/\s+manager/g, '').replace(/\s+/g, '');
                        return (
                          <option key={r.id} value={val}>{r.name}</option>
                        );
                      })}
                      {/* Ensure candidate is always selectable as it might not be a defined default admin role */}
                      {!roles.some(r => r.name.toLowerCase() === 'candidate') && (
                        <option value="candidate">Candidate</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Department</label>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="input-field font-semibold"
                    >
                      {departments.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 border-t border-slate-50 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    {editingUser ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;

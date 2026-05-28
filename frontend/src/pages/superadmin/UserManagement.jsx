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
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser, departments, roles } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [selectedDept, setSelectedDept] = useState('Engineering');

  const openAddModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setSelectedRole('employee');
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
        department: selectedDept
      });
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Users className="text-primary-600" size={32} />
            User Management
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Manage users, assign security roles, and map organization departments.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center justify-center gap-2 self-start md:self-auto shadow-lg shadow-primary-200 dark:shadow-none"
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name, email, department, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 text-sm"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          Showing {filteredUsers.length} of {users.length} Users
        </div>
      </div>

      {/* Users Table / Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">User Info</th>
                <th className="p-4">Department</th>
                <th className="p-4">System Role</th>
                <th className="p-4 text-right pr-6">Actions</th>
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
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors"
                    >
                      <td className="p-4 pl-6">
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
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                          <Building2 size={12} />
                          {user.department}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/25 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
                          <Shield size={12} />
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
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
                    <td colSpan="4" className="p-12 text-center text-slate-400 font-medium text-sm">
                      No users match your search criteria.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
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
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Role</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold capitalize"
                    >
                      {['superadmin', 'admin', 'hr', 'manager', 'employee', 'candidate'].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
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
                    className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all text-sm shadow-lg shadow-primary-200 dark:shadow-none"
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

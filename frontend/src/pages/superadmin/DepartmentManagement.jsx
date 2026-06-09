import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  User, 
  Users,
  Grid,
  Mail,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Toast helper ---
const toast = (message, type = 'success') =>
  window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, type } }));

const DepartmentManagement = () => {
  const navigate = useNavigate();
  const { users, departments, addDept, updateDept, deleteDept } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [rosterSearch, setRosterSearch] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [head, setHead] = useState('');
  const [count, setCount] = useState(0);

  const openAddModal = () => {
    setEditingDept(null);
    setName('');
    setHead('');
    setCount(0);
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setName(dept.name);
    setHead(dept.head);
    setCount(dept.count || 0);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !head) return;

    if (editingDept) {
      updateDept(editingDept.id, {
        name,
        head,
        count: parseInt(count, 10)
      });
      toast(`Department '${name}' updated successfully!`, 'success');
    } else {
      addDept({
        id: Date.now().toString(),
        name,
        head,
        count: parseInt(count, 10)
      });
      toast(`Department '${name}' created successfully!`, 'success');
    }
    setIsModalOpen(false);
  };

  const filteredDepts = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarBg = (name) => {
    if (!name) return 'from-slate-400 to-slate-500';
    const code = name.charCodeAt(0) % 5;
    const gradients = [
      'from-amber-400 to-orange-500',
      'from-blue-400 to-indigo-500',
      'from-emerald-400 to-teal-500',
      'from-purple-400 to-pink-500',
      'from-rose-400 to-red-500'
    ];
    return gradients[code];
  };

  const getRoleBadgeStyle = (role) => {
    const r = role?.toLowerCase() || '';
    if (r.includes('superuser')) return 'bg-violet-50 dark:bg-violet-950/25 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30';
    if (r.includes('admin')) return 'bg-blue-50 dark:bg-blue-950/25 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30';
    if (r.includes('hr')) return 'bg-emerald-50 dark:bg-emerald-950/25 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30';
    if (r.includes('manager')) return 'bg-amber-50 dark:bg-amber-950/25 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30';
    return 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Building2 className="text-amber-600" size={32} />
            Department Management
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Configure company divisions, department heads, and monitor personnel counts.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 self-start md:self-auto shadow-lg shadow-amber-200 dark:shadow-none transition-all"
        >
          <Plus size={18} />
          <span>Create Department</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search departments by name or head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          Departments: {departments.length} Divisions
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDepts.length > 0 ? (
            filteredDepts.map((dept) => {
              const deptStaffCount = users.filter(u => u.department === dept.name).length || dept.count || 0;
              const isSelected = selectedDept?.id === dept.id;
              
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  onClick={() => {
                    setSelectedDept(isSelected ? null : dept);
                    setRosterSearch('');
                  }}
                  className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border cursor-pointer hover:border-amber-500/50 hover:shadow-premium transition-all flex flex-col justify-between group relative ${
                    isSelected 
                      ? 'border-amber-500 ring-4 ring-amber-500/10 shadow-premium' 
                      : 'border-slate-100 dark:border-slate-800/60 shadow-soft'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
                        isSelected 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                      }`}>
                        <Building2 size={22} />
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1">
                        <Users size={12} />
                        {deptStaffCount} Staff
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-snug">{dept.name}</h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 mt-2">
                      <User size={14} className="text-slate-400" />
                      <span>Dept. Head: </span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{dept.head}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                      {isSelected ? 'Viewing Staff' : 'Click to view staff'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(dept); }}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition-all"
                        title="Edit Department"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (isSelected) setSelectedDept(null);
                          deleteDept(dept.id);
                          toast(`Department '${dept.name}' deleted`, 'error');
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                        title="Delete Department"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full bg-white dark:bg-slate-900 p-12 text-center rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-400 font-medium text-sm">
              No divisions match your search query.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Department Roster Panel */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-6 shadow-premium space-y-4 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
                    {selectedDept.name} Department Roster
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Dept. Head: <span className="text-slate-700 dark:text-slate-300 font-bold">{selectedDept.head}</span> • {users.filter(u => u.department === selectedDept.name).length} Registered Staff
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3.5 top-2.5 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search roster..."
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500/35 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-xs font-semibold"
                  />
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Roster List / Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-3 pl-4">Staff Member</th>
                    <th className="p-3">Work Email</th>
                    <th className="p-3">System Role</th>
                    <th className="p-3 text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {users.filter(u => u.department === selectedDept.name).filter(u => 
                    u.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                    u.email.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                    u.role.toLowerCase().includes(rosterSearch.toLowerCase())
                  ).length > 0 ? (
                    users.filter(u => u.department === selectedDept.name).filter(u => 
                      u.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                      u.email.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                      u.role.toLowerCase().includes(rosterSearch.toLowerCase())
                    ).map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors">
                        <td className="p-3 pl-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getAvatarBg(user.name)} text-white font-black flex items-center justify-center text-xs uppercase shadow-sm`}>
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block leading-tight">{user.name}</span>
                              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">ID: #{user.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" />
                            {user.email}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${getRoleBadgeStyle(user.role)}`}>
                            <Shield size={10} />
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3 text-right pr-4">
                          <button
                            onClick={() => {
                              toast(`Navigating to profile edit for ${user.name}...`, 'info');
                              navigate('/superadmin/users');
                            }}
                            className="text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider"
                          >
                            Manage Profile
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-10 text-center text-slate-400 dark:text-slate-600 font-bold text-xs uppercase tracking-wide">
                        No team members match this criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Department Modal */}
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
                  <Grid className="text-amber-600" size={22} />
                  {editingDept ? 'Edit Division' : 'Create Department'}
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
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department Head</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter head manager name"
                    value={head}
                    onChange={(e) => setHead(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Staff Members Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
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
                    className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all text-sm shadow-lg shadow-amber-200 dark:shadow-none"
                  >
                    {editingDept ? 'Save Changes' : 'Create Dept.'}
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

export default DepartmentManagement;

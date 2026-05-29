import React, { useState } from 'react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  Key,
  ShieldAlert,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PERMISSION_OPTIONS = [
  { id: 'manage_users', label: 'Manage Users', desc: 'Create, update, and revoke user credentials' },
  { id: 'manage_roles', label: 'Manage Security Roles', desc: 'Establish and modify role clearance groups' },
  { id: 'manage_departments', label: 'Manage Departments', desc: 'Reorganize company departments and metadata' },
  { id: 'access_candidate', label: 'Candidate Module Portal', desc: 'Apply to job listings, upload resumes, check scoring' },
  { id: 'access_hr', label: 'HR Workspace Access', desc: 'Create job postings, run onboarding checklists, review reports' },
  { id: 'access_employee', label: 'Employee Self-Service', desc: 'Log attendance clocks, apply for leave, view benefits' },
  { id: 'access_manager', label: 'Manager Command Center', desc: 'Approve team leaves, track KPIs, evaluate task assignments' },
  { id: 'access_billing', label: 'Billing Center Access', desc: 'Review subscription packages and invoices' },
  { id: 'view_audit_logs', label: 'View Platform Audit Logs', desc: 'Investigate operational changes and log traces' },
];

const RoleManagement = () => {
  const { roles, addRole, updateRole, deleteRole } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Helper to dynamically get or fallback permissions for default mock roles
  const getRolePermissions = (role) => {
    if (role.permissions) return role.permissions;
    if (role.name === 'Super Admin') return PERMISSION_OPTIONS.map(p => p.id);
    if (role.name === 'Admin') return ['manage_users', 'manage_departments', 'access_employee', 'view_audit_logs'];
    if (role.name === 'HR Manager') return ['access_hr', 'access_employee', 'view_audit_logs'];
    if (role.name === 'Manager') return ['access_manager', 'access_employee'];
    if (role.name === 'Employee') return ['access_employee'];
    return [];
  };

  const openAddModal = () => {
    setEditingRole(null);
    setName('');
    setDescription('');
    setSelectedPermissions(['access_employee']); // Default permission
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setName(role.name);
    setDescription(role.description);
    setSelectedPermissions(role.permissions || getRolePermissions(role));
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;

    const payload = {
      name,
      description,
      permissions: selectedPermissions,
      permissionsCount: selectedPermissions.length
    };

    if (editingRole) {
      updateRole(editingRole.id, payload);
    } else {
      addRole({
        id: Date.now().toString(),
        ...payload
      });
    }
    setIsModalOpen(false);
  };

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Shield className="text-emerald-600" size={32} />
            Security Roles & Permissions
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Define enterprise access permissions, security profiles, and system access levels.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 self-start md:self-auto shadow-lg shadow-emerald-200 dark:shadow-none transition-all"
        >
          <Plus size={18} />
          <span>Add Custom Role</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100 text-sm"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          Total Roles: {roles.length} Profiles
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => {
              const activePerms = role.permissions || getRolePermissions(role);
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between group relative text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                        <Key size={22} />
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {activePerms.length} PERMISSIONS
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-snug">{role.name}</h3>
                    <p className="text-sm font-medium text-slate-450 dark:text-slate-550 leading-relaxed mb-4">
                      {role.description}
                    </p>

                    {/* Permissions list chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {activePerms.map(pId => {
                        const opt = PERMISSION_OPTIONS.find(o => o.id === pId);
                        if (!opt) return null;
                        return (
                          <span key={pId} className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {opt.label}
                          </span>
                        );
                      })}
                      {activePerms.length === 0 && (
                        <span className="text-[11px] text-slate-400 italic">No granular permissions assigned.</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <button
                      onClick={() => openEditModal(role)}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-all"
                      title="Edit Role"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteRole(role.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                      title="Delete Role"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full bg-white dark:bg-slate-900 p-12 text-center rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-400 font-medium text-sm">
              No security profiles match your query.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Role Modal */}
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
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 text-left"
            >
              <div className="p-6 border-b border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <ShieldAlert className="text-emerald-600" size={22} />
                  {editingRole ? 'Edit Security Role' : 'Create Custom Role'}
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
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Talent Acquisition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profile Description</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Describe role responsibilities and authority bounds..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Granular System Permissions</label>
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 border border-slate-100 dark:border-slate-800 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50">
                    {PERMISSION_OPTIONS.map((perm) => {
                      const isChecked = selectedPermissions.includes(perm.id);
                      return (
                        <label key={perm.id} className="flex items-start gap-3 cursor-pointer group text-left">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedPermissions(prev =>
                                isChecked ? prev.filter(p => p !== perm.id) : [...prev, perm.id]
                              );
                            }}
                            className="mt-1 h-4 w-4 rounded border-slate-350 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-800 transition-colors"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              {perm.label}
                            </p>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              {perm.desc}
                            </p>
                          </div>
                        </label>
                      );
                    })}
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
                    className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all text-sm shadow-lg shadow-emerald-200 dark:shadow-none"
                  >
                    {editingRole ? 'Save Changes' : 'Create Role'}
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

export default RoleManagement;

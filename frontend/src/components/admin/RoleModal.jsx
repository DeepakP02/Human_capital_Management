import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  MoreVertical, 
  ChevronRight, 
  Search,
  Layout,
  Users,
  Settings,
  ChevronDown,
  Info,
  Layers,
  Copy
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';

const RoleModal = ({ isOpen, onClose, roleToEdit = null }) => {
  const { roles, addRole, updateRole, users, showToast } = useAdmin();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cloneFrom: '',
    permissions: {},
    assignedUsers: []
  });

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'departments', label: 'Departments', icon: Layers },
    { id: 'payroll', label: 'Payroll Center', icon: Settings },
    { id: 'holidays', label: 'Holidays', icon: Settings },
    { id: 'benefits', label: 'Benefits', icon: Settings },
    { id: 'ai', label: 'AI Center', icon: Settings },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: Layout },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const actions = ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'];

  useEffect(() => {
    if (roleToEdit) {
      setFormData({
        ...roleToEdit,
        assignedUsers: users.filter(u => u.role === roleToEdit.name).map(u => u.id)
      });
    } else {
      setFormData({
        name: '',
        description: '',
        cloneFrom: '',
        permissions: {},
        assignedUsers: []
      });
      setStep(1);
    }
  }, [roleToEdit, isOpen, users]);

  const togglePermission = (module, action) => {
    setFormData(prev => {
      const current = prev.permissions[module] || [];
      const updated = current.includes(action)
        ? current.filter(a => a !== action)
        : [...current, action];
      
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: updated
        }
      };
    });
  };

  const toggleAllInModule = (module) => {
     setFormData(prev => {
        const current = prev.permissions[module] || [];
        const isAllSelected = current.length === actions.length;
        return {
           ...prev,
           permissions: {
              ...prev.permissions,
              [module]: isAllSelected ? [] : [...actions]
           }
        };
     });
  };

  const handleCloneChange = (roleName) => {
     const roleToClone = roles.find(r => r.name === roleName);
     if (roleToClone) {
        setFormData(prev => ({
           ...prev,
           cloneFrom: roleName,
           permissions: { ...roleToClone.permissions }
        }));
        showToast(`Initial permissions cloned from ${roleName}`, 'info');
     }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!formData.name.trim()) {
      showToast('Role name is required', 'error');
      setStep(1);
      return;
    }

    if (roleToEdit) {
      updateRole(roleToEdit.id, formData);
    } else {
      addRole(formData);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white shadow-2xl z-[120] flex flex-col rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg transform -rotate-3">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-none">
                    {roleToEdit ? 'Configure Role' : 'Create Custom Role'}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                     <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", step === 1 ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400")}>1. Details</span>
                     <ChevronRight size={12} className="text-slate-300" />
                     <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", step === 2 ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400")}>2. Permissions</span>
                     <ChevronRight size={12} className="text-slate-300" />
                     <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", step === 3 ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400")}>3. Assignments</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-10">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Role Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Senior Recruiter" 
                                        className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Description</label>
                                    <textarea 
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="input-field min-h-[120px] py-4 bg-slate-50 border-transparent resize-none text-sm font-medium" 
                                        placeholder="Outline the scope and responsibilities of this role..."
                                    ></textarea>
                                </div>
                            </div>

                            {!roleToEdit && (
                                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                                            <Copy size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 leading-none">Clone Permissions</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Speed up config by copying an existing role</p>
                                        </div>
                                    </div>
                                    <select 
                                        value={formData.cloneFrom}
                                        onChange={(e) => handleCloneChange(e.target.value)}
                                        className="input-field h-12 bg-white border-slate-200 text-sm font-bold"
                                    >
                                        <option value="">Don't clone, start fresh</option>
                                        {roles.map(r => (
                                            <option key={r.id} value={r.name}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden">
                                <div className="grid grid-cols-12 bg-slate-900 p-6">
                                    <div className="col-span-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Module</div>
                                    <div className="col-span-8 grid grid-cols-7 gap-1">
                                        {actions.map(action => (
                                            <div key={action} className="text-[9px] font-black text-white/40 uppercase tracking-widest text-center">{action}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {modules.map((mod) => (
                                        <div key={mod.id} className="grid grid-cols-12 p-6 hover:bg-white transition-colors group">
                                            <div className="col-span-4 flex items-center gap-4">
                                                <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 group-hover:text-primary-600 transition-colors shadow-sm">
                                                    <mod.icon size={16} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{mod.label}</span>
                                            </div>
                                            <div className="col-span-8 grid grid-cols-7 gap-1">
                                                {actions.map(action => (
                                                    <div key={action} className="flex items-center justify-center">
                                                        <label className={cn(
                                                            "w-6 h-6 rounded-lg cursor-pointer flex items-center justify-center transition-all",
                                                            (formData.permissions[mod.id] || []).includes(action)
                                                                ? "bg-primary-600 text-white shadow-lg shadow-primary-100"
                                                                : "bg-white border border-slate-100 text-slate-100 hover:border-slate-300"
                                                        )}>
                                                            <input 
                                                                type="checkbox" 
                                                                className="sr-only"
                                                                checked={(formData.permissions[mod.id] || []).includes(action)}
                                                                onChange={() => togglePermission(mod.id, action)}
                                                            />
                                                            {(formData.permissions[mod.id] || []).includes(action) && <ShieldCheck size={12} fill="currentColor" />}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                             <div className="card p-8 border border-slate-100 bg-slate-50 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 leading-none">Assign Users Directly</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Select users who should immediately inherit this role</p>
                                    </div>
                                    <div className="relative w-64 group">
                                        <Search className="absolute left-3 top-2.5 text-slate-300 group-focus-within:text-primary-400 transition-colors" size={16} />
                                        <input type="text" placeholder="Search users..." className="input-field h-10 pl-10 text-xs bg-white border-slate-200" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {users.filter(u => u.role !== 'Admin').map(user => (
                                        <div 
                                            key={user.id} 
                                            onClick={() => {
                                                const current = formData.assignedUsers;
                                                const updated = current.includes(user.name) // Using name for role sync logic
                                                    ? current.filter(u => u !== user.id)
                                                    : [...current, user.id];
                                                setFormData(prev => ({ ...prev, assignedUsers: updated }));
                                            }}
                                            className={cn(
                                                "p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4",
                                                formData.assignedUsers.includes(user.id)
                                                    ? "bg-primary-50 border-primary-200 ring-1 ring-primary-200"
                                                    : "bg-white border-slate-100 hover:border-slate-200"
                                            )}
                                        >
                                            <img src={user.img} className="w-10 h-10 rounded-xl" alt="" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.05em]">{user.department}</p>
                                            </div>
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                                formData.assignedUsers.includes(user.id)
                                                    ? "bg-primary-600 border-primary-600 text-white"
                                                    : "bg-slate-50 border-slate-200"
                                            )}>
                                                {formData.assignedUsers.includes(user.id) && <ShieldCheck size={10} />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 p-8 border-t border-slate-100 bg-white/80 backdrop-blur-md flex items-center gap-4">
              {step > 1 && (
                <button 
                  type="button"
                  onClick={() => setStep(step - 1)} 
                  className="px-8 py-4 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-sm"
                >
                  Back
                </button>
              )}
              <button 
                type="button"
                onClick={onClose} 
                className={cn(
                   "py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm px-8",
                   step > 1 && "hidden"
                )}
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 flex items-center justify-center gap-2"
              >
                {step < 3 ? 'Continue' : (roleToEdit ? 'Save Changes' : 'Create Role')}
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RoleModal;

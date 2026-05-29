import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Briefcase, 
  Phone, 
  Calendar, 
  Camera, 
  ChevronRight, 
  Info,
  Link as LinkIcon,
  Send,
  User,
  Plus
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';

const UserModal = ({ isOpen, onClose, userToEdit = null }) => {
  const { departments, roles, addUser, updateUser, users } = useAdmin();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    empId: '',
    role: 'Employee',
    department: 'Engineering',
    manager: 'None',
    joinDate: new Date().toISOString().split('T')[0],
    empType: 'Full-time',
    status: 'Active',
    address: '',
    notes: '',
    sendInvite: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        sendInvite: false
      });
    } else {
      // Auto-generate Employee ID
      const nextId = users.length + 1;
      setFormData(prev => ({
        ...prev,
        empId: `EMP-${String(nextId).padStart(3, '0')}`
      }));
    }
  }, [userToEdit, isOpen, users.length]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    // Check for unique email if adding new user
    if (!userToEdit && users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      newErrors.email = 'Email already exists';
    }

    if (!formData.empId.trim()) newErrors.empId = 'Employee ID is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (userToEdit) {
      updateUser(userToEdit.id, formData);
    } else {
      addUser(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white shadow-2xl z-[120] flex flex-col rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg">
                  {userToEdit ? <User size={22} /> : <UserPlus size={22} />}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-none">
                    {userToEdit ? 'Edit User Profile' : 'Add Workspace User'}
                  </h2>
                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mt-2 leading-none">
                    {userToEdit ? 'Update credentials' : 'New access credential'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-10 space-y-12">
                {/* Photo Upload Placeholder */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 group-hover:border-primary-400 group-hover:bg-primary-50 transition-all overflow-hidden">
                      {userToEdit?.img ? (
                        <img src={userToEdit.img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={32} />
                      )}
                    </div>
                    <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:text-primary-600 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Profile Photo</p>
                </div>

                {/* Section: Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe" 
                        className={cn(
                          "input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700",
                          errors.name && "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                        )} 
                      />
                      {errors.name && <p className="text-[10px] font-bold text-rose-500 mt-1 px-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Employee ID</label>
                      <input 
                        type="text" 
                        name="empId"
                        value={formData.empId}
                        onChange={handleChange}
                        placeholder="EMP-000" 
                        className={cn(
                          "input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700 uppercase",
                          errors.empId && "border-rose-300 bg-rose-50/50"
                        )}
                      />
                      {errors.empId && <p className="text-[10px] font-bold text-rose-500 mt-1 px-1">{errors.empId}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-4 text-slate-300 group-focus-within:text-primary-400 transition-colors" size={18} />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john.doe@org.com" 
                          className={cn(
                            "input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700",
                            errors.email && "border-rose-300 bg-rose-50/50"
                          )}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] font-bold text-rose-500 mt-1 px-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-4 text-slate-300 group-focus-within:text-primary-400 transition-colors" size={18} />
                        <input 
                          type="text" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 890" 
                          className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Work Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Work & Organization
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Organization Role</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-4 text-slate-300" size={18} />
                        <select 
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700 appearance-none"
                        >
                          {roles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Department</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-4 text-slate-300" size={18} />
                        <select 
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700 appearance-none"
                        >
                          <option value="None">None</option>
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Reporting Manager</label>
                      <select 
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700"
                      >
                        <option value="None">Direct Reporting (None)</option>
                        {users.filter(u => u.role !== 'Candidate' && u.id !== userToEdit?.id).map(u => (
                          <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Employment Type</label>
                      <select 
                        name="empType"
                        value={formData.empType}
                        onChange={handleChange}
                        className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700"
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Intern</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Joining Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-4 text-slate-300" size={18} />
                        <input 
                          type="date" 
                          name="joinDate"
                          value={formData.joinDate}
                          onChange={handleChange}
                          className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Status</label>
                      <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Extra Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Additional Details
                  </h3>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Residential Address</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field min-h-[100px] py-4 bg-slate-50 border-transparent resize-none text-sm font-medium" 
                      placeholder="Street, City, Zip Code..."
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Private Notes</label>
                    <textarea 
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="input-field min-h-[100px] py-4 bg-slate-50 border-transparent resize-none text-sm font-medium" 
                      placeholder="Background checks, internal feedback..."
                    ></textarea>
                  </div>
                </div>

                {/* Invitation Tool - Only for new users */}
                {!userToEdit && (
                  <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 border-dashed space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <Send size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">Onboarding Invitation</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Send credentials & workspace link</p>
                      </div>
                      <div className="ml-auto">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="sendInvite"
                            checked={formData.sendInvite}
                            onChange={handleChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>

                    {formData.sendInvite && (
                      <div className="pt-6 border-t border-indigo-100 flex items-center gap-4">
                        <button type="button" className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                          <LinkIcon size={14} />
                          Generate Invite Link
                        </button>
                        <span className="text-slate-200">|</span>
                        <p className="text-[10px] font-bold text-slate-400">Temporary password will be auto-generated</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 p-8 border-t border-slate-100 bg-white/80 backdrop-blur-md flex items-center gap-4">
                <button 
                  type="button"
                  onClick={onClose} 
                  className="flex-1 py-4 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  {userToEdit ? 'Save Changes' : (formData.sendInvite ? 'Create & Invite' : 'Create User')}
                  <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserModal;

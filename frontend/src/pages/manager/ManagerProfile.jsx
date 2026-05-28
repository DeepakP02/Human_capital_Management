import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Shield, Settings, Briefcase, Camera, 
  MapPin, Phone, Mail, Building, Clock, Activity, 
  Lock, Bell, Smartphone, Globe, AlertTriangle, Key,
  X, CheckCircle2, ChevronDown, Edit3, Save, Trash2, Eye, EyeOff, Users, Target, FileText
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import { useManager } from '../../context/ManagerContext';

const ManagerProfile = () => {
  const { user } = useAuth();
  const { showToast } = useManager();

  // Mode state
  const [isEditing, setIsEditing] = useState(false);
  
  // UI states
  const [activeTab, setActiveTab] = useState('personal');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const fileInputRef = useRef(null);
  
  // Data State
  const [profileData, setProfileData] = useState({
    personal: {
      fullName: user?.name || 'Michael Scott',
      email: user?.email || 'manager@hcm.ai',
      phone: '+1 (555) 234-5678',
      dob: '1982-04-15',
      gender: 'Male',
      address: '1725 Slough Avenue',
      city: 'Scranton',
      country: 'USA',
      bio: 'Regional Manager focus on team growth and sustainable results.'
    },
    work: {
      employeeId: 'MGR-00214',
      department: 'Product & Engineering',
      role: 'Regional Manager',
      reportingTo: 'Jan Levinson (VP)',
      joiningDate: '2019-06-01',
      location: 'SF Office - Floor 2',
      type: 'Full-Time'
    },
    teamScope: {
      teamSize: 18,
      directReports: 6,
      budget: '$250,000 / Quarter',
      projectsActive: 4
    },
    emergency: {
      contactName: 'Holly Flax',
      relation: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  // Handlers
  const handleSave = () => {
    if (isEditing) {
      if (!profileData.personal.fullName || !profileData.personal.email) {
         showToast('Error: Name and Email cannot be empty.', 'error');
         return;
      }
      setIsEditing(false);
      showToast('Profile updated successfully.');
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Updaters
  const updateField = (category, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Info', icon: Briefcase },
    { id: 'team', label: 'Team Scope', icon: Users },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manager Profile</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage your team leadership identity and records</p>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-secondary px-6 py-2.5 font-bold flex items-center gap-2">
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <button onClick={() => setIsEditing(false)} className="btn-secondary px-6 py-2.5 font-bold flex items-center gap-2">
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button onClick={handleSave} className="btn-primary px-8 py-2.5 font-bold flex items-center gap-2 shadow-xl shadow-primary-200">
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card p-6 bg-white shadow-soft text-center group">
              <div className="relative inline-block mb-4">
                 <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-50 relative">
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                    {isEditing && (
                       <label className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                          <Camera size={24} className="mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                       </label>
                    )}
                 </div>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{profileData.personal.fullName}</h2>
              <span className="mt-2 inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 rounded border border-primary-100">
                 {profileData.work.role}
              </span>
              
              <div className="mt-6 pt-6 border-t border-slate-50 text-left space-y-4">
                 <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{profileData.personal.email}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Last Login</p>
                    <p className="text-sm font-bold text-slate-700">Just now</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                       <span className="text-sm font-black text-emerald-600 tracking-tight">Active</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="card p-6 bg-white shadow-soft space-y-5">
              <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Quick Recap</h3>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Users size={18} className="text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Team Members</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">{profileData.teamScope.teamSize}</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Target size={18} className="text-indigo-500" />
                    <span className="text-sm font-bold text-slate-700">Active Goals</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">{profileData.teamScope.projectsActive}</span>
              </div>
           </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
           {/* Tabs */}
           <div className="flex overflow-x-auto border-b border-slate-100 hide-scrollbar bg-slate-50/50">
              {tabs.map((tab) => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.id;
                 return (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={cn(
                          "flex items-center gap-2 px-8 py-5 text-sm font-bold whitespace-nowrap transition-all border-b-2",
                          isActive ? "border-primary-600 text-primary-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                       )}
                    >
                       <Icon size={18} />
                       {tab.label}
                    </button>
                 );
              })}
           </div>

           <div className="p-8 flex-1 bg-white">
              <AnimatePresence mode="wait">
                 {/* PERSONAL INFO TAB */}
                 {activeTab === 'personal' && (
                    <motion.div key="personal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Full Name</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.fullName} onChange={e => updateField('personal', 'fullName', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Email <span className="text-red-400">*</span></label>
                             <input type="email" readOnly={!isEditing} value={profileData.personal.email} onChange={e => updateField('personal', 'email', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Phone</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.phone} onChange={e => updateField('personal', 'phone', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Gender</label>
                             <select disabled={!isEditing} value={profileData.personal.gender} onChange={e => updateField('personal', 'gender', e.target.value)} className={cn("input-field h-12 font-bold appearance-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                             </select>
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Date of Birth</label>
                             <input type="date" readOnly={!isEditing} value={profileData.personal.dob} onChange={e => updateField('personal', 'dob', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left md:col-span-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Address</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.address} onChange={e => updateField('personal', 'address', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left md:col-span-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Bio</label>
                             <textarea readOnly={!isEditing} value={profileData.personal.bio} onChange={e => updateField('personal', 'bio', e.target.value)} rows="3" className={cn("input-field py-3 font-bold resize-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* WORK INFO TAB */}
                 {activeTab === 'work' && (
                    <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Manager ID <span className="text-indigo-400 ml-1">(Read-Only)</span></label>
                             <input type="text" readOnly value={profileData.work.employeeId} className="input-field h-12 font-bold bg-slate-50 border-transparent text-slate-500 cursor-not-allowed" />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Role <span className="text-indigo-400 ml-1">(Read-Only)</span></label>
                             <input type="text" readOnly value={profileData.work.role} className="input-field h-12 font-bold bg-slate-50 border-transparent text-slate-500 cursor-not-allowed" />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Department</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.department} onChange={e => updateField('work', 'department', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Reporting To</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.reportingTo} onChange={e => updateField('work', 'reportingTo', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Joining Date</label>
                             <input type="date" readOnly={!isEditing} value={profileData.work.joiningDate} onChange={e => updateField('work', 'joiningDate', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Work Location</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.location} onChange={e => updateField('work', 'location', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* TEAM SCOPE TAB */}
                 {activeTab === 'team' && (
                    <motion.div key="team" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Team Size</label>
                             <input type="number" readOnly={!isEditing} value={profileData.teamScope.teamSize} onChange={e => updateField('teamScope', 'teamSize', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Direct Reports</label>
                             <input type="number" readOnly={!isEditing} value={profileData.teamScope.directReports} onChange={e => updateField('teamScope', 'directReports', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Quarterly Budget</label>
                             <input type="text" readOnly={!isEditing} value={profileData.teamScope.budget} onChange={e => updateField('teamScope', 'budget', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Active Projects</label>
                             <input type="number" readOnly={!isEditing} value={profileData.teamScope.projectsActive} onChange={e => updateField('teamScope', 'projectsActive', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* EMERGENCY TAB */}
                 {activeTab === 'emergency' && (
                    <motion.div key="emergency" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Contact Name</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.contactName} onChange={e => updateField('emergency', 'contactName', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Relation</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.relation} onChange={e => updateField('emergency', 'relation', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 text-left md:col-span-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 text-left">Phone Number</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.phone} onChange={e => updateField('emergency', 'phone', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* DOCUMENTS TAB */}
                 {activeTab === 'documents' && (
                    <motion.div key="documents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                       <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold text-slate-900">Employment Records</h3>
                         <button className="btn-secondary px-4 py-2 font-bold text-sm">Upload New</button>
                       </div>
                       <div className="grid grid-cols-1 gap-4">
                          {[
                             { name: 'Offer_Letter_2019.pdf', size: '1.2 MB', date: 'June 01, 2019' },
                             { name: 'Performance_Review_2025.pdf', size: '850 KB', date: 'Jan 15, 2026' },
                             { name: 'Certification_Agile_Manager.png', size: '2.4 MB', date: 'May 10, 2024' },
                          ].map((doc, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                   <div className="p-3 bg-white rounded-xl text-slate-400">
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.size} • {doc.date}</p>
                                   </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                   <X size={18} className="rotate-45" />
                                </button>
                             </div>
                          ))}
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;

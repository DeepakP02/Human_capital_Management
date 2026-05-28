import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Shield, Settings, Briefcase, Camera, 
  MapPin, Phone, Mail, Building, Clock, Activity, 
  Lock, Bell, Smartphone, Globe, AlertTriangle, Key,
  X, CheckCircle2, ChevronDown, Edit3, Save, Trash2, Eye, EyeOff, FileText, Upload, Download
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import { useHR } from '../../context/HRContext';

const HRProfile = () => {
  const { user } = useAuth();
  const { showToast } = useHR();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    personal: {
      fullName: user?.name || 'HR Manager',
      email: user?.email || 'hr@demo.com',
      phone: '+1 (555) 234-5678',
      dob: '1988-08-20',
      gender: 'Female',
      address: '456 HR Blvd',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    work: {
      employeeId: 'EMP-00215',
      role: 'Human Resources Manager',
      department: 'HR & Operations',
      designation: 'Senior HR Lead',
      managerName: 'Michael Scott',
      joinDate: '2020-05-10',
      type: 'Full-Time',
      location: 'NY Office - Floor 2',
      shiftTiming: '9:00 AM - 5:00 PM',
      status: 'Active'
    },
    emergency: {
      contactName: 'Robert Smith',
      relation: 'Spouse',
      phone: '+1 (555) 987-6543',
      alternatePhone: '+1 (555) 123-9999',
      email: 'robert.smith@email.com',
      address: '456 HR Blvd, New York, NY 10001'
    },
    documents: [
      { id: 1, name: 'Resume_2023.pdf', type: 'Resume', date: 'Oct 12, 2023' },
      { id: 2, name: 'ID_Proof_Passport.pdf', type: 'ID Proof', date: 'May 10, 2020' },
      { id: 3, name: 'Offer_Letter.pdf', type: 'Offer Letter', date: 'April 25, 2020' },
      { id: 4, name: 'SHRM_Certificate.pdf', type: 'Certificate', date: 'Jan 15, 2022' }
    ]
  });

  const handleSave = () => {
    if (isEditing) {
      if (!profileData.personal.fullName || !profileData.personal.email) {
         showToast('Error: Name and Email cannot be empty.', 'error');
         return;
      }
      setIsEditing(false);
      showToast('Profile updated securely.');
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateField = (category, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const deleteDocument = (id) => {
    setProfileData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
    showToast('Document deleted.');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Details', icon: Briefcase },
    { id: 'emergency', label: 'Emergency Contact', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">HR Profile</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage your professional identity and records</p>
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
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{profileData.personal.phone}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Join Date</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{profileData.work.joinDate}</p>
                 </div>
              </div>
           </div>

           <div className="card p-6 bg-white shadow-soft space-y-5 flex flex-col justify-center">
               <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Account Status</h3>
               <div className="flex items-center gap-3 justify-center mb-2 mt-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 shadow-sm border border-emerald-100">
                     <CheckCircle2 size={28} />
                  </div>
               </div>
               <p className="text-center text-sm font-bold text-emerald-600 uppercase tracking-widest">Active & Verified</p>
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
                          <div className="space-y-2 relative">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.fullName} onChange={e => updateField('personal', 'fullName', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Email <span className="text-red-400">*</span></label>
                             <input type="email" readOnly={!isEditing} value={profileData.personal.email} onChange={e => updateField('personal', 'email', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Phone</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.phone} onChange={e => updateField('personal', 'phone', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Gender</label>
                             <select disabled={!isEditing} value={profileData.personal.gender} onChange={e => updateField('personal', 'gender', e.target.value)} className={cn("input-field h-12 font-bold appearance-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Date of Birth</label>
                             <input type="date" readOnly={!isEditing} value={profileData.personal.dob} onChange={e => updateField('personal', 'dob', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 md:col-span-2 pt-4 border-t border-slate-50">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Address Location</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.address} onChange={e => updateField('personal', 'address', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">City</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.city} onChange={e => updateField('personal', 'city', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">State</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.state} onChange={e => updateField('personal', 'state', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Country</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.country} onChange={e => updateField('personal', 'country', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Zip Code</label>
                             <input type="text" readOnly={!isEditing} value={profileData.personal.zipCode} onChange={e => updateField('personal', 'zipCode', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* WORK INFO TAB */}
                 {activeTab === 'work' && (
                    <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Employee ID <span className="text-indigo-400 ml-1">(Read-Only)</span></label>
                             <input type="text" readOnly value={profileData.work.employeeId} className="input-field h-12 font-bold bg-slate-50 border-transparent text-slate-500 cursor-not-allowed" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Designation</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.designation} onChange={e => updateField('work', 'designation', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Department</label>
                             <select disabled={!isEditing} value={profileData.work.department} onChange={e => updateField('work', 'department', e.target.value)} className={cn("input-field h-12 font-bold appearance-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")}>
                                <option>Engineering & IT</option>
                                <option>Human Resources</option>
                                <option>HR & Operations</option>
                                <option>Finance</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Manager Name</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.managerName} onChange={e => updateField('work', 'managerName', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Join Date</label>
                             <input type="date" readOnly={!isEditing} value={profileData.work.joinDate} onChange={e => updateField('work', 'joinDate', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Work Location</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.location} onChange={e => updateField('work', 'location', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Employment Type</label>
                             <select disabled={!isEditing} value={profileData.work.type} onChange={e => updateField('work', 'type', e.target.value)} className={cn("input-field h-12 font-bold appearance-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")}>
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Contract</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Shift Timing</label>
                             <input type="text" readOnly={!isEditing} value={profileData.work.shiftTiming} onChange={e => updateField('work', 'shiftTiming', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* EMERGENCY CONTACT TAB */}
                 {activeTab === 'emergency' && (
                    <motion.div key="emergency" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-1">
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Contact Name</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.contactName} onChange={e => updateField('emergency', 'contactName', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Relationship</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.relation} onChange={e => updateField('emergency', 'relation', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.phone} onChange={e => updateField('emergency', 'phone', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Alternate Number</label>
                             <input type="text" readOnly={!isEditing} value={profileData.emergency.alternatePhone} onChange={e => updateField('emergency', 'alternatePhone', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Email</label>
                             <input type="email" readOnly={!isEditing} value={profileData.emergency.email} onChange={e => updateField('emergency', 'email', e.target.value)} className={cn("input-field h-12 font-bold", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                             <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Address</label>
                             <textarea readOnly={!isEditing} value={profileData.emergency.address} onChange={e => updateField('emergency', 'address', e.target.value)} rows="3" className={cn("input-field py-3 font-bold resize-none", isEditing ? "bg-white" : "bg-slate-50 border-transparent text-slate-600 cursor-default")} />
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {/* DOCUMENTS TAB */}
                 {activeTab === 'documents' && (
                    <motion.div key="documents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900">Personal Documents</h3>
                          <button onClick={() => showToast('Opening file uploader...')} className="btn-primary px-4 py-2 font-bold flex items-center gap-2 shadow-sm text-sm">
                             <Upload size={16} />
                             <span>Upload File</span>
                          </button>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {profileData.documents.map(doc => (
                             <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary-200 transition-colors">
                                <div className="flex items-center gap-4">
                                   <div className="p-3 bg-white rounded-xl text-primary-500 shadow-sm border border-slate-100">
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{doc.name}</p>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{doc.type} • {doc.date}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => showToast(`Downloading ${doc.name}...`)} className="p-2 text-slate-500 hover:text-primary-600 hover:bg-white rounded-lg shadow-sm transition-all" title="Download">
                                      <Download size={16} />
                                   </button>
                                   <button onClick={() => showToast(`Viewing ${doc.name}...`)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm transition-all" title="View">
                                      <Eye size={16} />
                                   </button>
                                   <button onClick={() => deleteDocument(doc.id)} className="p-2 text-slate-500 hover:text-rose-500 hover:bg-white rounded-lg shadow-sm transition-all" title="Delete">
                                      <Trash2 size={16} />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                       {profileData.documents.length === 0 && (
                          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 bg-slate-50">
                             <FileText size={32} className="mb-4 text-slate-300" />
                             <p className="text-sm font-bold">No documents uploaded yet.</p>
                          </div>
                       )}
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;

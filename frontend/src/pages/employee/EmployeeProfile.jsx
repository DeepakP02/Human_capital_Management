import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Briefcase, ShieldCheck, Calendar, Award, FolderLock, 
  Edit2, Save, X, Building2, CheckCircle2, Star, Camera, Plus, Trash2, Download, Eye, FileText
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';

const EmployeeProfile = () => {
  const { profile, setProfile, documents, showToast } = useEmployee();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Details', icon: Briefcase },
    { id: 'emergency', label: 'Emergency Contacts', icon: ShieldCheck },
    { id: 'documents', label: 'Documents', icon: FolderLock },
  ];

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
    showToast('Profile updated successfully');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result });
        if (!isEditing) setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateNested = (category, field, value) => {
    setEditData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Profile</h1>
          <p className="text-slate-500 font-bold tracking-tight">Manage your personal and professional identity</p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button onClick={() => { setIsEditing(false); setEditData(profile); }} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button onClick={handleSave} className="btn-primary px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary-200">
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
              <Edit2 size={18} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
           
           {/* Profile Photo & Summary */}
           <div className="card p-8 bg-white border-none shadow-soft text-center group">
              <div className="relative inline-block mb-6">
                 <div className="w-40 h-40 rounded-[2.5rem] bg-slate-50 p-1 border-4 border-white shadow-2xl overflow-hidden relative transition-all duration-500">
                    <img 
                      src={isEditing ? editData.avatar : profile.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-[2rem]" 
                    />
                    <label className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                       <div className="flex flex-col items-center text-white">
                          <Camera size={24} />
                          <span className="text-[10px] font-black uppercase mt-1">Change</span>
                       </div>
                       <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                    <CheckCircle2 size={20} />
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-none">{profile.fullName}</h3>
              <p className="text-primary-600 font-black uppercase tracking-widest text-xs mt-3">{profile.role}</p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                 <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200">{profile.department}</span>
                 <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary-100">{profile.employeeId}</span>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                 <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={16} className="text-slate-300" />
                    <span className="text-sm font-bold truncate">{profile.email}</span>
                 </div>
                 <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={16} className="text-slate-300" />
                    <span className="text-sm font-bold truncate">{profile.address.split(',')[1] || profile.address}</span>
                 </div>
              </div>
           </div>

           {/* Skills Card (Preview) */}
           <div className="card p-8 bg-white border-none shadow-soft">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Core Expertise</h4>
                 <Star size={18} className="text-amber-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                 {['React', 'Node.js', 'Typescript', 'Tailwind'].map((skill, i) => (
                    <span key={i} className="px-3 py-2 bg-slate-50 text-slate-700 text-xs font-black rounded-xl border border-slate-100 italic">
                       #{skill}
                    </span>
                 ))}
                 <button className="px-3 py-2 border-2 border-dashed border-slate-100 text-slate-300 text-xs font-black rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Plus size={14} />
                 </button>
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section Tabs */}
           <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-soft border border-slate-50">
              {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                      "flex-1 flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                      activeTab === tab.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                   )}
                 >
                    <tab.icon size={18} />
                    <span className="hidden md:inline">{tab.label}</span>
                 </button>
              ))}
           </div>

           {/* Details Panel */}
           <div className="card min-h-[600px] bg-white border-none shadow-soft p-10 overflow-hidden">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                 >
                    {activeTab === 'personal' && (
                       <div className="space-y-12">
                          <div className="space-y-8">
                             <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-l-4 border-primary-600 pl-4 leading-none">Personal Data</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {[
                                   { label: 'Full Name', value: editData.fullName, field: 'fullName' },
                                   { label: 'Email Address', value: editData.email, field: 'email', type: 'email' },
                                   { label: 'Phone Number', value: editData.phone, field: 'phone' },
                                   { label: 'Date of Birth', value: editData.dob, field: 'dob', type: 'date' },
                                   { label: 'Blood Group', value: editData.bloodGroup, field: 'bloodGroup' },
                                   { label: 'Gender', value: editData.gender, field: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                                ].map((field, i) => (
                                   <div key={i} className="space-y-2 text-left">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                                      {isEditing ? (
                                         field.type === 'select' ? (
                                            <select 
                                              value={editData[field.field]} 
                                              onChange={(e) => setEditData({ ...editData, [field.field]: e.target.value })} 
                                              className="input-field h-14 bg-slate-50 border-transparent font-bold"
                                            >
                                               {field.options.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                         ) : (
                                            <input 
                                              type={field.type || 'text'} 
                                              value={editData[field.field]} 
                                              onChange={(e) => setEditData({ ...editData, [field.field]: e.target.value })} 
                                              className="input-field h-14 bg-slate-50 border-transparent font-bold" 
                                            />
                                         )
                                      ) : (
                                         <p className="px-1 text-sm font-black text-slate-800">{profile[field.field] || 'Not specified'}</p>
                                      )}
                                   </div>
                                ))}
                                <div className="space-y-2 text-left md:col-span-2">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Residential Address</label>
                                   {isEditing ? (
                                      <textarea 
                                        rows="2" 
                                        value={editData.address} 
                                        onChange={(e) => setEditData({ ...editData, address: e.target.value })} 
                                        className="input-field py-4 bg-slate-50 border-transparent font-bold resize-none"
                                      />
                                   ) : (
                                      <p className="px-1 text-sm font-black text-slate-800">{profile.address}</p>
                                   )}
                                </div>
                             </div>
                          </div>
                       </div>
                    )}

                    {activeTab === 'work' && (
                       <div className="space-y-12">
                          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-l-4 border-indigo-600 pl-4 leading-none">Job Profile</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                             {[
                                { label: 'Employee ID', value: profile.employeeId, icon: ShieldCheck, readonly: true },
                                { label: 'Department', value: profile.department, icon: Building2, readonly: true },
                                { label: 'Current Role', value: profile.role, icon: Briefcase, readonly: true },
                                { label: 'Manager', value: profile.manager, icon: User, readonly: true },
                                { label: 'Joining Date', value: profile.joiningDate, icon: Calendar, readonly: true },
                             ].map((field, i) => (
                                <div key={i} className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                      <field.icon size={20} />
                                   </div>
                                   <div>
                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{field.label}</p>
                                      <p className="text-sm font-black text-slate-900 leading-none">{field.value}</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    )}

                    {activeTab === 'emergency' && (
                       <div className="space-y-12">
                          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-l-4 border-rose-600 pl-4 leading-none">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                             {[
                                { label: 'Contact Name', value: editData.emergencyContact.name, field: 'name' },
                                { label: 'Relationship', value: editData.emergencyContact.relation, field: 'relation' },
                                { label: 'Primary Phone', value: editData.emergencyContact.phone, field: 'phone' },
                             ].map((field, i) => (
                                <div key={i} className="space-y-2 text-left">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                                   {isEditing ? (
                                      <input 
                                        type="text" 
                                        value={field.value} 
                                        onChange={(e) => updateNested('emergencyContact', field.field, e.target.value)} 
                                        className="input-field h-14 bg-slate-50 border-transparent font-bold" 
                                      />
                                   ) : (
                                      <p className="px-1 text-sm font-black text-slate-800">{profile.emergencyContact[field.field]}</p>
                                   )}
                                </div>
                             ))}
                          </div>
                       </div>
                    )}

                    {activeTab === 'documents' && (
                       <div className="space-y-10">
                          <div className="flex items-center justify-between">
                             <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-l-4 border-emerald-600 pl-4 leading-none">Employment Record</h3>
                             <button className="btn-secondary px-5 py-2 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                                <Plus size={16} /> Add New
                             </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                             {documents.map((doc) => (
                                <div key={doc.id} className="group p-5 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl transition-all flex items-center justify-between">
                                   <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                                         <FileText size={24} />
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-slate-900 leading-none">{doc.name}</p>
                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{doc.category} • {doc.size} • {doc.date}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-3 bg-white text-slate-400 hover:text-primary-600 border border-slate-100 rounded-2xl shadow-sm transition-all"><Eye size={18} /></button>
                                      <button className="p-3 bg-white text-slate-400 hover:text-emerald-600 border border-slate-100 rounded-2xl shadow-sm transition-all"><Download size={18} /></button>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

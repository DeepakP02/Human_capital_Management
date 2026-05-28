import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  RotateCcw, 
  MoreVertical, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  X, 
  Mail, 
  Phone, 
  Briefcase,
  Target,
  BarChart3,
  TrendingUp,
  MapPin,
  ExternalLink,
  MessageSquare,
  FileText
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useManager } from '../../context/ManagerContext';
import CenterModal from '../../components/common/CenterModal';

const TeamMembers = () => {
  const { teamMembers, addTeamMember, showToast } = useManager();
  
  // UI States
  const [selectedMember, setSelectedMember] = useState(null);
  const [profileTab, setProfileTab] = useState('summary');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Form State
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '', department: 'Engineering', phone: '', joinDate: '' });

  // Filtering Logic
  const filteredTeam = useMemo(() => {
    return teamMembers.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           m.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter ? m.department === deptFilter : true;
      const matchesRating = ratingFilter ? m.rating >= parseFloat(ratingFilter) : true;
      return matchesSearch && matchesDept && matchesRating;
    });
  }, [teamMembers, searchQuery, deptFilter, ratingFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setDeptFilter('');
    setRatingFilter('');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.role) {
      showToast('Please fill in required fields.', 'error');
      return;
    }
    addTeamMember({ ...newMember, status: 'Online', rating: 0, img: `https://i.pravatar.cc/150?u=${newMember.name}` });
    setShowAddModal(false);
    setNewMember({ name: '', email: '', role: '', department: 'Engineering', phone: '', joinDate: '' });
    showToast(`${newMember.name} added to the team.`);
  };

  const handleExport = () => {
    showToast('Exporting team list to CSV...');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Members</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage your team's access, view performance and assign roles</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export List</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-6 border-none bg-white shadow-soft flex flex-col lg:flex-row items-center gap-4 overflow-visible">
        <div className="relative flex-1 w-full text-slate-400">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or role..." 
            className="input-field pl-10 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select 
            className="input-field h-11 pr-10 w-full sm:w-44 font-bold text-slate-600 appearance-none bg-no-repeat bg-[right_1rem_center]"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select 
            className="input-field h-11 pr-10 w-full sm:w-36 font-bold text-slate-600 appearance-none bg-no-repeat bg-[right_1rem_center]"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ ★</option>
            <option value="4.0">4.0+ ★</option>
            <option value="3.5">3.5+ ★</option>
          </select>
          <button 
            onClick={resetFilters}
            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Team Table */}
      <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Member Info</th>
                <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Position / Dept</th>
                <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Avg Rating</th>
                <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Status</th>
                <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredTeam.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                         <img src={user.img} alt={user.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm" />
                         <div className={cn(
                            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm",
                            user.status === 'Online' || user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                         )} />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 leading-none">{user.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-700 leading-none">{user.role}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{user.department}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-1.5">
                       <Star size={14} className={cn("fill-amber-400", user.rating > 0 ? "text-amber-400" : "text-slate-200")} />
                       <span className="font-black text-slate-900">{user.rating || '-'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                      user.status === 'Active' || user.status === 'Online' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                    )}>{user.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedMember(user)}
                      className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                       <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTeam.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-40">
                         <Users size={48} className="text-slate-300" />
                         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No team members found</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Profile Modal */}
      <CenterModal 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
        title="Member Performance Profile" 
        maxWidth="max-w-4xl"
      >
         {selectedMember && (
            <div className="flex flex-col h-full overflow-hidden">
               {/* Hero Section */}
               <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row items-center gap-8 bg-slate-50/50">
                  <img src={selectedMember.img} className="w-32 h-32 rounded-[2.5rem] object-cover ring-8 ring-white shadow-2xl" />
                  <div className="text-center md:text-left flex-1">
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMember.name}</h2>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">
                          {selectedMember.status}
                        </span>
                     </div>
                     <p className="text-primary-600 font-black uppercase tracking-[0.15em] text-xs pb-4 border-b border-white pr-4 inline-block">{selectedMember.role}</p>
                     
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6">
                        <div className="flex items-center gap-2 text-slate-500">
                           <Mail size={16} /> <span className="text-sm font-bold">{selectedMember.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                           <Phone size={16} /> <span className="text-sm font-bold">{selectedMember.phone || '+1 555-0123'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                           <MapPin size={16} /> <span className="text-sm font-bold">San Francisco, CA</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Tabs */}
               <div className="flex items-center gap-2 px-8 border-b border-slate-100 bg-white overflow-x-auto hide-scrollbar">
                  {[
                    { id: 'summary', label: 'Summary', icon: LayoutGrid },
                    { id: 'attendance', label: 'Attendance', icon: Clock },
                    { id: 'tasks', label: 'Team Tasks', icon: CheckCircle2 },
                    { id: 'kpi', label: 'KPI Index', icon: Target },
                    { id: 'notes', label: 'Internal Notes', icon: MessageSquare }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setProfileTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2.5 px-6 py-5 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                        profileTab === tab.id ? "text-primary-600 border-primary-600" : "text-slate-400 border-transparent hover:text-slate-600"
                      )}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  ))}
               </div>

               {/* Tab Content */}
               <div className="p-8 flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                     {profileTab === 'summary' && (
                        <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 text-left">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center items-center h-32">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Performance</p>
                                 <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-slate-900">{selectedMember.rating || 'N/A'}</span>
                                    <Star size={16} className="text-amber-400 fill-amber-400 ml-1" />
                                 </div>
                              </div>
                              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center items-center h-32">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Task Ratio</p>
                                 <span className="text-3xl font-black text-slate-900">12 / 15</span>
                              </div>
                              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center items-center h-32">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reliability</p>
                                 <span className="text-3xl font-black text-emerald-600">98%</span>
                              </div>
                           </div>
                           
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-3">Professional Insight</h4>
                              <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                                "{selectedMember.name} has been a core member of the {selectedMember.department} team since their joining. Demonstrates high adaptability and consistent delivery quality in agile sprints."
                              </p>
                           </div>

                           <div className="grid grid-cols-2 gap-8 pt-4">
                              <div className="space-y-1.5">
                                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                                 <p className="text-sm font-bold text-slate-800">{selectedMember.department}</p>
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joining Date</label>
                                 <p className="text-sm font-bold text-slate-800">{selectedMember.joinDate || 'Jan 15, 2023'}</p>
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {profileTab === 'attendance' && (
                        <motion.div key="attendance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 text-left">
                           <div className="card p-6 bg-slate-900 border-none shadow-xl text-white relative overflow-hidden h-32 flex flex-col justify-center">
                              <div className="flex items-center justify-between relative z-10">
                                 <div>
                                    <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1.5">Monthly Attendance Score</p>
                                    <h4 className="text-3xl font-black tracking-tight">98.5% Efficiency</h4>
                                 </div>
                                 <TrendingUp size={40} className="text-primary-500 opacity-20" />
                              </div>
                           </div>
                           <div className="grid grid-cols-7 gap-2">
                              {Array.from({ length: 31 }).map((_, i) => (
                                 <div key={i} className={cn(
                                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border border-slate-100",
                                    i === 24 || i === 25 ? "bg-slate-50 opacity-40 text-slate-300" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                 )}>
                                    <span className="text-[9px] font-black opacity-40">{i+1}</span>
                                    <CheckCircle2 size={12} className={i === 24 || i === 25 ? "hidden" : "block"} />
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     )}

                     {profileTab === 'tasks' && (
                        <motion.div key="tasks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 text-left">
                           <div className="flex items-center justify-between mb-2">
                             <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Current Assignments</h4>
                             <button className="text-[10px] font-black text-primary-500 uppercase hover:underline">Assign Task</button>
                           </div>
                           {[
                             { title: 'Landing Page Re-architecture', priority: 'High', due: 'Tomorrow', progress: 75 },
                             { title: 'Global CSS Variables Audit', priority: 'Medium', due: 'Oct 28', progress: 20 },
                             { title: 'API Integration with Core API', priority: 'High', due: 'Nov 02', progress: 0 },
                           ].map((task, i) => (
                             <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group">
                                <div className="flex items-center justify-between mb-3 text-left">
                                   <div className="text-left">
                                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{task.title}</p>
                                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Due {task.due} • {task.priority} Priority</p>
                                   </div>
                                   <div className="text-right">
                                      <span className="text-xs font-black text-slate-900">{task.progress}%</span>
                                   </div>
                                </div>
                                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden p-[1px]">
                                   <div className="h-full bg-primary-600 rounded-full" style={{ width: `${task.progress}%` }} />
                                </div>
                             </div>
                           ))}
                        </motion.div>
                     )}

                     {profileTab === 'kpi' && (
                        <motion.div key="kpi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 text-left">
                           <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] text-center">
                              <h4 className="text-3xl font-black text-indigo-900 mb-1">Elite Performer</h4>
                              <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Calculated across 8 core metrics</p>
                           </div>
                           <div className="space-y-4">
                              {[
                                { label: 'Code Quality', score: 92 },
                                { label: 'Peer Collaboration', score: 88 },
                                { label: 'Deadline Reliability', score: 95 },
                                { label: 'Innovation Contribution', score: 74 },
                              ].map((m, i) => (
                                <div key={i} className="flex items-center gap-4">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-40 shrink-0">{m.label}</span>
                                   <div className="flex-1 h-3 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]" style={{ width: `${m.score}%` }} />
                                   </div>
                                   <span className="text-xs font-black text-slate-900 w-10 text-right">{m.score}%</span>
                                </div>
                              ))}
                           </div>
                        </motion.div>
                     )}

                     {profileTab === 'notes' && (
                       <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 text-left">
                          <textarea 
                            placeholder="Add internal performance notes for this member..." 
                            className="w-full h-40 input-field py-4 resize-none font-medium text-slate-700 bg-slate-50 border-transparent placeholder:text-slate-300"
                          />
                          <div className="flex justify-end">
                            <button className="btn-primary px-6 py-2.5 font-black text-xs uppercase tracking-widest">Post Internal Note</button>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-50">
                             <div className="p-4 bg-slate-50 rounded-2xl text-left italic relative group">
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">"Candidate for Senior Lead promotion by end of Year. Consistently mentors juniors."</p>
                                <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest">— Michael Scott, Oct 12</p>
                             </div>
                          </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               {/* Footer */}
               <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
                  <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                     <Target size={18} />
                     <span>Assign New Goal</span>
                  </button>
                  <button className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl flex items-center justify-center gap-2">
                     <BarChart3 size={18} />
                     <span>Initiate Review</span>
                  </button>
               </div>
            </div>
         )}
      </CenterModal>

      {/* Add Member Modal */}
      <CenterModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Add New Team Member"
      >
         <form onSubmit={handleAddMember} className="p-10 space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Pam Beesly" 
                    className="input-field h-14 font-bold"
                    value={newMember.name}
                    onChange={e => setNewMember({...newMember, name: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="pam@globaltech.ai" 
                    className="input-field h-14 font-bold"
                    value={newMember.email}
                    onChange={e => setNewMember({...newMember, email: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Primary Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sales Representative" 
                    className="input-field h-14 font-bold"
                    value={newMember.role}
                    onChange={e => setNewMember({...newMember, role: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Department</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newMember.department}
                    onChange={e => setNewMember({...newMember, department: e.target.value})}
                  >
                     <option>Engineering</option>
                     <option>Product</option>
                     <option>Design</option>
                     <option>Sales</option>
                     <option>HR</option>
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+1 555-0000" 
                    className="input-field h-14 font-bold"
                    value={newMember.phone}
                    onChange={e => setNewMember({...newMember, phone: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Joining Date</label>
                  <input 
                    type="date" 
                    className="input-field h-14 font-bold"
                    value={newMember.joinDate}
                    onChange={e => setNewMember({...newMember, joinDate: e.target.value})}
                  />
               </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
               <button type="submit" className="btn-primary w-full py-4 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-100">Confirm Onboarding</button>
               <button 
                 type="button" 
                 onClick={() => setShowAddModal(false)}
                 className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors"
               >Cancel Registration</button>
            </div>
         </form>
      </CenterModal>
    </div>
  );
};

export default TeamMembers;

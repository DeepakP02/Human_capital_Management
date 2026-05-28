import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Mail, Calendar, CheckCircle2, 
  Clock, MoreVertical, Download, X, Briefcase, 
  Monitor, FileText, ChevronRight, Users, 
  ArrowUpRight, Send, Trash2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHR } from '../../context/HRContext';

const Onboarding = () => {
  const { onboarding, addOnboarding, updateOnboarding, deleteOnboarding, showToast } = useHR();

  const [selectedHire, setSelectedHire] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    name: '', role: '', department: 'Sales', manager: '', joiningDate: ''
  });

  const stats = [
    { label: 'New Joiners', value: onboarding.length, icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Pending Docs', value: onboarding.filter(o=>o.status==='Awaiting Documents').length, icon: FileText, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'In Progress', value: onboarding.filter(o=>o.status==='In Progress').length, icon: Clock, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Ready to Start', value: onboarding.filter(o=>o.status==='Ready').length, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  ];

  const steps = [
    { id: 1, label: 'Offer Accepted' },
    { id: 2, label: 'Docs Submitted' },
    { id: 3, label: 'Account Created' },
    { id: 4, label: 'Laptop Assigned' },
    { id: 5, label: 'Orientation' },
  ];

  const handleOpenCreate = () => {
    setFormData({ name: '', role: '', department: 'Sales', manager: '', joiningDate: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOnboarding(formData);
    setIsModalOpen(false);
  };

  const toggleStep = (hire, stepIdx) => {
    let newProgress = hire.progress;
    const stepValue = 20;
    
    // Toggle logic
    const isDone = (stepIdx * stepValue) < hire.progress;
    if (isDone) {
       newProgress = stepIdx * stepValue; // rollback
    } else {
       newProgress = (stepIdx + 1) * stepValue;
    }
    
    let newStatus = hire.status;
    if (newProgress === 100) newStatus = 'Ready';
    else if (newProgress === 0) newStatus = 'Not Started';
    else if (newProgress <= 40) newStatus = 'Awaiting Documents';
    else newStatus = 'In Progress';

    updateOnboarding(hire.id, { progress: newProgress, status: newStatus });
    if(selectedHire && selectedHire.id === hire.id) {
       setSelectedHire({ ...hire, progress: newProgress, status: newStatus });
    }
  };

  const completeAllSteps = (hire) => {
    updateOnboarding(hire.id, { progress: 100, status: 'Ready' });
    if(selectedHire && selectedHire.id === hire.id) {
       setSelectedHire({ ...hire, progress: 100, status: 'Ready' });
    }
    showToast('All steps marked as completed');
  };

  const filteredOnboards = onboarding.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All Status' || !filterStatus ? true : o.status.includes(filterStatus) || (filterStatus === 'Completed' && o.progress === 100);
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Onboarding</h1>
          <p className="text-slate-500 font-medium">Coordinate the transition and preparation for your new hires</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Welcome emails sent')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Send size={18} />
            <span className="hidden sm:inline">Send Welcome Email</span>
          </button>
          <button onClick={handleOpenCreate} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Add New Hire</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="card p-6 bg-white border border-slate-100 shadow-soft">
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card p-0 border-none bg-white shadow-soft overflow-hidden min-h-[400px]">
         <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative flex-1 w-full max-w-sm">
               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
               <input type="text" placeholder="Search new hire..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10 h-11" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Filter:</span>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field h-11 w-full sm:w-36 font-bold text-slate-600">
                  <option>All Status</option>
                  <option>In Progress</option>
                  <option value="Completed">Completed</option>
                  <option>Ready</option>
               </select>
            </div>
         </div>
        
        {filteredOnboards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Briefcase size={48} className="mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-slate-700">No onboarding tasks found</h3>
            <p className="mt-2 text-sm font-medium">Clear filters or add a new hire.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">
                  <th className="px-6 py-4">New Employee</th>
                  <th className="px-6 py-4">Position / Dept</th>
                  <th className="px-6 py-4">Manager</th>
                  <th className="px-6 py-4">Joining Date</th>
                  <th className="px-6 py-4">Onboarding Progress</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredOnboards.map((hire) => (
                  <tr key={hire.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5 cursor-pointer" onClick={() => setSelectedHire(hire)}>
                      <div className="flex items-center gap-4">
                        <img src={hire.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(hire.name)}&background=random`} alt={hire.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                        <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{hire.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 cursor-pointer" onClick={() => setSelectedHire(hire)}>
                      <p className="font-bold text-slate-700">{hire.role}</p>
                      <p className="text-xs font-medium text-slate-400">{hire.department}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-700">{hire.manager}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                         <Calendar size={14} className="opacity-40" />
                         {hire.joiningDate || hire.start || 'TBD'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                         <div className="flex justify-between items-center px-0.5">
                            <span className={cn(
                               "text-[10px] font-bold uppercase tracking-widest",
                               hire.progress === 100 ? "text-emerald-500" : "text-primary-600"
                            )}>
                               {hire.status}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900">{hire.progress}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${hire.progress}%` }}
                              className={cn(
                                 "h-full rounded-full transition-all duration-1000",
                                 hire.progress === 100 ? "bg-emerald-500" : "bg-primary-600"
                              )} 
                            />
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right flex justify-end gap-1">
                      <button onClick={() => setSelectedHire(hire)} className="p-2 text-slate-300 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all" title="View Details">
                        <ChevronRight size={20} />
                      </button>
                      <button onClick={() => deleteOnboarding(hire.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedHire && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedHire(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 20 }} 
               className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-4">
                     <img src={selectedHire.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedHire.name)}&background=random`} alt={selectedHire.name} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-xl" />
                     <div>
                        <h2 className="text-xl font-extrabold text-slate-900 leading-none">{selectedHire.name}</h2>
                        <p className="text-sm font-bold text-primary-600 mt-1">{selectedHire.role}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedHire(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-10">
                  <section>
                     <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        Onboarding Checklist
                     </h3>
                     <div className="space-y-4">
                        {steps.map((step, idx) => {
                           const isDone = idx * 20 < selectedHire.progress;
                           const isNext = !isDone && (idx - 1) * 20 < selectedHire.progress;
                           
                           return (
                              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className={cn(
                                       "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                                       isDone ? "bg-emerald-500 text-white shadow-lg" : isNext ? "bg-primary-600 text-white ring-4 ring-primary-50" : "bg-white text-slate-300 border border-slate-200"
                                    )}>
                                       {isDone ? <CheckCircle2 size={18} /> : idx + 1}
                                    </div>
                                    <span className={cn("text-sm font-bold", isDone ? "text-slate-400 line-through" : "text-slate-700")}>{step.label}</span>
                                 </div>
                                 <button onClick={() => toggleStep(selectedHire, idx)} className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all",
                                    isDone ? "text-slate-400 hover:text-rose-500" : "text-primary-600 hover:bg-primary-100"
                                 )}>
                                    {isDone ? "Reopen" : "Complete"}
                                 </button>
                              </div>
                           );
                        })}
                     </div>
                  </section>

                  <section className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                        <Monitor size={80} />
                     </div>
                     <h3 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-6">Equipment & IT Setup</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-medium text-slate-300">Workstation Laptop</span>
                           <span className="text-xs font-bold px-2 py-0.5 bg-white/10 rounded uppercase">MacBook Pro 14"</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-medium text-slate-300">Slack Account</span>
                           <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded uppercase">Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-medium text-slate-300">Access Key Card</span>
                           <span className={cn("text-xs font-bold px-2 py-0.5 rounded uppercase", selectedHire.progress === 100 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-500")}>{selectedHire.progress === 100 ? 'Active' : 'Pending'}</span>
                        </div>
                     </div>
                  </section>
               </div>
               
               <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col xs:flex-row gap-3 shrink-0">
                  <button onClick={() => showToast('Manager has been reminded')} className="flex-1 min-h-[50px] bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm flex items-center justify-center gap-2">
                     <Mail size={18} />
                     <span className="whitespace-nowrap">Remind Manager</span>
                  </button>
                  <button onClick={() => completeAllSteps(selectedHire)} disabled={selectedHire.progress === 100} className="flex-1 min-h-[50px] bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                     <ArrowUpRight size={18} />
                     <span className="whitespace-nowrap">{selectedHire.progress === 100 ? 'Completed' : 'Complete All'}</span>
                  </button>
               </div>
            </motion.div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                   <h2 className="text-xl font-extrabold text-slate-900">Add New Hire to Onboarding</h2>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                  <div className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 lg:col-span-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Employee Name <span className="text-rose-500">*</span></label>
                           <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Wick" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Role <span className="text-rose-500">*</span></label>
                           <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Frontend Engineer" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
                           <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="input-field h-12 appearance-none">
                              <option>Sales</option>
                              <option>Engineering</option>
                              <option>Marketing</option>
                              <option>Design</option>
                              <option>Management</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Reporting Manager</label>
                           <input type="text" value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} placeholder="Manager Name" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Joining Date</label>
                           <input required type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="input-field h-12" />
                        </div>
                     </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-end gap-3 shrink-0">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold hover:bg-white rounded-xl transition-all border border-slate-200">Cancel</button>
                     <button type="submit" className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">Add Hire</button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;

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
    { label: 'New Joiners', value: onboarding.length, icon: Users, bg: 'bg-blue-50 dark:bg-blue-950/20', color: 'text-blue-600 dark:text-blue-450' },
    { label: 'Pending Docs', value: onboarding.filter(o=>o.status==='Awaiting Documents').length, icon: FileText, bg: 'bg-amber-50 dark:bg-amber-950/20', color: 'text-amber-600 dark:text-amber-400' },
    { label: 'In Progress', value: onboarding.filter(o=>o.status==='In Progress').length, icon: Clock, bg: 'bg-purple-50 dark:bg-purple-950/20', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Ready to Start', value: onboarding.filter(o=>o.status==='Ready').length, icon: CheckCircle2, bg: 'bg-emerald-50 dark:bg-emerald-950/20', color: 'text-emerald-600 dark:text-emerald-450' },
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
          <h1 className="hcm-page-title">Onboarding</h1>
          <p className="hcm-page-subtitle">Coordinate the transition and preparation for your new hires</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Welcome emails sent')} className="btn-secondary flex items-center gap-2">
            <Send size={18} />
            <span className="hidden sm:inline">Send Welcome Email</span>
          </button>
          <button onClick={handleOpenCreate} className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/20">
             <Plus size={18} />
             <span>Add New Hire</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="card">
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="card-title mb-1.5">{stat.label}</p>
                  <h3 className="card-value">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden min-h-[400px]">
         <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative flex-1 w-full max-w-sm">
               <Search className="absolute left-3 top-3 text-slate-400 dark:text-slate-550" size={18} />
               <input type="text" placeholder="Search new hire..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10 h-11" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
               <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:inline">Filter:</span>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field h-11 w-full sm:w-36 font-bold">
                  <option value="" className="dark:bg-slate-900">All Status</option>
                  <option value="In Progress" className="dark:bg-slate-900">In Progress</option>
                  <option value="Completed" className="dark:bg-slate-900">Completed</option>
                  <option value="Ready" className="dark:bg-slate-900">Ready</option>
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
            <table className="hcm-table">
              <thead className="hcm-thead">
                <tr>
                  <th className="hcm-th">New Employee</th>
                  <th className="hcm-th">Position / Dept</th>
                  <th className="hcm-th">Manager</th>
                  <th className="hcm-th">Joining Date</th>
                  <th className="hcm-th">Onboarding Progress</th>
                  <th className="hcm-th text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOnboards.map((hire) => (
                  <tr key={hire.id} className="hcm-tr group">
                    <td className="hcm-td cursor-pointer" onClick={() => setSelectedHire(hire)}>
                      <div className="flex items-center gap-4">
                        <img src={hire.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(hire.name)}&background=random`} alt={hire.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-sm" />
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{hire.name}</p>
                      </div>
                    </td>
                    <td className="hcm-td cursor-pointer" onClick={() => setSelectedHire(hire)}>
                      <p className="font-bold text-slate-700 dark:text-slate-300">{hire.role}</p>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{hire.department}</p>
                    </td>
                    <td className="hcm-td">
                      <p className="font-bold text-slate-700 dark:text-slate-300">{hire.manager}</p>
                    </td>
                    <td className="hcm-td">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-450 font-medium">
                         <Calendar size={14} className="opacity-40" />
                         {hire.joiningDate || hire.start || 'TBD'}
                      </div>
                    </td>
                    <td className="hcm-td">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                         <div className="flex justify-between items-center px-0.5">
                            <span className={cn(
                               "text-[10px] font-bold uppercase tracking-widest",
                               hire.progress === 100 ? "text-emerald-500 dark:text-emerald-400" : "text-primary-600 dark:text-primary-400"
                            )}>
                               {hire.status}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{hire.progress}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${hire.progress}%` }}
                              className={cn(
                                 "h-full rounded-full transition-all duration-1000",
                                 hire.progress === 100 ? "bg-emerald-500 dark:bg-emerald-400" : "bg-primary-600"
                              )} 
                            />
                         </div>
                      </div>
                    </td>
                    <td className="hcm-td text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setSelectedHire(hire)} className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all" title="View Details">
                          <ChevronRight size={20} />
                        </button>
                        <button onClick={() => deleteOnboarding(hire.id)} className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition-all" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
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
               className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50 shrink-0">
                  <div className="flex items-center gap-4">
                     <img src={selectedHire.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedHire.name)}&background=random`} alt={selectedHire.name} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-950 shadow-xl" />
                     <div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">{selectedHire.name}</h2>
                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mt-1">{selectedHire.role}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedHire(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-10 focus:outline-none">
                  <section>
                     <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        Onboarding Checklist
                     </h3>
                     <div className="space-y-4">
                        {steps.map((step, idx) => {
                           const isDone = idx * 20 < selectedHire.progress;
                           const isNext = !isDone && (idx - 1) * 20 < selectedHire.progress;
                           
                           return (
                              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className={cn(
                                       "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                                       isDone ? "bg-emerald-500 text-white shadow-lg" : isNext ? "bg-primary-600 text-white ring-4 ring-primary-50 dark:ring-primary-950/40" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-850"
                                    )}>
                                       {isDone ? <CheckCircle2 size={18} /> : idx + 1}
                                    </div>
                                    <span className={cn("text-sm font-bold", isDone ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200")}>{step.label}</span>
                                 </div>
                                 <button onClick={() => toggleStep(selectedHire, idx)} className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all",
                                    isDone ? "text-slate-400 dark:text-slate-500 hover:text-rose-500" : "text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-950/30"
                                 )}>
                                    {isDone ? "Reopen" : "Complete"}
                                 </button>
                              </div>
                           );
                        })}
                     </div>
                  </section>

                  <section className="p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl text-white relative overflow-hidden group border border-slate-800 dark:border-slate-850">
                     <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                        <Monitor size={80} />
                     </div>
                     <h3 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-6">Equipment & IT Setup</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-medium text-slate-300">Workstation Laptop</span>
                           <span className="text-xs font-bold px-2 py-0.5 bg-white/10 dark:bg-slate-800 rounded uppercase">MacBook Pro 14"</span>
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
               
               <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col xs:flex-row gap-3 shrink-0">
                  <button onClick={() => showToast('Manager has been reminded')} className="btn-secondary flex-1 min-h-[50px] flex items-center justify-center gap-2">
                     <Mail size={18} />
                     <span className="whitespace-nowrap">Remind Manager</span>
                  </button>
                  <button onClick={() => completeAllSteps(selectedHire)} disabled={selectedHire.progress === 100} className="btn-primary flex-1 min-h-[50px] flex items-center justify-center gap-2">
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
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen">
                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20 shrink-0">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Add New Hire to Onboarding</h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={24} /></button>
                 </div>
                 <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                   <div className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                         <div className="space-y-2 lg:col-span-2 text-left">
                            <label className="form-label ml-1">Employee Name <span className="text-rose-500">*</span></label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Wick" className="input-field h-12 font-medium" />
                         </div>
                         <div className="space-y-2 text-left">
                            <label className="form-label ml-1">Role <span className="text-rose-500">*</span></label>
                            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Frontend Engineer" className="input-field h-12 font-medium" />
                         </div>
                         <div className="space-y-2 text-left">
                            <label className="form-label ml-1">Department</label>
                            <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="input-field h-12 appearance-none font-medium">
                               <option className="dark:bg-slate-900">Sales</option>
                               <option className="dark:bg-slate-900">Engineering</option>
                               <option className="dark:bg-slate-900">Marketing</option>
                               <option className="dark:bg-slate-900">Design</option>
                               <option className="dark:bg-slate-900">Management</option>
                            </select>
                         </div>
                         <div className="space-y-2 text-left">
                            <label className="form-label ml-1">Reporting Manager</label>
                            <input type="text" value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} placeholder="Manager Name" className="input-field h-12 font-medium" />
                         </div>
                         <div className="space-y-2 text-left">
                            <label className="form-label ml-1">Joining Date</label>
                            <input required type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="input-field h-12 font-medium" />
                         </div>
                      </div>
                   </div>
                   <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex items-center justify-end gap-3 shrink-0">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary px-6">Cancel</button>
                      <button type="submit" className="btn-primary px-8">Add Hire</button>
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

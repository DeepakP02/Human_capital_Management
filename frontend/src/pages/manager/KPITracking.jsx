import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  Download, 
  ChevronRight, 
  MoreVertical, 
  Star, 
  Zap, 
  ArrowUpRight, 
  X, 
  Calendar, 
  LayoutGrid,
  TrendingDown,
  User,
  Activity,
  RotateCcw,
  Save,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useManager } from '../../context/ManagerContext';
import CenterModal from '../../components/common/CenterModal';

const KPITracking = () => {
  const { kpis, teamMembers, showToast } = useManager();
  
  // UI States
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTab, setActiveTab] = useState('Active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newGoal, setNewGoal] = useState({ title: '', employeeId: '', category: 'Productivity', priority: 'Medium', deadline: '' });

  // Stats calculation
  const stats = useMemo(() => {
    return [
      { label: 'Active Goals', value: kpis.filter(k => k.status !== 'Completed').length.toString(), icon: Target, color: 'text-primary-600', bg: 'bg-primary-50' },
      { label: 'Completed', value: kpis.filter(k => k.status === 'Completed').length.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'At Risk', value: kpis.filter(k => k.status === 'At Risk' || k.status === 'Delayed').length.toString(), icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Avg Performance', value: '88%', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];
  }, [kpis]);

  // Filtering Logic
  const filteredGoals = useMemo(() => {
    return kpis.filter(k => {
      const matchesTab = activeTab === 'All' ? true : 
                         activeTab === 'Active' ? k.status !== 'Completed' :
                         activeTab === 'Completed' ? k.status === 'Completed' :
                         activeTab === 'At Risk' ? (k.status === 'At Risk' || k.status === 'Delayed') : true;
      const matchesSearch = k.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           k.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [kpis, activeTab, searchQuery]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.employeeId) {
      showToast('Please fill in required fields.', 'error');
      return;
    }
    // In a real app, we'd call an addKPI method from context
    showToast(`New goal "${newGoal.title}" assigned to team member.`);
    setShowAddModal(false);
    setNewGoal({ title: '', employeeId: '', category: 'Productivity', priority: 'Medium', deadline: '' });
  };

  const handleUpdateKPI = (e) => {
    e.preventDefault();
    showToast('KPI metrics updated successfully.');
    setSelectedGoal(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">KPI Tracking & Goals</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Track employee objectives, progress and team performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Exporting KPI report...')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export KPI</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card p-6 bg-white border border-slate-100 shadow-soft"
          >
            <div className="flex items-center gap-4 text-left">
               <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Goals Filter & List */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {['Active', 'Completed', 'At Risk', 'All'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                       "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border capitalize",
                       activeTab === cat ? "bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    )}
                  >
                     {cat} Tracking
                  </button>
               ))}
            </div>
            <div className="relative w-full lg:w-80 text-slate-400">
               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by goal or employee..." 
                 className="input-field pl-10 h-11" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden text-left">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Goal / Objective</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Assigned To</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Progress %</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Deadline</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredGoals.map((goal) => (
                        <tr key={goal.id} className="group hover:bg-slate-50/30 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary-600 border border-slate-100 group-hover:bg-white transition-colors shadow-sm">
                                    <Target size={20} />
                                 </div>
                                 <div className="text-left">
                                    <p className="font-extrabold text-slate-900 leading-none">{goal.title}</p>
                                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{goal.category}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                 <img src={goal.img} alt={goal.name} className="w-8 h-8 rounded-lg object-cover shadow-sm ring-2 ring-white" />
                                 <p className="font-extrabold text-slate-700 tracking-tight">{goal.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col items-center gap-2 min-w-[120px]">
                                 <span className="text-[10px] font-black text-slate-900 tracking-widest">{goal.progress}%</span>
                                 <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden p-[1px]">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${goal.progress}%` }}
                                      className={cn(
                                         "h-full rounded-full transition-all",
                                         goal.status === 'Completed' ? "bg-emerald-500" : goal.status === 'At Risk' ? "bg-amber-500" : "bg-primary-500"
                                      )} 
                                    />
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <p className="text-xs font-black text-slate-500 tracking-tight">{goal.deadline}</p>
                           </td>
                           <td className="px-8 py-6 text-center uppercase tracking-[0.15em] text-[10px] font-black">
                              <span className={cn(
                                 "px-3 py-1 rounded-lg border",
                                 goal.status === 'On Track' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                 goal.status === 'At Risk' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                 goal.status === 'Completed' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                 "bg-rose-50 text-rose-500 border-rose-100"
                              )}>
                                 {goal.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button onClick={() => setSelectedGoal(goal)} className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                 <ChevronRight size={20} />
                              </button>
                           </td>
                        </tr>
                     ))}
                     {filteredGoals.length === 0 && (
                        <tr>
                           <td colSpan="6" className="px-8 py-20 text-center">
                              <div className="flex flex-col items-center gap-4 opacity-40">
                                 <Target size={48} className="text-slate-300" />
                                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No matching goals found</p>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Goal Review Modal */}
      <CenterModal 
        isOpen={!!selectedGoal} 
        onClose={() => setSelectedGoal(null)} 
        title="Objective Performance Review"
      >
         {selectedGoal && (
            <div className="p-10 space-y-12 text-left">
               <div className="p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform">
                     <Target size={180} className="text-primary-500" />
                  </div>
                  <div className="relative z-10 text-left">
                     <div className="flex items-center gap-2 mb-4">
                        <Zap size={16} className="text-primary-400 fill-primary-400" />
                        <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em]">{selectedGoal.category} Objective</span>
                     </div>
                     <h3 className="text-4xl font-black text-white tracking-tighter leading-tight max-w-sm">{selectedGoal.title}</h3>
                     
                     <div className="mt-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                           <img src={selectedGoal.img} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20" />
                           <div>
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Assignee</p>
                              <p className="text-sm font-black text-white">{selectedGoal.name}</p>
                           </div>
                        </div>
                        <div className="h-10 w-px bg-white/10 hidden sm:block" />
                        <div>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Deadline</p>
                           <p className="text-sm font-black text-white">{selectedGoal.deadline}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between text-left">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Achievement Level</h4>
                     <span className="text-3xl font-black text-slate-900">{selectedGoal.progress}%</span>
                  </div>
                  <div className="relative h-4 bg-slate-50 border border-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedGoal.progress}%` }} 
                        className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full shadow-lg shadow-primary-200"
                     />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 text-left">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority Index</p>
                     <div className="flex items-center gap-2">
                        <Star size={16} className={cn(selectedGoal.priority === 'High' ? "text-rose-500 fill-rose-500" : "text-amber-500 fill-amber-500")} />
                        <span className="text-base font-black text-slate-900">{selectedGoal.priority}</span>
                     </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Weightage</p>
                     <span className="text-base font-black text-slate-900">30% (Impact)</span>
                  </div>
               </div>

               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <MessageSquare size={16} className="text-slate-300" /> Qualitative Feedback
                  </label>
                  <textarea 
                    className="input-field min-h-[140px] bg-white border-slate-200 py-4 text-sm font-medium resize-none shadow-sm focus:shadow-md transition-shadow" 
                    placeholder="Provide constructive feedback for the next sprint..."
                  ></textarea>
               </div>

               <div className="pt-8 border-t border-slate-50 flex gap-4">
                  <button onClick={() => setSelectedGoal(null)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                     Discard Changes
                  </button>
                  <button onClick={handleUpdateKPI} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                     <Save size={18} />
                     <span>Save Objective Update</span>
                  </button>
               </div>
            </div>
         )}
      </CenterModal>

      {/* Add New Goal Modal */}
      <CenterModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Assign Performance Goal"
      >
         <form onSubmit={handleAddGoal} className="p-10 space-y-8 text-left">
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Goal Objective</label>
               <input 
                 type="text" 
                 placeholder="e.g. Implement Zero-trust architecture" 
                 className="input-field h-14 font-bold"
                 value={newGoal.title}
                 onChange={e => setNewGoal({...newGoal, title: e.target.value})}
               />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Assign to Member</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newGoal.employeeId}
                    onChange={e => setNewGoal({...newGoal, employeeId: e.target.value})}
                  >
                     <option value="">Select Member</option>
                     {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Category</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newGoal.category}
                    onChange={e => setNewGoal({...newGoal, category: e.target.value})}
                  >
                     <option>Productivity</option>
                     <option>Quality</option>
                     <option>Innovation</option>
                     <option>Leadership</option>
                     <option>Compliance</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Target Deadline</label>
                  <input 
                    type="date" 
                    className="input-field h-14 font-bold"
                    value={newGoal.deadline}
                    onChange={e => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Priority Level</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newGoal.priority}
                    onChange={e => setNewGoal({...newGoal, priority: e.target.value})}
                  >
                     <option>Low</option>
                     <option>Medium</option>
                     <option>High</option>
                     <option>Critical</option>
                  </select>
               </div>
            </div>

            <div className="pt-6 flex flex-col gap-4 text-left">
               <button type="submit" className="btn-primary w-full py-4 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-100">Set Objective</button>
               <button type="button" onClick={() => setShowAddModal(false)} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors">Discard Draft</button>
            </div>
         </form>
      </CenterModal>
    </div>
  );
};

export default KPITracking;

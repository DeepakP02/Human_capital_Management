import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  ClipboardCheck, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowUpRight,
  Target,
  LayoutGrid,
  BarChart3,
  Search,
  FileText,
  CalendarDays,
  MoreVertical,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useManager } from '../../context/ManagerContext';
import CenterModal from '../../components/common/CenterModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { teamMembers, leaveRequests, kpis, tasks, addTask, updateLeaveStatus, showToast } = useManager();
  
  // States
  const [activeChartTab, setActiveChartTab] = useState('this-week');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // New Task Form State
  const [newTask, setNewTask] = useState({ title: '', assignee: '', priority: 'Medium', dueDate: '' });

  const stats = [
    { label: 'Team Size', value: teamMembers.length, icon: Users, trend: '+2 new members', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Present Today', value: '15', icon: UserCheck, trend: '3 on leave', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Approvals', value: leaveRequests.filter(l => l.status === 'Pending').length, icon: ClipboardCheck, trend: 'Needs review today', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Performance Alerts', value: kpis.filter(k => k.status === 'At Risk' || k.status === 'Delayed').length, icon: AlertTriangle, trend: 'Requires attention', color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    addTask({ ...newTask, status: 'Pending' });
    setShowTaskModal(false);
    setNewTask({ title: '', assignee: '', priority: 'Medium', dueDate: '' });
    showToast('Task added and assigned successfully.');
  };

  const handleLeaveAction = (status) => {
    if (selectedLeave) {
      updateLeaveStatus(selectedLeave.id, status);
      setShowReviewModal(false);
      showToast(`Leave request ${status.toLowerCase()}ed.`);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manager Dashboard</h1>
          <p className="text-slate-500 font-medium tracking-tight">Monitor team productivity, approvals and performance in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export Report</span>
          </button>
          <button 
            onClick={() => setShowTaskModal(true)}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-xl shadow-primary-200"
          >
             <Plus size={18} />
             <span>Add Task</span>
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
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{stat.trend}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Team Attendance & Activity */}
         <div className="lg:col-span-8 space-y-8">
            <div className="card p-8 bg-white border-none shadow-soft h-[400px] flex flex-col">
               <div className="flex items-center justify-between mb-10">
                  <div className="text-left">
                     <h3 className="text-xl font-bold text-slate-900 tracking-tight">Team Attendance Overview</h3>
                     <p className="text-sm font-medium text-slate-400">Activity comparison across departments</p>
                  </div>
                  <div className="flex bg-slate-50 p-1 rounded-xl">
                     <button 
                       onClick={() => setActiveChartTab('this-week')}
                       className={cn("px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-all", activeChartTab === 'this-week' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600")}
                     >
                       This Week
                     </button>
                     <button 
                       onClick={() => setActiveChartTab('previous')}
                       className={cn("px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-all", activeChartTab === 'previous' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600")}
                     >
                       Previous
                     </button>
                  </div>
               </div>
               
               <div className="flex-1 flex items-end justify-between gap-8 px-4 mb-4">
                  {[
                     { day: 'Mon', present: activeChartTab === 'this-week' ? 18 : 15, total: 18 },
                     { day: 'Tue', present: activeChartTab === 'this-week' ? 16 : 17, total: 18 },
                     { day: 'Wed', present: activeChartTab === 'this-week' ? 14 : 16, total: 18 },
                     { day: 'Thu', present: activeChartTab === 'this-week' ? 15 : 17, total: 18 },
                     { day: 'Fri', present: activeChartTab === 'this-week' ? 17 : 14, total: 18 },
                     { day: 'Sat', present: 4, total: 6 },
                     { day: 'Sun', present: 0, total: 0 }
                  ].map((d, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full relative flex items-end justify-center">
                           <div className="w-full max-w-[20px] bg-slate-100 rounded-full h-40 relative overflow-hidden">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: d.total > 0 ? `${(d.present / d.total) * 100}%` : 0 }}
                                transition={{ type: 'spring', damping: 15 }}
                                className="absolute bottom-0 inset-x-0 bg-primary-600 rounded-full shadow-lg shadow-primary-100" 
                              />
                           </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.day}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Recent Goal Tracking */}
            <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                     <Target className="text-primary-600" size={24} />
                     Goal Progress Summary
                  </h3>
                  <button onClick={() => navigate('/manager/kpi')} className="text-[10px] font-extrabold text-primary-600 uppercase tracking-widest hover:underline">View All Goals</button>
               </div>
               <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {kpis.slice(0, 4).map((goal, i) => (
                     <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-left">
                           <span className="text-slate-600 truncate mr-4">{goal.title}</span>
                           <span className="text-slate-900">{goal.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${goal.progress}%` }}
                             className={cn("h-full rounded-full transition-all duration-1000", goal.status === 'At Risk' ? 'bg-amber-500' : goal.status === 'Delayed' ? 'bg-rose-500' : goal.status === 'Completed' ? 'bg-indigo-500' : 'bg-emerald-500')} 
                           />
                        </div>
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", goal.status === 'At Risk' ? "text-amber-500" : goal.status === 'Delayed' ? "text-rose-500" : "text-emerald-500")}>{goal.status}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar: Approvals & Analytics */}
         <div className="lg:col-span-4 space-y-8 flex flex-col">
            <div className="card p-8 bg-slate-900 text-white border-none shadow-soft flex-1 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <ClipboardCheck size={100} />
               </div>
               <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-400 mb-8 text-left">Pending Approvals</h3>
               <div className="space-y-5 text-left">
                  {leaveRequests.filter(l => l.status === 'Pending').slice(0, 3).map((req, i) => (
                     <div 
                       key={i} 
                       onClick={() => { setSelectedLeave(req); setShowReviewModal(true); }}
                       className="group p-5 bg-white/5 border border-white/10 rounded-[1.8rem] hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                     >
                        <div className="flex items-center gap-4 mb-4 text-left">
                           <img src={`https://i.pravatar.cc/150?u=${req.name}`} alt={req.name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/10 shadow-sm" />
                           <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold truncate text-white">{req.name}</p>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{req.type}</p>
                           </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Calendar size={12} />
                              {req.startDate}
                           </span>
                           <div className="text-[10px] font-black text-white uppercase tracking-[0.05em] flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg group-hover:bg-primary-600 transition-all">
                              Review <ArrowUpRight size={12} className="opacity-50" />
                           </div>
                        </div>
                     </div>
                  ))}
                  {leaveRequests.filter(l => l.status === 'Pending').length === 0 && (
                     <div className="py-12 text-center">
                        <CheckCircle2 className="mx-auto text-emerald-500 mb-4 opacity-60" size={40} />
                        <p className="text-sm font-bold text-slate-500">All cleared for today!</p>
                     </div>
                  )}
               </div>
               <button onClick={() => navigate('/manager/leave')} className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">Go to Requests</button>
            </div>

            <div className="card p-8 bg-white border-none shadow-soft text-left">
               <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary-600" />
                  Index Analytics
               </h3>
               <div className="space-y-6">
                  {[
                     { label: 'Team Efficiency', score: 94, color: 'text-indigo-600' },
                     { label: 'Client Satisfaction', score: 88, color: 'text-blue-600' },
                     { label: 'Goal Velocity', score: 76, color: 'text-amber-600' },
                  ].map((dept, i) => (
                     <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dept.label}</span>
                        <span className={cn("text-2xl font-black tracking-tighter", dept.color)}>{dept.score}%</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Export Modal */}
      <CenterModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export Dashboard Analytics" maxWidth="max-w-md">
         <div className="p-8 space-y-6 text-left">
            <p className="text-sm font-medium text-slate-500">Select export format and date range for your team report.</p>
            <div className="grid grid-cols-2 gap-4">
               {['PDF Report', 'Excel Sheet', 'CSV Data', 'PowerPoint'].map(format => (
                  <button key={format} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                     <FileText size={24} className="text-slate-400 group-hover:text-primary-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-primary-700">{format}</span>
                  </button>
               ))}
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Date Range</label>
               <select className="input-field h-14 bg-slate-50 border-transparent font-bold">
                  <option>Current Month</option>
                  <option>Last 3 Months</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
               </select>
            </div>
            <button 
              onClick={() => { setShowExportModal(false); showToast('Report building in progress... Check your downloads.'); }}
              className="btn-primary w-full py-4 font-black uppercase tracking-[0.15em] shadow-xl shadow-primary-100"
            >Download Report</button>
         </div>
      </CenterModal>

      {/* Add Task Modal */}
      <CenterModal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} title="Assign New Task">
         <form onSubmit={handleAddTask} className="p-8 space-y-6 text-left">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Task Title</label>
               <input 
                 type="text" 
                 placeholder="e.g. Design System Audit" 
                 className="input-field h-14 font-bold"
                 value={newTask.title}
                 onChange={e => setNewTask({...newTask, title: e.target.value})}
               />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Assignee</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newTask.assignee}
                    onChange={e => setNewTask({...newTask, assignee: e.target.value})}
                  >
                     <option value="">Select Employee</option>
                     {teamMembers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Due Date</label>
                  <input 
                    type="date" 
                    className="input-field h-14 font-bold"
                    value={newTask.dueDate}
                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                  />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Priority</label>
               <div className="grid grid-cols-3 gap-4">
                  {['Low', 'Medium', 'High'].map(p => (
                     <button
                       key={p}
                       type="button"
                       onClick={() => setNewTask({...newTask, priority: p})}
                       className={cn(
                          "py-3 rounded-2xl text-xs font-bold transition-all border",
                          newTask.priority === p 
                          ? "bg-slate-900 border-slate-900 text-white shadow-xl" 
                          : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                       )}
                     >
                        {p}
                     </button>
                  ))}
               </div>
            </div>
            <button type="submit" className="btn-primary w-full py-4 font-black uppercase tracking-[0.15em] shadow-xl shadow-primary-200 mt-4">Create & Assign Task</button>
         </form>
      </CenterModal>

      {/* Leave Review Modal */}
      <CenterModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Review Leave Request">
         {selectedLeave && (
            <div className="p-8 text-left">
               <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-50">
                  <img src={`https://i.pravatar.cc/150?u=${selectedLeave.name}`} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-50" />
                  <div>
                     <h2 className="text-2xl font-black text-slate-900">{selectedLeave.name}</h2>
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedLeave.type}</p>
                     <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                           <Calendar size={14} /> {selectedLeave.startDate} — {selectedLeave.endDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                           <Clock size={14} /> {selectedLeave.days} Days
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="space-y-8">
                  <div>
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">Reason for Leave</label>
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-slate-700 font-medium leading-relaxed italic">
                        "{selectedLeave.reason}"
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Available Balance</label>
                        <p className="text-xl font-black text-slate-900">14 Days</p>
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Submitted On</label>
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">{selectedLeave.submittedAt}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                     <button onClick={() => handleLeaveAction('Rejected')} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Reject</button>
                     <button onClick={() => handleLeaveAction('Approved')} className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 shadow-xl shadow-emerald-100 transition-all">Approve</button>
                  </div>
                  <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-600 transition-colors">Request more information</button>
               </div>
            </div>
         )}
      </CenterModal>
    </div>
  );
};

export default ManagerDashboard;

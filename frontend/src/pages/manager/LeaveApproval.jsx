import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  MessageSquare, 
  Check, 
  X, 
  FileText, 
  Calendar, 
  History, 
  ChevronRight, 
  Download, 
  CalendarDays,
  Zap,
  Info,
  MoreVertical,
  Plus,
  RotateCcw
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useManager } from '../../context/ManagerContext';
import CenterModal from '../../components/common/CenterModal';

const LeaveApproval = () => {
  const { leaveRequests, updateLeaveStatus, addLeaveRequest, teamMembers, showToast } = useManager();
  
  // UI States
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('Pending');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newRequest, setNewRequest] = useState({ employeeId: '', type: 'Sick Leave', startDate: '', endDate: '', reason: '' });

  // Stats calculation
  const stats = useMemo(() => {
    return [
      { label: 'Pending Requests', value: leaveRequests.filter(r => r.status === 'Pending').length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Approved Today', value: leaveRequests.filter(r => r.status === 'Approved').length.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Rejected', value: leaveRequests.filter(r => r.status === 'Rejected').length.toString(), icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Total Leaves', value: leaveRequests.length.toString(), icon: CalendarDays, color: 'text-primary-600', bg: 'bg-primary-50' },
    ];
  }, [leaveRequests]);

  // Filtering Logic
  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(r => {
      const matchesTab = activeTab === 'All' ? true : r.status === activeTab;
      const matchesSearch = (r.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (r.type || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [leaveRequests, activeTab, searchQuery]);

  const handleStatusUpdate = (id, status) => {
    updateLeaveStatus(id, status);
    setSelectedRequest(null);
    showToast(`Request ${status === 'Approved' ? 'approved' : 'rejected'} successfully.`);
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    const emp = teamMembers.find(m => m.id === parseInt(newRequest.employeeId));
    if (!emp || !newRequest.startDate || !newRequest.reason) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    addLeaveRequest({ ...newRequest, name: emp.name });
    setShowAddModal(false);
    setNewRequest({ employeeId: '', type: 'Sick Leave', startDate: '', endDate: '', reason: '' });
    showToast(`Leave request for ${emp.name} submitted.`);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leave Approval</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Review, manage and approve your team's leave requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Exporting history...')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export History</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Add Request</span>
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

      {/* Main Listing Area */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {['Pending', 'Approved', 'Rejected', 'All'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                       "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border capitalize",
                       activeTab === cat ? "bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    )}
                  >
                     {cat} {cat === 'Pending' ? `(${leaveRequests.filter(r => r.status === 'Pending').length})` : ''}
                  </button>
               ))}
            </div>
            <div className="relative w-full lg:w-80">
               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by name or type..." 
                 className="input-field pl-10 h-11" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto text-left">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Employee</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Leave Type</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Duration</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Days</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Reason Preview</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredRequests.map((req) => (
                        <tr key={req.id} className="group hover:bg-slate-50/30 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <img src={`https://i.pravatar.cc/150?u=${req.name}`} alt={req.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                                 <p className="font-extrabold text-slate-900 leading-none">{req.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded border border-slate-100">{req.type}</span>
                           </td>
                           <td className="px-8 py-6 text-center whitespace-nowrap">
                              <p className="text-xs font-black text-slate-700 tracking-tight">{req.startDate} — {req.endDate || 'Ongoing'}</p>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <p className="text-sm font-black text-slate-900">{req.days || '1'}</p>
                           </td>
                           <td className="px-8 py-6 text-right max-w-xs">
                              <p className="text-[11px] font-medium text-slate-400 truncate italic">"{req.reason}"</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              {req.status === 'Pending' ? (
                                <div className="flex justify-end items-center gap-2">
                                   <button 
                                     onClick={() => setSelectedRequest(req)} 
                                     className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all" 
                                     title="Review Request"
                                   >
                                      <ChevronRight size={20} />
                                   </button>
                                   <button 
                                     onClick={() => handleStatusUpdate(req.id, 'Approved')}
                                     className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all shadow-sm group-hover:shadow-md" 
                                     title="Quick Approve"
                                   ><Check size={20} /></button>
                                </div>
                              ) : (
                                <span className={cn(
                                  "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded border",
                                  req.status === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-500 border-rose-100"
                                )}>
                                  {req.status}
                                </span>
                              )}
                           </td>
                        </tr>
                     ))}
                     {filteredRequests.length === 0 && (
                       <tr>
                          <td colSpan="6" className="px-8 py-20 text-center">
                             <div className="flex flex-col items-center gap-4 opacity-40">
                                <Calendar size={48} className="text-slate-300" />
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No matching requests</p>
                             </div>
                          </td>
                       </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Review Modal */}
      <CenterModal 
        isOpen={!!selectedRequest} 
        onClose={() => setSelectedRequest(null)} 
        title="Review Leave Application"
      >
         {selectedRequest && (
            <div className="p-10 space-y-12 text-left">
               <div className="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <FileText size={120} className="text-white" />
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                     <img src={`https://i.pravatar.cc/150?u=${selectedRequest.name}`} alt={selectedRequest.name} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-800 shadow-2xl" />
                     <div className="text-left py-2">
                        <h3 className="text-2xl font-black text-white tracking-tight">{selectedRequest.name}</h3>
                        <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mt-3">Ref ID: LR-{selectedRequest.id}820</p>
                        <div className="mt-4 flex items-center gap-4">
                           <span className="text-xs font-bold text-white/60 bg-white/10 px-3 py-1 rounded-lg">Designer</span>
                           <span className="text-xs font-bold text-white/60 bg-white/10 px-3 py-1 rounded-lg">Team Apex</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-1.5 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Leave Category</label>
                     <p className="text-lg font-black text-slate-900 flex items-center gap-3">
                        <Zap size={18} className="text-primary-600" />
                        {selectedRequest.type}
                     </p>
                  </div>
                  <div className="space-y-1.5 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Duration</label>
                     <p className="text-lg font-black text-slate-900">{selectedRequest.days || '1'} Working Day(s)</p>
                  </div>
               </div>

               <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <MessageSquare size={16} className="text-slate-300" /> Employee reason
                  </label>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-base text-slate-600 leading-relaxed font-medium">
                     "{selectedRequest.reason}"
                  </div>
               </div>

               <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal review note (Optional)</label>
                  <textarea className="input-field min-h-[140px] py-4 bg-slate-50 border-transparent resize-none text-sm font-medium" placeholder="Add feedback for the employee..."></textarea>
               </div>
               
               <div className="pt-8 border-t border-slate-50 flex items-center gap-4">
                  <button 
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'Rejected')}
                    className="flex-1 py-4 bg-white border border-slate-200 text-rose-500 rounded-2xl font-black uppercase tracking-widest hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm flex items-center justify-center gap-3"
                  >
                     <XCircle size={20} />
                     <span>Reject</span>
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'Approved')}
                    className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 flex items-center justify-center gap-3"
                  >
                     <CheckCircle2 size={20} />
                     <span>Approve</span>
                  </button>
               </div>
            </div>
         )}
      </CenterModal>

      {/* Add Request Modal */}
      <CenterModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Submit Leave Request"
      >
         <form onSubmit={handleAddRequest} className="p-10 space-y-8 text-left">
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Employee</label>
               <select 
                 className="input-field h-14 font-bold appearance-none bg-white"
                 value={newRequest.employeeId}
                 onChange={e => setNewRequest({...newRequest, employeeId: e.target.value})}
               >
                  <option value="">Select Member</option>
                  {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
               </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Leave Category</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newRequest.type}
                    onChange={e => setNewRequest({...newRequest, type: e.target.value})}
                  >
                     <option>Sick Leave</option>
                     <option>Annual Leave</option>
                     <option>Casual Leave</option>
                     <option>Maternity/Paternity</option>
                     <option>Unpaid Leave</option>
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Total Days</label>
                  <input 
                    type="number" 
                    placeholder="1" 
                    className="input-field h-14 font-bold"
                    value={newRequest.days}
                    onChange={e => setNewRequest({...newRequest, days: e.target.value})}
                  />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Start Date</label>
                  <input 
                    type="date" 
                    className="input-field h-14 font-bold"
                    value={newRequest.startDate}
                    onChange={e => setNewRequest({...newRequest, startDate: e.target.value})}
                  />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">End Date</label>
                  <input 
                    type="date" 
                    className="input-field h-14 font-bold"
                    value={newRequest.endDate}
                    onChange={e => setNewRequest({...newRequest, endDate: e.target.value})}
                  />
               </div>
            </div>

            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Reason for Leave</label>
               <textarea 
                  className="input-field min-h-[120px] py-4 bg-white border-slate-200 resize-none font-medium" 
                  placeholder="Provide detailed context for this request..."
                  value={newRequest.reason}
                  onChange={e => setNewRequest({...newRequest, reason: e.target.value})}
               ></textarea>
            </div>

            <div className="pt-6 flex flex-col gap-4 text-left">
               <button type="submit" className="btn-primary w-full py-4 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-100">Submit Application</button>
               <button type="button" onClick={() => setShowAddModal(false)} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors">Discard Request</button>
            </div>
         </form>
      </CenterModal>
    </div>
  );
};

export default LeaveApproval;

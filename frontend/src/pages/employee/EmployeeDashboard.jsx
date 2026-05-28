import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CalendarDays, 
  Wallet, 
  CheckSquare, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Bell, 
  Calendar, 
  Briefcase, 
  ChevronRight, 
  ArrowUpRight,
  MapPin,
  Coffee,
  Sun,
  FileText,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import CenterModal from '../../components/layout/CenterModal';

const EmployeeDashboard = () => {
  const { 
    profile, 
    attendance, clockIn, clockOut,
    leaves, requestLeave,
    performance,
    showToast
  } = useEmployee();
  const navigate = useNavigate();

  // Mode state for modals
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Time tracking logic
  const [workedSeconds, setWorkedSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (attendance.isClockedIn && attendance.clockInTime) {
      const startTime = new Date(attendance.clockInTime).getTime();
      interval = setInterval(() => {
        const now = new Date().getTime();
        setWorkedSeconds(Math.floor((now - startTime) / 1000));
      }, 1000);
    } else {
      setWorkedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [attendance.isClockedIn, attendance.clockInTime]);

  const formatWorkedTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const stats = [
    { label: 'Today Attendance', value: attendance.isClockedIn ? 'Clocked In' : 'Not In', trend: attendance.isClockedIn ? `Since ${new Date(attendance.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Ready to start?', icon: Clock, color: attendance.isClockedIn ? 'text-emerald-600' : 'text-slate-400', bg: attendance.isClockedIn ? 'bg-emerald-50' : 'bg-slate-100' },
    { label: 'Pending Leaves', value: leaves.requests.filter(r => r.status === 'Pending').length, trend: 'Awaiting approval', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Salary Status', value: 'Paid', trend: 'Credited on 31st Oct', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Goals', value: performance.goals.length, trend: `${performance.goals.filter(g => g.progress === 100).length} completed`, icon: CheckSquare, color: 'text-primary-600', bg: 'bg-primary-50' },
  ];

  const announcements = [
    { id: 1, title: 'Annual Team Building Retreat', date: 'Oct 28', category: 'Events', priority: 'high', content: 'We are excited to announce our annual team building retreat! Join us for a weekend of fun, collaboration, and networking at the Mountain Resort. Transportation and accommodation will be provided.' },
    { id: 2, title: 'New Health Insurance Policy', date: 'Oct 22', category: 'Updates', priority: 'medium', content: 'Our health insurance provider has been updated to Blue Cross Premium. Please review the new policy documents in the Benefits section for details on coverage and benefits.' },
    { id: 3, title: 'WFH Policy Update', date: 'Oct 15', category: 'HR', priority: 'low', content: 'Starting next month, our flexible work policy will allow for up to 3 days of remote work per week. Please coordinate with your manager for scheduling.' },
  ];

  const handleRequestLeave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReq = {
      type: formData.get('type'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      reason: formData.get('reason'),
      emergencyContact: formData.get('emergency'),
      days: 1 // Mock calc
    };
    requestLeave(newReq);
    setShowLeaveModal(false);
    showToast('Leave request submitted successfully');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back, {profile.fullName.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium text-lg tracking-tight">Everything looks great. You have {performance.goals.filter(g=>g.progress < 100).length} active goals to focus on.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/employee/payroll')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <FileText size={18} />
            <span className="hidden sm:inline">View Payslip</span>
          </button>
          <button onClick={() => setShowLeaveModal(true)} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Request Leave</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card p-6 bg-white border border-slate-100 shadow-soft group transition-all"
          >
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{stat.trend}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Attendance & Activity */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Attendance & Time Tracker */}
           <div className="card p-8 bg-white border-none shadow-soft flex flex-col md:flex-row items-center gap-10">
              <div className="flex flex-col items-center text-center">
                 <div className="relative w-40 h-40 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="80" cy="80" r="70" className="stroke-slate-100 fill-none" strokeWidth="10" />
                       <motion.circle 
                         cx="80" cy="80" r="70" 
                         className={cn("fill-none transition-colors", attendance.isClockedIn ? "stroke-primary-600" : "stroke-slate-300")}
                         strokeWidth="10" 
                         strokeDasharray={440}
                         strokeDashoffset={440 - (440 * (workedSeconds / (9 * 3600)))}
                         strokeLinecap="round"
                         initial={{ strokeDashoffset: 440 }}
                         animate={{ strokeDashoffset: 440 - (440 * Math.min(1, workedSeconds / (9 * 3600))) }}
                         transition={{ duration: 1, ease: "linear" }}
                       />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <h4 className="text-3xl font-black text-slate-900 leading-none">{formatWorkedTime(workedSeconds)}</h4>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{attendance.isClockedIn ? 'Currently Active' : 'Offline'}</span>
                    </div>
                 </div>
                 {attendance.isClockedIn ? (
                    <button onClick={clockOut} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all">Clock Out</button>
                 ) : (
                    <button onClick={clockIn} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary-100 hover:bg-primary-700 active:scale-95 transition-all">Clock In</button>
                 )}
              </div>

              <div className="flex-1 grid grid-cols-2 gap-8 w-full border-l lg:border-slate-50 lg:pl-10">
                 <div className="space-y-6">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Start Time</p>
                       <p className="text-lg font-black text-slate-800">{attendance.isClockedIn ? new Date(attendance.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Total Mode</p>
                       <p className="text-lg font-black text-slate-800">Office-Based</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-1 text-amber-500">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">Daily Target</p>
                       <p className="text-lg font-black">09:00 Hrs</p>
                    </div>
                    <div className="space-y-1 text-primary-600 cursor-pointer group" onClick={() => navigate('/employee/attendance')}>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:underline">View History</p>
                       <p className="text-lg font-black flex items-center gap-1">Details <ChevronRight size={16} /></p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Performance Goals List */}
           <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 italic">
                    <CheckSquare className="text-primary-600" size={24} />
                    Current Goals
                 </h3>
                 <button onClick={() => navigate('/employee/performance')} className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">Full Strategy</button>
              </div>
              <div className="divide-y divide-slate-50">
                 {performance.goals.map((goal) => (
                    <div key={goal.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                       <div className="flex-1 mr-8">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{goal.title}</span>
                             <span className="text-xs font-black text-slate-400">{goal.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${goal.progress}%` }}
                               className={cn(
                                 "h-full rounded-full transition-all",
                                 goal.progress > 70 ? "bg-emerald-500" : goal.progress > 30 ? "bg-amber-500" : "bg-primary-500"
                               )}
                             />
                          </div>
                       </div>
                       <span className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm",
                          goal.priority === 'High' ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"
                       )}>
                          {goal.priority}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Side: Announcements & Quick Actions */}
        <div className="space-y-8 h-full">
           
           {/* Announcements Panel */}
           <div className="card p-8 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                 <Bell size={120} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 mb-8 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                 Announcements
              </h3>
              <div className="space-y-8 relative z-10">
                 {announcements.map((ann, i) => (
                    <div key={i} className="flex gap-5 group/item cursor-pointer" onClick={() => setSelectedAnnouncement(ann)}>
                       <div className="flex flex-col items-center">
                          <div className={cn(
                             "w-2.5 h-2.5 rounded-full ring-4 ring-slate-900 flex-shrink-0 transition-transform group-hover/item:scale-125",
                             ann.priority === 'high' ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]" : ann.priority === 'medium' ? "bg-amber-500" : "bg-primary-500"
                          )} />
                          <div className="w-[1px] h-full bg-slate-800 mt-2" />
                       </div>
                       <div className="flex-1 pb-4">
                          <p className="text-sm font-black text-white group-hover/item:text-primary-400 transition-colors leading-tight">{ann.title}</p>
                          <div className="flex items-center gap-3 mt-2.5">
                             <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{ann.date}</span>
                             <span className="text-[9px] font-black text-primary-500/80 uppercase tracking-[0.2em] px-2 py-0.5 bg-primary-500/10 rounded-md">{ann.category}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2">
                 View Detail Board <ArrowRight size={14} />
              </button>
           </div>

           {/* Upcoming Holiday Card */}
           <div className="card p-8 border-none bg-white shadow-soft group hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-black text-slate-900 italic tracking-tight">Public Holiday</h3>
                 <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 transition-transform group-hover:rotate-12">
                    <Calendar size={20} />
                 </div>
              </div>
              <div className="flex items-center gap-5">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 border-2 border-indigo-100 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Oct</span>
                    <span className="text-2xl font-black text-slate-900 leading-none mt-1">31</span>
                 </div>
                 <div>
                    <p className="text-base font-black text-slate-900 leading-none">Halloween Fest</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">Optional Holiday</p>
                 </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Friday</span>
                 </div>
                 <button className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-primary-600">
                    <ArrowUpRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Leave Request Modal */}
      <CenterModal isOpen={showLeaveModal} onClose={() => setShowLeaveModal(false)} title="Request New Leave">
         <form onSubmit={handleRequestLeave} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Leave Type</label>
                  <select name="type" className="input-field h-14 bg-slate-50 border-transparent font-bold">
                     <option>Sick Leave</option>
                     <option>Annual Leave</option>
                     <option>Casual Leave</option>
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Attachment (Optional)</label>
                  <div className="h-14 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 cursor-pointer hover:border-primary-400 transition-colors">
                     Upload File
                  </div>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Start Date</label>
                  <input name="startDate" type="date" required className="input-field h-14 bg-slate-50 border-transparent font-bold" />
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">End Date</label>
                  <input name="endDate" type="date" required className="input-field h-14 bg-slate-50 border-transparent font-bold" />
               </div>
            </div>
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Reason for Leave</label>
               <textarea name="reason" rows="3" required className="input-field py-4 bg-slate-50 border-transparent font-bold resize-none" placeholder="Provide a brief explanation..."></textarea>
            </div>
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Emergency Contact While Away</label>
               <input name="emergency" type="text" required placeholder="+1 (555) 000-0000" className="input-field h-14 bg-slate-50 border-transparent font-bold" />
            </div>
            <div className="pt-4 flex gap-4">
               <button type="button" onClick={() => setShowLeaveModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest">Cancel</button>
               <button type="submit" className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all">Submit Request</button>
            </div>
         </form>
      </CenterModal>

      {/* Announcement Detail Modal */}
      <CenterModal isOpen={!!selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} title="Announcement Details">
         {selectedAnnouncement && (
            <div className="p-8 text-left">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "w-3 h-3 rounded-full",
                        selectedAnnouncement.priority === 'high' ? "bg-rose-500" : "bg-primary-500"
                     )} />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedAnnouncement.category}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{selectedAnnouncement.date}</span>
               </div>
               <h2 className="text-2xl font-black text-slate-900 mb-4">{selectedAnnouncement.title}</h2>
               <p className="text-slate-600 font-bold leading-relaxed mb-10">{selectedAnnouncement.content}</p>
               <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                     <FileText size={24} />
                  </div>
                  <div className="flex-1">
                     <p className="text-sm font-black text-slate-900">Attachment_Info.pdf</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Notice • 1.2 MB</p>
                  </div>
                  <button className="btn-secondary p-3 rounded-xl"><ChevronRight size={20} /></button>
               </div>
               <button onClick={() => setSelectedAnnouncement(null)} className="w-full mt-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200">Close Notice</button>
            </div>
         )}
      </CenterModal>
    </div>
  );
};

export default EmployeeDashboard;

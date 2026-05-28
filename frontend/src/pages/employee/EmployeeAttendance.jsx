import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Coffee, 
  LogIn, 
  LogOut, 
  MapPin, 
  Monitor, 
  CalendarDays,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Timer,
  Download,
  Search,
  Filter,
  Users
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';

const EmployeeAttendance = () => {
  const { attendance, clockIn, clockOut, showToast } = useEmployee();
  const [currentMonth, setCurrentMonth] = useState('April 2026');
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('Office');
  const [workedSeconds, setWorkedSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (attendance.isClockedIn && attendance.clockInTime) {
      const startTime = new Date(attendance.clockInTime).getTime();
      interval = setInterval(() => {
        setWorkedSeconds(Math.floor((new Date().getTime() - startTime) / 1000));
      }, 1000);
    } else {
      setWorkedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [attendance.isClockedIn, attendance.clockInTime]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  const filteredHistory = attendance.history.filter(item => 
    item.date.includes(searchTerm) || item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Present Days', value: attendance.history.filter(h => h.status === 'Present').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Late Marking', value: attendance.history.filter(h => h.status === 'Late').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Mode', value: mode, icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Working Mode', value: mode, icon: MapPin, color: 'text-primary-600', bg: 'bg-primary-50' },
  ];

  const handleExport = () => {
    showToast('Attendance report exported as PDF');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Time & Attendance</h1>
          <p className="text-slate-500 font-bold tracking-tight">Real-time work session tracking and historical records</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
            <Download size={18} />
            <span>Export</span>
          </button>
          {attendance.isClockedIn ? (
            <button onClick={() => { clockOut(); showToast('Clocked out successfully'); }} className="btn-primary bg-rose-600 hover:bg-rose-700 px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-rose-100 ring-4 ring-white">
              <LogOut size={18} />
              <span>Clock Out</span>
            </button>
          ) : (
            <button onClick={() => { clockIn(); showToast('Clocked in successfully'); }} className="btn-primary px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary-200">
              <LogIn size={18} />
              <span>Clock In</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card p-6 bg-white border border-slate-100 shadow-soft transition-all"
          >
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Live Controls & Summary */}
        <div className="lg:col-span-4 space-y-6">
           <div className="card p-8 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                 <Clock size={150} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 mb-8">Active Work Session</p>
              
              <div className="text-center mb-10 py-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative z-10">
                 <h4 className="text-5xl font-black tracking-tighter mb-3 tabular-nums">{formatTime(workedSeconds)}</h4>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{attendance.isClockedIn ? 'Timer Active' : 'Start Session to Track Time'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <button onClick={() => showToast('Break session logic coming soon', 'info')} className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/10 border border-white/5 hover:bg-white/15 transition-all group/btn">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center mb-1 group-hover/btn:scale-110 transition-transform">
                       <Coffee size={24} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Coffee Break</span>
                 </button>
                 <div className="relative group/mode">
                    <button className="w-full flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/10 border border-white/5 hover:bg-white/15 transition-all">
                       <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-1 group-hover/mode:rotate-12 transition-transform">
                          <Monitor size={24} />
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">{mode} Mode</span>
                    </button>
                    <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 group-hover/mode:opacity-100 pointer-events-none group-hover/mode:pointer-events-auto transition-all p-1 transform translate-y-2 group-hover/mode:translate-y-0">
                       {['Office', 'Remote', 'Hybrid'].map(m => (
                          <button key={m} onClick={() => { setMode(m); showToast(`Work mode changed to ${m}`); }} className="w-full p-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 rounded-lg text-left transition-colors">{m}</button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="card p-8 bg-white border-none shadow-soft">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Shift Logic & Schedule</h3>
              <div className="space-y-8 relative ml-4 px-8 border-l-2 border-slate-50">
                 {[
                    { time: '09:00 AM', label: 'Standard Shift Start', icon: Play, color: 'bg-primary-600' },
                    { time: '01:00 PM', label: 'Mandatory Lunch', icon: Coffee, color: 'bg-amber-600' },
                    { time: '06:00 PM', label: 'Standard Shift End', icon: LogOut, color: 'bg-rose-600' },
                 ].map((log, i) => (
                    <div key={i} className="relative">
                       <div className={cn(
                          "absolute -left-[50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-white",
                          log.color
                       )}>
                          <log.icon size={18} />
                       </div>
                       <div className="text-left">
                          <p className="text-base font-black text-slate-900 leading-none">{log.time}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{log.label}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* History Area */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Attendance History</h3>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search history..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border border-slate-100 rounded-xl pl-10 pr-4 py-2 text-xs font-bold w-48 focus:ring-2 focus:ring-primary-100 transition-all outline-none" 
                    />
                 </div>
                 <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900"><ChevronLeft size={18} /></button>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4">{currentMonth}</span>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900"><ChevronRight size={18} /></button>
                 </div>
              </div>
           </div>

           <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mode</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Registry (In/Out)</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Activity</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredHistory.length > 0 ? filteredHistory.map((item, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-6">
                                <p className="text-sm font-black text-slate-900">{item.date}</p>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-2.5">
                                   <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400">
                                      {item.mode === 'Office' ? <MapPin size={12} /> : <Monitor size={12} />}
                                   </div>
                                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.mode}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-center">
                                <div className="flex items-center justify-center gap-5">
                                   <div>
                                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5">Punch In</p>
                                      <p className="text-[11px] font-black text-slate-900 tabular-nums">{item.clockIn}</p>
                                   </div>
                                   <ArrowRight size={14} className="text-slate-200" />
                                   <div>
                                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5">Punch Out</p>
                                      <p className="text-[11px] font-black text-slate-900 tabular-nums">{item.clockOut}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-center">
                                <span className={cn(
                                   "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                                   item.status === 'Present' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                )}>
                                   {item.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <p className="text-sm font-black text-slate-900 tabular-nums">{item.totalHours}</p>
                             </td>
                          </tr>
                       )) : (
                         <tr>
                            <td colSpan="5" className="px-8 py-20 text-center">
                               <div className="flex flex-col items-center gap-4 text-slate-300">
                                  <Clock size={48} className="animate-pulse" />
                                  <p className="text-xs font-black uppercase tracking-[0.2em]">No records found for {currentMonth}</p>
                               </div>
                            </td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Mobile Calendar Hint */}
           <div className="card p-10 bg-gradient-to-br from-primary-600 to-indigo-700 text-white border-none shadow-premium flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="absolute -left-10 -bottom-10 opacity-10 rotate-12">
                 <CalendarDays size={200} />
              </div>
              <div className="space-y-2 relative z-10 text-center md:text-left">
                 <h4 className="text-2xl font-black italic tracking-tight">Full Calendar Intelligence</h4>
                 <p className="text-primary-100/80 text-xs font-black uppercase tracking-widest">Visual heatmaps and behavior tracking of your work cycle</p>
              </div>
              <button onClick={() => showToast('Calendar view loading...')} className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 relative z-10">
                 <CalendarDays size={20} />
                 <span>Expand Calendar</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;

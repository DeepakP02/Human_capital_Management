import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Plus, Search, Calendar, Clock, Video, User, 
  Users, ChevronRight, MoreVertical, CheckCircle2, 
  X, ExternalLink, MapPin, AlertCircle, RotateCcw, 
  Check, CalendarDays, Trash2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHR } from '../../context/HRContext';

const InterviewManagement = () => {
  const { interviews, addInterview, updateInterview, deleteInterview, candidates, showToast } = useHR();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('list');
  const [editingInterview, setEditingInterview] = useState(null);

  const [formData, setFormData] = useState({
    candidate: '', role: '', interviewer: 'Sarah Johnson', date: '', time: '', round: 'Technical Round', link: '', type: 'Video Call', status: 'Scheduled'
  });

  useEffect(() => {
    if (location.state?.openCreate) {
      handleOpenCreate(location.state.candidate || '');
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const stats = [
    { label: "Today's Interviews", value: interviews.filter(i => new Date(i.date).toDateString() === new Date().toDateString()).length, icon: Calendar, bg: 'bg-primary-50', color: 'text-primary-600' },
    { label: 'Upcoming', value: interviews.filter(i => i.status === 'Scheduled').length, icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Completed', value: interviews.filter(i => i.status === 'Completed').length, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Cancelled', value: interviews.filter(i => i.status === 'Cancelled').length, icon: RotateCcw, bg: 'bg-rose-50', color: 'text-rose-600' },
  ];

  const handleOpenCreate = (prefillCandidate = '') => {
    setEditingInterview(null);
    setFormData({ candidate: prefillCandidate, role: '', interviewer: 'Sarah Johnson', date: '', time: '', round: 'Technical Round', link: '', type: 'Video Call', status: 'Scheduled' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (interview) => {
    setEditingInterview(interview.id);
    setFormData({ ...interview });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingInterview) {
      updateInterview(editingInterview, formData);
    } else {
      addInterview(formData);
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = (id, currentStatus) => {
    if (currentStatus === 'Scheduled') {
      updateInterview(id, { status: 'Completed' });
    } else if (currentStatus === 'Completed') {
      updateInterview(id, { status: 'Scheduled' });
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Interview Scheduling</h1>
          <p className="text-slate-500 font-medium">Manage interviews and coordinate hiring rounds across teams</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200 p-1 rounded-xl flex shadow-sm">
              <button 
                onClick={() => setActiveView('list')}
                className={cn("px-4 py-2 text-sm font-bold rounded-lg transition-all", activeView === 'list' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900")}
              >
                List
              </button>
              <button 
                onClick={() => setActiveView('calendar')}
                className={cn("px-4 py-2 text-sm font-bold rounded-lg transition-all", activeView === 'calendar' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900")}
              >
                Calendar
              </button>
           </div>
           <button 
            onClick={() => handleOpenCreate()}
            className="btn-primary px-6 py-3 text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Schedule Interview</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="card p-6 bg-white border border-slate-100 shadow-soft transition-all">
            <div className="flex items-center justify-between mb-4">
               <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Real-time</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {activeView === 'list' ? (
        <div className="card p-0 border-none bg-white shadow-soft overflow-hidden min-h-[400px]">
          {interviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Calendar size={48} className="mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-slate-700">No interviews scheduled</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate & Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Interviewer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Round</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {interviews.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-6 cursor-pointer" onClick={() => handleOpenEdit(item)}>
                        <div className="flex items-center gap-4">
                          <img src={item.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.candidate)}&background=random`} alt={item.candidate} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-primary-600 transition-colors">{item.candidate}</p>
                            <p className="text-[10px] font-bold text-primary-600 mt-1.5 uppercase tracking-widest">{item.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                           <User size={14} className="text-slate-400" />
                           <span className="text-sm font-bold text-slate-600">{item.interviewer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-700">{item.date}</p>
                          <p className="text-xs font-medium text-slate-400">{item.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-slate-500">
                           <Video size={14} className="opacity-50" />
                           <span className="text-xs font-bold uppercase tracking-wider">{item.round}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <button 
                          onClick={() => handleStatusChange(item.id, item.status)}
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors hover:scale-105 active:scale-95",
                            item.status === 'Scheduled' ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : 
                            item.status === 'Completed' ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : 
                            "bg-rose-50 text-rose-600"
                          )}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { if(item.link) window.open(item.link, '_blank'); else showToast('No meeting link provided', 'error'); }} className="px-3 py-1.5 text-xs font-bold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-md active:scale-95">Join</button>
                          <button onClick={() => deleteInterview(item.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
          <div className="card min-h-[500px] border-none bg-white shadow-soft flex flex-col items-center justify-center text-center p-12">
             <CalendarDays size={80} className="text-slate-100 mb-6" />
             <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Calendar Integration mock</h3>
             <p className="text-slate-500 font-medium max-w-sm">Manage team availability and coordinate slots effortlessly with Google/Outlook calendar sync.</p>
             <button onClick={() => showToast('Calendar connected successfully via simulated OAuth')} className="mt-8 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl">Connect Calendar</button>
          </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                   <h2 className="text-xl font-extrabold text-slate-900">{editingInterview ? 'Edit Interview' : 'Schedule New Interview'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                  <div className="p-8 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 lg:col-span-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Candidate <span className="text-rose-500">*</span></label>
                           <input required type="text" value={formData.candidate} onChange={e => setFormData({...formData, candidate: e.target.value})} placeholder="Candidate Name or Email" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Role <span className="text-rose-500">*</span></label>
                           <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Frontend Engineer" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Date</label>
                           <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. Oct 25, 2026" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Time</label>
                           <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Interview Round</label>
                           <select value={formData.round} onChange={e => setFormData({...formData, round: e.target.value})} className="input-field h-12 appearance-none">
                              <option>Technical Round</option>
                              <option>Portfolio Review</option>
                              <option>Final Interview</option>
                              <option>HR Screening</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Interviewer</label>
                           <input required type="text" value={formData.interviewer} onChange={e => setFormData({...formData, interviewer: e.target.value})} className="input-field h-12" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Meeting Link (Zoom/Meet)</label>
                           <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://zoom.us/j/..." className="input-field h-12" />
                        </div>
                     </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-slate-500 shrink-0">
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="invite" className="w-5 h-5 rounded accent-primary-600" />
                        <label htmlFor="invite" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Send Calendar Invites</label>
                     </div>
                     <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold hover:bg-white rounded-xl transition-all">Cancel</button>
                        <button type="submit" className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">{editingInterview ? 'Update Schedule' : 'Confirm Schedule'}</button>
                     </div>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewManagement;

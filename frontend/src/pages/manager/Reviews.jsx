import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Award, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  Download, 
  Search, 
  MoreVertical, 
  Eye, 
  ChevronRight, 
  X, 
  User, 
  Target, 
  BarChart3, 
  Zap,
  Info,
  Edit3,
  Calendar,
  Clock,
  CalendarDays,
  RotateCcw,
  Save,
  Send
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useManager } from '../../context/ManagerContext';
import CenterModal from '../../components/common/CenterModal';

const Reviews = () => {
  const { reviews, teamMembers, showToast } = useManager();
  
  // UI States
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newReview, setNewReview] = useState({ employeeId: '', period: 'Q4 2026', type: 'Quarterly' });
  const [assessment, setAssessment] = useState({ rating: 4, feedback: '', strengths: '', improvements: '' });

  // Stats calculation
  const stats = useMemo(() => {
    return [
      { label: 'Pending Reviews', value: reviews.filter(r => r.status === 'Pending' || r.status === 'Draft').length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Completed', value: reviews.filter(r => r.status === 'Submitted' || r.status === 'Closed').length.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Avg Team Score', value: '4.6', icon: Star, color: 'text-primary-600', bg: 'bg-primary-50' },
      { label: 'Growth Tracks', value: '12', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];
  }, [reviews]);

  // Filtering Logic
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesTab = activeTab === 'All' ? true : 
                         activeTab === 'Drafts' ? r.status === 'Draft' :
                         r.period === activeTab;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           r.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [reviews, activeTab, searchQuery]);

  const handleInitiateReview = (e) => {
    e.preventDefault();
    if (!newReview.employeeId) {
      showToast('Please select a team member.', 'error');
      return;
    }
    showToast(`Review cycle initiated for member.`);
    setShowAddModal(false);
  };

  const handleFinalizeReview = (e) => {
    e.preventDefault();
    showToast('Performance review submitted successfully.');
    setSelectedReview(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative text-left">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Reviews</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Evaluate your team members, record feedback and track professional growth</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Exporting review transcripts...')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export History</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Initiate Review</span>
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

      {/* Reviews List Area */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {['All', 'Q3 2026', 'Q2 2026', 'Drafts'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                       "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border capitalize",
                       activeTab === cat ? "bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    )}
                  >
                     {cat} {cat.includes('Q') ? 'Cycle' : ''}
                  </button>
               ))}
            </div>
            <div className="group relative w-full lg:w-80">
               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by name or rating..." 
                 className="input-field pl-10 h-11" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Employee Info</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Period</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Avg Rating</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Strengths</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredReviews.map((user) => (
                        <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors cursor-pointer" onClick={() => setSelectedReview(user)}>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <img src={user.img} alt={user.name} className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white" />
                                 <div className="text-left">
                                    <p className="font-extrabold text-slate-900 leading-none">{user.name}</p>
                                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{user.role}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className="text-xs font-black text-slate-600 tracking-tight">{user.period}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                 <Star size={14} className="text-amber-400 fill-amber-400" />
                                 <span className="font-black text-slate-900">{user.rating}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center max-w-[200px]">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{user.strengths}</p>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                 user.status === 'Submitted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                 user.status === 'Draft' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                 user.status === 'Acknowledged' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                 "bg-slate-50 text-slate-400 border-slate-100"
                              )}>
                                 {user.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button onClick={(e) => { e.stopPropagation(); setSelectedReview(user); }} className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all shadow-sm hover:shadow-md">
                                 <Edit3 size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                     {filteredReviews.length === 0 && (
                        <tr>
                           <td colSpan="6" className="px-8 py-20 text-center">
                              <div className="flex flex-col items-center gap-4 opacity-40 text-left">
                                 <Award size={48} className="text-slate-300" />
                                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No reviews found in this period</p>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Evaluation Assessment Modal */}
      <CenterModal 
        isOpen={!!selectedReview} 
        onClose={() => setSelectedReview(null)} 
        title="Performance Assessment Form"
      >
         {selectedReview && (
            <div className="p-10 space-y-12 text-left">
               <div className="p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform">
                     <Star size={180} className="text-amber-400" />
                  </div>
                  <div className="flex items-center gap-6 relative z-10 text-left">
                     <img src={selectedReview.img} alt={selectedReview.name} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white/20 shadow-2xl" />
                     <div className="text-left">
                        <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{selectedReview.name}</h3>
                        <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mt-3">{selectedReview.role} • {selectedReview.period} Cycle</p>
                        <div className="mt-4 flex items-center gap-3">
                           <span className={cn(
                             "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/60",
                             selectedReview.status === 'Draft' ? "bg-amber-400/20 text-amber-400 border-amber-400/20" : "bg-white/10"
                           )}>
                              {selectedReview.status}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 text-left">
                  <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={14} className="text-primary-500" /> Core Strengths
                     </label>
                     <textarea 
                        className="input-field min-h-[120px] bg-slate-50 border-transparent py-4 text-xs font-bold uppercase tracking-tight resize-none" 
                        defaultValue={selectedReview.strengths}
                     ></textarea>
                  </div>
                  <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} className="text-indigo-500" /> Areas for Growth
                     </label>
                     <textarea 
                        className="input-field min-h-[120px] bg-slate-50 border-transparent py-4 text-xs font-bold uppercase tracking-tight resize-none" 
                        defaultValue={selectedReview.improvement}
                     ></textarea>
                  </div>
               </div>

               <div className="space-y-4 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manager Assessment Summary</label>
                  <textarea 
                    className="input-field min-h-[160px] py-6 bg-slate-50 border-transparent resize-none text-sm font-medium leading-relaxed shadow-inner" 
                    placeholder="Summarize key performance indicators, qualitative feedback, and culture contribution..."
                  ></textarea>
               </div>

               <div className="space-y-6 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Performance Index</label>
                  <div className="flex justify-between items-center bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                     <div className="flex gap-3">
                        {[1,2,3,4,5].map(s => (
                           <button 
                             key={s} 
                             onClick={() => setAssessment({...assessment, rating: s})}
                             className={cn(
                               "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                               s <= assessment.rating ? "bg-slate-900 text-amber-400 shadow-lg scale-110" : "bg-white text-slate-200 hover:text-slate-300"
                             )}
                           >
                              <Star size={24} fill={s <= assessment.rating ? "currentColor" : "none"} />
                           </button>
                        ))}
                     </div>
                     <div className="text-right">
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">{assessment.rating}.0</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Exceeds Exp.</p>
                     </div>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-slate-100 flex gap-4">
                  <button onClick={() => setSelectedReview(null)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all">
                     Save Progress
                  </button>
                  <button onClick={handleFinalizeReview} className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-3">
                     <Send size={18} />
                     <span>Submit Final Review</span>
                  </button>
               </div>
            </div>
         )}
      </CenterModal>

      {/* Initiate New Review Modal */}
      <CenterModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Initiate Performance Cycle"
      >
         <form onSubmit={handleInitiateReview} className="p-10 space-y-8 text-left">
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 text-left">Target Employee</label>
               <select 
                 className="input-field h-14 font-bold appearance-none bg-white"
                 value={newReview.employeeId}
                 onChange={e => setNewReview({...newReview, employeeId: e.target.value})}
               >
                  <option value="">Choose Team Member</option>
                  {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
               </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Review Period</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newReview.period}
                    onChange={e => setNewReview({...newReview, period: e.target.value})}
                  >
                     <option>Q4 2026</option>
                     <option>Q3 2026</option>
                     <option>Annual 2026</option>
                     <option>Probationary</option>
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Assessment Type</label>
                  <select 
                    className="input-field h-14 font-bold appearance-none bg-white"
                    value={newReview.type}
                    onChange={e => setNewReview({...newReview, type: e.target.value})}
                  >
                     <option>Quarterly Performance</option>
                     <option>Annual Appraisal</option>
                     <option>360 Feedback</option>
                     <option>Technical Review</option>
                  </select>
               </div>
            </div>

            <div className="pt-6 flex flex-col gap-4 text-left">
               <button type="submit" className="btn-primary w-full py-4 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-100">Open Evaluation Box</button>
               <button type="button" onClick={() => setShowAddModal(false)} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors">Discard Cycle</button>
            </div>
         </form>
      </CenterModal>
    </div>
  );
};

export default Reviews;

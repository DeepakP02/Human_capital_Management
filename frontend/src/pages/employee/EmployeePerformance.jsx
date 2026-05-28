import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Target, Award, TrendingUp, Star, ChevronRight, Calendar, ExternalLink, Download, 
  Clock, CheckCircle2, AlertCircle, Zap, User, LayoutGrid, X, Edit, Info, ShieldCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';
import CenterModal from '../../components/layout/CenterModal';

const EmployeePerformance = () => {
  const { performance, updateGoalProgress, showToast } = useEmployee();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showReviewHistory, setShowReviewHistory] = useState(false);

  const stats = [
    { label: 'Platform Rating', value: '4.95', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Milestones Hit', value: '18', icon: Target, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Core Skills', value: performance.skills.length, icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Career Growth', value: 'Exceed Expectations', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    const progress = parseInt(e.target.progress.value);
    updateGoalProgress(selectedGoal.id, progress);
    setSelectedGoal(null);
    showToast(`Goal progress updated to ${progress}%`);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative max-w-7xl mx-auto text-left">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Strategy & Performance</h1>
          <p className="text-slate-500 font-bold tracking-tight">Monitor your career KPIs, professional goals, and internal reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Full report downloading...')} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
             <Download size={18} />
             <span>Export PDF</span>
          </button>
          <button onClick={() => setShowReviewHistory(true)} className="btn-primary px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary-200">
             <LayoutGrid size={18} />
             <span>Review Vault</span>
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         
         {/* Main Goals Section */}
         <div className="lg:col-span-8 space-y-8">
            <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-4 italic tracking-tight">
                     <Target className="text-primary-600" size={26} />
                     Active Strategic Goals
                  </h3>
                  <button onClick={() => showToast('Opening Strategy Roadmap...')} className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Full Strategy</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/30">
                           <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Objective / Milestone</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Due Cycle</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Completion</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Registry</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {performance.goals.map((goal, i) => (
                           <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-7">
                                 <p className="font-black text-slate-800 text-sm italic">{goal.title}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                    <ShieldCheck size={10} className="text-emerald-500" /> Priority: {goal.priority}
                                 </p>
                              </td>
                              <td className="px-8 py-7 text-center">
                                 <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-[11px] tabular-nums">
                                    <Clock size={14} className="text-slate-300" />
                                    {goal.deadline}
                                 </div>
                              </td>
                              <td className="px-8 py-7">
                                 <div className="flex flex-col gap-2 min-w-[150px]">
                                    <div className="flex justify-between items-center px-1">
                                       <span className="text-[10px] font-black text-slate-900">{goal.progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${goal.progress}%` }}
                                         className={cn(
                                            "h-full rounded-full transition-all",
                                            goal.progress === 100 ? "bg-emerald-500" : goal.priority === 'High' ? "bg-rose-500" : "bg-primary-600"
                                         )} 
                                       />
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-7 text-right">
                                 <button onClick={() => setSelectedGoal(goal)} className="p-3 bg-slate-50 text-slate-400 hover:text-primary-600 border border-slate-100 rounded-2xl shadow-sm transition-all group-hover:scale-110">
                                    <Edit size={18} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="card p-10 bg-slate-900 border-none shadow-premium relative overflow-hidden group min-h-[300px] flex flex-col justify-end text-left">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
                  <BarChart3 size={300} />
               </div>
               <div className="relative z-10 space-y-6">
                  <div>
                     <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none mb-4">Quarterly Insight</h3>
                     <p className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px] leading-none mb-8">Metric Analysis Cycle 2026</p>
                  </div>
                  <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Internal Score</p>
                        <p className="text-2xl font-black text-white tracking-tighter italic">9.8/10</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Efficiency Mark</p>
                        <p className="text-2xl font-black text-emerald-400 tracking-tighter italic">Top 1%</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Collaboration</p>
                        <p className="text-2xl font-black text-primary-400 tracking-tighter italic">Elite</p>
                     </div>
                  </div>
                  <button onClick={() => showToast('Opening visual analytics...')} className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                     Explore Visual Trends <ExternalLink size={14} />
                  </button>
               </div>
            </div>
         </div>

         {/* Sidebar: Skills & Development */}
         <div className="lg:col-span-4 space-y-8">
            <div className="card p-8 bg-white border-none shadow-soft text-left">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black text-slate-900 italic tracking-tight leading-none">Skills Matrix</h3>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                     <Award size={20} />
                  </div>
               </div>
               <div className="space-y-8">
                  {performance.skills.map((skill, i) => (
                     <div key={i} className="space-y-3 group cursor-default">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-primary-600 transition-colors">
                           <span className="text-slate-400">{skill.name}</span>
                           <span className="text-slate-900">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-[1px] border border-slate-100">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${skill.level}%` }}
                             className="h-full bg-slate-900 rounded-full group-hover:bg-primary-600 transition-colors" 
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button onClick={() => showToast('Initiating Skill Audit...')} className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95">Update Skill Vault</button>
            </div>

            <div className="card p-10 bg-indigo-600 text-white border-none shadow-premium relative overflow-hidden group text-left">
               <div className="absolute -left-5 -top-5 opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-45">
                  <Zap size={150} />
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 mb-8 leading-none">Academy Portal</h3>
               <p className="text-base font-black italic tracking-tight text-white mb-10 leading-relaxed">Fuel your professional growth with curated internal courses.</p>
               <button onClick={() => showToast('Opening HCM Academy...')} className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-50 transition-all relative z-10">
                  Launch Academy
               </button>
            </div>
         </div>
      </div>

      {/* Goal Update Modal */}
      <CenterModal isOpen={!!selectedGoal} onClose={() => setSelectedGoal(null)} title="Update Progress Registry">
         {selectedGoal && (
            <form onSubmit={handleUpdateProgress} className="p-8 space-y-8 text-left">
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Target Objective</p>
                  <p className="text-lg font-black text-slate-800 leading-tight">"{selectedGoal.title}"</p>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Mark (%)</label>
                     <span className="text-lg font-black text-primary-600" id="progressVal">0%</span>
                  </div>
                  <input 
                    name="progress" 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue={selectedGoal.progress}
                    onChange={(e) => document.getElementById('progressVal').innerText = `${e.target.value}%`}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600" 
                  />
                  <div className="flex justify-between px-1 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
                     <span>Not Started</span>
                     <span>In Progress</span>
                     <span>Completed</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Evidence / Notes</label>
                  <textarea rows="3" className="input-field py-4 bg-slate-50 border-transparent font-black resize-none" placeholder="Provide context for the progress adjustment..."></textarea>
               </div>
               <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setSelectedGoal(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest">Discard</button>
                  <button type="submit" className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200">Commit Update</button>
               </div>
            </form>
         )}
      </CenterModal>

      {/* Review Vault Modal */}
      <CenterModal isOpen={showReviewHistory} onClose={() => setShowReviewHistory(false)} title="Historical Performance Vault">
         <div className="p-8 space-y-6 text-left">
            {[
               { period: 'Q3 2026', reviewer: 'Sarah Johnson', rating: '4.9/5.0', text: 'Exceptional ownership on the design system rollout. A true culture catalyst.' },
               { period: 'Q2 2026', reviewer: 'Sarah Johnson', rating: '4.8/5.0', text: 'Quality output is industry-leading. Great focus on performance KPIs.' }
            ].map((rev, i) => (
               <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm transition-transform group-hover:rotate-12">
                           <Award size={28} />
                        </div>
                        <div>
                           <p className="text-lg font-black text-slate-900 leading-none">{rev.period}</p>
                           <p className="text-[9px] font-black text-primary-500 uppercase tracking-widest mt-2">{rev.reviewer} • Review Lead</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-2xl font-black text-slate-900 leading-none italic">{rev.rating}</p>
                        <div className="flex gap-0.5 mt-2">
                           {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-amber-400 fill-amber-400" />)}
                        </div>
                     </div>
                  </div>
                  <p className="text-sm font-bold text-slate-500 italic leading-relaxed">"{rev.text}"</p>
               </div>
            ))}
            <button onClick={() => setShowReviewHistory(false)} className="w-full mt-4 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200">Seal Vault</button>
         </div>
      </CenterModal>
    </div>
  );
};

export default EmployeePerformance;

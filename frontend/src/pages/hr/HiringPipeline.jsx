import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, RotateCcw, MoreVertical, 
  Download, Users, User, MoreHorizontal, X, ExternalLink, MapPin, Mail, Phone, Calendar
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHR } from '../../context/HRContext';

const HiringPipeline = () => {
  const { candidates, moveCandidateStage, showToast, updateCandidate } = useHR();
  const navigate = useNavigate();
  
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const stages = [
    { id: 'Applied', label: 'Applied', color: 'bg-slate-100 text-slate-600' },
    { id: 'Screening', label: 'Screening', color: 'bg-amber-50 text-amber-600' },
    { id: 'Shortlisted', label: 'Shortlisted', color: 'bg-blue-50 text-blue-600' },
    { id: 'Interview', label: 'Interview', color: 'bg-purple-50 text-purple-600' },
    { id: 'Offer', label: 'Offer', color: 'bg-emerald-50 text-emerald-600' },
    { id: 'Hired', label: 'Hired', color: 'bg-indigo-50 text-indigo-600' },
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole ? c.role.toLowerCase().includes(filterRole.toLowerCase()) : true;
    return matchSearch && matchRole && c.stage !== 'Rejected';
  });

  const handleDragStart = (e, candId) => {
    e.dataTransfer.setData('text/plain', candId);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const candId = e.dataTransfer.getData('text/plain');
    if(candId) {
       moveCandidateStage(candId, targetStage);
       // Sync general status as well
       updateCandidate(candId, { status: targetStage });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const moveNextStage = (cand) => {
    const currentIndex = stages.findIndex(s => s.id === cand.stage);
    if(currentIndex < stages.length - 1) {
       const nextStage = stages[currentIndex + 1].id;
       moveCandidateStage(cand.id, nextStage);
       updateCandidate(cand.id, { status: nextStage });
       setActiveCandidate({...cand, stage: nextStage, status: nextStage});
       showToast(`Moved ${cand.name} to ${nextStage}`);
    }
  };

  const rejectCandidate = (cand) => {
    moveCandidateStage(cand.id, 'Rejected');
    updateCandidate(cand.id, { status: 'Rejected' });
    setActiveCandidate(null);
    showToast(`${cand.name} has been rejected`, 'error');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hiring Pipeline</h1>
          <p className="text-slate-500 font-medium">Track and move candidates through each hiring stage</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Pipeline exported as PDF')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export Pipeline</span>
          </button>
          <button onClick={() => navigate('/hr/candidates', { state: { openCreate: true } })} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Add Candidate</span>
          </button>
        </div>
      </div>

      <div className="card p-4 border-none bg-white shadow-soft flex flex-col lg:flex-row items-center gap-4 shrink-0 overflow-visible">
        <div className="relative flex-1 w-full text-slate-400">
          <Search className="absolute left-3 top-3" size={18} />
          <input type="text" placeholder="Search candidate..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10 h-11" />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="input-field h-11 pr-10 w-full sm:w-40 font-bold text-slate-600">
            <option value="">All Roles</option>
            <option value="Engineer">Engineering</option>
            <option value="Design">Design</option>
            <option value="Manager">Product / Mgmt</option>
          </select>
          <button onClick={() => { setSearchTerm(''); setFilterRole(''); }} className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-6 min-w-max h-full">
          {stages.map((stage) => {
            const stageCandidates = filteredCandidates.filter(c => c.stage === stage.id);
            return (
              <div 
                key={stage.id} 
                className="w-80 flex flex-col gap-4 h-full"
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
              >
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-2">
                      <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border", stage.color)}>
                         {stage.label}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{stageCandidates.length}</span>
                   </div>
                   <button onClick={() => navigate('/hr/candidates', { state: { openCreate: true } })} className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
                      <Plus size={18} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-slate-50/50 rounded-2xl border border-dashed border-slate-100 scrollbar-hide">
                   <AnimatePresence>
                     {stageCandidates.map((cand) => (
                        <motion.div
                          layout
                          key={cand.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                          onClick={() => setActiveCandidate(cand)}
                          draggable
                          onDragStart={(e) => handleDragStart(e, cand.id)}
                          className="card p-4 bg-white border border-slate-100 shadow-sm cursor-grab active:cursor-grabbing group"
                        >
                           <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                 <img src={cand.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=random`} alt={cand.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                                 <div>
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{cand.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{cand.role}</p>
                                 </div>
                              </div>
                              <button className="p-1 text-slate-200 hover:text-slate-400 group-hover:opacity-100 md:opacity-0 transition-opacity">
                                 <MoreHorizontal size={18} />
                              </button>
                           </div>

                           <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                              <div className="flex items-center gap-4">
                                 <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Match</span>
                                    <span className={cn("text-xs font-extrabold", cand.match > 90 ? "text-emerald-500" : "text-amber-500")}>{cand.match}%</span>
                                 </div>
                                 <div className="flex flex-col border-l border-slate-100 pl-4">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Exp</span>
                                    <span className="text-xs font-bold text-slate-700">{cand.exp}</span>
                                 </div>
                              </div>
                              <div className="flex -space-x-1.5 overflow-hidden">
                                 {[1,2,3].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[8px] font-extrabold text-slate-400">
                                       {i === 3 ? '+2' : <User size={10} />}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     ))}
                   </AnimatePresence>
                   
                   {stageCandidates.length === 0 && (
                      <div className="w-full h-full min-h-[100px] flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                        Drop Candidates Here
                      </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeCandidate && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveCandidate(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 20 }} 
               className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-4">
                     <img src={activeCandidate.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeCandidate.name)}&background=random`} alt={activeCandidate.name} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-xl" />
                     <div>
                        <h2 className="text-xl font-extrabold text-slate-900 leading-none">{activeCandidate.name}</h2>
                        <p className="text-sm font-bold text-primary-600 mt-1">{activeCandidate.role}</p>
                     </div>
                  </div>
                  <button onClick={() => setActiveCandidate(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-10 focus:outline-none">
                  <div className="flex items-center justify-between px-2 overflow-x-auto pb-4 scrollbar-hide">
                     {stages.slice(0, 5).map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 min-w-[70px]">
                           <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all", s.id === activeCandidate.stage ? "bg-primary-600 text-white shadow-lg ring-4 ring-primary-50" : "bg-slate-100 text-slate-400")}>
                              {idx + 1}
                           </div>
                           <span className={cn("text-[8px] font-bold uppercase tracking-widest", s.id === activeCandidate.stage ? "text-primary-600" : "text-slate-400")}>{s.label}</span>
                        </div>
                     ))}
                  </div>

                  <section className="space-y-4">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Contact & Info</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                           <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">AI Match</p>
                           <p className="text-2xl font-extrabold text-emerald-600">{activeCandidate.match}%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                           <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                           <p className="text-2xl font-extrabold text-slate-900">{activeCandidate.exp}</p>
                        </div>
                        <div className="col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 text-slate-600 text-sm">
                           <Mail size={16} /> <span className="font-medium">{activeCandidate.email}</span>
                        </div>
                     </div>
                  </section>

                  <section className="space-y-4">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Internal Communication</h3>
                     <div className="space-y-4">
                        <div className="p-4 bg-primary-50/30 rounded-2xl border border-primary-100 italic text-sm text-slate-600 relative">
                           "Strong technical background. Portfolio shows great attention to detail. Recommended for technical round."
                           <div className="flex items-center gap-2 mt-4 pt-4 border-t border-primary-100/30 not-italic">
                              <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-[10px] text-white font-bold">SJ</div>
                              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Sarah Johnson • 2d ago</span>
                           </div>
                        </div>
                     </div>
                  </section>
                  <section className="pt-4 flex items-center gap-2">
                     <button onClick={() => navigate('/hr/interviews', { state: { openCreate: true, candidate: activeCandidate.name } })} className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 text-sm flex justify-center items-center gap-2"><Calendar size={16} /> Schedule</button>
                  </section>
               </div>

               <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
                  <button onClick={() => rejectCandidate(activeCandidate)} className="flex-1 py-3.5 bg-white border border-slate-200 text-rose-500 rounded-xl font-bold hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm">
                     Reject
                  </button>
                  <button onClick={() => moveNextStage(activeCandidate)} className="flex-1 py-3.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">
                     {activeCandidate.stage === 'Hired' ? 'Add to Onboarding' : 'Move to Next Stage'}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HiringPipeline;

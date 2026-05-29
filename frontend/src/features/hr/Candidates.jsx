import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, Search, FileText, Filter, RotateCcw, 
  MoreVertical, Download, CheckCircle2, Clock, 
  X, Eye, Mail, Phone, Calendar, ArrowRight, 
  Briefcase, Star, MapPin, ExternalLink, Trash2,
  Sparkles, Upload
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHR } from '../../context/HRContext';

const Candidates = () => {
  const { candidates, addCandidate, updateCandidate, moveCandidateStage, deleteCandidate, showToast } = useHR();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatch, setFilteredMatch] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', role: '', exp: '1 Year', match: 75, status: 'Applied', stage: 'Applied'
  });

  useEffect(() => {
    if (location.state?.openCreate) {
      handleOpenCreate();
      // Clear state so it doesn't reopen on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const [previewingResume, setPreviewingResume] = useState(null);

  const stats = [
    { label: 'Total Candidates', value: candidates.length, icon: FileText, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Shortlisted', value: candidates.filter(c=>c.stage==='Shortlisted').length, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Interviewing', value: candidates.filter(c=>c.stage==='Interview').length, icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Hired', value: candidates.filter(c=>c.stage==='Hired').length, icon: Briefcase, bg: 'bg-indigo-50', color: 'text-indigo-600' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Shortlisted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Interview': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Screening': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Offer': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Hired': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Rejected': return 'bg-rose-50 text-rose-500 border-rose-100';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.role.toLowerCase().includes(searchTerm.toLowerCase());
    let matchAI = true;
    if (filteredMatch === '90') matchAI = c.match >= 90;
    if (filteredMatch === '75') matchAI = c.match >= 75 && c.match < 90;
    
    const matchStatus = filteredStatus ? c.stage.toLowerCase() === filteredStatus.toLowerCase() : true;

    return matchSearch && matchAI && matchStatus;
  });

  const handleOpenCreate = () => {
    setEditingCandidate(null);
    setFormData({ name: '', email: '', role: '', exp: '1 Year', match: 75, status: 'Applied', stage: 'Applied' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cand) => {
    setEditingCandidate(cand.id);
    setFormData({ ...cand });
    setIsModalOpen(true);
    setSelectedCandidate(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email) return showToast("Name and Email required", "error");
    
    // Auto sync status and stage for UI
    const processedData = {
      ...formData,
      status: formData.stage,
      img: formData.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
    };

    if (editingCandidate) {
      updateCandidate(editingCandidate, processedData);
    } else {
      addCandidate(processedData);
    }
    setIsModalOpen(false);
  };

  const handleStageChange = (id, newStage) => {
    moveCandidateStage(id, newStage);
    if(selectedCandidate?.id === id) {
      setSelectedCandidate({ ...selectedCandidate, stage: newStage, status: newStage });
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Candidates</h1>
          <p className="text-slate-500 font-medium">Review applicants and move top talent through the pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Database exported as CSV')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Bulk Export</span>
          </button>
          <button onClick={handleOpenCreate} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Plus size={18} />
             <span>Add Candidate</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="card p-6 bg-white border border-slate-100 shadow-soft">
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card p-6 border-none bg-white shadow-soft flex flex-col lg:flex-row items-center gap-4 overflow-visible">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input type="text" placeholder="Search by name, email, or role..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10 h-11" />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select value={filteredMatch} onChange={e => setFilteredMatch(e.target.value)} className="input-field h-11 appearance-none pr-10 w-full sm:w-48 font-bold text-slate-600">
            <option value="">AI Match Range</option>
            <option value="90">90% +</option>
            <option value="75">75% - 90%</option>
          </select>
          <select value={filteredStatus} onChange={e => setFilteredStatus(e.target.value)} className="input-field h-11 appearance-none pr-10 w-full sm:w-40 font-bold text-slate-600">
            <option value="">All Statuses</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Screening">Screening</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={() => { setSearchTerm(''); setFilteredMatch(''); setFilteredStatus(''); }} className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="card p-0 border-none bg-white shadow-soft overflow-hidden min-h-[400px]">
        {filteredCandidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Users size={48} className="mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-slate-700">No candidates found</h3>
            <p className="mt-2 text-sm font-medium">Try adjusting your filters or add a new candidate.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role Applied</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">AI Match</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Stage</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Resume</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="group hover:bg-slate-50/10 transition-colors">
                    <td className="px-6 py-5 cursor-pointer" onClick={() => setSelectedCandidate(cand)}>
                      <div className="flex items-center gap-4">
                        <img src={cand.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=random`} alt={cand.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-primary-600 transition-colors">{cand.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1.5">{cand.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 cursor-pointer" onClick={() => setSelectedCandidate(cand)}>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700">{cand.role}</p>
                        <p className="text-xs font-medium text-slate-400">{cand.exp || 'Entry'} Exp</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1.5">
                         <span className={cn("text-[10px] font-extrabold uppercase tracking-widest", cand.match > 90 ? "text-emerald-500" : cand.match >= 75 ? "text-primary-500" : "text-amber-500")}>
                           {cand.match}% Match
                         </span>
                         <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div className={cn("h-full rounded-full transition-all", cand.match > 90 ? "bg-emerald-500" : cand.match >= 75 ? "bg-primary-500" : "bg-amber-500")} style={{ width: `${cand.match}%` }} />
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", getStatusStyle(cand.stage))}>
                        {cand.stage}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button onClick={() => setPreviewingResume(cand)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all flex items-center gap-2">
                         <FileText size={18} />
                         <span className="text-xs font-bold hidden xl:inline">View</span>
                      </button>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setSelectedCandidate(cand)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all" title="View Details"><Eye size={18} /></button>
                        <button onClick={() => navigate('/hr/interviews', { state: { openCreate: true, candidate: cand.name } })} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Schedule Interview"><Calendar size={18} /></button>
                        <button onClick={() => deleteCandidate(cand.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete Candidate"><Trash2 size={18} /></button>
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
        {selectedCandidate && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCandidate(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-4">
                     <img src={selectedCandidate.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCandidate.name)}&background=random`} alt={selectedCandidate.name} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-xl" />
                     <div>
                        <h2 className="text-xl font-extrabold text-slate-900 leading-none">{selectedCandidate.name}</h2>
                        <p className="text-sm font-bold text-primary-600 mt-1">{selectedCandidate.role}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={() => handleOpenEdit(selectedCandidate)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all" title="Edit">
                        <MoreVertical size={20} />
                     </button>
                     <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                        <X size={24} />
                     </button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-8 space-y-10">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Match Score</p>
                        <div className="flex items-end gap-2">
                           <span className={cn("text-3xl font-extrabold", selectedCandidate.match > 90 ? "text-emerald-600" : "text-primary-600")}>{selectedCandidate.match}%</span>
                           {selectedCandidate.match > 90 && <span className="text-xs font-bold text-emerald-500 mb-1 flex items-center gap-0.5"><Sparkles size={12} /> Elite Match</span>}
                        </div>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                          Current Stage
                          <span className={cn("px-2 py-0.5 rounded text-[8px]", getStatusStyle(selectedCandidate.stage))}>{selectedCandidate.stage}</span>
                        </p>
                        <select 
                          value={selectedCandidate.stage} 
                          onChange={(e) => handleStageChange(selectedCandidate.id, e.target.value)}
                          className="mt-2 w-full text-sm font-bold text-slate-900 bg-transparent border-b-2 border-slate-200 pb-1 focus:outline-none focus:border-primary-500"
                        >
                          <option>Applied</option>
                          <option>Screening</option>
                          <option>Shortlisted</option>
                          <option>Interview</option>
                          <option>Offer</option>
                          <option>Hired</option>
                          <option>Rejected</option>
                        </select>
                     </div>
                  </div>

                  <section className="space-y-4">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Contact Details</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-slate-600 italic">
                           <Mail size={16} className="text-slate-300" />
                           <span className="text-sm font-medium">{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 italic">
                           <Phone size={16} className="text-slate-300" />
                           <span className="text-sm font-medium">+1 (555) 000-0000</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 italic">
                           <MapPin size={16} className="text-slate-300" />
                           <span className="text-sm font-medium">San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-3 text-primary-600 cursor-pointer hover:underline">
                           <ExternalLink size={16} className="text-primary-300" />
                           <span className="text-sm font-bold">LinkedIn Profile</span>
                        </div>
                     </div>
                  </section>

                  <section className="space-y-4 pt-4 border-t border-slate-100">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Recruiter Notes</h3>
                     <textarea className="input-field py-4 resize-none h-32" placeholder="Add a recruiter note for this candidate..."></textarea>
                     <button className="text-xs font-bold text-primary-600 hover:underline" onClick={() => showToast('Note saved')}>Save Note</button>
                  </section>
               </div>

               <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center gap-3 shrink-0">
                  <button onClick={() => handleStageChange(selectedCandidate.id, 'Rejected')} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
                     Reject Candidate
                  </button>
                  <button onClick={() => navigate('/hr/interviews', { state: { openCreate: true, candidate: selectedCandidate.name } })} className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">
                     Schedule Interview
                  </button>
               </div>
            </motion.div>
          </div>
        )}

        {previewingResume && (
           <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewingResume(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
                 <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                          <User size={22} />
                       </div>
                       <div>
                          <h2 className="text-lg font-extrabold text-slate-900">{previewingResume.name.replace(' ', '_')}_Resume.pdf</h2>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Resume • AI Analyzed</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button onClick={() => showToast('Starting download...')} className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"><Download size={20} /></button>
                       <button onClick={() => setPreviewingResume(null)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                    </div>
                 </div>
                 <div className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-10 flex justify-center">
                    <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm p-12 sm:p-20 relative overflow-hidden ring-1 ring-slate-900/5 min-h-[1056px]">
                       <div className="grid grid-cols-12 gap-10">
                          {/* Sidebar */}
                          <div className="col-span-4 border-r border-slate-100 pr-10">
                             <div className="w-24 h-24 rounded-2xl bg-slate-100 mb-8 overflow-hidden">
                                <img src={previewingResume.img} alt="" className="w-full h-full object-cover grayscale" />
                             </div>
                             <div className="space-y-8">
                                <div>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact</p>
                                   <p className="text-xs font-bold text-slate-900 break-words">{previewingResume.email}</p>
                                   <p className="text-xs font-medium text-slate-500 mt-1">+1 (555) 000-0000</p>
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Skills</p>
                                   <div className="flex flex-wrap gap-2">
                                      {['React', 'TypeScript', 'Node.js', 'System Design', 'Agile'].map(s => (
                                         <span key={s} className="text-[9px] font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100 text-slate-600">{s}</span>
                                      ))}
                                   </div>
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Languages</p>
                                   <p className="text-xs font-bold text-slate-900">English (Native)</p>
                                   <p className="text-xs font-bold text-slate-900 mt-1">Spanish (Professional)</p>
                                </div>
                             </div>
                          </div>

                          {/* Main Content */}
                          <div className="col-span-8">
                             <h1 className="text-4xl font-black text-slate-900 mb-2">{previewingResume.name}</h1>
                             <p className="text-lg font-bold text-primary-600 mb-10">{previewingResume.role}</p>

                             <section className="mb-10">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">Professional Summary</h3>
                                <p className="text-xs leading-relaxed text-slate-600 italic">
                                   Dedicated professional with {previewingResume.exp} in {previewingResume.role}. Proven track record of delivering high-quality solutions and leading cross-functional teams in fast-paced environments. Expert in modern technology stacks and architectural best practices.
                                </p>
                             </section>

                             <section className="mb-10">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">Experience</h3>
                                <div className="space-y-6">
                                   {[1,2].map(i => (
                                      <div key={i}>
                                         <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-900">{i === 1 ? 'Senior Lead' : 'Specialist'} • GlobalTech.ai</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">202{4-i} - Present</p>
                                         </div>
                                         <ul className="mt-2 space-y-1">
                                            <li className="text-[11px] text-slate-500">• Led development of critical infrastructure components</li>
                                            <li className="text-[11px] text-slate-500">• Mentored junior developers and improved CI/CD metrics</li>
                                         </ul>
                                      </div>
                                   ))}
                                </div>
                             </section>

                             <section>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">Education</h3>
                                <div>
                                   <p className="text-sm font-bold text-slate-900">M.S. Computer Science</p>
                                   <p className="text-xs font-medium text-slate-500 italic">Stanford University • 2021</p>
                                </div>
                             </section>
                          </div>
                       </div>
                       
                       {/* AI Overlay Checkmark */}
                       <div className="absolute top-12 right-12 flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-xl">
                          <Sparkles size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">{previewingResume.match}% AI SCORE</span>
                       </div>
                    </div>
                 </div>
                 <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
                    <button onClick={() => setPreviewingResume(null)} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all">Close</button>
                    <button onClick={() => showToast('Connecting to printer...')} className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">Print Resume</button>
                 </div>
              </motion.div>
           </div>
        )}


        {isModalOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                   <h2 className="text-xl font-extrabold text-slate-900">{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                  <div className="p-8 space-y-6">
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-primary-300 hover:text-primary-500 transition-all">
                           <Upload size={20} className="mb-1" />
                           <span className="text-[9px] font-bold uppercase tracking-widest">Avatar</span>
                        </div>
                        <div className="flex-1 space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Full Name <span className="text-rose-500">*</span></label>
                           <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Wick" className="input-field h-12" />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-rose-500">*</span></label>
                           <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Role Applied For</label>
                           <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Product Manager" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Experience</label>
                           <input type="text" value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} placeholder="e.g. 5 Years" className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">AI Match Score (Mock)</label>
                           <input type="number" min="0" max="100" value={formData.match} onChange={e => setFormData({...formData, match: parseInt(e.target.value)})} className="input-field h-12" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700 ml-1">Pipeline Stage</label>
                           <select value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})} className="input-field h-12 appearance-none">
                              <option>Applied</option>
                              <option>Screening</option>
                              <option>Shortlisted</option>
                              <option>Interview</option>
                              <option>Offer</option>
                              <option>Hired</option>
                              <option>Rejected</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-end gap-3 shrink-0">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-white rounded-xl transition-all">Cancel</button>
                     <button type="submit" className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">{editingCandidate ? 'Save Changes' : 'Add Candidate'}</button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Candidates;

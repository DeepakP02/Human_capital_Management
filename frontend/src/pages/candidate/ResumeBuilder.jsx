import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 User, Briefcase, GraduationCap, Sparkles, Plus, Trash2, ChevronRight, ChevronLeft, 
 Download, Eye, Save, Languages, Award, Settings2, FileText, CheckCircle2,
 Image as ImageIcon, Type, Palette, MapPin, Mail, Phone, Link as LinkIcon,
 PlusCircle, XCircle, Layout, MousePointer2, Zap, Trophy, Globe,
 Check, Info, RotateCcw
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCandidate } from '../../context/CandidateContext';
import CenterModal from '../../components/layout/CenterModal';

const ResumeBuilder = () => {
 const { resume, updateResumeStep, showToast } = useCandidate();
 const [activeStep, setActiveStep] = useState(0);
 const [localData, setLocalData] = useState(resume);
 const [isPreviewOpen, setIsPreviewOpen] = useState(false);
 const [isSaving, setIsSaving] = useState(false);

 // Sync internal state with context on load
 useEffect(() => {
 setLocalData(resume);
 }, [resume]);

 // Persist to context (autosave simulator)
 useEffect(() => {
 const timer = setTimeout(() => {
 setIsSaving(true);
 // In a real app, this would be an API call
 setTimeout(() => setIsSaving(false), 1000);
 }, 2000);
 return () => clearTimeout(timer);
 }, [localData]);

 const steps = [
 { title: 'Personal', icon: User, helper: 'Basic contact information' },
 { title: 'Experience', icon: Briefcase, helper: 'Work history' },
 { title: 'Education', icon: GraduationCap, helper: 'Academic background' },
 { title: 'Skills', icon: Sparkles, helper: 'Technical & professional skills' },
 { title: 'Extras', icon: Award, helper: 'Certifications & achievements' },
 { title: 'Template', icon: Layout, helper: 'Visual layout design' },
 ];

 const handleNext = () => {
 // Save current step data to context before moving
 const stepKeys = ['personal', 'experience', 'education', 'skills', 'extras', 'template'];
 updateResumeStep(stepKeys[activeStep], localData[stepKeys[activeStep]]);
 setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

 const updatePersonal = (field, value) => {
 setLocalData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
 };

 const addItem = (section) => {
 const freshItems = {
 experience: { id: Date.now(), company: '', role: '', type: 'Full-time', start: '', end: '', current: false, desc: '' },
 education: { id: Date.now(), school: '', degree: '', field: '', start: '', end: '', grade: '' },
 skills: { name: '', level: 50 }
 };
 setLocalData(prev => ({
 ...prev,
 [section]: [...prev[section], freshItems[section]]
 }));
 };

 const removeItem = (section, index) => {
 setLocalData(prev => ({
 ...prev,
 [section]: prev[section].filter((_, i) => i !== index)
 }));
 };

 const updateArrayItem = (section, index, field, value) => {
 setLocalData(prev => {
 const newList = [...prev[section]];
 newList[index] = { ...newList[index], [field]: value };
 return { ...prev, [section]: newList };
 });
 };

 // --------------------------------------------------------------------------
 // STEP RENDERERS
 // --------------------------------------------------------------------------

 const renderPersonal = () => (
 <div className="space-y-10 animate-fade-in text-left">
 <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
 <div className="group relative">
 <div className="w-36 h-36 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:border-primary-300 transition-all cursor-pointer overflow-hidden shadow-inner">
 <ImageIcon size={40} className="group-hover:scale-110 transition-transform duration-500" />
 <span className="text-[9px] font-medium mt-3">Upload Identity</span>
 </div>
 <button className="absolute -bottom-2 -right-2 w-11 h-11 bg-white text-primary-600 rounded-xl flex items-center justify-center shadow-2xl border border-slate-100 hover:scale-110 transition-transform">
 <Plus size={22} />
 </button>
 </div>
 <div className="flex-1 space-y-2">
 <h3 className="text-2xl font-medium text-slate-900 tracking-tight">Personal Information</h3>
 <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-md">Provide your contact details and professional summary for potential employers.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {[
 { label: 'First Name', key: 'firstName', icon: User },
 { label: 'Last Name', key: 'lastName', icon: User },
 { label: 'Job Title', key: 'title', icon: Briefcase },
 { label: 'Email', key: 'email', icon: Mail, type: 'email' },
 { label: 'Phone', key: 'phone', icon: Phone },
 { label: 'City / Location', key: 'city', icon: MapPin },
 { label: 'LinkedIn', key: 'linkedin', icon: Globe },
 { label: 'Portfolio URL', key: 'portfolio', icon: LinkIcon },
 ].map(field => (
 <div key={field.key} className="space-y-2 group">
 <label className="text-[10px] font-medium text-slate-400 ml-1 group-focus-within:text-primary-600 transition-colors uppercase">{field.label}</label>
 <div className="relative">
 <field.icon size={16} className="absolute left-4 top-4.5 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
 <input 
 type={field.type || 'text'} 
 value={localData.personal[field.key]}
 onChange={(e) => updatePersonal(field.key, e.target.value)}
 className="input-field h-14 pl-12 bg-slate-50 border-transparent font-medium" 
 />
 </div>
 </div>
 ))}
 <div className="md:col-span-2 space-y-2 group">
 <label className="text-[10px] font-medium text-slate-400 ml-1 group-focus-within:text-primary-600 transition-colors uppercase">Professional Summary</label>
 <textarea 
 rows={5}
 value={localData.personal.summary}
 onChange={(e) => updatePersonal('summary', e.target.value)}
 className="input-field py-6 bg-slate-50 border-transparent resize-none font-medium text-sm leading-relaxed" 
 placeholder="Summarize your career goals and key strengths..."
 />
 </div>
 </div>
 </div>
 );

 const renderExperience = () => (
 <div className="space-y-12 animate-fade-in text-left">
 <div className="flex items-center justify-between">
 <div className="space-y-1">
 <h3 className="text-2xl font-bold text-slate-900">Work Experience</h3>
 <p className="text-sm text-slate-500">Add your previous employment history</p>
 </div>
 <button 
 onClick={() => addItem('experience')}
 className="btn-primary px-8 py-3.5 shadow-lg shadow-primary-200"
 >
 <Plus size={18} /> <span>Add Experience</span>
 </button>
 </div>

 <div className="space-y-10">
 {localData.experience.map((exp, idx) => (
 <div key={idx} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-soft relative group hover:border-primary-100 transition-all">
 <button 
 onClick={() => removeItem('experience', idx)}
 className="absolute -top-3 -right-3 w-10 h-10 bg-white text-rose-500 rounded-xl flex items-center justify-center shadow-2xl border border-rose-50 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 scale-90 hover:rotate-90"
 >
 <Trash2 size={20} />
 </button>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">Job Title</label>
 <input 
 type="text" 
 value={exp.role}
 onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)}
 className="input-field h-14 bg-slate-50 border-transparent font-medium" 
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">Company Name</label>
 <input 
 type="text" 
 value={exp.company}
 onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)}
 className="input-field h-14 bg-slate-50 border-transparent font-medium" 
 />
 </div>
 <div className="grid grid-cols-2 gap-6 md:col-span-1">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">Start Date</label>
 <input type="month" value={exp.start} onChange={(e) => updateArrayItem('experience', idx, 'start', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">End Date</label>
 <input type="month" disabled={exp.current} value={exp.end} onChange={(e) => updateArrayItem('experience', idx, 'end', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium disabled:opacity-30" />
 </div>
 </div>
 <div className="md:col-span-1 flex items-center gap-4 pt-6">
 <input type="checkbox" checked={exp.current} onChange={(e) => updateArrayItem('experience', idx, 'current', e.target.checked)} className="w-6 h-6 rounded-lg accent-slate-900 border-2" />
 <label className="text-sm font-medium text-slate-600">I am currently working here</label>
 </div>
 <div className="md:col-span-2 space-y-2">
 <label className="text-xs font-semibold text-slate-600">Description & Achievements</label>
 <textarea 
 rows={4} 
 value={exp.desc}
 onChange={(e) => updateArrayItem('experience', idx, 'desc', e.target.value)}
 className="input-field py-6 bg-slate-50 border-transparent resize-none font-medium text-sm leading-relaxed" 
 placeholder="Describe your role and key accomplishments..."
 />
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );

 const renderEducation = () => (
 <div className="space-y-12 animate-fade-in text-left">
 <div className="flex items-center justify-between">
 <div className="space-y-1">
 <h3 className="text-2xl font-bold text-slate-900">Education</h3>
 <p className="text-sm text-slate-500">Academic background and qualifications</p>
 </div>
 <button 
 onClick={() => addItem('education')}
 className="btn-primary px-8 py-3.5 shadow-lg shadow-primary-200"
 >
 <Plus size={18} /> <span>Add Education</span>
 </button>
 </div>

 <div className="space-y-10">
 {localData.education.map((edu, idx) => (
 <div key={idx} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-soft relative group hover:border-primary-100 transition-all">
 <button onClick={() => removeItem('education', idx)} className="absolute -top-3 -right-3 w-10 h-10 bg-white text-rose-500 rounded-xl flex items-center justify-center shadow-2xl border border-rose-50 opacity-0 group-hover:opacity-100 scale-90 hover:rotate-90 transition-all">
 <Trash2 size={20} />
 </button>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">School / University</label>
 <input type="text" value={edu.school} onChange={(e) => updateArrayItem('education', idx, 'school', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">Degree / Qualification</label>
 <input type="text" value={edu.degree} onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold text-slate-600">Field of Study</label>
 <input type="text" value={edu.field} onChange={(e) => updateArrayItem('education', idx, 'field', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium" />
 </div>
 <div className="grid grid-cols-3 gap-6">
 <div className="col-span-1 space-y-2">
 <label className="text-xs font-semibold text-slate-600">Completion Year</label>
 <input type="text" value={edu.end} onChange={(e) => updateArrayItem('education', idx, 'end', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium" />
 </div>
 <div className="col-span-2 space-y-2">
 <label className="text-xs font-semibold text-slate-600">Grade / GPA</label>
 <input type="text" value={edu.grade} onChange={(e) => updateArrayItem('education', idx, 'grade', e.target.value)} className="input-field h-14 bg-slate-50 border-transparent font-medium px-6" />
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );

 const renderSkills = () => (
 <div className="space-y-12 animate-fade-in text-left">
 <div className="flex items-center justify-between">
 <div className="space-y-1">
 <h3 className="text-2xl font-bold text-slate-900">Skills</h3>
 <p className="text-sm text-slate-500">Highlight your technical and professional expertise</p>
 </div>
 <button onClick={() => addItem('skills')} className="btn-primary px-8 py-3.5 shadow-lg shadow-primary-200">
 <Plus size={18} /> <span>Add Skill</span>
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {localData.skills.map((skill, idx) => (
 <div key={idx} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all relative">
 <div className="flex-1 space-y-5">
 <div className="flex items-center justify-between px-1">
 <input 
 type="text" 
 value={skill.name}
 onChange={(e) => updateArrayItem('skills', idx, 'name', e.target.value)}
 placeholder="Type skill..." 
 className="bg-transparent border-none text-base font-semibold text-slate-900 focus:ring-0 p-0" 
 />
 <span className="text-xs font-semibold text-primary-600">{skill.level}% Proficiency</span>
 </div>
 <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: `${skill.level}%` }}
 className="h-full bg-primary-600 rounded-full group-hover:bg-primary-600 transition-colors" 
 />
 </div>
 <input 
 type="range" 
 min="0" 
 max="100" 
 value={skill.level} 
 onChange={(e) => updateArrayItem('skills', idx, 'level', e.target.value)}
 className="w-full h-1 bg-transparent appearance-none cursor-pointer accent-slate-900 opacity-50 hover:opacity-100 transition-opacity" 
 />
 </div>
 <button onClick={() => removeItem('skills', idx)} className="text-slate-300 hover:text-rose-500 transition-colors shrink-0">
 <XCircle size={24} />
 </button>
 </div>
 ))}
 </div>

  <div className="p-10 bg-slate-50 rounded-2xl text-left relative overflow-hidden border border-slate-100 group">
  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
  <Zap size={150} fill="#0f172a" />
  </div>
  <div className="relative z-10">
  <h4 className="text-sm font-semibold text-slate-400 mb-4 leading-none">Recommended Skills</h4>
  <p className="text-lg font-semibold text-slate-900 mb-8 leading-tight max-w-[350px]">Employers in your sector are looking for these skills.</p>
  <div className="flex flex-wrap gap-3">
  {['Rust Engineering', 'LLM Fine-tuning', 'Vector Databases', 'Strategic Forecasting', 'Cyber Audit'].map(s => (
  <button key={s} onClick={() => { setLocalData(prev => ({ ...prev, skills: [...prev.skills, { name: s, level: 75 }] })); showToast(`Skill ${s} drafted`); }} className="px-5 py-2.5 bg-white hover:bg-primary-600 text-slate-600 hover:text-white rounded-full text-xs font-semibold transition-all border border-slate-100">
  + {s}
  </button>
  ))}
  </div>
  </div>
  </div>
 </div>
 );

 const renderExtras = () => (
 <div className="space-y-12 animate-fade-in text-left">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 {/* Certs & Languages */}
 <div className="space-y-10">
 <section className="space-y-6">
 <div className="flex justify-between items-center px-2">
 <h4 className="text-sm font-semibold text-slate-400">Certifications</h4>
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, certs: [...prev.extras.certs, 'New Certification'] } }))} className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">+ ADD</button>
 </div>
 {localData.extras.certs.map((c, i) => (
 <div key={i} className="flex items-center gap-4 group">
 <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-600 font-semibold shadow-sm group-hover:scale-110 transition-transform">{i+1}</div>
 <input 
 type="text" 
 value={c} 
 onChange={(e) => {
 const newCerts = [...localData.extras.certs];
 newCerts[i] = e.target.value;
 setLocalData(prev => ({ ...prev, extras: { ...prev.extras, certs: newCerts } }));
 }} 
 className="flex-1 bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0" 
 />
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, certs: prev.extras.certs.filter((_, ci) => ci !== i) } }))} className="text-slate-200 hover:text-rose-500 opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
 </div>
 ))}
 </section>

 <section className="space-y-6">
 <div className="flex justify-between items-center px-2">
 <h4 className="text-sm font-semibold text-slate-400">Languages</h4>
 </div>
 <div className="grid grid-cols-1 gap-4">
 {localData.extras.languages.map((l, i) => (
 <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
 <input 
 className="bg-transparent border-none p-0 text-sm font-semibold text-slate-800" 
 value={l.split(' (')[0]} 
 onChange={(e) => {
 const newLangs = [...localData.extras.languages];
 newLangs[i] = `${e.target.value} (${l.split(' (')[1] || 'Native'})`;
 setLocalData(prev => ({ ...prev, extras: { ...prev.extras, languages: newLangs } }));
 }}
 />
 <select 
 value={l.split(' (')[1]?.replace(')', '') || 'Native'}
 onChange={(e) => {
 const newLangs = [...localData.extras.languages];
 newLangs[i] = `${l.split(' (')[0]} (${e.target.value})`;
 setLocalData(prev => ({ ...prev, extras: { ...prev.extras, languages: newLangs } }));
 }}
 className="text-xs font-semibold text-primary-600 bg-white px-3 py-1 rounded-lg border-none shadow-sm"
 >
 <option>Native</option>
 <option>Fluent</option>
 <option>Intermediate</option>
 </select>
 </div>
 ))}
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, languages: [...prev.extras.languages, 'New Language (Basic)'] } }))} className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[2rem] text-xs font-semibold text-slate-400 hover:border-primary-100 hover:text-primary-500 transition-all">Add Language</button>
 </div>
 </section>
 </div>

 {/* Awards & Projects */}
 <div className="space-y-10">
 <section className="p-10 bg-indigo-600 rounded-[3rem] text-white overflow-hidden relative shadow-premium">
 <div className="absolute top-0 right-0 p-8 opacity-10">
 <Trophy size={140} fill="#fff" />
 </div>
 <div className="relative z-10">
 <h4 className="text-xs font-semibold text-indigo-200 mb-4">Achievements & Awards</h4>
 <div className="space-y-6">
 {localData.extras.awards.map((a, i) => (
 <div key={i} className="flex gap-4 group">
 <div className="w-1.5 h-6 bg-white/20 rounded-full mt-1" />
 <input 
 type="text" 
 value={a} 
 onChange={(e) => {
 const newAwards = [...localData.extras.awards];
 newAwards[i] = e.target.value;
 setLocalData(prev => ({ ...prev, extras: { ...prev.extras, awards: newAwards } }));
 }}
 className="flex-1 bg-transparent border-none p-0 text-lg font-semibold focus:ring-0" 
 />
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, awards: prev.extras.awards.filter((_, ai) => ai !== i) } }))} className="text-white/20 hover:text-rose-400"><Trash2 size={16} /></button>
 </div>
 ))}
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, awards: [...prev.extras.awards, 'Strategic Award Title'] } }))} className="text-xs font-semibold text-indigo-300 hover:text-white transition-all">+ Add Award</button>
 </div>
 </div>
 </section>
 
 <section className="space-y-6">
 <h4 className="text-sm font-semibold text-slate-400 px-2">Interests</h4>
 <div className="flex flex-wrap gap-3">
 {localData.extras.interests.map((int, i) => (
 <div key={i} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-semibold flex items-center gap-3">
 {int}
 <button onClick={() => setLocalData(prev => ({ ...prev, extras: { ...prev.extras, interests: prev.extras.interests.filter((_, ii) => ii !== i) } }))} className="text-white/30 hover:text-white"><XCircle size={14} /></button>
 </div>
 ))}
 <button onClick={() => { const val = prompt('Interest Name:'); if(val) setLocalData(prev => ({ ...prev, extras: { ...prev.extras, interests: [...prev.extras.interests, val] } })); }} className="px-5 py-2.5 border-2 border-dashed border-slate-100 rounded-xl text-xs font-semibold text-primary-600">+ ADD</button>
 </div>
 </section>
 </div>
 </div>
 </div>
 );

 const renderTemplate = () => (
 <div className="space-y-12 animate-fade-in text-left">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 {/* Customizer */}
 <div className="col-span-1 space-y-10">
 <div className="space-y-6">
 <p className="text-xs font-semibold text-slate-400">Color Scheme</p>
 <div className="grid grid-cols-5 gap-4">
 {['#0f172a', '#4f46e5', '#10b981', '#f43f5e', '#8b5cf6', '#d946ef', '#f97316', '#22c55e', '#ec4899', '#14b8a6'].map(c => (
 <button key={c} style={{ backgroundColor: c }} className="w-12 h-12 rounded-xl border-4 border-white shadow-xl hover:scale-110 transition-transform active:rotate-12" />
 ))}
 </div>
 </div>
 
 <div className="space-y-6">
 <p className="text-xs font-semibold text-slate-400">Resume Template</p>
 <div className="grid grid-cols-1 gap-3">
 {['Modern Adaptive', 'Strict Industrial', 'Strategic Clean', 'High-Impact Grid'].map((t, i) => (
 <button key={t} className={cn("p-5 rounded-2xl border text-xs font-bold text-left transition-all", i === 0 ? "bg-slate-900 text-white border-transparent shadow-xl translate-x-4" : "bg-slate-50 text-slate-400 border-slate-100")}>
 {t}
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Template Preview Grid */}
 <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
 {['Modern', 'Industrial', 'Clean', 'Grid'].map((t, idx) => (
 <div key={idx} className="group relative overflow-hidden rounded-[3rem] border border-slate-100 shadow-soft cursor-pointer">
 <div className="aspect-[4/5] bg-slate-50 flex items-center justify-center p-8 overflow-hidden group-hover:scale-105 transition-transform duration-1000">
 <div className="w-full h-full bg-white shadow-2xl rounded-sm transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
 {/* Mock Canvas Content */}
 <div className="p-6 space-y-4">
 <div className="w-1/2 h-4 bg-primary-600 rounded-sm" />
 <div className="w-3/4 h-2 bg-slate-100 rounded-sm" />
 <div className="grid grid-cols-2 gap-4 pt-4">
 <div className="h-20 bg-slate-50 rounded-lg" />
 <div className="h-20 bg-slate-50 rounded-lg" />
 </div>
 </div>
 </div>
 </div>
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-left">
 <p className="text-white font-bold text-xl">{t} Style</p>
 <button className="mt-4 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold">Select Template</button>
 </div>
 {idx === 0 && (
 <div className="absolute top-6 left-6 p-2 bg-primary-600 text-white rounded-lg shadow-xl animate-bounce">
 <Check size={16} strokeWidth={4} />
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </div>
 );

 return (
 <div className="space-y-8 pb-12 animate-fade-in max-w-7xl mx-auto flex flex-col min-h-screen lg:min-h-0">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[3rem] border border-slate-50 shadow-soft">
 <div className="text-left">
 <h1 className="text-4xl font-bold text-slate-900 mb-2">Resume Builder</h1>
 <p className="text-slate-400 font-medium text-sm">Phased Configuration: <span className="text-slate-900 font-bold">{steps[activeStep].title}</span></p>
 </div>
 <div className="flex items-center gap-4">
 {isSaving && (
 <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold animate-pulse border border-emerald-100 h-14">
 <Zap size={16} /> Saving...
 </div>
 )}
 <button onClick={() => setIsPreviewOpen(true)} className="w-14 h-14 bg-white text-slate-600 border border-slate-200 hover:text-primary-600 rounded-xl flex items-center justify-center transition-all shadow-sm">
 <Eye size={24} />
 </button>
 <button onClick={() => { showToast('Artifact exported to PDF vault'); }} className="btn-primary h-14 px-8 shadow-xl shadow-primary-100 flex items-center justify-center gap-3 transition-all">
 <Download size={20} /> Download PDF
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1">
 {/* Navigation */}
 <div className="lg:col-span-3 space-y-8">
 <div className="card p-4 border-none bg-white shadow-soft rounded-[2.5rem]">
 <nav className="flex flex-col gap-3 relative">
 <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-50" />
 {steps.map((s, i) => (
 <button 
 key={i} 
 onClick={() => { updateResumeStep(steps[activeStep].title.toLowerCase(), localData[steps[activeStep].title.toLowerCase()]); setActiveStep(i); }}
 className={cn(
 "w-full flex items-center gap-5 p-5 rounded-[1.75rem] transition-all relative z-10",
 activeStep === i ? "bg-slate-900 text-white shadow-premium scale-105" : "text-slate-300 hover:bg-slate-50 hover:text-slate-500"
 )}
 >
 <div className={cn("p-2 rounded-xl transition-all duration-700", activeStep === i ? "bg-white/20 rotate-12 scale-110" : "bg-slate-50")}>
 <s.icon size={20} className={cn(activeStep === i ? "text-white" : "text-slate-200")} />
 </div>
 <span className="text-xs font-bold text-left">{s.title}</span>
 {i < activeStep && <CheckCircle2 size={14} className="ml-auto text-emerald-500" />}
 </button>
 ))}
 </nav>
 </div>
 
 <div className="card p-10 bg-indigo-600 rounded-[3rem] text-white overflow-hidden relative shadow-premium border-none text-left">
 <div className="absolute top-0 right-0 p-8 opacity-20 animate-pulse">
 <Sparkles size={120} />
 </div>
 <p className="text-xs font-semibold text-indigo-200 mb-6">AI Generative Mode</p>
 <h4 className="text-xl font-bold mb-8 leading-tight">Elevate your summary with AI insights.</h4>
 <button className="w-full py-4 bg-white text-indigo-600 rounded-xl text-xs font-bold shadow-2xl hover:bg-slate-50 transition-all active:scale-95">Auto-Generate Summary</button>
 </div>
 </div>

 {/* Content Viewport */}
 <div className="lg:col-span-9 flex flex-col h-full">
 <div className="card h-full p-12 bg-white border-none shadow-soft flex flex-col relative rounded-[3.5rem] min-h-[750px]">
 <div className="flex-1">
 <div className="mb-12 text-left">
 <h2 className="text-4xl font-bold text-slate-900 mb-2">{steps[activeStep].title} Details</h2>
 <p className="text-slate-400 font-medium text-sm">{steps[activeStep].helper}</p>
 </div>
 
 <AnimatePresence mode="wait">
 <motion.div
 key={activeStep}
 initial={{ opacity: 0, x: 10 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -10 }}
 transition={{ duration: 0.3 }}
 >
 {activeStep === 0 && renderPersonal()}
 {activeStep === 1 && renderExperience()}
 {activeStep === 2 && renderEducation()}
 {activeStep === 3 && renderSkills()}
 {activeStep === 4 && renderExtras()}
 {activeStep === 5 && renderTemplate()}
 </motion.div>
 </AnimatePresence>
 </div>

 {/* Viewport Actions */}
 <div className="pt-10 border-t border-slate-50 mt-12 flex items-center justify-between">
 <button 
 onClick={handleBack}
 disabled={activeStep === 0}
 className="flex items-center gap-3 px-8 py-4 text-slate-400 hover:text-slate-900 text-sm font-bold disabled:opacity-0 transition-all"
 >
 <ChevronLeft size={20} /> Previous Step
 </button>
 <div className="flex gap-4">
 <button className="hidden sm:flex items-center gap-3 px-6 py-4 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-bold border border-slate-50 hover:bg-white hover:border-slate-100 transition-all">
 <RotateCcw size={16} /> Reset Step
 </button>
 <button 
 onClick={() => activeStep === steps.length - 1 ? setIsPreviewOpen(true) : handleNext()}
 className="btn-primary px-10 py-4 shadow-xl shadow-primary-200 flex items-center gap-3 group"
 >
 <span>{activeStep === steps.length - 1 ? 'Preview Resume' : 'Continue to Next Step'}</span>
 <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Artifact Preview Modal */}
 <CenterModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Resume Preview" maxWidth="max-w-5xl">
 <div className="p-12 text-left bg-slate-50">
 <div className="bg-white shadow-[0_30px_100px_rgba(0,0,0,0.1)] rounded-sm min-h-[1100px] flex flex-col mx-auto max-w-[800px] overflow-hidden">
 {/* Document Header */}
 <div className="bg-primary-600 p-16 text-white grid grid-cols-12 gap-8 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full" />
 <div className="col-span-8 space-y-6 relative z-10">
 <h2 className="text-5xl font-bold">{localData.personal.firstName} {localData.personal.lastName}</h2>
 <p className="text-xl font-bold text-primary-400 leading-none mb-10">{localData.personal.title}</p>
 <p className="text-sm font-medium opacity-80 leading-relaxed max-w-lg">"{localData.personal.summary}"</p>
 </div>
 <div className="col-span-4 flex flex-col justify-end items-end space-y-3 relative z-10">
 <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
 {localData.personal.city} <MapPin size={14} />
 </div>
 <div className="flex items-center gap-3 text-sm font-medium text-white">
 {localData.personal.email} <Mail size={14} />
 </div>
 <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
 {localData.personal.portfolio} <Globe size={14} />
 </div>
 </div>
 </div>

 {/* Document Body */}
 <div className="p-16 grid grid-cols-12 gap-16 flex-1">
 <div className="col-span-8 space-y-12">
 <section className="space-y-8">
 <h3 className="text-sm font-bold text-slate-300 border-b-2 border-slate-50 pb-2">Employment History</h3>
 <div className="space-y-12">
 {localData.experience.map((e, i) => (
 <div key={i} className="relative pl-8">
 <div className="absolute left-0 top-2 bottom-0 w-1 bg-primary-600/5" />
 <div className="flex justify-between items-start mb-4">
 <div>
 <h4 className="text-xl font-bold text-slate-900">{e.role}</h4>
 <p className="text-xs font-bold text-primary-600 mt-2">{e.company}</p>
 </div>
 <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-md">{e.start} — {e.current ? 'PRESENT' : e.end}</span>
 </div>
 <p className="text-sm font-medium text-slate-500 leading-relaxed">"{e.desc}"</p>
 </div>
 ))}
 </div>
 </section>
 </div>

 <div className="col-span-4 space-y-12">
 <section className="space-y-6">
 <h3 className="text-xs font-bold text-slate-300">Technical Skills</h3>
 <div className="space-y-6">
 {localData.skills.map((s, i) => (
 <div key={i} className="space-y-2">
 <div className="flex justify-between text-xs font-bold text-slate-900">
 <span>{s.name}</span>
 <span>{s.level}%</span>
 </div>
 <div className="h-1 bg-slate-100 w-full rounded-full">
 <div className="h-full bg-primary-600 rounded-full" style={{ width: `${s.level}%` }} />
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="space-y-6">
 <h3 className="text-xs font-bold text-slate-300">Education</h3>
 <div className="space-y-6">
 {localData.education.map((edu, i) => (
 <div key={i}>
 <h4 className="text-sm font-bold text-slate-900 mb-2">{edu.degree}</h4>
 <p className="text-xs font-semibold text-slate-400">{edu.school}</p>
 </div>
 ))}
 </div>
 </section>
 
 <section className="space-y-6">
 <h3 className="text-xs font-bold text-slate-300">Certifications</h3>
 <ul className="space-y-3">
 {localData.extras.certs.map((c, i) => (
 <li key={i} className="text-xs font-semibold text-slate-600 flex items-center gap-3">
 <div className="w-1 h-1 bg-primary-600 rounded-full" /> {c}
 </li>
 ))}
 </ul>
 </section>
 </div>
 </div>
 </div>
 
 <div className="mt-12 flex justify-center">
  <button onClick={() => setIsPreviewOpen(false)} className="btn-primary px-12 py-5 shadow-2xl transition-all">Close Preview</button>
 </div>
 </div>
 </CenterModal>
 </div>
 );
};

export default ResumeBuilder;

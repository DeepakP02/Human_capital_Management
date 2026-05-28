import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 Upload, FileText, Cpu, Search, Plus, RotateCcw, Copy, CheckCircle2, 
 AlertCircle, Zap, TrendingUp, Target, Award, ChevronDown, X, Sparkles, 
 ArrowRight, ShieldCheck, Type, Layout, Briefcase, Info, Download, Microscope
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCandidate } from '../../context/CandidateContext';
import CenterModal from '../../components/layout/CenterModal';

const AIResumeScore = () => {
 const { showToast } = useCandidate();
 const [isUploaded, setIsUploaded] = useState(false);
 const [isAnalyzing, setIsAnalyzing] = useState(false);
 const [analysisPhase, setAnalysisPhase] = useState(0);
 const [score, setScore] = useState(0);

 const analysisSteps = [
 "Analyzing resume structure...",
 "Extracting key skills and experience...",
 "Comparing with industry standards...",
 "Checking ATS compatibility...",
 "Generating your resume report..."
 ];

 const metrics = [
 { label: 'Keyword Density', score: 88, color: 'text-emerald-500', bg: 'bg-emerald-50' },
 { label: 'Readability Index', score: 92, color: 'text-blue-500', bg: 'bg-blue-50' },
 { label: 'Impact Statements', score: 74, color: 'text-purple-500', bg: 'bg-purple-50' },
 { label: 'Contact Integrity', score: 100, color: 'text-amber-500', bg: 'bg-amber-50' },
 ];

 const suggestions = [
 { type: 'Critical', text: 'Missing "Cloud Architecture" keyword for target Senior roles.', icon: AlertCircle, color: 'text-rose-500' },
 { type: 'Strategic', text: 'Quantify impact in TechFlow role (e.g. % growth).', icon: Target, color: 'text-primary-500' },
 { type: 'Formatting', text: 'Ensure date consistency across Experience nodes.', icon: Layout, color: 'text-slate-400' },
 ];

 const handleStartAnalysis = () => {
 setIsAnalyzing(true);
 setAnalysisPhase(0);
 setScore(0);
 };

 useEffect(() => {
 if (isAnalyzing) {
 const interval = setInterval(() => {
 setAnalysisPhase(prev => {
 if (prev >= analysisSteps.length - 1) {
 clearInterval(interval);
 setIsAnalyzing(false);
 setIsUploaded(true);
 // Animate score to 84%
 let s = 0;
 const scoreInterval = setInterval(() => {
 if (s >= 84) clearInterval(scoreInterval);
 else { s += 1; setScore(s); }
 }, 20);
 return prev;
 }
 return prev + 1;
 });
 }, 800);
 return () => clearInterval(interval);
 }
 }, [isAnalyzing]);

 if (!isUploaded && !isAnalyzing) {
 return (
 <div className="space-y-8 animate-fade-in max-w-5xl mx-auto text-left">
 <div className="text-center space-y-4 mb-16">
 <h1 className="text-5xl font-bold text-slate-900 tracking-tight">AI Resume Score</h1>
 <p className="text-slate-400 font-medium text-sm">Get instant feedback on your resume using AI analysis</p>
 </div>

 <div className="min-h-[500px] flex flex-col items-center justify-center p-16 bg-white border-2 border-dashed border-slate-100 rounded-[4rem] group hover:border-primary-100 hover:bg-slate-50 transition-all duration-700 shadow-soft">
 <div className="w-32 h-32 bg-primary-50 rounded-[3rem] flex items-center justify-center text-primary-600 mb-10 group-hover:scale-110 transition-transform duration-700 shadow-inner group-hover:rotate-6">
 <Sparkles size={64} className="animate-pulse" />
 </div>
 <h2 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight uppercase">Improve Your Resume Score</h2>
 <p className="text-slate-500 font-medium mb-12 text-center max-w-md uppercase tracking-tight text-sm leading-relaxed">
 Upload your resume to analyze ATS compatibility, keyword match, formatting, and job-readiness.
 </p>
 <label className="cursor-pointer">
 <input type="file" className="hidden" onChange={handleStartAnalysis} />
 <div className="btn-primary flex items-center gap-4 px-12 py-5 shadow-2xl shadow-primary-200">
 <Upload size={22} />
 <span>Upload Resume</span>
 </div>
 </label>
 <p className="mt-8 text-[9px] font-medium text-slate-300">Supported: PDF, DOCX (Max 5MB)</p>
 </div>
 </div>
 );
 }

 if (isAnalyzing) {
 return (
 <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-12 animate-fade-in">
 <div className="relative w-40 h-40">
 <div className="absolute inset-0 border-8 border-slate-100 rounded-[3rem] animate-pulse"></div>
 <div className="absolute inset-x-0 top-0 h-2 bg-primary-600 rounded-full animate-progress-flow"></div>
 <div className="absolute inset-0 flex items-center justify-center text-primary-600">
 <Cpu size={64} className="animate-spin-slow" />
 </div>
 </div>
 <div className="text-center space-y-4">
 <h3 className="text-2xl font-medium text-slate-900 tracking-tight uppercase">{analysisSteps[analysisPhase]}</h3>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.4em] animate-pulse">Analyzing content and formatting...</p>
 </div>
 </div>
 );
 }

 return (
 <div className="space-y-10 pb-12 animate-fade-in max-w-7xl mx-auto text-left">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-soft">
 <div>
 <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Resume Analysis Results</h1>
 <p className="text-slate-400 font-medium text-sm">File: <span className="text-slate-900 font-medium">RESUME_2026.PDF</span></p>
 </div>
 <div className="flex gap-4">
 <button onClick={() => { setIsUploaded(false); handleStartAnalysis(); }} className="w-14 h-14 bg-white text-slate-600 border border-slate-200 border border-slate-100 hover:text-primary-600 rounded-xl flex items-center justify-center transition-all shadow-sm">
 <RotateCcw size={24} />
 </button>
 <button onClick={() => { showToast('Report saved successfully'); }} className="btn-primary h-14 px-8 shadow-xl flex items-center gap-3 transition-all">
 <Download size={20} /> Save Report
 </button>
 </div>
 </div>

 {/* Main Analytics Hub */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
 
 {/* Core Score Meter */}
 <div className="lg:col-span-5 card p-12 flex flex-col items-center justify-center bg-white border-none shadow-soft relative overflow-hidden rounded-[4rem]">
 <div className="absolute top-10 left-10 text-[9px] font-medium text-slate-300 uppercase tracking-[0.4em] flex items-center gap-3">
 <Microscope size={14} className="text-primary-600" /> Resume Strength
 </div>
 
 <div className="relative w-64 h-64 flex items-center justify-center mb-10 mt-6">
 <svg className="w-full h-full transform -rotate-90 scale-110">
 <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="18" fill="transparent" className="text-slate-50" />
 <motion.circle 
 cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="18" fill="transparent" 
 strokeDasharray={691}
 initial={{ strokeDashoffset: 691 }}
 animate={{ strokeDashoffset: 691 - (691 * score) / 100 }}
 transition={{ duration: 2, ease: "easeOut" }}
 className="text-primary-600"
 strokeLinecap="round"
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-7xl font-bold text-slate-900 tracking-tight">{score}</span>
 <span className="text-[10px] font-medium text-slate-400 mt-2">Overall Score</span>
 </div>
 </div>

 <div className="text-center space-y-6">
 <div className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-medium uppercase tracking-[0.3em] inline-block border border-emerald-100">
 ATS Compatibility: High
 </div>
 <p className="text-sm font-medium text-slate-500 px-8 leading-relaxed">
 Your resume score is significantly higher than the industry average of 62%. Some improvements could be made to "Leadership" roles.
 </p>
 </div>
 </div>

 {/* Tactical Breakdown and Suggestions */}
 <div className="lg:col-span-7 space-y-10">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {metrics.map((m, i) => (
 <motion.div 
 key={i} 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: i * 0.1 }}
 className="p-8 bg-white rounded-[2.5rem] border border-slate-50 shadow-soft group hover:border-primary-100 transition-all"
 >
 <div className="flex justify-between items-center mb-6">
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">{m.label}</p>
 <span className={cn("text-sm font-bold ", m.color)}>{m.score}%</span>
 </div>
 <div className="relative h-2 bg-slate-50 rounded-full overflow-hidden">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: `${m.score}%` }}
 transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
 className={cn("h-full rounded-full", m.bg.replace('bg-', 'bg-').replace('50', '500') || 'bg-primary-600')}
 />
 </div>
 </motion.div>
 ))}
 </div>

 <div className="card p-10 bg-primary-600 border-none shadow-premium relative overflow-hidden rounded-[3rem]">
 <div className="absolute top-0 right-0 p-8 opacity-10">
 <AlertCircle size={120} className="text-white" />
 </div>
 <h3 className="text-[10px] font-medium text-primary-400 uppercase tracking-[0.4em] mb-10 leading-none">Recommendations for Improvement</h3>
 <div className="space-y-6 relative z-10">
 {suggestions.map((s, i) => (
 <div key={i} className="flex items-start gap-6 p-6 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer border border-white/5">
 <div className={cn("p-3 rounded-xl bg-white/10 shrink-0", s.color)}>
 <s.icon size={20} />
 </div>
 <div>
 <p className={cn("text-[9px] font-bold uppercase tracking-widest mb-1", s.color)}>{s.type}</p>
 <p className="text-sm font-medium text-white tracking-tight">{s.text}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Tertiary Metrics */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 <div className="card p-10 bg-white border-none shadow-soft rounded-[3rem]">
 <h4 className="text-[10px] font-bold text-slate-800 mb-10 flex items-center gap-3">
 <Target size={14} className="text-primary-600" /> Industry Benchmarking
 </h4>
 <div className="space-y-8">
 {[
 { sector: 'Product Design', match: 84 },
 { sector: 'Software Arch', match: 62 },
 { sector: 'Product Mgmt', match: 71 },
 ].map((sec, i) => (
 <div key={i} className="flex items-center justify-between group">
 <span className="text-sm font-medium text-slate-800">{sec.sector}</span>
 <div className="flex items-center gap-4">
 <div className="w-32 h-1.5 bg-slate-50 rounded-full overflow-hidden">
 <div className="h-full bg-primary-600 group-hover:bg-primary-600 transition-colors" style={{ width: `${sec.match}%` }} />
 </div>
 <span className="text-[10px] font-medium text-slate-400">{sec.match}%</span>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="card p-10 bg-slate-50 border-none shadow-soft rounded-[3rem] relative overflow-hidden group">
 <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
 <ShieldCheck size={180} />
 </div>
 <h4 className="text-[10px] font-bold text-slate-800 mb-10 flex items-center gap-3">
 <CheckCircle2 size={14} className="text-emerald-500" /> Analysis Checks
 </h4>
 <ul className="space-y-6">
 {[
 'Secure Data Processing',
 'ATS Metadata Optimization',
 'File Structural Check',
 'Keyword Mapping Analysis'
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-4 text-[10px] font-medium text-slate-600">
 <CheckCircle2 size={14} className="text-emerald-500" /> {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="card p-10 bg-primary-600 border-none shadow-premium rounded-[3rem] text-white relative overflow-hidden group">
 <div className="absolute -top-6 -right-6 p-4 opacity-20 group-hover:rotate-12 transition-transform duration-1000">
 <Zap size={150} fill="#fff" />
 </div>
 <p className="text-[9px] font-medium text-primary-200 mb-6 leading-none">Instant Improvements</p>
 <h4 className="text-2xl font-bold tracking-tight mb-10 leading-tight">Apply suggested improvements to your resume now.</h4>
 <button onClick={() => { showToast('Redirecting to Resume Builder...'); navigate('/candidate/resume'); }} className="btn-primary w-full py-5 bg-white text-primary-600 shadow-2xl">Open Resume Builder</button>
 </div>
 </div>
 </div>
 );
};

export default AIResumeScore;

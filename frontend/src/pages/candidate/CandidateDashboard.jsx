import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
 Briefcase, Calendar, Award, UserCircle, TrendingUp, Search, Plus, ExternalLink, 
 ChevronRight, MoreHorizontal, Clock, Video, FileText, CheckCircle2, MapPin, DollarSign, X, ArrowRight, Zap
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCandidate } from '../../context/CandidateContext';
import { useNavigate } from 'react-router-dom';
import CenterModal from '../../components/layout/CenterModal';

const CandidateDashboard = () => {
 const { profile, applications, interviews, notifications, showToast } = useCandidate();
 const navigate = useNavigate();
 const [selectedApp, setSelectedApp] = useState(null);

 const stats = [
 {
 title: 'Applied Jobs',
 value: applications.length,
 trend: '+2 this week',
 icon: Briefcase,
 color: 'blue',
 bg: 'bg-blue-50',
 iconColor: 'text-blue-600',
 },
 {
 title: 'Interviews Scheduled',
 value: interviews.length,
 trend: interviews.length > 0 ? `Next: ${interviews[0].date}` : 'None scheduled',
 icon: Calendar,
 color: 'purple',
 bg: 'bg-purple-50',
 iconColor: 'text-purple-600',
 },
 {
 title: 'Offers Received',
 value: '2',
 trend: '+1 new offer',
 icon: Award,
 color: 'green',
 bg: 'bg-emerald-50',
 iconColor: 'text-emerald-600',
 },
 {
 title: 'Profile Completion',
 value: '85%',
 trend: 'Complete skills to reach 100%',
 icon: UserCircle,
 color: 'orange',
 bg: 'bg-orange-50',
 iconColor: 'text-orange-600',
 isProgress: true
 }
 ];

 const handleJoinMeeting = (link) => {
 showToast('Joining secure meeting session...');
 window.open(link, '_blank');
 };

 return (
 <div className="space-y-8 pb-12 animate-fade-in max-w-7xl mx-auto">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="text-left">
 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Candidate Dashboard</h1>
 <p className="text-slate-500 font-medium tracking-tight">Welcome Back, {profile.fullName.split(' ')[0]}!</p>
 </div>
 <div className="flex items-center gap-3">
 <button 
 onClick={() => navigate('/candidate/jobs')}
 className="btn-primary px-6 py-2.5 flex items-center gap-2 shadow-lg shadow-primary-200"
 >
 <Search size={18} />
 <span>Browse Jobs</span>
 </button>
 </div>
 </div>

 {/* Stats Cards Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {stats.map((stat, idx) => (
 <motion.div
 key={idx}
 whileHover={{ y: -5 }}
 className="card p-6 bg-white border border-slate-100 shadow-soft"
 >
 <div className="flex items-center gap-4 text-left">
 <div className={cn("p-3 rounded-2xl", stat.bg, stat.iconColor)}>
 <stat.icon size={26} />
 </div>
 <div className="flex-1 w-full">
 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.title}</p>
 <h3 className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{stat.value}</h3>
 {stat.isProgress ? (
 <div className="mt-2">
 <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: stat.value }}
 className="h-full bg-orange-500 rounded-full"
 transition={{ duration: 1.5, ease: "easeOut" }}
 />
 </div>
 <p className="text-[10px] font-medium text-slate-400 mt-1.5">{stat.trend}</p>
 </div>
 ) : (
 <p className="text-[10px] font-medium text-slate-400 mt-1.5">{stat.trend}</p>
 )}
 </div>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Main Content Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 
 {/* Left: Recent Applications */}
 <div className="lg:col-span-8 space-y-8">
 <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
 <div className="p-8 border-b border-slate-50 flex items-center justify-between">
 <h3 className="text-xl font-medium text-slate-900 tracking-tight flex items-center gap-3">
 <Briefcase className="text-primary-600" size={24} />
 Recent Applications
 </h3>
 <button onClick={() => navigate('/candidate/applications')} className="text-[10px] font-extrabold text-primary-600 hover:underline">
 View Full History
 </button>
 </div>
 
 <div className="overflow-x-auto text-left">
 <table className="w-full text-left">
 <thead>
 <tr className="bg-slate-50/50">
 <th className="px-8 py-5 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Job Role</th>
 <th className="px-8 py-5 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] text-center">Applied On</th>
 <th className="px-8 py-5 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] text-center">Application Status</th>
 <th className="px-8 py-5 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50">
 {applications.slice(0, 4).map((app) => (
 <tr key={app.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
 <td className="px-8 py-7">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-medium">
 {app.company.charAt(0)}
 </div>
 <div>
 <p className="text-sm font-medium text-slate-900">{app.role}</p>
 <p className="text-[10px] font-medium text-slate-400 mt-1">{app.company}</p>
 </div>
 </div>
 </td>
 <td className="px-8 py-7 text-center">
 <p className="text-sm font-medium text-slate-500 tabular-nums uppercase">{app.date}</p>
 </td>
 <td className="px-8 py-7 text-center">
 <span className={cn(
 "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
 app.status === 'Shortlisted' ? "bg-emerald-50 text-emerald-600" :
 app.status === 'Interview' ? "bg-purple-50 text-purple-600" :
 app.status === 'Under Review' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-500"
 )}>
 {app.status}
 </span>
 </td>
 <td className="px-8 py-7 text-right">
 <button className="p-3 bg-white text-slate-600 border border-slate-200 hover:text-primary-600 hover:scale-110 border border-slate-100 rounded-xl shadow-sm transition-all">
 <ExternalLink size={20} />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="card border border-slate-100 bg-white p-10 overflow-hidden relative group shadow-soft flex flex-col justify-end min-h-[250px] text-left">
  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 pointer-events-none text-slate-900">
  <FileText size={250} />
  </div>
  <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
  <h3 className="text-2xl font-medium text-slate-900 tracking-tight leading-none mb-4">Resume Builder</h3>
  <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed max-w-[250px]">Use our AI-driven builder to optimize your professional profile.</p>
  <button onClick={() => navigate('/candidate/resume')} className="btn-primary w-full py-4 shadow-xl shadow-primary-200 flex items-center justify-center gap-3">
  Improve Resume <Plus size={16} />
  </button>
  </div>
  </div>

 <div className="card bg-white p-10 flex flex-col justify-between shadow-soft group border-none text-left">
 <div>
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-lg font-medium text-slate-900 tracking-tight leading-none">Profile Analytics</h3>
 <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
 <TrendingUp size={22} />
 </div>
 </div>
 <p className="text-[10px] font-medium text-slate-400 mb-2">Weekly Metric</p>
 <p className="text-sm font-medium text-slate-600 leading-relaxed">Your professional profile has been viewed by <span className="text-slate-900 font-medium">28 recruiters</span> in this cycle.</p>
 </div>
 <div className="mt-10 p-5 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100 group-hover:bg-white transition-all group-hover:shadow-xl group-hover:border-transparent">
 <div className="flex -space-x-3">
 {[1,2,3,4,5].map(i => (
 <div key={i} className="w-10 h-10 rounded-xl border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg transform hover:scale-110 transition-transform cursor-pointer relative z-[10]">
 <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="lead" />
 </div>
 ))}
 </div>
 <button onClick={() => showToast('Analytics dashboard unlocked at Gold level', 'info')} className="text-[10px] font-medium text-primary-600 uppercase tracking-[0.2em] hover:underline">Full Report</button>
 </div>
 </div>
 </div>
 </div>

 {/* Right: Sidebar content */}
 <div className="lg:col-span-4 space-y-8">
 {/* Upcoming Interviews */}
 <div className="card p-8 border-none bg-white shadow-soft text-left">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-xl font-medium text-slate-900 tracking-tight flex items-center gap-3">
 <Calendar size={24} className="text-primary-600" />
 Upcoming Interviews
 </h3>
 </div>
 
 <div className="space-y-6">
 {interviews.length > 0 ? interviews.map((interview) => (
 <div key={interview.id} className="p-6 rounded-xl bg-slate-50 border border-slate-100 group/item hover:bg-white hover:border-transparent hover:shadow-xl transition-all duration-300">
 <div className="flex justify-between items-start mb-6">
 <div>
 <p className="text-[10px] font-medium text-primary-600 leading-none mb-3">{interview.date} @ {interview.time}</p>
 <h4 className="text-lg font-medium text-slate-900 tracking-tight leading-none">{interview.company}</h4>
 <p className="text-[9px] font-medium text-slate-400 mt-2 px-2 py-0.5 bg-white border border-slate-100 rounded-md inline-block">{interview.round}</p>
 </div>
 <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover/item:text-primary-600 group-hover/item:scale-110 transition-all shadow-sm">
 <Video size={22} />
 </div>
 </div>
 <button 
 onClick={() => handleJoinMeeting(interview.link)}
 className="btn-primary w-full py-4 shadow-xl shadow-primary-200"
 >
 Join Interview
 </button>
 </div>
 )) : (
 <div className="py-12 border-2 border-dashed border-slate-50 rounded-xl text-center flex flex-col items-center">
 <Clock size={32} className="text-slate-200 mb-4 animate-pulse" />
 <p className="text-[10px] font-medium text-slate-300">No Active Sessions</p>
 </div>
 )}
 </div>
 <button 
 onClick={() => navigate('/candidate/interviews')}
 className="w-full mt-8 py-3 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
 >
 Browse Full Schedule
 </button>
 </div>

 {/* Strategic Actions */}
 <div className="card p-8 border-none bg-white shadow-soft text-left">
 <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-6">Quick Actions</h3>
 <div className="grid grid-cols-1 gap-4">
 {[
 { label: 'Optimize Resume', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', path: '/candidate/resume' },
 { label: 'Finalize Profile', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/candidate/settings' },
 { label: 'Strategic Search', icon: Search, color: 'text-purple-600', bg: 'bg-purple-50', path: '/candidate/jobs' },
 ].map((action, idx) => (
 <button 
 key={idx} 
 onClick={() => navigate(action.path)}
 className="flex items-center gap-4 p-5 rounded-xl border border-slate-50 hover:border-transparent hover:bg-white hover:shadow-xl transition-all group w-full text-left bg-slate-50/50"
 >
 <div className={cn("p-3 rounded-xl transition-transform group-hover:rotate-12", action.bg, action.color)}>
 <action.icon size={18} />
 </div>
 <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{action.label}</span>
 <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
 </button>
 ))}
 </div>
 </div>
 
 {/* Notifications Placeholder */}
 <div className="card bg-gradient-to-br from-primary-50 to-indigo-50 border-none shadow-soft flex flex-col items-center justify-center py-12 px-6">
 <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-primary-500 mb-6 shadow-xl relative animate-bounce">
 <Zap size={32} />
 <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
 </div>
 <p className="text-lg font-medium text-slate-900 tracking-tight">AI Insights</p>
 <p className="text-[10px] font-medium text-primary-600 mt-2 text-center leading-relaxed">Smart job matching engine activating in next cycle.</p>
 </div>
 </div>
 </div>

 {/* Application Detail Modal */}
 <CenterModal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title="Application Details">
 {selectedApp && (
 <div className="p-10 space-y-10 text-left">
 <div className="flex items-center justify-between pb-8 border-b border-slate-50">
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white text-xl font-medium shadow-2xl">
 {selectedApp.company.charAt(0)}
 </div>
 <div>
 <h2 className="text-2xl font-medium text-slate-900 tracking-tight leading-none">{selectedApp.role}</h2>
 <p className="text-[10px] font-medium text-slate-400 mt-2">{selectedApp.company} • Applied {selectedApp.date}</p>
 </div>
 </div>
 <span className={cn(
 "px-5 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border",
 selectedApp.status === 'Shortlisted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-primary-50 text-primary-600 border-primary-100"
 )}>{selectedApp.status}</span>
 </div>

 <div className="space-y-6">
 <h4 className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.4em] mb-4 leading-none">Process Timeline</h4>
 <div className="relative space-y-10 pl-10 border-l-2 border-slate-100 ml-4">
 {selectedApp.timeline.map((step, i) => (
 <div key={i} className="relative">
 <div className={cn(
 "absolute -left-[50px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg",
 i === selectedApp.timeline.length - 1 ? "bg-primary-600 scale-125" : "bg-slate-200"
 )} />
 <div>
 <p className="text-sm font-medium text-slate-900 tracking-tight">{step.status}</p>
 <p className="text-[10px] font-medium text-slate-400 mt-1">Last Updated: {step.date}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <Info size={18} className="text-primary-600" />
 <span className="text-[10px] font-medium text-slate-900 leading-none">Recruiter Feedback</span>
 </div>
 <span className="text-[9px] font-medium text-slate-300">Internal View</span>
 </div>
 <p className="text-sm font-medium text-slate-500 leading-relaxed">"Candidate matches core visual architecture competencies. Strong system design evidence. Progress to next interview round."</p>
 </div>

 <div className="pt-4 flex gap-4">
 <button onClick={() => setSelectedApp(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-medium text-[10px]">Close</button>
 <button onClick={() => { showToast('Request for status update sent', 'info'); setSelectedApp(null); }} className="flex-2 py-4 bg-primary-600 text-white rounded-xl font-medium text-[10px] shadow-xl shadow-primary-200">Request Status Update</button>
 </div>
 </div>
 )}
 </CenterModal>
 </div>
 );
};

export default CandidateDashboard;

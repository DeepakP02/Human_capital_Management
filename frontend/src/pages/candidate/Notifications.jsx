import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 Bell, Search, Trash2, CheckCircle2, Briefcase, MessageSquare, Calendar, 
 AlertCircle, Zap, Star, X, ChevronRight, Filter, Check, CheckCheck, 
 ArrowRight, ShieldAlert, Info, RotateCcw
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCandidate } from '../../context/CandidateContext';
import CenterModal from '../../components/layout/CenterModal';

const Notifications = () => {
 const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, showToast } = useCandidate();
 const [activeTab, setActiveTab] = useState('all');
 const [searchTerm, setSearchTerm] = useState('');

 const categories = [
 { id: 'all', label: 'All Signals' },
 { id: 'jobs', label: 'Career Vectors' },
 { id: 'interviews', label: 'Audit Phases' },
 { id: 'offers', label: 'Offer Intel' },
 { id: 'system', label: 'Ecosystem' },
 ];

 const filteredNotifications = useMemo(() => {
 return notifications.filter(note => {
 const matchesTab = activeTab === 'all' || note.type === activeTab;
 const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
 note.message.toLowerCase().includes(searchTerm.toLowerCase());
 return matchesTab && matchesSearch;
 });
 }, [notifications, activeTab, searchTerm]);

 const unreadCount = notifications.filter(n => n.isUnread).length;

 const handleAction = (note) => {
 markAsRead(note.id);
 showToast(`Redirecting to: ${note.action || 'Event Details'}`, 'info');
 };

 return (
 <div className="space-y-10 pb-12 animate-fade-in max-w-5xl mx-auto text-left">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-soft">
 <div>
 <h1 className="text-4xl font-bold text-slate-900 leading-none mb-2">SIGNAL QUEUE</h1>
 <p className="text-slate-400 font-medium text-sm">
 Operational Intelligence • <span className="text-primary-600 font-medium">{unreadCount} New Alerts</span>
 </p>
 </div>
 <div className="flex items-center gap-3">
 <button 
 onClick={() => { markAllAsRead(); showToast('Ecosystem synchronized'); }}
 className="btn-secondary px-6 py-4"
 >
 <CheckCheck size={18} />
 <span>Mark All Read</span>
 </button>
 <button 
 onClick={() => { clearAllNotifications(); showToast('Signal queue purged'); }}
 className="btn-secondary px-6 py-4 text-rose-500 hover:bg-rose-500 hover:text-white"
 >
 <Trash2 size={18} />
 </button>
 </div>
 </div>

 {/* Control Engine */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
 <div className="flex flex-wrap items-center gap-3">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveTab(cat.id)}
 className={cn(
 "px-6 py-3 rounded-2xl text-xs font-bold transition-all border",
 activeTab === cat.id 
 ? "bg-slate-900 text-white border-transparent shadow-xl" 
 : "text-slate-400 border-slate-100 hover:bg-white hover:border-primary-100"
 )}
 >
 {cat.label}
 </button>
 ))}
 </div>
 <div className="relative">
 <Search className="absolute left-5 top-5 text-slate-300" size={18} />
 <input 
 type="text" 
 placeholder="Query signals..." 
 className="input-field h-14 pl-14 bg-white border-slate-50 font-medium shadow-inner"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 </div>
 </div>

 {/* Signal List */}
 <div className="space-y-6">
 <AnimatePresence mode="popLayout">
 {filteredNotifications.length > 0 ? (
 filteredNotifications.map((note) => {
 const Icon = note.type === 'offers' ? Zap : note.type === 'interviews' ? Calendar : note.type === 'jobs' ? Briefcase : AlertCircle;
 return (
 <motion.div
 layout
 key={note.id}
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className={cn(
 "group p-10 rounded-[3rem] bg-white border border-slate-50 shadow-soft transition-all duration-500 relative overflow-hidden",
 note.isUnread ? "border-l-8 border-l-primary-600 shadow-xl" : "opacity-60 grayscale-[0.5]"
 )}
 >
 <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
 {/* Visual Anchor */}
 <div className={cn(
 "w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl transition-transform duration-700 group-hover:rotate-12",
 note.type === 'offers' ? "bg-emerald-50 text-emerald-600" :
 note.type === 'interviews' ? "bg-purple-50 text-purple-600" :
 note.type === 'jobs' ? "bg-primary-50 text-primary-600" : "bg-amber-50 text-amber-600"
 )}>
 <Icon size={32} />
 </div>

 {/* Metadata Content */}
 <div className="flex-1 space-y-4">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <h3 className="text-2xl font-bold text-slate-900 leading-none">{note.title}</h3>
 {note.isUnread && (
 <span className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse shadow-lg shadow-primary-200" />
 )}
 </div>
 <span className="text-xs font-medium text-slate-300">{note.time}</span>
 </div>
 <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-3xl">"{note.message}"</p>
 
 <div className="pt-6 flex flex-wrap items-center gap-6">
 <button 
 onClick={() => handleAction(note)}
 className="btn-primary px-8 py-3 shadow-lg shadow-primary-200"
 >
 Execute Response <ArrowRight size={14} />
 </button>
 <button 
 onClick={() => deleteNotification(note.id)}
 className="p-3 text-slate-200 hover:text-rose-500 transition-colors"
 >
 <Trash2 size={20} />
 </button>
 </div>
 </div>
 </div>
 
 {/* Background Aura */}
 <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
 <Icon size={200} />
 </div>
 </motion.div>
 );
 })
 ) : (
 <div className="py-40 text-center space-y-8 flex flex-col items-center">
 <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 animate-pulse border border-slate-100 shadow-inner">
 <Bell size={48} />
 </div>
 <div>
 <h3 className="text-2xl font-medium text-slate-900 tracking-tight uppercase">Silent Ecosystem</h3>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.4em] mt-4">Monitoring for strategic signals...</p>
 </div>
 <button onClick={() => setActiveTab('all')} className="text-[10px] font-medium text-primary-600 uppercase tracking-[0.3em] hover:underline">Reset Frequency</button>
 </div>
 )}
 </AnimatePresence>
 </div>

 {/* Tertiary Metrics Overlay */}
 <AnimatePresence>
 {unreadCount > 0 && (
 <motion.div 
 initial={{ opacity: 0, y: 100 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 100 }}
 className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center gap-8 border border-white/10"
 >
 <div className="flex items-center gap-3">
 <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
 <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Live Signals: {unreadCount} Priority</span>
 </div>
 <div className="w-px h-6 bg-white/20" />
 <button onClick={markAllAsRead} className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary-400 hover:text-white transition-colors">Acknowledge All</button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};

export default Notifications;

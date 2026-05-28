import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  Download, 
  Filter, 
  Search, 
  ArrowUpRight, 
  PieChart, 
  Activity, 
  Zap, 
  Star, 
  Target,
  FileText,
  Clock,
  Briefcase
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useState } from 'react';
import ReportSchedulerModal from '../../components/admin/ReportSchedulerModal';
import ReportBuilderWizard from '../../components/admin/ReportBuilderWizard';

const AdminReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [builderCategory, setBuilderCategory] = useState(null);
  const reportCategories = [
    { title: 'Workforce Analytics', icon: Users, count: 12, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Financial Reports', icon: DollarSign, count: 8, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Hiring Performance', icon: Briefcase, count: 6, color: 'text-primary-600', bg: 'bg-primary-50' },
    { title: 'Compliance Audits', icon: ShieldCheck, count: 4, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Leave & Attendance', icon: Clock, count: 10, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'AI & Productivity', icon: Target, count: 5, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const filteredCategories = reportCategories.filter(cat => cat.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Organization Reports</h1>
          <p className="text-slate-500 font-medium tracking-tight">Generate deep-dive analytics, export historical data and track multi-dept performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSchedulerOpen(true)} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Calendar size={18} />
            <span className="hidden sm:inline">Scheduling</span>
          </button>
          <button onClick={() => setBuilderCategory('custom')} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
             <Star size={18} fill="currentColor" />
             <span>Create Custom Report</span>
          </button>
        </div>
      </div>

      {/* Report Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="card p-8 bg-white border border-slate-100 shadow-soft flex flex-col justify-center gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Monthly Data Accuracy</h3>
            <div className="flex items-center gap-6">
               <div className="relative inline-flex">
                  <svg className="w-20 h-20 transform -rotate-90">
                     <circle cx="40" cy="40" r="36" className="stroke-slate-50 fill-none" strokeWidth="8" />
                     <motion.circle 
                        cx="40" cy="40" r="36" 
                        className="stroke-emerald-500 fill-none" 
                        strokeWidth="8" 
                        strokeDasharray={226}
                        strokeDashoffset={226 - (226 * 0.98)}
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * 0.98) }}
                        transition={{ duration: 1.5 }}
                     />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">98%</div>
               </div>
               <div>
                  <p className="text-xl font-black text-slate-900 leading-none mb-1">High Fidelity</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Minimal data gaps detected</p>
               </div>
            </div>
         </div>
         <div className="md:col-span-2 card p-8 bg-slate-900 text-white border-none shadow-soft flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
               <BarChart3 size={120} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6">Automated Insights</p>
                  <h3 className="text-2xl font-black tracking-tight mb-4">"Your organization efficiency has increased by 12.4% following the new remote-work policy implementation."</h3>
                  <button className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-900/20">View Breakdown</button>
               </div>
            </div>
         </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
         <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Library Categories</h3>
            <div className="relative w-80">
               <Search className="absolute left-3 top-2.5 text-slate-300" size={16} />
               <input type="text" placeholder="Search templates..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10 h-10 bg-white shadow-sm border-none text-xs font-bold" />
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat, i) => (
               <motion.div
                 key={i}
                 onClick={() => setBuilderCategory(cat.title)}
                 whileHover={{ y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                 className="card p-8 bg-white border border-slate-50 shadow-soft group cursor-pointer"
               >
                  <div className="flex items-start justify-between mb-8">
                     <div className={cn("p-4 rounded-[2rem] transition-all group-hover:rotate-6", cat.bg, cat.color)}>
                        <cat.icon size={28} />
                     </div>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.count} Templates</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{cat.title}</h4>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed tracking-tight mb-8">Comprehensive datasets and visualizations for organization-wide oversight.</p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-600">Explore Suite</span>
                     <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary-600 group-hover:text-white transition-all group-hover:scale-110">
                        <ArrowUpRight size={16} />
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>

      <div className="p-12 bg-indigo-600 rounded-[3.5rem] shadow-2xl flex flex-col items-center text-center gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
         <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white backdrop-blur-md border border-white/20">
            <FileText size={40} />
         </div>
         <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tight leading-none">Schedule Automated Multi-Dept Audits</h2>
            <p className="text-base font-medium text-indigo-100 leading-relaxed tracking-tight">Set up recurring PDF reports to be sent directly to the board or department heads every quarter for complete transparency.</p>
         </div>
         <button onClick={() => setIsSchedulerOpen(true)} className="px-10 py-5 bg-white text-indigo-600 rounded-3xl text-sm font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-2xl shadow-indigo-900/20 active:scale-95">Configure Scheduler</button>
      </div>

      <ReportSchedulerModal isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />
      <ReportBuilderWizard isOpen={!!builderCategory} onClose={() => setBuilderCategory(null)} initialCategory={builderCategory !== 'custom' ? builderCategory : null} />
    </div>
  );
};

export default AdminReports;

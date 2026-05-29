import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, PieChart as PieIcon, LineChart as LineIcon, 
  TrendingUp, Download, Filter, Calendar, ArrowUpRight, 
  ArrowDownRight, FileText, Users, Briefcase, Target, 
  ChevronRight, MoreVertical, Clock, ExternalLink, PieChart, X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useHR } from '../../context/HRContext';

const Reports = () => {
  const { showToast } = useHR();
  const [activeTab, setActiveTab] = useState('hiring');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [dept, setDept] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [role, setRole] = useState('');

  const stats = [
    { label: 'Avg Time to Hire', value: '18 Days', trend: '-2 days', isPositive: true, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Application Rate', value: '24%', trend: '+4%', isPositive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Cost Per Hire', value: '$4,280', trend: '+$120', isPositive: false, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Recruiter Score', value: '4.8', trend: '+0.2', isPositive: true, icon: Target, color: 'text-primary-600', bg: 'bg-primary-50' },
  ];

  const chartData = [
    { name: 'Mon', apps: 45, hires: 5 },
    { name: 'Tue', apps: 52, hires: 8 },
    { name: 'Wed', apps: 38, hires: 4 },
    { name: 'Thu', apps: 65, hires: 12 },
    { name: 'Fri', apps: 48, hires: 7 },
    { name: 'Sat', apps: 24, hires: 3 },
    { name: 'Sun', apps: 15, hires: 1 }
  ];

  const sources = [
    { label: 'LinkedIn', value: 45, color: 'bg-blue-500' },
    { label: 'Direct Referrals', value: 25, color: 'bg-emerald-500' },
    { label: 'Indeed', value: 15, color: 'bg-indigo-500' },
    { label: 'Company Portal', value: 15, color: 'bg-amber-500' },
  ];

  const applyFilters = (e) => {
    e.preventDefault();
    setIsFilterModalOpen(false);
    showToast('Advanced filters applied');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 font-medium">Deep dive into hiring performance and recruiter efficiency</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsFilterModalOpen(true)} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Filter size={18} />
            <span className="hidden sm:inline">Advanced Filters</span>
          </button>
          <div className="relative group">
            <button onClick={() => showToast('Full report downloading as PDF...')} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
               <Download size={18} />
               <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="card p-6 bg-white border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between mb-4">
               <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold", stat.isPositive ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500")}>
                  {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  <span>{stat.trend}</span>
               </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 flex flex-col">
            <div className="card p-8 border-none bg-white shadow-soft flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-10 shrink-0">
                  <div className="space-y-1">
                     <h3 className="text-xl font-bold text-slate-900">Application Performance</h3>
                     <p className="text-sm font-medium text-slate-400">Activity comparison over the {dateRange}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-2 mr-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</span>
                     </div>
                     <button className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Daily</button>
                     <button className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">Weekly</button>
                  </div>
               </div>
               
               <div className="flex-1 flex items-end justify-between gap-4 min-h-[300px] mb-8">
                  {chartData.map((d, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full relative flex items-end justify-center gap-1.5 cursor-pointer">
                           <motion.div initial={{ height: 0 }} animate={{ height: `${d.apps * 3}px` }} className="w-full max-w-[32px] bg-primary-500/10 rounded-t-lg group-hover:bg-primary-500/20 transition-all relative">
                              <motion.div initial={{ height: 0 }} animate={{ height: `${d.hires * 6}px` }} className="absolute bottom-0 inset-x-0 bg-primary-600 rounded-t-lg shadow-lg group-hover:shadow-primary-200" />
                           </motion.div>
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                              {d.apps} Apps / {d.hires} Hires
                           </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8 flex flex-col">
            <div className="card p-8 border-none bg-white shadow-soft flex-1">
               <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <PieChart size={18} className="text-primary-600" />
                  Candidate Sources
               </h3>
               
               <div className="space-y-6">
                  {sources.map((src, i) => (
                     <div key={i} className="space-y-2 cursor-pointer group">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                           <span className="text-slate-500 group-hover:text-slate-900 transition-colors">{src.label}</span>
                           <span className="text-slate-900">{src.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${src.value}%` }} className={cn("h-full rounded-full transition-opacity group-hover:opacity-80", src.color ?? 'bg-primary-500')} />
                        </div>
                     </div>
                  ))}
               </div>

               <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                     <TrendingUp size={60} />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-400 mb-2">Pro Insight</h4>
                  <p className="text-sm font-medium leading-relaxed mb-4">Referrals have a <span className="text-emerald-400 font-bold">42%</span> higher conversion rate than Job Boards.</p>
                  <button className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                     Learn More <ChevronRight size={12} />
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recruiter Efficiency Report</h3>
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
               <Download size={20} />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">
                     <th className="px-8 py-5">Recruiter Name</th>
                     <th className="px-8 py-5 text-center">Open Roles</th>
                     <th className="px-8 py-5 text-center">Total Apps</th>
                     <th className="px-8 py-5 text-center">Interviews</th>
                     <th className="px-8 py-5 text-center">Avg Days-to-Offer</th>
                     <th className="px-8 py-5 text-right">Performance</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 text-sm">
                  {[
                     { name: 'Sarah Johnson', roles: 12, apps: 420, interviews: 86, tto: 14, score: 98 },
                     { name: 'David Chen', roles: 8, apps: 184, interviews: 42, tto: 19, score: 86 },
                     { name: 'Sam Smith', roles: 4, apps: 92, interviews: 12, tto: 24, score: 72 },
                  ].map((r, i) => (
                     <tr key={i} className="group hover:bg-slate-50/20 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-900">{r.name}</td>
                        <td className="px-8 py-6 text-center font-medium text-slate-600">{r.roles}</td>
                        <td className="px-8 py-6 text-center font-medium text-slate-600">{r.apps}</td>
                        <td className="px-8 py-6 text-center font-medium text-slate-600">{r.interviews}</td>
                        <td className="px-8 py-6 text-center font-medium text-slate-600">{r.tto} Days</td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end items-center gap-2">
                              <span className={cn("text-xs font-extrabold", r.score > 90 ? "text-emerald-500" : r.score > 80 ? "text-primary-500" : "text-amber-500")}>{r.score}%</span>
                              <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                 <div className={cn("h-full rounded-full", r.score > 90 ? "bg-emerald-500" : r.score > 80 ? "bg-primary-500" : "bg-amber-500")} style={{ width: `${r.score}%` }} />
                              </div>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                   <h2 className="text-xl font-extrabold text-slate-900">Advanced Analytics Filters</h2>
                   <button onClick={() => setIsFilterModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={applyFilters} className="flex-1 overflow-y-auto">
                  <div className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Date Range</label>
                        <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="input-field h-12 appearance-none">
                           <option>Last 7 Days</option>
                           <option>Last 30 Days</option>
                           <option>This Quarter</option>
                           <option>This Year</option>
                           <option>Custom Range</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
                        <select value={dept} onChange={e => setDept(e.target.value)} className="input-field h-12 appearance-none">
                           <option value="">All Departments</option>
                           <option>Engineering</option>
                           <option>Design</option>
                           <option>Sales</option>
                           <option>Marketing</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Recruiter</label>
                        <select value={recruiter} onChange={e => setRecruiter(e.target.value)} className="input-field h-12 appearance-none">
                           <option value="">All Recruiters</option>
                           <option>Sarah Johnson</option>
                           <option>David Chen</option>
                           <option>Sam Smith</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Candidate Source</label>
                        <select className="input-field h-12 appearance-none">
                           <option value="">All Sources</option>
                           <option>LinkedIn</option>
                           <option>Direct Referrals</option>
                           <option>Indeed</option>
                        </select>
                     </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between gap-3 shrink-0">
                     <button type="button" onClick={() => {setDateRange('Last 30 Days'); setDept(''); setRecruiter('');}} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Reset Filters</button>
                     <div className="flex gap-2">
                        <button type="button" onClick={() => setIsFilterModalOpen(false)} className="px-6 py-2.5 font-bold hover:bg-white rounded-xl transition-all border border-slate-200 text-slate-500">Cancel</button>
                        <button type="submit" className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">Apply Filters</button>
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

export default Reports;

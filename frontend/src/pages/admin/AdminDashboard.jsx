import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  ClipboardCheck, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Download, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Bell, 
  ShieldCheck, 
  Target,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import UserModal from '../../components/admin/UserModal';

const AdminDashboard = () => {
  const { users, departments, roles } = useAdmin();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const stats = [
    { label: 'Total Employees', value: users.length, icon: Users, trend: '+3 this week', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, icon: UserCheck, trend: '88% activity', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Departments', value: departments.length, icon: Briefcase, trend: '2 archived', color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Custom Roles', value: roles.filter(r => r.isCustom).length, icon: ShieldCheck, trend: 'Granular access', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Target Payroll', value: '$' + (users.length * 4500 / 1000).toFixed(0) + 'K', icon: DollarSign, trend: 'Estimated monthly', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Compliance Alerts', value: '0', icon: AlertTriangle, trend: 'All clear', color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium tracking-tight">Master control for organization, workforce and system performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export Data</span>
          </button>
          <button 
            onClick={() => setIsAddUserOpen(true)}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Add User</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card p-6 bg-white border border-slate-100 shadow-soft"
          >
            <div className="flex flex-col gap-4">
               <div className={cn("p-3 rounded-2xl w-fit", stat.bg, stat.color)}>
                  <stat.icon size={22} />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.trend}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Main Content Area */}
         <div className="lg:col-span-8 space-y-8">
            {/* Employee Growth Chart Preview */}
            <div className="card p-8 bg-white border-none shadow-soft h-[400px] flex flex-col">
               <div className="flex items-center justify-between mb-10">
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <TrendingUp className="text-primary-600" size={24} />
                        Employee Growth Trend
                     </h3>
                     <p className="text-sm font-medium text-slate-400 tracking-tight">Monthly hiring vs attrition analytics</p>
                  </div>
                  <select className="input-field h-10 w-32 text-xs font-bold bg-slate-50 border-none">
                     <option>Last 6 Months</option>
                     <option>Year 2026</option>
                  </select>
               </div>
               <div className="flex-1 flex items-end justify-between gap-4 px-4 mb-4">
                  {[20, 45, 30, 80, 55, 90].map((h, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full relative flex items-end justify-center">
                           <div className="w-full max-w-[40px] bg-slate-50 rounded-2xl h-48 relative overflow-hidden">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className="absolute bottom-0 inset-x-0 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 group-hover:bg-primary-600 transition-colors" 
                              />
                           </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Month {i+1}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Attendance Summary */}
               <div className="card p-8 bg-white border-none shadow-soft">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Target className="text-emerald-500" size={20} />
                     Attendance Summary
                  </h3>
                  <div className="space-y-6">
                     {[
                        { label: 'Present Today', val: '94%', color: 'bg-emerald-500' },
                        { label: 'On Leave', val: '4%', color: 'bg-indigo-500' },
                        { label: 'Late/Absent', val: '2%', color: 'bg-rose-500' },
                     ].map((item, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                              <span>{item.label}</span>
                              <span className="text-slate-900">{item.val}</span>
                           </div>
                           <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", item.color)} style={{ width: item.val }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Activity Feed */}
               <div className="card p-8 bg-white border-none shadow-soft">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Activity className="text-amber-500" size={20} />
                     Recent Activities
                  </h3>
                  <div className="space-y-6">
                     {[
                        { text: 'Payroll processed for Finance Dept', time: '2h ago', icon: DollarSign, color: 'text-emerald-500' },
                        { text: 'New policy added to Compliance', time: '4h ago', icon: ShieldCheck, color: 'text-indigo-500' },
                        { text: 'System backup completed', time: '6h ago', icon: Activity, color: 'text-slate-400' },
                     ].map((activity, i) => (
                        <div key={i} className="flex gap-4">
                           <div className={cn("mt-1", activity.color)}><activity.icon size={16} /></div>
                           <div>
                              <p className="text-sm font-bold text-slate-700 leading-snug">{activity.text}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activity.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            <div className="card p-8 bg-slate-900 text-white border-none shadow-soft relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Bell size={100} />
               </div>
               <h3 className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary-400 mb-6">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-4">
                  {[
                     { label: 'Run Payroll', icon: DollarSign },
                     { label: 'Export Audit', icon: ShieldCheck },
                     { label: 'Send Invite', icon: UserCheck },
                     { label: 'System Check', icon: Activity },
                  ].map((act, i) => (
                     <button key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all group/btn h-32">
                        <act.icon size={24} className="text-primary-400 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-center">{act.label}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div className="card p-8 bg-white border-none shadow-soft">
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="text-primary-600" size={22} />
                  Organization Score
               </h3>
               <div className="text-center py-6">
                  <div className="relative inline-flex mb-6">
                     <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="58" className="stroke-slate-50 fill-none" strokeWidth="10" />
                        <motion.circle 
                          cx="64" cy="64" r="58" 
                          className="stroke-primary-600 fill-none" 
                          strokeWidth="10" 
                          strokeDasharray={364}
                          strokeDashoffset={364 - (364 * 0.88)}
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: 364 }}
                          animate={{ strokeDashoffset: 364 - (364 * 0.88) }}
                          transition={{ duration: 1.5 }}
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-900 leading-none">88</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Perfect</span>
                     </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500 px-4 leading-relaxed tracking-tight">Your organization hygiene score is excellent this month. High compliance and payroll accuracy maintained.</p>
               </div>
            </div>
         </div>
      </div>

      <UserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
    </div>
  );
};

export default AdminDashboard;

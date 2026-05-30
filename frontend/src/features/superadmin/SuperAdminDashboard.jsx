import React from 'react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import { useAuth } from '../../hooks/useAuth';
import {
  Users,
  ShieldCheck,
  Building2,
  TrendingUp,
  LayoutDashboard,
  DollarSign,
  Bell,
  RefreshCw,
  Eye,
  Activity,
  Settings,
  Lock,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../shared/components/layout/PageHeader';
import { StatCard } from './StatCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SuperAdminDashboard = () => {
  const { users, departments, activityLogs } = useSuperAdmin();
  const { enterPreview } = useAuth();

  // Dynamic statistics calculated directly from the context/database
  const totalUsers = users.length;
  const employeesCount = users.filter(u => u.role === 'employee').length;
  const candidatesCount = users.filter(u => u.role === 'candidate').length;
  const recruitersCount = users.filter(u => u.role === 'hr').length;
  const activeJobs = departments.length * 2; // placeholder for active jobs count

  // Stat Card Config
  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      sub: `${users.filter(u => u.role === 'superadmin' || u.role === 'admin').length} Admins`,
      icon: Users,
      color: 'from-violet-500 to-indigo-600',
      bg: 'bg-violet-50 dark:bg-violet-950/20',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-100 dark:border-violet-900/30'
    },
    {
      label: 'Total Employees',
      value: employeesCount,
      sub: `${departments.length} Departments`,
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900/30'
    },
    {
      label: 'Total Candidates',
      value: candidatesCount,
      sub: 'Active pipelines',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-900/30'
    },
    {
      label: 'Total Recruiters',
      value: recruitersCount,
      sub: 'HR representatives',
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-100 dark:border-amber-900/30'
    },
    {
      label: 'Active Jobs',
      value: activeJobs,
      sub: 'Jobs currently posted',
      icon: Building2,
      color: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-100 dark:border-rose-900/30'
    }
  ];

  return (
    <motion.div
      className="space-y-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageHeader
        icon={LayoutDashboard}
        title="Super User Master Console"
        subtitle="Enterprise Management Console • Dynamic analytics, security shields, and platform configurations."
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            All Services Operational
          </span>
        </div>
        <button className="p-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
          <RefreshCw size={16} />
        </button>
      </PageHeader>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} icon={stat.icon} label={stat.label} value={stat.value} sub={stat.sub} style={stat} />
        ))}
      </div>

      {/* Details Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Revenue & ARR Widget - Takes up 2 cols on XL */}
        <motion.div
          variants={cardVariants}
          className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-6 shadow-soft text-left flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-primary-600 animate-pulse" />
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Revenue & Subscription Overview
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
              ARR: $417,600
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Orgs</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">180</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
                <TrendingUp size={10} /> +12 this month
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">$34,800</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
                <TrendingUp size={10} /> +15.2% MoM
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Payroll Disbursed</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">$2.4M</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">YTD Platform Total</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI API Requests</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">1.2M</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5">Resume Scans & Chat</p>
            </div>
          </div>

          {/* Premium Plan Distribution Graph */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              <span>Plan Share Distribution</span>
              <span>12 Enterprise • 48 Pro • 120 Team</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
              <div className="h-full bg-violet-500 w-[55%] transition-all" title="Enterprise (55%)" />
              <div className="h-full bg-blue-500 w-[30%] transition-all" title="Pro (30%)" />
              <div className="h-full bg-emerald-500 w-[15%] transition-all" title="Team (15%)" />
            </div>
            <div className="flex gap-4 mt-3 text-[10px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" /> Enterprise (55%)</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Pro (30%)</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Team (15%)</div>
            </div>
          </div>

          {/* Additional Platform Health Blocks */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100">Benefits HCM Overview</h4>
                  <p className="text-xs text-indigo-600/70 dark:text-indigo-400">84% Employee Enrollment Rate</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 dark:border-slate-800">
                  <ShieldCheck size={18} />
                </div>
             </div>
             <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">Time & Attendance</h4>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-400">12,450 Active Time Logs Today</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 dark:border-slate-800">
                  <TrendingUp size={18} />
                </div>
             </div>
          </div>
        </motion.div>

        {/* View As Role Launcher */}
        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-6 shadow-soft text-left"
        >
          <div className="flex items-center gap-2 mb-6">
            <Eye size={18} className="text-amber-500" />
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
              View As Role
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Instantly switch your session to preview the dashboard and permissions of a specific role.
          </p>
          <div className="space-y-3">
            {[
              { id: 'admin', label: 'Admin', color: 'blue' },
              { id: 'hr', label: 'HR Manager', color: 'pink' },
              { id: 'manager', label: 'Manager', color: 'emerald' },
              { id: 'employee', label: 'Employee', color: 'violet' },
              { id: 'candidate', label: 'Candidate', color: 'amber' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => enterPreview(r.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-${r.color}-50 dark:bg-${r.color}-900/20 text-${r.color}-600 dark:text-${r.color}-400 flex items-center justify-center`}>
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {r.label}
                  </span>
                </div>
                <Eye size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Activity & System Monitoring - Takes up full width */}
        <motion.div
          variants={cardVariants}
          className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-6 shadow-soft text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-primary-600" />
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Activity & System Monitoring
              </h2>
            </div>
            <button className="text-xs font-bold text-primary-600 hover:text-primary-700">View Full Audit Log</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {activityLogs?.slice(0, 4).map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5">
                    {log.type === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
                        <UserPlus size={12} />
                      </div>
                    ) : log.type === 'security' ? (
                      <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 flex items-center justify-center border border-rose-100 dark:border-rose-800/50">
                        <Lock size={12} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <Settings size={12} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {log.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-medium text-slate-700 dark:text-slate-400">{log.user}</span> • {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-center text-center items-center">
               <ShieldCheck size={32} className="text-emerald-500 mb-3" />
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">System Health is Optimal</h3>
               <p className="text-xs text-slate-500 max-w-[200px]">No security breaches or unauthorized access detected in the last 30 days.</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Notifications Alert Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <Bell size={22} className="animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-black text-indigo-950 dark:text-indigo-200 tracking-tight leading-none mb-1">
              Enterprise Upgrade Pending
            </h4>
            <p className="text-xs font-medium text-slate-500 dark:text-indigo-300">
              Patch compilation v2.4.1 is staged and optimized. Schedule deployment for low-latency hours.
            </p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none self-start md:self-center">
          Review Patch Log
        </button>
      </div>
    </motion.div>
  );
};

export default SuperAdminDashboard;

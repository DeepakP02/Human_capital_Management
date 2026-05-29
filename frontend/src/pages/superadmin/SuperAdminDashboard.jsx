import React from 'react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import {
  Users,
  ShieldCheck,
  Building2,
  TrendingUp,
  LayoutDashboard,
  DollarSign,
  Bell,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/layout/PageHeader';
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
  const { users, roles, departments } = useSuperAdmin();

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
      className="space-y-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageHeader
        icon={LayoutDashboard}
        title="Super Admin Control Center"
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
      <div className="grid grid-cols-1 gap-6">
        
        {/* Revenue & ARR Widget */}
        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-6 shadow-soft text-left"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">$34,800</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
                <TrendingUp size={10} /> +15.2% MoM
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Contract Value</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">$12,450</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Enterprise terms</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Tenants</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">180 orgs</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-0.5">No churn this quarter</p>
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

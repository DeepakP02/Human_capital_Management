import React from 'react';
import { Link } from 'react-router-dom';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import {
  Users,
  ShieldCheck,
  Building2,
  TrendingUp,
  Activity,
  ArrowRight,
  LayoutDashboard,
  UserPlus,
  Settings,
  Globe,
  Server,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const STAT_CARDS = [
  {
    key: 'users',
    label: 'Total Users',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-950/20',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-100 dark:border-violet-900/30',
    link: '/superadmin/users',
    linkLabel: 'Manage Users',
    desc: 'Registered system accounts',
  },
  {
    key: 'roles',
    label: 'Security Roles',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-900/30',
    link: '/superadmin/roles',
    linkLabel: 'Manage Roles',
    desc: 'Access permission profiles',
  },
  {
    key: 'departments',
    label: 'Departments',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amberald-950/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-900/30',
    link: '/superadmin/departments',
    linkLabel: 'Manage Depts.',
    desc: 'Company org divisions',
  },
];

const QUICK_LINKS = [
  { label: 'Add New User', icon: UserPlus, to: '/superadmin/users', color: 'text-violet-600' },
  { label: 'Create Role', icon: ShieldCheck, to: '/superadmin/roles', color: 'text-emerald-600' },
  { label: 'New Department', icon: Building2, to: '/superadmin/departments', color: 'text-amber-600' },
  { label: 'System Settings', icon: Settings, to: '/superadmin/dashboard', color: 'text-slate-600' },
  { label: 'API & Integrations', icon: Globe, to: '/superadmin/dashboard', color: 'text-blue-600' },
  { label: 'Infrastructure', icon: Server, to: '/superadmin/dashboard', color: 'text-rose-600' },
];

const SYSTEM_HEALTH = [
  { label: 'API Response', value: '98.7%', status: 'healthy', desc: 'uptime this month' },
  { label: 'DB Performance', value: '12ms', status: 'healthy', desc: 'avg query time' },
  { label: 'Active Sessions', value: '24', status: 'warning', desc: 'current connections' },
  { label: 'Storage Used', value: '64%', status: 'healthy', desc: 'of allocated quota' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SuperAdminDashboard = () => {
  const { users, roles, departments } = useSuperAdmin();
  const dataMap = { users: users.length, roles: roles.length, departments: departments.length };

  return (
    <motion.div
      className="space-y-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div variants={cardVariants}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <LayoutDashboard className="text-primary-600" size={32} />
              Super Admin Dashboard
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              Complete system overview — users, roles, departments, and platform health.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
            <Zap size={14} className="text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              All Systems Operational
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.key}
              variants={cardVariants}
              className={`relative bg-white dark:bg-slate-900 rounded-3xl border ${card.border} overflow-hidden shadow-soft hover:shadow-premium transition-all group`}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.text} flex items-center justify-center shadow-inner`}>
                    <Icon size={22} />
                  </div>
                  <TrendingUp size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors" />
                </div>
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className={`text-5xl font-black ${card.text} mb-1 leading-none`}>
                  {dataMap[card.key]}
                </p>
                <p className="text-xs text-slate-400 mb-6">{card.desc}</p>
                <Link
                  to={card.link}
                  className={`inline-flex items-center gap-2 text-xs font-bold ${card.text} hover:gap-3 transition-all`}
                >
                  {card.linkLabel} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-soft p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap size={18} className="text-primary-600" />
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map((ql) => {
              const Icon = ql.icon;
              return (
                <Link
                  key={ql.label}
                  to={ql.to}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all group"
                >
                  <div className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm ${ql.color}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {ql.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-soft p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity size={18} className="text-primary-600" />
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
              System Health
            </h2>
          </div>
          <div className="space-y-4">
            {SYSTEM_HEALTH.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.label}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-800 dark:text-slate-100">{item.value}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Role Distribution */}
      <motion.div
        variants={cardVariants}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-soft p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary-600" />
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
              User Role Distribution
            </h2>
          </div>
          <Link
            to="/superadmin/users"
            className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {(() => {
          const roleCounts = users.reduce((acc, u) => {
            acc[u.role] = (acc[u.role] || 0) + 1;
            return acc;
          }, {});
          const roleColors = {
            superadmin: 'bg-violet-500',
            admin: 'bg-blue-500',
            hr: 'bg-cyan-500',
            manager: 'bg-amber-500',
            employee: 'bg-emerald-500',
            candidate: 'bg-rose-500',
          };
          const total = users.length || 1;
          return (
            <div className="space-y-3">
              {Object.entries(roleCounts).map(([role, count]) => (
                <div key={role} className="flex items-center gap-4">
                  <div className="w-24 text-xs font-bold text-slate-500 dark:text-slate-400 capitalize text-right">{role}</div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / total) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${roleColors[role] || 'bg-slate-400'}`}
                    />
                  </div>
                  <div className="w-8 text-xs font-black text-slate-700 dark:text-slate-200 text-right">{count}</div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-center text-sm text-slate-400 py-4">No users registered yet.</p>
              )}
            </div>
          );
        })()}
      </motion.div>
    </motion.div>
  );
};

export default SuperAdminDashboard;

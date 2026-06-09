import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CalendarOff,
  TrendingUp,
  TrendingDown,
  BarChart2,
  FileText,
  Download,
  Settings,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  ChevronUp,
  ChevronDown,
  Minus,
  Sun,
  Briefcase,
  Sunset,
  Moon,
  AlertCircle,
  Upload,
  PlusCircle,
  Building2,
} from 'lucide-react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import { useAttendance } from '../../features/attendance/AttendanceContext';
import { PageHeader } from '../../shared/components/layout/PageHeader';

// ─── Animation Variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toast = (message, type = 'success') =>
  window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, type } }));

const STATUS_CONFIG = {
  Present: { label: 'Present', bg: 'bg-emerald-100 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Late:    { label: 'Late',    bg: 'bg-amber-100 dark:bg-amber-950/30',   text: 'text-amber-700 dark:text-amber-400',   dot: 'bg-amber-500' },
  Absent:  { label: 'Absent',  bg: 'bg-rose-100 dark:bg-rose-950/30',     text: 'text-rose-700 dark:text-rose-400',     dot: 'bg-rose-500' },
  Leave:   { label: 'Leave',   bg: 'bg-blue-100 dark:bg-blue-950/30',     text: 'text-blue-700 dark:text-blue-400',     dot: 'bg-blue-500' },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Absent;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Compact Summary Card ─────────────────────────────────────────────────────
const SummaryCard = ({ icon: Icon, label, value, pct, trend, trendVal, colorClass, borderClass, bgClass, deptBreakdown }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const TrendIcon = trend === 'up' ? ChevronUp : trend === 'down' ? ChevronDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-slate-400';

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, scale: 1.01 }}
      className={`relative bg-white dark:bg-slate-900 rounded-2xl border ${borderClass} overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorClass}`} />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
            <Icon size={17} className={colorClass.replace('from-', 'text-').split(' ')[0]} />
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon size={12} className={trendColor} />
            <span className={`text-[10px] font-bold ${trendColor}`}>{trendVal}</span>
          </div>
        </div>

        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">{label}</p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-none">{value}</h3>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-0.5">{pct}%</span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Department breakdown tooltip */}
      <AnimatePresence>
        {showTooltip && deptBreakdown && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 w-52 bg-slate-900 dark:bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl z-50 text-left"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Dept. Breakdown</p>
            {deptBreakdown.map((d, i) => (
              <div key={i} className="flex justify-between items-center py-0.5">
                <span className="text-xs text-slate-300">{d.name}</span>
                <span className="text-xs font-bold text-white">{d.count}</span>
              </div>
            ))}
            <div className="absolute bottom-[-6px] left-5 w-3 h-3 bg-slate-900 dark:bg-slate-800 border-b border-r border-slate-700 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Mini Trend Bar ───────────────────────────────────────────────────────────
const TrendBar = ({ values = [], color = 'bg-primary-500' }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {values.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${color} opacity-70 hover:opacity-100 transition-opacity`}
          style={{ height: `${(v / max) * 100}%`, minHeight: 2 }}
          title={`${v}%`}
        />
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AttendanceCenter = () => {
  const { users, departments } = useSuperAdmin();
  const { attendanceLogs } = useAttendance();
  const [leaveFilter, setLeaveFilter] = useState('all');
  const [tableSearch, setTableSearch] = useState('');

  // ── Sync with Global Attendance logs in Local Storage ──────────────────────
  const [globalAttendance, setGlobalAttendance] = useState(() => {
    try {
      const data = localStorage.getItem('hcm_global_attendance');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });

  const loadGlobalAttendance = () => {
    try {
      const data = localStorage.getItem('hcm_global_attendance');
      if (data) {
        setGlobalAttendance(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadGlobalAttendance();
    window.addEventListener('hcm_global_sync', loadGlobalAttendance);
    window.addEventListener('storage', loadGlobalAttendance);
    return () => {
      window.removeEventListener('hcm_global_sync', loadGlobalAttendance);
      window.removeEventListener('storage', loadGlobalAttendance);
    };
  }, []);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const mapStatus = (status) => {
    if (status === 'On Leave' || status === 'Leave') return 'Leave';
    if (status === 'Present') return 'Present';
    if (status === 'Late') return 'Late';
    if (status === 'Absent') return 'Absent';
    return 'Absent';
  };

  // ── Derive rich attendance data from existing context ──────────────────────
  const employees = useMemo(() => users.filter(u => u.role === 'employee' || u.role === 'manager' || u.role === 'hr'), [users]);
  const totalEmp = employees.length || 1;

  // Generate dynamic attendance records from local storage with mock fallback
  const attendanceRecords = useMemo(() => {
    const todayStr = formatDate(new Date());

    return employees.map((emp, i) => {
      // Find today's clock event
      const todayLog = globalAttendance.find(
        (log) => log.name === emp.name && log.date === todayStr
      );

      if (todayLog) {
        return {
          id: emp.id,
          name: emp.name,
          department: emp.department || departments[i % departments.length]?.name || 'General',
          clockIn: todayLog.clockIn === '-' ? null : todayLog.clockIn,
          clockOut: todayLog.clockOut === '-' ? null : todayLog.clockOut,
          hours: todayLog.totalHours === '0h' ? '—' : todayLog.totalHours,
          status: mapStatus(todayLog.status),
          avatar: emp.name?.charAt(0).toUpperCase(),
        };
      }

      // Check if employee has approved leave for today
      const globalLeaves = JSON.parse(localStorage.getItem('hcm_global_leaves') || '[]');
      const hasLeave = globalLeaves.some(
        (l) => l.name === emp.name && l.status === 'Approved' && todayStr >= l.startDate && todayStr <= l.endDate
      );

      if (hasLeave) {
        return {
          id: emp.id,
          name: emp.name,
          department: emp.department || departments[i % departments.length]?.name || 'General',
          clockIn: null,
          clockOut: null,
          hours: '—',
          status: 'Leave',
          avatar: emp.name?.charAt(0).toUpperCase(),
        };
      }

      // Mock Fallbacks
      const statuses = ['Present', 'Present', 'Present', 'Late', 'Absent', 'Leave', 'Present'];
      const timeIns  = ['08:45', '09:00', '09:15', '09:30', '10:02', null, '08:55'];
      const timeOuts = ['17:15', '17:30', '17:45', '18:00', null, null, '17:20'];
      const hours    = ['8h 30m', '8h 30m', '8h 30m', '8h 30m', '—', '—', '8h 25m'];
      const idx = i % statuses.length;

      return {
        id: emp.id,
        name: emp.name,
        department: emp.department || departments[i % departments.length]?.name || 'General',
        clockIn: timeIns[idx],
        clockOut: timeOuts[idx],
        hours: hours[idx],
        status: statuses[idx],
        avatar: emp.name?.charAt(0).toUpperCase(),
      };
    });
  }, [employees, departments, globalAttendance]);

  // ── Summary Metrics ────────────────────────────────────────────────────────
  const metrics = useMemo(() => {
    const present = attendanceRecords.filter(r => r.status === 'Present').length;
    const absent  = attendanceRecords.filter(r => r.status === 'Absent').length;
    const late    = attendanceRecords.filter(r => r.status === 'Late').length;
    const onLeave = attendanceRecords.filter(r => r.status === 'Leave').length;
    return { present, absent, late, onLeave };
  }, [attendanceRecords]);

  // Dept breakdown per status
  const deptBreakdown = useMemo(() => {
    const deptMap = {};
    attendanceRecords.forEach(r => {
      deptMap[r.department] = (deptMap[r.department] || 0) + 1;
    });
    return Object.entries(deptMap).map(([name, count]) => ({ name, count }));
  }, [attendanceRecords]);

  // ── Pending Leave Requests (mocked from users) ─────────────────────────────
  const leaveRequests = useMemo(() => [
    { id: 1, name: 'Jim Halpert',     dept: 'Sales',           type: 'Casual Leave',   days: 2, status: 'Pending'  },
    { id: 2, name: 'Michael Scott',   dept: 'Human Resources', type: 'Medical Leave',  days: 5, status: 'Pending'  },
    { id: 3, name: 'Dwight Schrute',  dept: 'Sales',           type: 'Annual Leave',   days: 3, status: 'Approved' },
    { id: 4, name: 'Sarah Connor',    dept: 'Engineering',     type: 'Comp Off',       days: 1, status: 'Rejected' },
    { id: 5, name: 'Oscar Martinez',  dept: 'Finance',         type: 'Study Leave',    days: 4, status: 'Pending'  },
  ], []);

  const filteredLeave = leaveFilter === 'all'
    ? leaveRequests
    : leaveRequests.filter(l => l.status.toLowerCase() === leaveFilter);

  // ── Shift Data ─────────────────────────────────────────────────────────────
  const shifts = useMemo(() => {
    const total = employees.length || 5;
    return [
      { name: 'Morning Shift',  icon: Sun,      time: '06:00–14:00', assigned: Math.ceil(total * 0.3),  active: Math.ceil(total * 0.28), color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-950/20',   bar: 'bg-gradient-to-r from-amber-400 to-orange-500'  },
      { name: 'General Shift',  icon: Briefcase,time: '09:00–18:00', assigned: Math.ceil(total * 0.5),  active: Math.ceil(total * 0.45), color: 'text-blue-500',    bg: 'bg-blue-50 dark:bg-blue-950/20',     bar: 'bg-gradient-to-r from-blue-400 to-indigo-500'   },
      { name: 'Evening Shift',  icon: Sunset,   time: '14:00–22:00', assigned: Math.ceil(total * 0.15), active: Math.ceil(total * 0.12), color: 'text-violet-500',  bg: 'bg-violet-50 dark:bg-violet-950/20', bar: 'bg-gradient-to-r from-violet-400 to-purple-500' },
      { name: 'Night Shift',    icon: Moon,     time: '22:00–06:00', assigned: Math.ceil(total * 0.05), active: Math.ceil(total * 0.04), color: 'text-slate-500',   bg: 'bg-slate-50 dark:bg-slate-800/40',   bar: 'bg-gradient-to-r from-slate-400 to-slate-600'   },
    ];
  }, [employees]);

  // ── Analytics dynamic computations ───────────────────────────────────────────
  const weeklyTrend = useMemo(() => {
    const trend = [];
    const baseFallback = [88, 92, 85, 94, 90, 87, 93];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = formatDate(d);
      
      const dayLogs = globalAttendance.filter(l => l.date === dateStr);
      if (dayLogs.length > 0) {
        const presentOrLate = dayLogs.filter(l => l.status === 'Present' || l.status === 'Late' || l.status === 'OnTime').length;
        trend.push(Math.round((presentOrLate / dayLogs.length) * 100));
      } else {
        trend.push(baseFallback[6 - i]);
      }
    }
    return trend;
  }, [globalAttendance]);

  const monthlyRate = useMemo(() => {
    const rates = [];
    const baseFallback = [82, 85, 88, 91, 89, 93, 90, 88, 92, 94, 91, 89];
    const currentYear = new Date().getFullYear();
    
    for (let m = 0; m < 12; m++) {
      const monthStr = `${currentYear}-${String(m + 1).padStart(2, '0')}`;
      const monthLogs = globalAttendance.filter(l => l.date && l.date.startsWith(monthStr));
      
      if (monthLogs.length > 0) {
        const presentOrLate = monthLogs.filter(l => l.status === 'Present' || l.status === 'Late' || l.status === 'OnTime').length;
        rates.push(Math.round((presentOrLate / monthLogs.length) * 100));
      } else {
        rates.push(baseFallback[m]);
      }
    }
    return rates;
  }, [globalAttendance]);

  const lateTrend = useMemo(() => {
    const trend = [];
    const baseFallback = [12, 8, 15, 6, 10, 7, 9];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = formatDate(d);
      
      const dayLogs = globalAttendance.filter(l => l.date === dateStr);
      if (dayLogs.length > 0) {
        const lates = dayLogs.filter(l => l.status === 'Late').length;
        trend.push(lates);
      } else {
        trend.push(baseFallback[6 - i]);
      }
    }
    return trend;
  }, [globalAttendance]);

  const last7DaysLabels = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const list = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      list.push(days[d.getDay()]);
    }
    return list;
  }, []);

  // ── Department Breakdown ───────────────────────────────────────────────────
  const deptAttendance = useMemo(() => {
    return departments.slice(0, 5).map((dept, i) => {
      const deptEmps = attendanceRecords.filter(r => r.department === dept.name);
      const total = deptEmps.length || (dept.count || 3);
      const present = deptEmps.filter(r => r.status === 'Present').length || Math.ceil(total * 0.75);
      const absent  = deptEmps.filter(r => r.status === 'Absent').length  || Math.ceil(total * 0.1);
      const leave   = deptEmps.filter(r => r.status === 'Leave').length   || Math.ceil(total * 0.15);
      const pct = Math.round((present / Math.max(total, 1)) * 100);
      return { name: dept.name, total, present, absent, leave, pct };
    });
  }, [departments, attendanceRecords]);

  // ── Filtered table ─────────────────────────────────────────────────────────
  const filteredRecords = attendanceRecords.filter(r =>
    r.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
    r.department.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const hasData = attendanceRecords.length > 0;

  // ── Leave action handlers ──────────────────────────────────────────────────
  const handleLeaveAction = (id, action) => {
    toast(`Leave request ${action === 'approve' ? 'approved' : 'rejected'}`, action === 'approve' ? 'success' : 'error');
  };

  const handleExport = () => {
    const headers = ['Employee Name', 'Department', 'Clock In', 'Clock Out', 'Hours Worked', 'Status'].join(',');
    const rows = attendanceRecords.map(r => [
      `"${r.name || ''}"`,
      `"${r.department || ''}"`,
      `"${r.clockIn || '—'}"`,
      `"${r.clockOut || '—'}"`,
      `"${r.hours || '—'}"`,
      `"${r.status || ''}"`
    ].join(','));
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast('Attendance report exported successfully', 'success');
  };

  return (
    <motion.div
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Page Header ── */}
      <motion.div variants={itemVariants}>
        <PageHeader
          icon={Shield}
          title="Attendance Control Center"
          subtitle="Super Admin • Real-time monitoring, shift management & attendance analytics"
        >
          <button className="btn-primary flex items-center gap-1.5 text-xs px-3 py-2" onClick={handleExport}>
            <Download size={14} /> Export Attendance
          </button>
        </PageHeader>
      </motion.div>

      {/* ── 4-Card Summary Row ── */}
      {hasData ? (
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SummaryCard
            icon={UserCheck} label="Present Today" value={metrics.present}
            pct={Math.round((metrics.present / totalEmp) * 100)} trend="up" trendVal="+3.2%"
            colorClass="from-emerald-400 to-emerald-600"
            borderClass="border-emerald-100 dark:border-emerald-900/30"
            bgClass="bg-emerald-50 dark:bg-emerald-950/20"
            deptBreakdown={deptBreakdown}
          />
          <SummaryCard
            icon={UserX} label="Absent Today" value={metrics.absent}
            pct={Math.round((metrics.absent / totalEmp) * 100)} trend="down" trendVal="-1.1%"
            colorClass="from-rose-400 to-rose-600"
            borderClass="border-rose-100 dark:border-rose-900/30"
            bgClass="bg-rose-50 dark:bg-rose-950/20"
            deptBreakdown={deptBreakdown}
          />
          <SummaryCard
            icon={Clock} label="Late Arrivals" value={metrics.late}
            pct={Math.round((metrics.late / totalEmp) * 100)} trend="up" trendVal="+0.8%"
            colorClass="from-amber-400 to-amber-600"
            borderClass="border-amber-100 dark:border-amber-900/30"
            bgClass="bg-amber-50 dark:bg-amber-950/20"
            deptBreakdown={deptBreakdown}
          />
          <SummaryCard
            icon={CalendarOff} label="Employees On Leave" value={metrics.onLeave}
            pct={Math.round((metrics.onLeave / totalEmp) * 100)} trend="neutral" trendVal="—"
            colorClass="from-blue-400 to-blue-600"
            borderClass="border-blue-100 dark:border-blue-900/30"
            bgClass="bg-blue-50 dark:bg-blue-950/20"
            deptBreakdown={deptBreakdown}
          />
        </motion.div>
      ) : (
        /* ── Empty State ── */
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} className="text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">No attendance records available</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">Set up attendance tracking to see real-time data here</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Upload,     label: 'Import Employees',         action: () => toast('Import employees module', 'info') },
              { icon: Settings,   label: 'Configure Attendance Rules',action: () => toast('Configure rules', 'info') },
              { icon: PlusCircle, label: 'Add Attendance Records',    action: () => toast('Add records module', 'info') },
            ].map(({ icon: Icon, label, action }) => (
              <button key={label} className="btn-secondary flex items-center gap-2 text-xs px-3 py-2" onClick={action}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Main Content Grid (Table + Leave) ── */}
      {hasData && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* ── Attendance Overview Table ── */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary-600" />
                <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">Attendance Overview</h2>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                  {filteredRecords.length} records
                </span>
              </div>
              <input
                type="text"
                placeholder="Search employee or dept…"
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-primary-400 text-slate-700 dark:text-slate-300 w-44 placeholder:text-slate-400"
              />
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    {['Employee', 'Department', 'Clock In', 'Clock Out', 'Hours', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                  {filteredRecords.map((r, idx) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                            {r.avatar}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.department}</td>
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">{r.clockIn || '—'}</td>
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">{r.clockOut || '—'}</td>
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">{r.hours}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                      <td className="px-4 py-2.5">
                        <button
                          className="flex items-center gap-1 text-[10px] font-bold text-primary-600 hover:text-primary-700 transition-colors"
                          onClick={() => toast(`Viewing details for ${r.name}`, 'info')}
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="block sm:hidden divide-y divide-slate-50 dark:divide-slate-800">
              {filteredRecords.map((r, idx) => (
                <div key={r.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-black">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.name}</p>
                        <p className="text-[10px] text-slate-400">{r.department}</p>
                      </div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                    <div>In: <span className="font-bold text-slate-700 dark:text-slate-300">{r.clockIn || '—'}</span></div>
                    <div>Out: <span className="font-bold text-slate-700 dark:text-slate-300">{r.clockOut || '—'}</span></div>
                    <div>Hrs: <span className="font-bold text-slate-700 dark:text-slate-300">{r.hours}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Leave Requests Panel ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarOff size={16} className="text-blue-500" />
                <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">Leave Requests</h2>
              </div>
              <div className="flex gap-1">
                {['all', 'pending', 'approved', 'rejected'].map(f => (
                  <button
                    key={f}
                    onClick={() => setLeaveFilter(f)}
                    className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-md transition-colors ${leaveFilter === f ? 'bg-primary-600 text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800 max-h-72">
              {filteredLeave.map(req => (
                <div key={req.id} className="px-5 py-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{req.name}</p>
                      <p className="text-[10px] text-slate-400">{req.dept}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'Pending'  ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400' :
                      req.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' :
                                                  'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400'
                    }`}>{req.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500">{req.type}</span>
                      <span className="ml-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400">{req.days}d</span>
                    </div>
                    {req.status === 'Pending' && (
                      <div className="flex gap-1.5">
                        <button onClick={() => handleLeaveAction(req.id, 'approve')} className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 transition-colors" title="Approve">
                          <CheckCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
                        </button>
                        <button onClick={() => handleLeaveAction(req.id, 'reject')} className="p-1 rounded-md bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 transition-colors" title="Reject">
                          <XCircle size={13} className="text-rose-600 dark:text-rose-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Shift Management + Analytics ── */}
      {hasData && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Shift Overview ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-violet-500" />
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">Shift Overview</h2>
            </div>
            <div className="space-y-3">
              {shifts.map(shift => {
                const coverage = shift.assigned > 0 ? Math.round((shift.active / shift.assigned) * 100) : 0;
                const ShiftIcon = shift.icon;
                return (
                  <div key={shift.name} className={`p-3 rounded-xl ${shift.bg} border border-white/50 dark:border-slate-700/30`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShiftIcon size={14} className={shift.color} />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{shift.name}</span>
                        <span className="text-[10px] text-slate-400">{shift.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                        <span>Assigned: <span className="text-slate-700 dark:text-slate-300">{shift.assigned}</span></span>
                        <span>Active: <span className="text-slate-700 dark:text-slate-300">{shift.active}</span></span>
                        <span className="text-emerald-600 dark:text-emerald-400">{coverage}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/60 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${shift.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${coverage}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Attendance Analytics ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 dark:border-slate-800/80 pb-2">
              <BarChart2 size={16} className="text-primary-600" />
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">Attendance Analytics</h2>
            </div>

            <div className="space-y-6">
              {/* Weekly Attendance Trend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Weekly Attendance Trend</p>
                  <div className="flex items-center gap-1">
                    {weeklyTrend[6] - weeklyTrend[5] >= 0 ? (
                      <>
                        <TrendingUp size={11} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500">+{weeklyTrend[6] - weeklyTrend[5]}% WoW</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown size={11} className="text-rose-500" />
                        <span className="text-[10px] font-bold text-rose-500">{weeklyTrend[6] - weeklyTrend[5]}% WoW</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="h-16 w-full flex items-end justify-center">
                  <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="weeklyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {weeklyTrend.length > 1 && (
                      <>
                        {/* Area path */}
                        <path
                          d={`M 10 60 L ${weeklyTrend.map((v, i) => {
                            const x = (i / 6) * 280 + 10;
                            const y = 60 - (v / 100) * 45;
                            return `${x} ${y}`;
                          }).join(' L ')} L 290 60 Z`}
                          fill="url(#weeklyAreaGrad)"
                        />
                        {/* Line path */}
                        <path
                          d={`M ${weeklyTrend.map((v, i) => {
                            const x = (i / 6) * 280 + 10;
                            const y = 60 - (v / 100) * 45;
                            return `${x} ${y}`;
                          }).join(' L ')}`}
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Glow Nodes */}
                        {weeklyTrend.map((v, i) => {
                          const cx = (i / 6) * 280 + 10;
                          const cy = 60 - (v / 100) * 45;
                          return (
                            <g key={i} className="group cursor-pointer">
                              <circle cx={cx} cy={cy} r="3.5" fill="#6366f1" className="transition-all duration-200 group-hover:r-5" />
                              {i === 6 && (
                                <circle cx={cx} cy={cy} r="7" fill="#6366f1" opacity="0.25" className="animate-ping" />
                              )}
                            </g>
                          );
                        })}
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1 px-1">
                  {last7DaysLabels.map((lbl, i) => (
                    <span key={i}>{lbl}</span>
                  ))}
                </div>
              </div>

              {/* Monthly Attendance Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Monthly Attendance Rate</p>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    Avg: {Math.round(monthlyRate.reduce((a,b)=>a+b,0)/monthlyRate.length)}%
                  </span>
                </div>
                
                <div className="h-16 w-full flex items-end justify-center">
                  <svg viewBox="0 0 360 70" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="monthlyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {monthlyRate.length > 1 && (
                      <>
                        <path
                          d={`M 10 60 L ${monthlyRate.map((v, i) => {
                            const x = (i / 11) * 340 + 10;
                            const y = 60 - (v / 100) * 45;
                            return `${x} ${y}`;
                          }).join(' L ')} L 350 60 Z`}
                          fill="url(#monthlyAreaGrad)"
                        />
                        <path
                          d={`M ${monthlyRate.map((v, i) => {
                            const x = (i / 11) * 340 + 10;
                            const y = 60 - (v / 100) * 45;
                            return `${x} ${y}`;
                          }).join(' L ')}`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {monthlyRate.map((v, i) => {
                          const cx = (i / 11) * 340 + 10;
                          const cy = 60 - (v / 100) * 45;
                          return (
                            <circle
                              key={i}
                              cx={cx}
                              cy={cy}
                              r="3"
                              fill="#10b981"
                              className="hover:r-5 transition-all cursor-pointer"
                              title={`Month ${i+1}: ${v}%`}
                            />
                          );
                        })}
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1 px-1">
                  <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span><span>Dec</span>
                </div>
              </div>

              {/* Late Arrival Trend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Late Arrival Trends</p>
                  <div className="flex items-center gap-1">
                    {lateTrend[6] - lateTrend[5] > 0 ? (
                      <>
                        <TrendingUp size={11} className="text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500">+{lateTrend[6] - lateTrend[5]} late today</span>
                      </>
                    ) : lateTrend[6] - lateTrend[5] < 0 ? (
                      <>
                        <TrendingDown size={11} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500">{lateTrend[6] - lateTrend[5]} late today</span>
                      </>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Neutral today</span>
                    )}
                  </div>
                </div>
                
                <div className="h-16 w-full flex items-end justify-center">
                  <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="lateBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    {lateTrend.length > 1 && (
                      <>
                        {lateTrend.map((v, i) => {
                          const maxVal = Math.max(...lateTrend, 1);
                          const barHeight = (v / maxVal) * 45;
                          const x = (i / 6) * 270 + 10;
                          const y = 60 - barHeight;
                          const width = 12;
                          return (
                            <rect
                              key={i}
                              x={x}
                              y={y}
                              width={width}
                              height={Math.max(barHeight, 2)}
                              rx="3"
                              fill="url(#lateBarGrad)"
                              opacity="0.8"
                              className="hover:opacity-100 transition-all cursor-pointer"
                              title={`${v} late arrivals`}
                            />
                          );
                        })}
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1 px-1">
                  {last7DaysLabels.map((lbl, i) => (
                    <span key={i}>{lbl}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Department Attendance Breakdown ── */}
      {hasData && deptAttendance.length > 0 && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-indigo-500" />
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">Department Attendance</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {deptAttendance.map((dept, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">{dept.name}</p>

                {/* Attendance rate ring-like progress */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-10 h-10 shrink-0">
                    <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke="url(#deptGrad)"
                        strokeWidth="3"
                        strokeDasharray={`${(dept.pct / 100) * 87.96} 87.96`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="deptGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700 dark:text-slate-300">{dept.pct}%</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-500">Present</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 ml-auto">{dept.present}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-slate-500">Absent</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 ml-auto">{dept.absent}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-slate-500">Leave</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 ml-auto">{dept.leave}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AttendanceCenter;

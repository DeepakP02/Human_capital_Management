import React, { useMemo } from 'react';
import StatCard from './StatCard';
import { Clock, BarChart2, CalendarCheck } from 'lucide-react';
import { useAttendance } from '../../features/attendance/AttendanceContext';
const AttendanceCenter = () => {
  const { attendanceLogs } = useAttendance();

  // Simple analytics derived from attendanceLogs
  const analytics = useMemo(() => {
    const totalSessions = attendanceLogs.length;
    const today = new Date().toISOString().slice(0, 10);
    const todaysSessions = attendanceLogs.filter((log) => log.date?.startsWith(today)).length;
    const onTime = attendanceLogs.filter((log) => log.status === 'OnTime').length;
    const late = attendanceLogs.filter((log) => log.status === 'Late').length;
    return { totalSessions, todaysSessions, onTime, late };
  }, [attendanceLogs]);

  const cards = [
    { icon: Clock, label: 'Total Sessions', value: analytics.totalSessions, sub: 'All time', style: { color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' } },
    { icon: CalendarCheck, label: 'Today Sessions', value: analytics.todaysSessions, sub: 'Today', style: { color: 'from-blue-400 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' } },
    { icon: BarChart2, label: 'On‑Time', value: analytics.onTime, sub: 'On‑time arrivals', style: { color: 'from-purple-400 to-purple-600', bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' } },
    { icon: BarChart2, label: 'Late', value: analytics.late, sub: 'Late arrivals', style: { color: 'from-red-400 to-red-600', bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' } },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Attendance Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cards.map((c, i) => (
          <StatCard key={i} icon={c.icon} label={c.label} value={c.value} sub={c.sub} style={c.style} />
        ))}
      </div>
      {/* Action Toolbar */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button className="btn-primary flex items-center gap-2" onClick={() => {
          window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Clocked in', type: 'success' } }));
        }}>
          <Clock size={18} /> Clock In
        </button>
        <button className="btn-secondary flex items-center gap-2" onClick={() => {
          window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Clocked out', type: 'success' } }));
        }}>
          <Clock size={18} /> Clock Out
        </button>
        <button className="btn-outline flex items-center gap-2" onClick={() => {
          window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Leave request submitted', type: 'info' } }));
        }}>
          <CalendarCheck size={18} /> Request Leave
        </button>
      </div>
      {/* Attendance Logs Table */}
      {attendanceLogs && attendanceLogs.length > 0 ? (
        <>
          <div className="hidden sm:block overflow-x-auto rounded-lg border">
            <table className="min-w-full bg-white dark:bg-slate-900">
              <thead className="bg-gray-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Time In</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Time Out</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceLogs.map((log, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-slate-700">
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.date}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.timeIn || '--'}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.timeOut || '--'}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="block sm:hidden space-y-4">
            {attendanceLogs.map((log, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 shadow-soft">
                <div className="flex justify-between items-center border-b pb-2 mb-2 border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{log.date}</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${log.status === 'OnTime' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400'}`}>
                    {log.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div>Time In: <span className="font-bold text-slate-700 dark:text-slate-300">{log.timeIn || '--'}</span></div>
                  <div>Time Out: <span className="font-bold text-slate-700 dark:text-slate-300">{log.timeOut || '--'}</span></div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">No attendance logs available. Use the actions above to record attendance.</div>
      )}
    </div>
  );
};

export default AttendanceCenter;

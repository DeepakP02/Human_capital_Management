import React, { useMemo } from 'react';
import StatCard from './StatCard';
import { CreditCard, BarChart2, TrendingUp } from 'lucide-react';
import { usePayroll } from '../../features/payroll/PayrollContext';

const PayrollCenter = () => {
  const { payrollHistory } = usePayroll();

  // Simple analytics derived from mock payrollHistory
  const analytics = useMemo(() => {
    const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthHistory = payrollHistory.filter((p) => p.month.startsWith(thisMonth));
    const totalPayroll = monthHistory.reduce((sum, p) => sum + (p.net || 0), 0);
    const employeesPaid = monthHistory.length;
    const pending = payrollHistory.filter((p) => p.status !== 'Paid').length;
    const avgSalary = employeesPaid ? totalPayroll / employeesPaid : 0;
    const growth = payrollHistory.length > 1 ? ((totalPayroll - payrollHistory[payrollHistory.length - 2].net) / payrollHistory[payrollHistory.length - 2].net) * 100 : 0;
    return { totalPayroll, employeesPaid, pending, avgSalary, growth };
  }, [payrollHistory]);

  const cards = [
    { icon: CreditCard, label: 'Total Payroll This Month', value: `$${analytics.totalPayroll.toLocaleString()}`, sub: 'Current month', style: { color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' } },
    { icon: BarChart2, label: 'Employees Paid', value: analytics.employeesPaid, sub: 'Paid this month', style: { color: 'from-blue-400 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' } },
    { icon: TrendingUp, label: 'Pending Payroll', value: analytics.pending, sub: 'Awaiting processing', style: { color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' } },
    { icon: BarChart2, label: 'Average Salary', value: `$${analytics.avgSalary.toFixed(2)}`, sub: 'Per employee', style: { color: 'from-purple-400 to-purple-600', bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' } },
    { icon: TrendingUp, label: 'Payroll Growth', value: `${analytics.growth.toFixed(1)}%`, sub: 'Since last month', style: { color: 'from-pink-400 to-pink-600', bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' } },
  ];
  const hasPayrollData = payrollHistory && payrollHistory.length > 0;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Payroll Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <StatCard
            key={i}
            icon={c.icon}
            label={c.label}
            value={c.value}
            sub={c.sub}
            style={c.style}
          />
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {/* Action Toolbar */}
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary flex items-center gap-2" onClick={() => {
            // Stub generate payroll action
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Payroll generated', type: 'success' } }));
          }}>
            <CreditCard size={18} /> Generate Payroll
          </button>
          <button className="btn-secondary flex items-center gap-2" onClick={() => {
            // Stub process payroll action
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Payroll processed', type: 'success' } }));
          }}>
            <TrendingUp size={18} /> Process Payroll
          </button>
          <button className="btn-outline flex items-center gap-2" onClick={() => {
            // Stub download payslip
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Payslip downloaded', type: 'success' } }));
          }}>
            <CreditCard size={18} /> Download Payslip
          </button>
          <button className="btn-outline flex items-center gap-2" onClick={() => {
            // Stub view history
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Viewing payroll history', type: 'info' } }));
          }}>
            <BarChart2 size={18} /> View History
          </button>
        </div>
        {/* Payroll Table */}
        {hasPayrollData ? (
          <>
            <div className="hidden sm:block overflow-x-auto rounded-lg border">
              <table className="min-w-full bg-white dark:bg-slate-900">
                <thead className="bg-gray-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Month</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Basic</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">HRA</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Allowance</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Bonus</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">PF</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Tax</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Net</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollHistory.map((p) => (
                    <tr key={p.id} className="border-t border-gray-200 dark:border-slate-700">
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.month}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.basic}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.hra}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.allowance}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.bonus}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.pf}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.tax}</td>
                      <td className="px-4 py-2 font-bold text-gray-800 dark:text-gray-200">{p.net}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Responsive Card Layout */}
            <div className="block sm:hidden space-y-4">
              {payrollHistory.map((p) => (
                <div key={p.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 shadow-soft">
                  <div className="flex justify-between items-center border-b pb-2 mb-2 border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{p.month}</span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${p.status === 'Paid' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <div>Basic: <span className="font-bold text-slate-700 dark:text-slate-300">{p.basic}</span></div>
                    <div>HRA: <span className="font-bold text-slate-700 dark:text-slate-300">{p.hra}</span></div>
                    <div>Allowance: <span className="font-bold text-slate-700 dark:text-slate-300">{p.allowance}</span></div>
                    <div>Bonus: <span className="font-bold text-slate-700 dark:text-slate-300">{p.bonus}</span></div>
                    <div>PF: <span className="font-bold text-slate-700 dark:text-slate-300">{p.pf}</span></div>
                    <div>Tax: <span className="font-bold text-slate-700 dark:text-slate-300">{p.tax}</span></div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-sm">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Net Pay</span>
                    <span className="font-black text-slate-800 dark:text-slate-200">{p.net}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No payroll records available. Use the actions above to generate payroll.
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollCenter;

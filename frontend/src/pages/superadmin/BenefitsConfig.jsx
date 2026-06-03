import React, { useMemo } from 'react';
import StatCard from './StatCard';
import { Gift, CreditCard, ShieldCheck, BarChart2, Edit3, Trash2 } from 'lucide-react';
import { useBenefits } from '../../features/benefits/BenefitsContext';

const BenefitsConfig = () => {
  const { benefitPlans } = useBenefits();

  // Simple analytics derived from benefitPlans (mocked if empty)
  const analytics = useMemo(() => {
    const totalPlans = benefitPlans.length;
    const enrolledEmployees = benefitPlans.reduce((sum, p) => sum + (p.enrolledCount || 0), 0);
    const utilization = totalPlans ? (enrolledEmployees / (totalPlans * 100)) * 100 : 0; // assume each plan max 100 employees
    const costSummary = benefitPlans.reduce((sum, p) => sum + (p.monthlyCost || 0), 0);
    return { totalPlans, enrolledEmployees, utilization: utilization.toFixed(1), costSummary };
  }, [benefitPlans]);

  const cards = [
    { icon: Gift, label: 'Active Benefit Plans', value: analytics.totalPlans, sub: 'Total plans', style: { color: 'from-pink-400 to-pink-600', bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' } },
    { icon: CreditCard, label: 'Enrolled Employees', value: analytics.enrolledEmployees, sub: 'Employees enrolled', style: { color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' } },
    { icon: ShieldCheck, label: 'Utilization Rate', value: `${analytics.utilization}%`, sub: 'Across all plans', style: { color: 'from-blue-400 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' } },
    { icon: BarChart2, label: 'Benefits Cost Summary', value: `$${analytics.costSummary.toLocaleString()}`, sub: 'Monthly cost', style: { color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' } },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Benefits Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Add new benefit plan', type: 'info' } }));
          }}>
            <Gift size={18} /> Add Plan
          </button>
          <button className="btn-secondary flex items-center gap-2" onClick={() => {
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Edit selected plan', type: 'info' } }));
          }}>
            <Edit3 size={18} /> Edit Plan
          </button>
          <button className="btn-outline flex items-center gap-2" onClick={() => {
            window.dispatchEvent(new CustomEvent('app_toast', { detail: { message: 'Delete selected plan', type: 'warning' } }));
          }}>
            <Trash2 size={18} /> Delete Plan
          </button>
        </div>
        {/* Benefit Plans Table */}
        {benefitPlans && benefitPlans.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full bg-white dark:bg-slate-900">
              <thead className="bg-gray-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Plan Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Enrolled</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Monthly Cost</th>
                </tr>
              </thead>
              <tbody>
                {benefitPlans.map((plan) => (
                  <tr key={plan.id} className="border-t border-gray-200 dark:border-slate-700">
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{plan.name}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{plan.enrolledCount}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">${plan.monthlyCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">No benefit plans available. Use the actions above to add plans.</div>
        )}
      </div>
    </div>
  );
};

export default BenefitsConfig;

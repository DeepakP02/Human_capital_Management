import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Users, DollarSign, Lock, Play, Table, AlertCircle, 
  TrendingUp, Zap, Info, X, Check, Edit3, TrendingDown, Eye, Download, 
  CheckCircle2, MoreVertical, Calculator, History 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import TaxRulesModal from '../../components/admin/TaxRulesModal';
import PayrollBreakdownModal from '../../components/admin/PayrollBreakdownModal';
import ActionDropdown from '../../components/admin/ActionDropdown';

const PayrollCenter = () => {
  const { payrollList, runPayroll, showToast, updatePayrollDetails } = useAdmin();
  const [activeTab, setActiveTab] = useState('list');
  const [isRunningPayroll, setIsRunningPayroll] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayroll = payrollList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'list' ? true : activeTab === 'pending' ? p.status === 'Draft' : p.status === 'Processed';
    return matchesSearch && matchesTab;
  });

  const totalEmployees = payrollList.length;
  const totalPayout = payrollList.reduce((acc, p) => acc + p.net, 0);

  const stats = [
    { label: 'Payroll Month', value: 'Oct 2026', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Payout', value: `$${totalPayout.toLocaleString()}`, icon: DollarSign, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Employees', value: totalEmployees.toString(), icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Lock', value: 'Finance', icon: Lock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight text-shadow-sm">Payroll Center</h1>
          <p className="text-slate-500 font-medium tracking-tight">Configure salary structures, manage payout cycles and process compliance payments</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsTaxModalOpen(true)}
            className="btn-secondary px-5 py-3 font-bold flex items-center gap-2"
          >
            <Calculator size={18} />
            <span className="hidden sm:inline">Tax Rules</span>
          </button>
          <button 
            onClick={() => setIsRunningPayroll(true)}
            className="btn-primary px-8 py-3 font-bold flex items-center gap-2 shadow-xl shadow-primary-200 group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             <Play size={18} fill="currentColor" />
             <span>Run Payroll</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card p-6 bg-white border border-slate-100 shadow-soft"
          >
            <div className="flex items-center gap-4">
               <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Control Panel */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {[
                  { id: 'list', label: 'Employee List', icon: Table },
                  { id: 'pending', label: 'Pending Approvals', icon: AlertCircle },
                  { id: 'processed', label: 'Payout History', icon: History },
               ].map((tab) => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                       "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2",
                       activeTab === tab.id 
                       ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                       : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"
                    )}
                  >
                     <tab.icon size={16} />
                     {tab.label}
                  </button>
               ))}
            </div>
            <div className="relative w-full lg:w-80">
               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search employee..." 
                 className="input-field pl-10 h-11 bg-white" 
               />
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Employee</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Basic Salary</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Bonus/Allow.</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Deductions</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center font-black">Net Payable</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredPayroll.length > 0 ? filteredPayroll.map((emp) => (
                        <tr key={emp.id} className="group hover:bg-slate-50/20 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <img src={emp.img} alt={emp.name} className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white" />
                                 <p className="font-bold text-slate-900 tracking-tight">{emp.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center font-medium text-slate-600">${emp.basic?.toLocaleString()}</td>
                           <td className="px-8 py-6 text-center text-emerald-600 font-bold">{emp.bonus ? `$${emp.bonus.toLocaleString()}` : '-'}</td>
                           <td className="px-8 py-6 text-center text-rose-500 font-bold">{emp.deductions ? `$${emp.deductions.toLocaleString()}` : '-'}</td>
                           <td className="px-8 py-6 text-center font-black text-slate-900">${emp.net?.toLocaleString()}</td>
                           <td className="px-8 py-6 text-center">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                                 emp.status === 'Draft' ? "bg-amber-50 text-amber-600 border-amber-100" : 
                                 emp.status === 'Processed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                 "bg-slate-50 text-slate-400 border-slate-100"
                              )}>
                                 {emp.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <ActionDropdown 
                                actions={[
                                  { label: 'View Breakdown', icon: Eye, onClick: () => setEmployeeToView(emp) },
                                  { label: 'Edit Salary', icon: Edit3, onClick: () => setEmployeeToView(emp) },
                                  { label: 'Add Bonus', icon: TrendingUp, onClick: () => setEmployeeToView(emp) },
                                  { label: 'Add Deduction', icon: TrendingDown, onClick: () => setEmployeeToView(emp) },
                                  ...(emp.status === 'Draft' ? [
                                      { label: 'Process Payroll', icon: CheckCircle2, onClick: () => updatePayrollDetails(emp.id, { status: 'Processed' }) }
                                    ] : [
                                      { label: 'Download Payslip', icon: Download, onClick: () => showToast(`Payslip downloaded for ${emp.name}`) }
                                    ])
                                ]}
                              />
                           </td>
                        </tr>
                     )) : (
                        <tr>
                            <td colSpan="7" className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                        <Table size={32} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900">No payroll records found</p>
                                        <p className="text-sm font-medium text-slate-400">Try adjusting your filters or search query</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Run Payroll Modal Drawer */}
      <AnimatePresence>
        {isRunningPayroll && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRunningPayroll(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl max-h-[90vh] bg-white shadow-2xl z-[120] flex flex-col rounded-3xl overflow-hidden"
            >
               <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg transform rotate-12">
                        <Zap size={22} fill="currentColor" />
                     </div>
                     <div>
                        <h2 className="text-xl font-extrabold text-slate-900 leading-none">Process Monthly Payroll</h2>
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mt-2 leading-none">Cycle: October 2026</p>
                     </div>
                  </div>
                  <button onClick={() => setIsRunningPayroll(false)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-10 space-y-12 shrink-0">
                  <div className="card p-10 bg-slate-900 text-white border-none shadow-soft relative overflow-hidden group">
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5 group-hover:bg-primary-500 transition-all duration-1000" />
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-400 mb-6 px-1">Review Configuration</p>
                     <div className="grid grid-cols-2 gap-10">
                        <div>
                           <p className="text-4xl font-black text-white">${totalPayout.toLocaleString()}</p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Total Est. Payout</p>
                        </div>
                        <div className="text-right">
                           <p className="text-4xl font-black text-white">{totalEmployees}</p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Employee Records</p>
                        </div>
                     </div>
                  </div>

                  <section className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Confirmation Checks</label>
                        <div className="space-y-4 italic">
                           {[
                              'Calculate attendance & leave deductions',
                              'Apply individual & team-based bonuses',
                              'Audit government & professional tax compliance',
                              'Generate secure digital payslips'
                           ].map((item, i) => (
                              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                 <div className="w-6 h-6 rounded-lg border-2 border-slate-100 flex items-center justify-center group-hover:border-primary-600 transition-all">
                                    <Check size={14} className="text-primary-600 opacity-0 group-hover:opacity-100" />
                                 </div>
                                 <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-5">
                        <div className="p-3 bg-white rounded-2xl text-primary-600 shadow-sm border border-slate-50">
                           <Calculator size={24} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 leading-none">Automated Breakdown</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Calculated based on 'Standard Template V2.0'</p>
                        </div>
                        <button className="ml-auto text-[10px] font-bold text-primary-600 uppercase tracking-widest border border-primary-100 px-3 py-1.5 rounded-lg hover:bg-white transition-all">Preview</button>
                     </div>
                  </section>
               </div>
               
               <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center gap-4 shrink-0">
                  <button onClick={() => setIsRunningPayroll(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-sm">
                     Cancel
                  </button>
                  <button 
                    onClick={() => {
                      runPayroll();
                      setIsRunningPayroll(false);
                    }}
                    className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                     <Play size={18} fill="currentColor" />
                     <span>Simulate & Execute</span>
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <TaxRulesModal 
        isOpen={isTaxModalOpen}
        onClose={() => setIsTaxModalOpen(false)}
      />

      <PayrollBreakdownModal 
        isOpen={!!employeeToView}
        onClose={() => setEmployeeToView(null)}
        employee={employeeToView}
      />
    </div>
  );
};

export default PayrollCenter;

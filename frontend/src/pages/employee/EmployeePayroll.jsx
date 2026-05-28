import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingUp, ArrowDownRight, Download, FileText, ChevronRight, Calendar, CheckCircle2, 
  DollarSign, PieChart, BarChart3, ShieldCheck, Info, CreditCard, Building2, ExternalLink, ArrowRight, X, Printer
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';
import CenterModal from '../../components/layout/CenterModal';

const EmployeePayroll = () => {
  const { payroll, showToast } = useEmployee();
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const stats = [
    { label: 'Next Pay Date', value: 'Oct 31', icon: Calendar, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Yearly Net', value: '$78,400', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Tax Savings', value: '$4,280', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Loans', value: 'None', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const filteredHistory = payroll.history.filter(p => selectedMonth === 'All' || p.month.includes(selectedMonth));

  const handleDownload = (payslip) => {
    showToast(`Downloading Payslip - ${payslip.month}`);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
          <p className="text-slate-500 font-bold tracking-tight">View your compensation, tax records and fiscal history</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Tax Summary loading...')} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={18} />
            <span>Tax Summary</span>
          </button>
          <button onClick={() => { setSelectedPayslip(payroll.history[0]); showToast('Opening Latest Payslip'); }} className="btn-primary px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary-200">
             <Download size={18} />
             <span>Latest Slip</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Salary Breakdown</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Period: October 2026</p>
                  </div>
                  <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">
                     Processing
                  </div>
               </div>
               
               <div className="p-8 lg:p-10 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                           <TrendingUp size={16} className="text-emerald-500" />
                           Earnings Component
                        </h4>
                        <div className="space-y-4">
                           {[
                             { label: 'Basic Salary', value: '$5,000' },
                             { label: 'HRA Component', value: '$1,500' },
                             { label: 'Performance Bonus', value: '$1,200' },
                             { label: 'Special Allowance', value: '$800' },
                           ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                 <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{item.label}</span>
                                 <span className="text-sm font-black text-slate-900">{item.value}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                           <ArrowDownRight size={16} className="text-rose-500" />
                           Deductions & Taxes
                        </h4>
                        <div className="space-y-4">
                           {[
                             { label: 'Provident Fund', value: '$350' },
                             { label: 'Health Insurance', value: '$120' },
                             { label: 'Professional Tax', value: '$50' },
                             { label: 'TDS / Income Tax', value: '$850' },
                           ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center bg-rose-50/30 p-4 rounded-xl border border-rose-50">
                                 <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{item.label}</span>
                                 <span className="text-sm font-black text-rose-600">-{item.value}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden group shadow-premium">
                     <div className="relative z-10 text-center md:text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-400 mb-2">Net Pay Estimate</p>
                        <h4 className="text-5xl lg:text-6xl font-black text-white tracking-tighter tabular-nums italic">$7,130.00</h4>
                     </div>
                     <div className="relative z-10 flex flex-col items-center md:items-end text-center md:text-right">
                        <div className="flex items-center gap-3 mb-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                           <CreditCard className="text-primary-400" size={20} />
                           <span className="text-[9px] font-black text-white uppercase tracking-widest">Bank: JP Morgan • **** 8245</span>
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Estimated Crediting Session: Oct 31, 2026</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <div className="card p-8 bg-white border-none shadow-soft flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Registry</h3>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border-none rounded-lg px-3 py-1 outline-none"
                  >
                    <option>All</option>
                    <option>March</option>
                    <option>February</option>
                    <option>January</option>
                  </select>
               </div>
               
               <div className="space-y-6 flex-1">
                  {filteredHistory.map((record, i) => (
                     <div key={i} className="group p-6 rounded-3xl border border-slate-50 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-between cursor-pointer" onClick={() => setSelectedPayslip(record)}>
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-400 group-hover:text-primary-600 group-hover:scale-110 transition-all">
                              <FileText size={24} />
                           </div>
                           <div>
                              <p className="text-sm font-black tracking-tight">{record.month}</p>
                              <div className="flex items-center gap-3 mt-1.5">
                                 <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 rounded-md group-hover:bg-white/10 group-hover:text-emerald-400 transition-colors">{record.status}</span>
                                 <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase group-hover:text-slate-500">{record.net}</span>
                              </div>
                           </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleDownload(record); }} className="p-3 bg-white text-slate-400 border border-slate-100 rounded-2xl shadow-sm hover:text-primary-600 transition-all group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white">
                           <Download size={18} />
                        </button>
                     </div>
                  ))}
               </div>

               <div className="mt-10 p-8 bg-primary-50 rounded-[2.5rem] border border-primary-100/50 flex flex-col items-center text-center group cursor-pointer hover:bg-primary-100 transition-colors">
                  <PieChart className="text-primary-600 mb-5 group-hover:rotate-12 transition-transform" size={40} />
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Annual Strategy</h4>
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-[200px] uppercase tracking-widest">Aggregate earnings of <span className="text-primary-700">$125K+</span> for this cycle.</p>
                  <div className="mt-5 flex items-center gap-2 text-[9px] font-black text-primary-600 uppercase tracking-[0.3em]">
                     Full Insight <ArrowRight size={12} />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Detailed Payslip Modal */}
      <CenterModal isOpen={!!selectedPayslip} onClose={() => setSelectedPayslip(null)} title="Payslip Detailed Review">
         {selectedPayslip && (
            <div className="p-10 space-y-10 text-left">
               <div className="flex items-center justify-between pb-8 border-b border-slate-50">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white">
                        <Building2 size={32} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">HCM.ai Tech Solutions</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{selectedPayslip.month} Statement • ID: {selectedPayslip.id}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Generated Date</p>
                     <p className="text-sm font-black text-slate-900 tracking-tighter">{selectedPayslip.date}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] border-b border-primary-100 pb-2">Credit Breakdown</h4>
                     <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Basic Pay</span><span className="text-slate-900 font-black">${selectedPayslip.basic}</span></div>
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>House Rent</span><span className="text-slate-900 font-black">${selectedPayslip.hra}</span></div>
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Conveyance</span><span className="text-slate-900 font-black">${selectedPayslip.allowance}</span></div>
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Performance Bonus</span><span className="text-slate-900 font-black">${selectedPayslip.bonus}</span></div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] border-b border-rose-100 pb-2">Debit Breakdown</h4>
                     <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Provident Fund</span><span className="text-rose-600 font-black">-${selectedPayslip.pf}</span></div>
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Income Tax</span><span className="text-rose-600 font-black">-${selectedPayslip.tax}</span></div>
                        <div className="flex justify-between text-xs font-bold text-slate-500 italic"><span>Prof. Tax</span><span className="text-rose-600 font-black">-$50</span></div>
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Net Payable</p>
                     <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">${selectedPayslip.net}.00</h3>
                  </div>
                  <div className="flex gap-3">
                     <button className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all shadow-sm"><Printer size={20} /></button>
                     <button onClick={() => { handleDownload(selectedPayslip); setSelectedPayslip(null); }} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center gap-3"><Download size={20} /> Download PDF</button>
                  </div>
               </div>
            </div>
         )}
      </CenterModal>
    </div>
  );
};

export default EmployeePayroll;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Heart, ShieldCheck, Sun, Wallet, Download, MessageSquare, ChevronRight, Plus, ArrowUpRight,
   Activity, Briefcase, Clock, CheckCircle2, FileText, LifeBuoy, Stethoscope, X, DollarSign, Target
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEmployee } from '../../context/EmployeeContext';
import CenterModal from '../../components/layout/CenterModal';

const EmployeeBenefits = () => {
   const { benefits, addBenefitClaim, leaves, showToast } = useEmployee();
   const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

   const stats = [
      { label: 'Active Benefits', value: '8', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Insurance Plan', value: 'Premium', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Leave Balance', value: leaves.balance.annual + leaves.balance.sick, icon: Sun, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Total Claims', value: benefits.claims.length, icon: Wallet, color: 'text-primary-600', bg: 'bg-primary-50' },
   ];

   const categories = [
      {
         title: 'Health & Wellness',
         tag: 'Primary Care',
         icon: Stethoscope,
         color: 'indigo',
         items: [
            { label: 'Provider', value: benefits.insurance.provider },
            { label: 'Policy No.', value: 'BC-88220-45' },
            { label: 'Account Coverage', value: '$500,000' },
            { label: 'Dependents', value: `${benefits.dependents.length} Covered` },
            { label: 'Next Renewal', value: 'Dec 31, 2026' }
         ]
      },
      {
         title: 'Retirement Strategy',
         tag: 'Future Fund',
         icon: Target,
         color: 'emerald',
         items: [
            { label: 'Pension ID', value: 'PF-2024-884' },
            { label: 'Employer Matching', value: '12% Fixed' },
            { label: 'Employee Contribution', value: '12% Optional' },
            { label: 'Vesting Period', value: '2 Years Left' },
            { label: 'Account Balance', value: '$24,850.00' }
         ]
      }
   ];

   const handleClaimSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      addBenefitClaim({
         type: formData.get('type'),
         amount: formData.get('amount'),
         date: formData.get('date'),
         description: formData.get('description'),
      });
      setIsClaimModalOpen(false);
      showToast('Reimbursement claim submitted for review');
   };

   return (
      <div className="space-y-8 pb-12 animate-fade-in relative max-w-7xl mx-auto">
         {/* Header Section */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Benefits & Wellness</h1>
               <p className="text-slate-500 font-bold tracking-tight">Your comprehensive corporate perks, health and retirement plans</p>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => showToast('Benefit booklet downloading...')} className="btn-secondary px-6 py-2.5 font-black uppercase tracking-widest flex items-center gap-2">
                  <Download size={18} />
                  <span>Policy</span>
               </button>
               <button onClick={() => showToast('Connecting to HR Support...')} className="btn-primary px-8 py-2.5 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary-200">
                  <MessageSquare size={18} />
                  <span>Contact HR</span>
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

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
               <div key={idx} className="card p-10 bg-white border-none shadow-soft flex flex-col group">
                  <div className="flex items-center justify-between mb-10">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                           <cat.icon size={32} />
                        </div>
                        <div className="text-left">
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">{cat.title}</h3>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{cat.tag}</p>
                        </div>
                     </div>
                     <button className="p-3 bg-slate-50 text-slate-300 rounded-2xl hover:text-primary-600 transition-all">
                        <ArrowUpRight size={20} />
                     </button>
                  </div>

                  <div className="space-y-6 flex-1 text-left">
                     {cat.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-none group/row">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/row:text-slate-600 transition-colors">{item.label}</span>
                           <span className="text-sm font-black text-slate-900 italic tabular-nums">{item.value}</span>
                        </div>
                     ))}
                  </div>

                  <div className="mt-12 p-5 bg-slate-50 rounded-[2rem] flex items-center justify-between group/dl cursor-pointer hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary-600 shadow-sm transition-transform group-hover/dl:rotate-12">
                           <FileText size={22} />
                        </div>
                        <div className="text-left">
                           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Download Full Policy</span>
                           <p className="text-[9px] font-bold text-slate-400 tracking-widest leading-none mt-1">Digital Statement • PDF • 2.4 MB</p>
                        </div>
                     </div>
                     <Download size={20} className="text-slate-200 group-hover/dl:text-primary-600 transition-colors mr-2" />
                  </div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recent Reimbursements */}
            <div className="lg:col-span-8 flex flex-col gap-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Reimbursement History</h3>
                  <button onClick={() => setIsClaimModalOpen(true)} className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 shadow-slate-200 flex items-center gap-2">
                     <Plus size={16} /> New Claim
                  </button>
               </div>
               <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50/50">
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Claim Logic</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Payment Registry</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {benefits.claims.map((claim, i) => (
                              <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                                 <td className="px-8 py-7">
                                    <p className="text-sm font-black text-slate-900 italic tracking-tight">{claim.type}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{claim.date} • {claim.description.slice(0, 30)}...</p>
                                 </td>
                                 <td className="px-8 py-7">
                                    <p className="text-base font-black text-slate-900 tabular-nums">${claim.amount}</p>
                                 </td>
                                 <td className="px-8 py-7 text-center">
                                    <span className={cn(
                                       "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border italic",
                                       claim.status === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                    )}>
                                       {claim.status}
                                    </span>
                                 </td>
                                 <td className="px-8 py-7 text-right">
                                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", claim.status === 'Approved' ? "text-emerald-500" : "text-slate-400")}>{claim.status === 'Approved' ? 'Settled to Bank' : 'Awaiting Audit'}</p>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Wellness Section */}
            <div className="lg:col-span-4 space-y-8">
               <div className="card p-10 bg-gradient-to-br from-indigo-600 to-primary-700 text-white border-none shadow-premium relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                     <LifeBuoy size={200} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-300 mb-8">Premium Support</h3>
                  <p className="text-base font-black italic italic leading-relaxed mb-10 tracking-tight">Need expert navigation through your benefits ecosystem?</p>
                  <button onClick={() => showToast('Connecting to advisor...')} className="w-full py-5 bg-white text-primary-700 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                     Connect with Advisor
                  </button>
               </div>

               <div className="card p-10 bg-white border-none shadow-soft text-left">
                  <h3 className="text-xl font-black text-slate-900 italic tracking-tight mb-8 leading-none">Active Perks</h3>
                  <div className="space-y-4">
                     {[
                        { label: 'Digital Library', icon: Activity },
                        { label: 'Gym Subsidy', icon: Briefcase },
                        { label: 'Mental Care', icon: Heart }
                     ].map((perk, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:border-primary-100 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="p-2 bg-white rounded-lg text-slate-300 group-hover:text-primary-500 transition-colors">
                                 <perk.icon size={20} />
                              </div>
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{perk.label}</span>
                           </div>
                           <CheckCircle2 size={18} className="text-emerald-500" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Claim Modal */}
         < CenterModal isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)} title="New Reimbursement Request" >
            <form onSubmit={handleClaimSubmit} className="p-8 space-y-8 text-left">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Reimbursement Type</label>
                     <select name="type" className="input-field h-14 bg-slate-50 border-transparent font-black">
                        <option>Medical Expense</option>
                        <option>Work Equipment</option>
                        <option>Skill Development</option>
                        <option>Travel Allowance</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Amount ($)</label>
                     <div className="relative">
                        <DollarSign className="absolute left-4 top-5 text-slate-300" size={18} />
                        <input name="amount" type="number" required placeholder="0.00" className="input-field h-14 pl-12 bg-slate-50 border-transparent font-black" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Expense Date</label>
                     <input name="date" type="date" required className="input-field h-14 bg-slate-50 border-transparent font-black" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Bill / Receipt</label>
                     <div className="h-14 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center text-[9px] font-black uppercase text-slate-300 tracking-widest cursor-pointer hover:border-slate-300 transition-colors">
                        Upload Document
                     </div>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Reason / Description</label>
                  <textarea name="description" rows="3" required className="input-field py-4 bg-slate-50 border-transparent font-black resize-none" placeholder="Provide full context for audit..."></textarea>
               </div>
               <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsClaimModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest">Cancel</button>
                  <button type="submit" className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200">Submit Claim</button>
               </div>
            </form>
         </CenterModal >
      </div >
   );
};

export default EmployeeBenefits;

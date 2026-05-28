import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Heart, 
  Users, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Eye, 
  Edit3, 
  Ban,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import BenefitPlanModal from '../../components/admin/BenefitPlanModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ActionDropdown from '../../components/admin/ActionDropdown';

const BenefitsConfig = () => {
  const { benefits, deleteBenefit, showToast, updateBenefit } = useAdmin();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  const filteredBenefits = benefits.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeEnrollees = filteredBenefits.filter(b => b.status === 'Active').length * 75; // mock calc
  
  const stats = [
    { label: 'Total Benefit Plans', value: benefits.length, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Active Enrollees', value: activeEnrollees, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Contribution', value: '$84K', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Benefits Configuration</h1>
          <p className="text-slate-500 font-medium tracking-tight">Design, manage and assign multi-tier employee benefit packages</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Audit exported to CSV')}
            className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export Audit</span>
          </button>
          <button 
            onClick={() => {
              setPlanToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Create Plan</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Control & List Area */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="relative flex-1 w-full text-slate-400">
               <Search className="absolute left-3 top-3 focus:text-primary-600 transition-colors" size={18} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by plan name, category or provider..." 
                 className="input-field pl-10 h-11 bg-white" 
               />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
               <select 
                 value={categoryFilter}
                 onChange={(e) => setCategoryFilter(e.target.value)}
                 className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
               >
                  <option>All Categories</option>
                  <option>Insurance</option>
                  <option>Retirement</option>
                  <option>Wellness</option>
                  <option>Allowance</option>
                  <option>Reimbursement</option>
               </select>
               <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
                  <Filter size={18} />
               </button>
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Benefit Plan</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Category</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Provider</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Eligibility</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Employer Contribution</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredBenefits.length > 0 ? filteredBenefits.map((plan) => (
                        <tr key={plan.id} className="group hover:bg-slate-50/20 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600">
                                    <ShieldCheck size={20} />
                                 </div>
                                 <p className="font-bold text-slate-900 tracking-tight">{plan.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{plan.category}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className="text-xs font-bold text-slate-700">{plan.provider}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase tracking-tighter">{plan.eligibility}</span>
                           </td>
                           <td className="px-8 py-6 text-center font-black text-slate-900">{plan.contribution}</td>
                           <td className="px-8 py-6 text-center">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                                 plan.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                              )}>
                                 {plan.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <ActionDropdown 
                                actions={[
                                  { label: 'View / Edit Plan', icon: Edit3, onClick: () => { setPlanToEdit(plan); setIsAddModalOpen(true); } },
                                  { label: plan.status === 'Active' ? 'Disable Plan' : 'Activate', icon: Ban, onClick: () => updateBenefit(plan.id, { status: plan.status === 'Active' ? 'Disabled' : 'Active' }) },
                                  { label: 'Duplicate', icon: Plus, onClick: () => showToast('Plan duplicated') },
                                  { label: 'Delete', icon: X, danger: true, onClick: () => setPlanToDelete(plan) },
                                ]}
                              />
                           </td>
                        </tr>
                     )) : (
                        <tr>
                            <td colSpan="7" className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                        <Heart size={32} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900">No benefit plans found</p>
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

      {/* Modals */}
      <BenefitPlanModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
            setIsAddModalOpen(false);
            setPlanToEdit(null);
        }}
        planToEdit={planToEdit}
      />

      <ConfirmDialog 
        isOpen={!!planToDelete}
        onClose={() => setPlanToDelete(null)}
        onConfirm={() => deleteBenefit(planToDelete.id)}
        title="Delete Benefit Plan"
        message={`Are you sure you want to delete the ${planToDelete?.name} plan? This action cannot be undone.`}
      />
    </div>
  );
};

export default BenefitsConfig;

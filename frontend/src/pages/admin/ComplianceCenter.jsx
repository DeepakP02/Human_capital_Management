import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   ShieldCheck,
   FileText,
   AlertCircle,
   CheckCircle2,
   XCircle,
   Plus,
   Search,
   Download,
   ChevronRight,
   History,
   Lock,
   X,
   Zap,
   Info,
   Calendar,
   MoreVertical,
   Filter,
   Eye,
   Send,
   Trash2,
   FileBadge,
   Archive,
   RefreshCw,
   Copy,
   Edit3
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import ComplianceModal from '../../components/admin/ComplianceModal';
import AuditArchiveModal from '../../components/admin/AuditArchiveModal';
import PolicyDrawer from '../../components/admin/PolicyDrawer';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ActionDropdown from '../../components/admin/ActionDropdown';

const ComplianceCenter = () => {
   const { policies, updatePolicy, deletePolicy, addPolicy, showToast } = useAdmin();
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isArchiveOpen, setIsArchiveOpen] = useState(false);
   const [policyToEdit, setPolicyToEdit] = useState(null);
   const [policyToView, setPolicyToView] = useState(null);
   const [policyToDelete, setPolicyToDelete] = useState(null);

   const [searchTerm, setSearchTerm] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('All Types');

   const filteredPolicies = policies.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Types' ? true : p.category.includes(categoryFilter);
      return matchesSearch && matchesCategory;
   });

   const activePolicies = policies.filter(p => p.status === 'Active').length;
   // Stats
   const stats = [
      { label: 'Active Policies', value: activePolicies.toString(), icon: FileBadge, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { label: 'Avg Acknowledgment', value: '96%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Pending Renewals', value: policies.filter(p => p.status === 'Renewing' || p.status === 'Expiring Soon').length.toString(), icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Audit Readiness', value: 'High', icon: Lock, color: 'text-primary-600', bg: 'bg-primary-50' },
   ];

   return (
      <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Compliance Center</h1>
               <p className="text-slate-500 font-medium tracking-tight">Standardize policies, track legal acknowledgments and manage organization-wide audits</p>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => setIsArchiveOpen(true)} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
                  <History size={18} />
                  <span className="hidden sm:inline">Audit Archive</span>
               </button>
               <button
                  onClick={() => { setPolicyToEdit(null); setIsAddModalOpen(true); }}
                  className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
               >
                  <Plus size={18} />
                  <span>Publish Policy</span>
               </button>
            </div>
         </div>

         {/* Stats Cards */}
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

         {/* Main List Area */}
         <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
               <div className="relative flex-1 w-full text-slate-400">
                  <Search className="absolute left-3 top-3 focus:text-primary-600 transition-colors" size={18} />
                  <input
                     type="text"
                     placeholder="Search policies by name, category or owner..."
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                     className="input-field pl-10 h-11 bg-white"
                  />
               </div>
               <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 scrollbar-hide">
                  <select
                     value={categoryFilter}
                     onChange={e => setCategoryFilter(e.target.value)}
                     className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
                  >
                     <option>All Types</option>
                     <option>Compliance</option>
                     <option>Ethics</option>
                     <option>Legal</option>
                     <option>HR</option>
                     <option>Security</option>
                  </select>
                  <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
                     <Download size={18} />
                  </button>
               </div>
            </div>

            <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Policy Name</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center">Category</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center">Effective Date</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center">Acknowledgments</th>
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center">Status</th>
                           <th className="px-8 py-5 text-right text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 text-sm">
                        {filteredPolicies.length > 0 ? filteredPolicies.map((p) => (
                           <tr key={p.id} className="group hover:bg-slate-50/20 transition-colors">
                              <td className="px-8 py-6 cursor-pointer" onClick={() => setPolicyToView(p)}>
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors">
                                       <FileText size={20} />
                                    </div>
                                    <div>
                                       <p className="font-bold text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">{p.name}</p>
                                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{p.owner}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-center">
                                 <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                              </td>
                              <td className="px-8 py-6 text-center whitespace-nowrap text-xs font-bold text-slate-600">
                                 {p.effectiveDate || p.date || 'TBD'}
                              </td>
                              <td className="px-8 py-6 text-center">
                                 <div className="flex flex-col items-center gap-1.5">
                                    <span className="font-extrabold text-slate-900 tracking-tight">{p.acknowledgments || '0/428'}</span>
                                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-emerald-500" style={{ width: `${(parseInt((p.acknowledgments || '0').split('/')[0]) / parseInt((p.acknowledgments || '428').split('/')[1] || 428)) * 100}%` }} />
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-center">
                                 <span className={cn(
                                    "px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                                    p.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                       (p.status === 'Renewing' || p.status === 'Expiring Soon') ? "bg-amber-50 text-amber-600 border-amber-100" :
                                          "bg-slate-50 text-slate-400 border-slate-100"
                                 )}>
                                    {p.status}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <ActionDropdown
                                    actions={[
                                       { label: 'View Policy', icon: Eye, onClick: () => setPolicyToView(p) },
                                       { label: 'Edit Policy', icon: Edit3, onClick: () => { setPolicyToEdit(p); setIsAddModalOpen(true); } },
                                       { label: 'Send Reminder', icon: Send, onClick: () => showToast(`Reminder sent for ${p.name}`) },
                                       { label: 'Renew Policy', icon: RefreshCw, onClick: () => showToast(`Initiated renewal for ${p.name}`) },
                                       {
                                          label: 'Duplicate', icon: Copy, onClick: () => {
                                             const { id, ...rest } = p;
                                             addPolicy({ ...rest, name: `Copy of ${p.name}` });
                                          }
                                       },
                                       { label: p.status === 'Archived' ? 'Unarchive' : 'Archive', icon: Archive, onClick: () => updatePolicy(p.id, { status: p.status === 'Archived' ? 'Active' : 'Archived' }) },
                                       { label: 'Delete', icon: Trash2, danger: true, onClick: () => setPolicyToDelete(p) },
                                    ]}
                                 />
                              </td>
                           </tr>
                        )) : (
                           <tr>
                              <td colSpan="6" className="px-8 py-20 text-center text-slate-500">No policies found matching your criteria.</td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Add Policy Modal */}
         <ComplianceModal
            isOpen={isAddModalOpen}
            onClose={() => { setIsAddModalOpen(false); setPolicyToEdit(null); }}
            policy={policyToEdit}
         />

         {/* Audit Archive Modal */}
         <AuditArchiveModal
            isOpen={isArchiveOpen}
            onClose={() => setIsArchiveOpen(false)}
         />

         {/* Policy View Drawer */}
         <PolicyDrawer
            isOpen={!!policyToView}
            onClose={() => setPolicyToView(null)}
            policy={policyToView}
            onEdit={(p) => { setPolicyToEdit(p); setIsAddModalOpen(true); }}
         />

         <ConfirmDialog
            isOpen={!!policyToDelete}
            title="Delete Policy"
            message={`Are you sure you want to permanently delete "${policyToDelete?.name}"? You will lose all acknowledgment records linked to this document.`}
            confirmText="Permanently Delete"
            onConfirm={() => {
               deletePolicy(policyToDelete.id);
               setPolicyToDelete(null);
            }}
            onCancel={() => setPolicyToDelete(null)}
         />
      </div>
   );
};

export default ComplianceCenter;

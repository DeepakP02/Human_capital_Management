import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Plus, 
  Search, 
  Save, 
  Check, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Settings, 
  FileText, 
  DollarSign, 
  Zap, 
  Activity, 
  Layout, 
  Database,
  LockKeyhole,
  Copy,
  Info,
  Layers,
  Trash2
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import RoleModal from '../../components/admin/RoleModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const RolesPermissions = () => {
  const { roles, users, deleteRole, updateRole, showToast } = useAdmin();
  const [selectedRoleName, setSelectedRoleName] = useState('Admin');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const currentRole = roles.find(r => r.name === selectedRoleName) || roles[0];

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'departments', label: 'Departments', icon: Layers },
    { id: 'payroll', label: 'Payroll Center', icon: Settings },
    { id: 'holidays', label: 'Holidays', icon: Settings },
    { id: 'benefits', label: 'Benefits', icon: Settings },
    { id: 'ai', label: 'AI Center', icon: Settings },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: Layout },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const actions = ['view', 'create', 'edit', 'delete', 'approve', 'manage'];

  const handleUpdatePermissions = () => {
     showToast(`${currentRole.name} permissions matrix updated successfully`);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in relative focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Roles & Permissions</h1>
          <p className="text-slate-500 font-medium tracking-tight">Granular access control and permission management for all platform roles</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Copy size={18} />
            <span>Clone Role</span>
          </button>
          <button 
            onClick={() => {
                setRoleToEdit(null);
                setIsRoleModalOpen(true);
            }}
            className="btn-primary px-8 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Create Custom Role</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
         {/* Roles Sidebar List */}
         <div className="lg:col-span-4 space-y-6">
            <div className="card p-8 bg-white border-none shadow-soft">
               <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-6 px-2">Platform Roles</h3>
               <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.id} className="relative group/role">
                        <button
                            onClick={() => setSelectedRoleName(role.name)}
                            className={cn(
                                "w-full p-5 rounded-[2rem] text-left transition-all border group flex items-center justify-between",
                                selectedRoleName === role.name 
                                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                                : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200 shadow-sm"
                            )}
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <ShieldCheck size={18} className={cn(selectedRoleName === role.name ? "text-primary-400" : "text-slate-300")} />
                                    <span className="text-base font-bold tracking-tight truncate">{role.name}</span>
                                    {role.isCustom && <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded">Custom</span>}
                                </div>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest", selectedRoleName === role.name ? "text-white/40" : "text-slate-400")}>
                                    {users.filter(u => u.role === role.name).length} Active Users
                                </p>
                            </div>
                            <ChevronRight size={18} className={cn("shrink-0", selectedRoleName === role.name ? "text-white/30" : "text-slate-200")} />
                        </button>
                        
                        {role.isCustom && (
                            <div className="absolute top-1/2 -translate-y-1/2 -left-12 opacity-0 group-hover/role:opacity-100 transition-opacity flex flex-col gap-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRoleToEdit(role);
                                        setIsRoleModalOpen(true);
                                    }}
                                    className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-primary-600 shadow-sm"
                                >
                                    <Edit3 size={14} />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRoleToDelete(role);
                                    }}
                                    className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-rose-600 shadow-sm"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                  ))}
               </div>
            </div>

            <div className="card p-8 bg-primary-50 border border-primary-100 shadow-soft relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                  <Info size={100} />
               </div>
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-600 mb-6">Pro Tip</h3>
               <p className="text-sm font-medium text-slate-600 leading-relaxed relative z-10">Assign minimum necessary permissions to maintain a secure system architecture. Changes to roles apply to all associated users instantly.</p>
            </div>
         </div>

         {/* Permissions Matrix */}
         <div className="lg:col-span-8 space-y-6">
            <div className="card p-0 bg-white border-none shadow-soft overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg transform -rotate-3">
                        <LockKeyhole size={22} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{selectedRoleName} Permissions Matrix</h3>
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mt-1">Configure module access & capabilities</p>
                     </div>
                  </div>
                  <button 
                    onClick={handleUpdatePermissions}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95"
                  >
                     <Save size={18} />
                     <span>Update Matrix</span>
                  </button>
               </div>

               <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Module / Capability</th>
                           {actions.map((action) => (
                              <th key={action} className="px-4 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center capitalize">
                                 {action}
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {modules.map((mod) => (
                           <tr key={mod.id} className="group hover:bg-slate-50/30 transition-colors">
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                       <mod.icon size={16} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 tracking-tight">{mod.label}</span>
                                 </div>
                              </td>
                              {actions.map((act) => {
                                 const isAllowed = (currentRole.permissions[mod.id] || []).includes(act);
                                 return (
                                    <td key={act} className="px-4 py-6 text-center">
                                       <div className="flex items-center justify-center">
                                          <input 
                                             type="checkbox" 
                                             checked={isAllowed}
                                             onChange={() => {
                                                 const currentPerms = currentRole.permissions[mod.id] || [];
                                                 const updatedPerms = isAllowed 
                                                    ? currentPerms.filter(p => p !== act)
                                                    : [...currentPerms, act];
                                                 
                                                 updateRole(currentRole.id, {
                                                     permissions: {
                                                         ...currentRole.permissions,
                                                         [mod.id]: updatedPerms
                                                     }
                                                 });
                                             }}
                                             className={cn(
                                                "w-5 h-5 rounded-lg appearance-none cursor-pointer border-2 transition-all",
                                                isAllowed 
                                                ? "bg-primary-600 border-primary-600 shadow-md shadow-primary-100 checked:after:content-['✓'] after:flex after:items-center after:justify-center after:text-white after:text-[10px] after:font-black" 
                                                : "border-slate-100 bg-white hover:border-primary-300"
                                             )}
                                          />
                                       </div>
                                    </td>
                                 );
                              })}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="flex items-center justify-between p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
               <div>
                  <h4 className="text-base font-extrabold text-slate-900 tracking-tight mb-1">Advanced Security Controls</h4>
                  <p className="text-xs font-medium text-slate-400 tracking-tight">Manage IP whitelisting and session persistence for this role.</p>
               </div>
               <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-bold hover:shadow-md transition-all uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-amber-500" />
                  Advanced Settings
               </button>
            </div>
         </div>
      </div>

      <RoleModal 
        isOpen={isRoleModalOpen}
        onClose={() => {
            setIsRoleModalOpen(false);
            setRoleToEdit(null);
        }}
        roleToEdit={roleToEdit}
      />

      <ConfirmDialog 
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        onConfirm={() => deleteRole(roleToDelete.id)}
        title="Delete Custom Role"
        message={`Are you sure you want to delete the ${roleToDelete?.name} role? This will affect all assigned users and may result in loss of access.`}
      />
    </div>
  );
};

export default RolesPermissions;

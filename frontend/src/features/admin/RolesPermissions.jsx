import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
   Trash2,
   LayoutDashboard,
   Building2,
   CreditCard,
   Calendar,
   CalendarDays,
   Bot,
   Scale,
   Plug,
   Receipt,
   FileSearch,
   BarChart2,
   Briefcase,
   GitMerge,
   UserCheck,
   MessageSquare,
   Clock,
   CheckSquare,
   Target,
   ClipboardList,
   Star,
   User,
   Gift,
   BookOpen,
   Bell,
   Edit3
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import RoleModal from '../../shared/components/admin/RoleModal';
import ConfirmDialog from '../../shared/components/admin/ConfirmDialog';

const ROLE_MODULES = {
   admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'org_setup', label: 'Org Setup', icon: Building2 },
      { id: 'departments', label: 'Departments', icon: Building2 },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'roles_permissions', label: 'Roles & Permissions', icon: ShieldCheck },
      { id: 'payroll_center', label: 'Payroll Center', icon: CreditCard },
      { id: 'holidays', label: 'Holidays', icon: CalendarDays },
      { id: 'benefits_config', label: 'Benefits Config', icon: Gift },
      { id: 'ai_center', label: 'AI Center', icon: Bot },
      { id: 'compliance', label: 'Compliance', icon: Scale },
      { id: 'integrations', label: 'Integrations', icon: Plug },
      { id: 'billing', label: 'Billing', icon: Receipt },
      { id: 'audit_logs', label: 'Audit Logs', icon: FileSearch },
      { id: 'reports', label: 'Reports', icon: BarChart2 },
      { id: 'settings', label: 'Settings', icon: Settings },
   ],
   hr: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'job_posts', label: 'Job Posts', icon: Briefcase },
      { id: 'candidates', label: 'Candidates', icon: Users },
      { id: 'interviews', label: 'Interviews', icon: Calendar },
      { id: 'hiring_pipeline', label: 'Hiring Pipeline', icon: GitMerge },
      { id: 'offer_management', label: 'Offer Management', icon: FileText },
      { id: 'onboarding', label: 'Onboarding', icon: UserCheck },
      { id: 'reports', label: 'Reports', icon: BarChart2 },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
   ],
   manager: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'team_members', label: 'Team Members', icon: Users },
      { id: 'attendance_review', label: 'Attendance Review', icon: Clock },
      { id: 'leave_approval', label: 'Leave Approval', icon: CheckSquare },
      { id: 'kpi_tracking', label: 'KPI Tracking', icon: Target },
      { id: 'tasks', label: 'Tasks', icon: ClipboardList },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'reports', label: 'Reports', icon: BarChart2 },
   ],
   employee: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'attendance', label: 'Attendance', icon: Clock },
      { id: 'leave', label: 'Leave', icon: CalendarDays },
      { id: 'payroll', label: 'Payroll', icon: CreditCard },
      { id: 'benefits', label: 'Benefits', icon: Gift },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'performance', label: 'Performance', icon: Activity },
      { id: 'help_desk', label: 'Help Desk', icon: BookOpen },
   ],
   candidate: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'browse_jobs', label: 'Browse Jobs', icon: Briefcase },
      { id: 'my_applications', label: 'My Applications', icon: ClipboardList },
      { id: 'resume_builder', label: 'Resume Builder', icon: FileText },
      { id: 'ai_resume_score', label: 'AI Resume Score', icon: Star },
      { id: 'interview_schedule', label: 'Interview Schedule', icon: Calendar },
      { id: 'notifications', label: 'Notifications', icon: Bell },
   ]
};

const getModulesForRole = (roleName) => {
   const normalized = (roleName || '').toLowerCase();
   if (normalized.includes('admin')) return ROLE_MODULES.admin;
   if (normalized.includes('hr')) return ROLE_MODULES.hr;
   if (normalized.includes('manager')) return ROLE_MODULES.manager;
   if (normalized.includes('candidate')) return ROLE_MODULES.candidate;
   return ROLE_MODULES.employee;
};

const RolesPermissions = () => {
   const { roles, users, deleteRole, updateRole, showToast } = useAdmin();
   const { pathname } = useLocation();

   const isAdminPanel = pathname.startsWith('/admin');
   const displayRoles = isAdminPanel ? roles.filter(r => r.name !== 'Admin') : roles;

   const [selectedRoleName, setSelectedRoleName] = useState(isAdminPanel ? 'Manager' : 'Admin');
   const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
   const [roleToEdit, setRoleToEdit] = useState(null);
   const [roleToDelete, setRoleToDelete] = useState(null);

   const currentRole = displayRoles.find(r => r.name === selectedRoleName) || displayRoles[0];

   const modules = getModulesForRole(currentRole?.name);

   const actions = ['view', 'create', 'edit', 'delete', 'approve', 'manage'];

   const [isSavingMatrix, setIsSavingMatrix] = useState(false);

   const handleUpdatePermissions = () => {
      setIsSavingMatrix(true);
      setTimeout(() => {
         setIsSavingMatrix(false);
         showToast(`${currentRole.name} permissions matrix updated and synced company-wide!`, 'success');
      }, 600);
   };

   return (
      <div className="space-y-8 pb-12 animate-fade-in relative focus:outline-none text-left">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Roles & Permissions</h1>
               <p className="text-slate-500 font-medium tracking-tight">Granular access control and permission management for all platform roles</p>
            </div>
            {isAdminPanel && (
               <div className="flex items-center gap-3">
                  <button
                     onClick={() => {
                        setRoleToEdit(null);
                        setIsRoleModalOpen(true);
                     }}
                     className="btn-primary px-8 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200 cursor-pointer"
                  >
                     <Plus size={18} />
                     <span>Create Custom Role</span>
                  </button>
               </div>
            )}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
            {/* Roles Sidebar List */}
            <div className="lg:col-span-4 space-y-6">
               <div className="card p-8 bg-white dark:bg-slate-900 border-none shadow-soft">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-6 px-2">Platform Roles</h3>
                  <div className="space-y-3">
                     {displayRoles.map((role) => (
                        <div key={role.id} className="relative group/role">
                           <button
                              onClick={() => setSelectedRoleName(role.name)}
                              className={cn(
                                 "w-full p-5 rounded-[2rem] text-left transition-all border group flex items-center justify-between cursor-pointer",
                                 selectedRoleName === role.name
                                    ? "bg-slate-900 dark:bg-slate-800 border-slate-900 dark:border-slate-700 text-white shadow-xl shadow-slate-200 dark:shadow-none"
                                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm",
                                 role.isCustom && "pr-24"
                              )}
                           >
                              <div className="flex-1 min-w-0 pr-4">
                                 <div className="flex items-center gap-3 mb-1">
                                    <ShieldCheck size={18} className={cn(selectedRoleName === role.name ? "text-primary-450" : "text-slate-300 dark:text-slate-700")} />
                                    <span className="text-base font-bold tracking-tight truncate">{role.name}</span>
                                    {role.isCustom && <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded">Custom</span>}
                                 </div>
                                 <p className={cn("text-[10px] font-bold uppercase tracking-widest", selectedRoleName === role.name ? "text-white/40" : "text-slate-400")}>
                                    {users.filter(u => u.role === role.name).length} Active Users
                                 </p>
                              </div>
                              {!role.isCustom && (
                                 <ChevronRight size={18} className={cn("shrink-0", selectedRoleName === role.name ? "text-white/30" : "text-slate-200 dark:text-slate-850")} />
                              )}
                           </button>

                           {role.isCustom && (
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                 <button
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setRoleToEdit(role);
                                       setIsRoleModalOpen(true);
                                    }}
                                    className={cn(
                                       "p-2 rounded-xl border transition-all shadow-sm cursor-pointer",
                                       selectedRoleName === role.name
                                          ? "bg-slate-800 dark:bg-slate-700 border-slate-700 dark:border-slate-600 text-white/80 hover:text-white hover:bg-slate-700"
                                          : "bg-slate-50 border-slate-100 text-slate-400 hover:text-primary-600 hover:bg-white"
                                    )}
                                 >
                                    <Edit3 size={16} />
                                 </button>
                                 <button
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setRoleToDelete(role);
                                    }}
                                    className={cn(
                                       "p-2 rounded-xl border transition-all shadow-sm cursor-pointer",
                                       selectedRoleName === role.name
                                          ? "bg-slate-800 dark:bg-slate-700 border-slate-700 dark:border-slate-600 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 hover:border-rose-950/50"
                                          : "bg-slate-50 border-slate-100 text-slate-450 hover:text-rose-600 hover:bg-white"
                                    )}
                                 >
                                    <Trash2 size={16} />
                                 </button>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Permissions Matrix */}
            <div className="lg:col-span-8 space-y-6">
               <div className="card p-0 bg-white dark:bg-slate-900 border-none shadow-soft overflow-hidden">
                  <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/10 dark:bg-slate-800/10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-lg transform -rotate-3">
                           <LockKeyhole size={22} />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{selectedRoleName} Permissions Matrix</h3>
                           <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mt-1">Configure module access & capabilities</p>
                        </div>
                     </div>
                     <button
                        onClick={handleUpdatePermissions}
                        disabled={isSavingMatrix}
                        className={cn(
                           "flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95 cursor-pointer",
                           isSavingMatrix && "opacity-80 cursor-not-allowed scale-95"
                        )}
                     >
                        {isSavingMatrix ? (
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                           <Save size={18} />
                        )}
                        <span>{isSavingMatrix ? 'Updating...' : 'Update'}</span>
                     </button>
                  </div>

                  <div className="p-0 overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                              <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Module / Capability</th>
                              {actions.map((action) => (
                                 <th key={action} className="px-4 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] text-center capitalize">
                                    {action}
                                 </th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                           {modules.map((mod) => (
                              <tr key={mod.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors">
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                          <mod.icon size={16} />
                                       </div>
                                       <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight">{mod.label}</span>
                                    </div>
                                 </td>
                                 {actions.map((act) => {
                                    const isAllowed = (currentRole.permissions[mod.id] || []).includes(act);
                                    return (
                                       <td key={act} className="px-4 py-6 text-center">
                                          <div className="flex items-center justify-center">
                                             <button
                                                onClick={() => {
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
                                                   "w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all active:scale-95 cursor-pointer",
                                                   isAllowed
                                                      ? "bg-primary-600 border-primary-600 shadow-lg shadow-primary-200 text-white"
                                                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300"
                                                )}
                                             >
                                                {isAllowed && <Check size={14} strokeWidth={3} />}
                                             </button>
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

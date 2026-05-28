import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  Mail, 
  ShieldCheck, 
  X, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  UserPlus, 
  Send, 
  Ban, 
  CheckCircle2, 
  Briefcase, 
  Phone, 
  Calendar,
  Lock,
  RotateCcw,
  Zap,
  MapPin,
  ChevronRight,
  UserCircle,
  Eye,
  FileText,
  Activity
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import UserModal from '../../components/admin/UserModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const Users = () => {
  const { 
    users, 
    departments, 
    roles, 
    deleteUser, 
    updateUser, 
    bulkUpdateUsersStatus, 
    bulkDeleteUsers,
    showToast 
  } = useAdmin();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [deptFilter, setDeptFilter] = useState('All Depts');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('name');
  
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToView, setUserToView] = useState(null);

  // Derived Data
  const stats = [
    { label: 'Total Users', value: users.length, icon: UsersIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Now', value: users.filter(u => u.status === 'Active').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Invites', value: users.filter(u => u.status === 'Pending').length, icon: Send, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const filteredUsers = useMemo(() => {
    return users
      .filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             u.empId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
        const matchesDept = deptFilter === 'All Depts' || u.department === deptFilter;
        const matchesStatus = statusFilter === 'All Status' || u.status === statusFilter;
        return matchesSearch && matchesRole && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'role') return a.role.localeCompare(b.role);
        if (sortBy === 'status') return a.status.localeCompare(b.status);
        return 0;
      });
  }, [users, searchTerm, roleFilter, deptFilter, statusFilter, sortBy]);

  // Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
        bulkDeleteUsers(selectedUsers);
        setSelectedUsers([]);
      }
    } else if (action === 'activate') {
      bulkUpdateUsersStatus(selectedUsers, 'Active');
      setSelectedUsers([]);
    } else if (action === 'deactivate') {
      bulkUpdateUsersStatus(selectedUsers, 'Inactive');
      setSelectedUsers([]);
    }
  };

  return (
    <div className="space-y-8 pb-32 animate-fade-in focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-medium tracking-tight">Oversee platform access, assign roles and configure workforce identities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button 
            onClick={() => {
              setUserToEdit(null);
              setIsAddUserOpen(true);
            }}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <UserPlus size={18} />
             <span>Add User</span>
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

      {/* Control Bar */}
      <div className="card p-6 border-none bg-white shadow-soft space-y-6">
         <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative flex-1 w-full text-slate-400">
                <Search className="absolute left-3 top-3" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, email or employee ID..." 
                    className="input-field pl-10 h-11" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <select 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
                >
                    <option>All Roles</option>
                    {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                </select>
                <select 
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
                >
                    <option>All Depts</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
                >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                </select>
                <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
                    <Filter size={18} />
                </button>
            </div>
         </div>

         {/* Bulk Actions Bar */}
         {selectedUsers.length > 0 && (
            <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex items-center justify-between"
            >
               <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-primary-600 uppercase tracking-widest">{selectedUsers.length} Selected</span>
                  <div className="h-4 w-px bg-primary-200"></div>
                  <div className="flex items-center gap-2">
                     <button onClick={() => handleBulkAction('activate')} className="p-2 text-primary-600 hover:bg-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">Bulk Activate</button>
                     <button onClick={() => handleBulkAction('deactivate')} className="p-2 text-amber-600 hover:bg-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">Bulk Deactivate</button>
                     <button onClick={() => handleBulkAction('delete')} className="p-2 text-rose-600 hover:bg-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">Bulk Delete</button>
                  </div>
               </div>
               <button onClick={() => setSelectedUsers([])} className="text-primary-400 hover:text-primary-600"><X size={18} /></button>
            </motion.div>
         )}
      </div>

      {/* User Table */}
      <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5">
                         <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded-md accent-primary-600 cursor-pointer"
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={handleSelectAll}
                         />
                     </th>
                     <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Employee Info</th>
                     <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Role / Dept</th>
                     <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Last Login</th>
                     <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Status</th>
                     <th className="px-8 py-5 text-right text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 text-sm">
                  {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                     <tr key={user.id} className={cn("group hover:bg-slate-50/20 transition-colors", selectedUsers.includes(user.id) && "bg-slate-50/50")}>
                        <td className="px-8 py-6">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded-md accent-primary-600 cursor-pointer"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                            />
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <img src={user.img} alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                              <div>
                                 <p className="font-bold text-slate-900 leading-none">{user.name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className="font-bold text-slate-700 leading-none">{user.role}</p>
                           <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest leading-none">{user.department}</p>
                        </td>
                        <td className="px-8 py-6 text-center text-xs font-bold text-slate-600">
                           {user.lastLogin}
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className={cn(
                              "px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                              user.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              user.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                              "bg-slate-100 text-slate-400 border-slate-200"
                           )}>
                              {user.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setUserToView(user)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                                title="View Profile"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                   setUserToEdit(user);
                                   setIsAddUserOpen(true);
                                }}
                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all" 
                                title="Edit"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                    if (user.status === 'Active') {
                                        updateUser(user.id, { status: 'Inactive' });
                                    } else {
                                        updateUser(user.id, { status: 'Active' });
                                    }
                                }}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    user.status === 'Active' ? "text-rose-500 hover:bg-rose-50" : "text-emerald-500 hover:bg-emerald-50"
                                )}
                                title={user.status === 'Active' ? "Deactivate" : "Activate"}
                              >
                                {user.status === 'Active' ? <Ban size={18} /> : <CheckCircle2 size={18} />}
                              </button>
                              <button 
                                onClick={() => setUserToDelete(user)}
                                className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" 
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                           </div>
                           <button className="p-2 text-slate-400 group-hover:hidden transition-all"><MoreVertical size={18} /></button>
                        </td>
                     </tr>
                  )) : (
                    <tr>
                        <td colSpan="6" className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                    <UsersIcon size={32} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">No users found</p>
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

      {/* Profile Viewer Drawer */}
      <AnimatePresence>
        {userToView && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUserToView(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] bg-white shadow-2xl z-[160] flex flex-col rounded-3xl overflow-hidden"
            >
               <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-slate-900">User Profile</h3>
                  <button onClick={() => setUserToView(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400"><X size={24} /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-10">
                  <div className="flex flex-col items-center text-center">
                    <img src={userToView.img} className="w-32 h-32 rounded-[2.5rem] object-cover ring-8 ring-slate-50 shadow-xl" alt="" />
                    <h2 className="text-2xl font-black text-slate-900 mt-6">{userToView.name}</h2>
                    <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mt-1">{userToView.role}</p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <div className="px-4 py-2 bg-slate-50 rounded-2xl flex items-center gap-2 border border-slate-100">
                            <Mail size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-600">{userToView.email}</span>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 rounded-2xl flex items-center gap-2 border border-slate-100">
                            <Phone size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-600">{userToView.phone}</span>
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {[
                        { label: 'Employee ID', val: userToView.empId, icon: FileText },
                        { label: 'Department', val: userToView.department, icon: Briefcase },
                        { label: 'Joining Date', val: userToView.joinDate, icon: Calendar },
                        { label: 'Employment', val: userToView.empType, icon: UserCircle },
                        { label: 'Manager', val: userToView.manager, icon: UsersIcon },
                        { label: 'Last Login', val: userToView.lastLogin, icon: Activity },
                     ].map((item, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                              <item.icon size={12} />
                              {item.label}
                           </div>
                           <p className="text-sm font-bold text-slate-800">{item.val}</p>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Recent Activity Timeline
                     </h4>
                     <div className="space-y-6 pl-2 border-l border-slate-100 ml-1">
                        {[
                           { text: 'Profile updated by Admin', time: '2h ago' },
                           { text: 'Logged in from New Device (San Jose, CA)', time: 'Yesterday, 10:45 AM' },
                           { text: 'Department assigned: Engineering', time: 'Oct 12, 2024' },
                        ].map((act, i) => (
                           <div key={i} className="relative pl-6">
                              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-slate-200 ring-4 ring-white"></div>
                              <p className="text-sm font-bold text-slate-700">{act.text}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{act.time}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               
               <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-3">
                  <button 
                    onClick={() => {
                        setUserToEdit(userToView);
                        setUserToView(null);
                        setIsAddUserOpen(true);
                    }}
                    className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200"
                  >
                    Edit Profile
                  </button>
                  <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold"><MoreVertical size={20} /></button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <UserModal 
        isOpen={isAddUserOpen} 
        onClose={() => {
            setIsAddUserOpen(false);
            setUserToEdit(null);
        }}
        userToEdit={userToEdit}
      />

      <ConfirmDialog 
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => deleteUser(userToDelete.id)}
        title="Delete User"
        message={`Are you sure you want to remove ${userToDelete?.name}? This action cannot be undone and will revoke all access instantly.`}
      />
    </div>
  );
};

export default Users;

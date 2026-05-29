import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Cpu,
  ChevronDown,
  Home,
  Users,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { sidebarConfig } from '../../data/sidebarConfig';
import { cn } from '../../utils/cn';

const Sidebar = ({ collapsed, setCollapsed, allRoles }) => {
  const { user, logout } = useAuth();
  const isSuperAdmin = user?.role?.toLowerCase() === 'superadmin';
  const showAll = allRoles || isSuperAdmin;
  const baseItems = sidebarConfig[user?.role] || [];

  const [expandedGroups, setExpandedGroups] = useState({
    'Super Admin': true,
    'Candidate Modules': false,
    'HR Modules': false,
    'Employee Modules': false,
    'Manager Modules': false,
    'Admin Modules': false,
  });

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  let roleItems = [];
  if (showAll) {
    // 1. Super Admin Section (Home base)
    roleItems.push({
      group: 'Super Admin',
      items: [
        { label: 'SuperAdmin Dashboard', icon: Home, path: '/superadmin/dashboard' },
        { label: 'User Management', icon: Users, path: '/superadmin/users' },
        { label: 'Role Management', icon: ShieldCheck, path: '/superadmin/roles' },
        { label: 'Department Management', icon: Building2, path: '/superadmin/departments' },
      ]
    });
    
    // 2. Admin Section
    const adminItems = (sidebarConfig.admin || [])
      .filter(item => item.label !== 'Dashboard' && !item.path?.endsWith('dashboard'))
      .filter(item => item.path !== '/admin/settings')
      .map(item => ({ ...item }));
    if (adminItems.length > 0) {
      roleItems.push({
        group: 'Admin Modules',
        items: adminItems
      });
    }

    // 3. Candidate Section
    const candidateItems = (sidebarConfig.candidate || [])
      .filter(item => item.label !== 'Dashboard' && !item.path?.endsWith('dashboard'))
      .map(item => ({ ...item }));
    if (candidateItems.length > 0) {
      roleItems.push({
        group: 'Candidate Modules',
        items: candidateItems
      });
    }
    
    // 4. Employee Section
    const employeeItems = (sidebarConfig.employee || [])
      .filter(item => item.label !== 'Dashboard' && !item.path?.endsWith('dashboard'))
      .filter(item => item.path !== '/employee/profile')
      .map(item => ({ ...item }));
    if (employeeItems.length > 0) {
      roleItems.push({
        group: 'Employee Modules',
        items: employeeItems
      });
    }

    // 5. HR Section
    const hrItems = (sidebarConfig.hr || [])
      .filter(item => item.label !== 'Dashboard' && !item.path?.endsWith('dashboard'))
      .map(item => ({ ...item }));
    if (hrItems.length > 0) {
      roleItems.push({
        group: 'HR Modules',
        items: hrItems
      });
    }
    
    // 6. Manager Section
    const managerItems = (sidebarConfig.manager || [])
      .filter(item => item.label !== 'Dashboard' && !item.path?.endsWith('dashboard'))
      .map(item => ({ ...item }));
    if (managerItems.length > 0) {
      roleItems.push({
        group: 'Manager Modules',
        items: managerItems
      });
    }
  } else {
    roleItems = baseItems;
  }

  const MenuItem = ({ item, isCollapsed }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => 
          cn(
            "sidebar-item group relative",
            isActive && "sidebar-item-active",
            isCollapsed && "justify-center px-2"
          )
        }
      >
        <Icon size={20} className={cn("shrink-0", !isCollapsed && "mr-1")} />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
        
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {item.label}
          </div>
        )}
      </NavLink>
    );
  };

  const GroupTitle = ({ title, isCollapsed }) => {
    if (isCollapsed) return <div className="h-px bg-slate-200 dark:bg-slate-800 my-4 mx-2" />;
    return (
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 shadow-sm transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-[260px]"
      )}
    >
      {/* Logo Section */}
      <div className={cn("p-6 flex items-center gap-3", collapsed ? "justify-center" : "justify-start")}>
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-200">
          <Cpu className="text-white" size={20} />
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight text-slate-800 dark:text-white"
          >
            HCM<span className="text-primary-600">.ai</span>
          </motion.span>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 py-4">
        {roleItems.map((item, index) => {
          if (item.group) {
            const isExpanded = expandedGroups[item.group] ?? true;
            return (
              <div key={index} className="space-y-1">
                <div 
                  onClick={() => !collapsed && toggleGroup(item.group)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer select-none group/title transition-all duration-150 mt-4 first:mt-0",
                    collapsed && "cursor-default hover:bg-transparent"
                  )}
                >
                  <GroupTitle title={item.group} isCollapsed={collapsed} />
                  {!collapsed && (
                    <ChevronDown 
                      size={14} 
                      className={cn(
                        "text-slate-400 group-hover/title:text-slate-600 dark:group-hover/title:text-slate-300 transition-transform duration-200",
                        isExpanded ? "transform rotate-0" : "transform -rotate-90"
                      )} 
                    />
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="space-y-1 overflow-hidden"
                    >
                      {item.items.map((subItem, idx) => (
                        <MenuItem key={idx} item={subItem} isCollapsed={collapsed} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return <MenuItem key={index} item={item} isCollapsed={collapsed} />;
        })}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className={cn(
          "flex items-center gap-3 p-2",
          collapsed ? "justify-center" : "justify-start"
        )}>
          {!collapsed && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
              <div className="flex items-center gap-2">
                <div className="px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/30 text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase">
                   {user?.role}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className={cn(
              "p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors group relative",
              !collapsed && "flex items-center gap-2 w-fit px-3"
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-sm transition-colors z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;

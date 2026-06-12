import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Settings, 
  User, 
  LogOut,
  Plus,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { cn } from '../../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const getMockNotifications = (role) => {
    switch (role?.toLowerCase()) {
      case 'employee':
        return [
          { id: 1, title: 'Payroll Processed', message: 'Your payout sheet for June 2026 is ready.', time: '2 hours ago', type: 'success', unread: true },
          { id: 2, title: 'Benefits Enrollment', message: 'Platinum Health insurance enrollment ends this Friday.', time: '1 day ago', type: 'info', unread: true },
          { id: 3, title: 'Performance Review', message: 'Your Q2 self-evaluation review form is pending.', time: '2 days ago', type: 'warning', unread: false }
        ];
      case 'manager':
        return [
          { id: 1, title: 'Leave Approval Pending', message: 'Bob Marley requested 3 days of sick leave.', time: '1 hour ago', type: 'warning', unread: true },
          { id: 2, title: 'Team Performance Review', message: 'Review completion deadline for your team is in 5 days.', time: '6 hours ago', type: 'info', unread: true },
          { id: 3, title: 'Task Completed', message: 'Diana Ross completed task "Onboard engineers".', time: '1 day ago', type: 'success', unread: false }
        ];
      case 'hr':
      case 'recruiter':
        return [
          { id: 1, title: 'New Job Candidate', message: 'Diana Ross applied for Senior Frontend Developer.', time: '15 mins ago', type: 'success', unread: true },
          { id: 2, title: 'Interview Confirmation', message: 'Interview scheduled with Alice Cooper tomorrow at 10 AM.', time: '4 hours ago', type: 'info', unread: true },
          { id: 3, title: 'Offer Letter Signed', message: 'John Wick accepted the Principal Security Engineer offer.', time: '2 days ago', type: 'success', unread: false }
        ];
      case 'superadmin':
      case 'admin':
      default:
        return [
          { id: 1, title: 'Ecosystem Audit Logs', message: 'Backup snapshots successfully verified at UTC 04:00.', time: '1 hour ago', type: 'success', unread: true },
          { id: 2, title: 'System Security Patch', message: 'Global security protocol v4.2 applied successfully.', time: '4 hours ago', type: 'warning', unread: true },
          { id: 3, title: 'API Sync Completed', message: 'Google Workspace database sync is operational.', time: '1 day ago', type: 'info', unread: false }
        ];
    }
  };

  useEffect(() => {
    if (user) {
      setNotifications(getMockNotifications(user.role));
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationsDropdown(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowProfileDropdown(false);
        setShowNotificationsDropdown(false);
        setShowLogoutModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(false);
    if (user?.role === 'employee') navigate('/employee/profile');
    else navigate(`/${user?.role || 'admin'}/profile`);
  };

  const handleSettingsClick = () => {
    setShowProfileDropdown(false);
    navigate(`/${user?.role || 'admin'}/settings`);
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center justify-between h-full px-4 sm:px-8">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            >
              <Bell size={20} />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotificationsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Notifications</span>
                     {notifications.filter(n => n.unread).length > 0 && (
                       <button onClick={markAllRead} className="text-xs text-primary-600 hover:text-primary-700 font-bold hover:underline">
                         Mark all read
                       </button>
                     )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(note => (
                        <div 
                          key={note.id} 
                          onClick={() => toggleRead(note.id)}
                          className={cn(
                            "px-4 py-3 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex gap-3 items-start transition-all",
                            note.unread && "bg-primary-50/20 dark:bg-primary-950/10"
                          )}
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-1.5 shrink-0",
                            note.unread ? "bg-primary-500" : "bg-transparent"
                          )} />
                          <div className="flex-1 text-left">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{note.title}</p>
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{note.message}</p>
                            <p className="text-[9px] font-medium text-slate-400 mt-1">{note.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-slate-400">
                        <Bell size={24} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-xs font-bold">No notifications</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between text-xs">
                     <button onClick={clearAll} className="text-slate-400 hover:text-rose-500 font-bold transition-colors">
                       Clear All
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <img 
                src={user?.avatar} 
                alt={user?.name} 
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-slate-100 dark:ring-slate-800"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">{user?.name}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1 capitalize">{user?.role}</p>
              </div>
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform", showProfileDropdown && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800">
                     <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user?.name}</p>
                     <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  
                  <div className="p-1">
                    <button onClick={handleProfileClick} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all">
                      <User size={16} />
                      <span>My Profile</span>
                    </button>
                    <button onClick={handleSettingsClick} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                  </div>
                  
                  <div className="p-1 border-t border-slate-50 dark:border-slate-800">
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowLogoutModal(true);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </header>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
         {showLogoutModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutModal(false)} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-slate-900 shadow-sm">
                     <LogOut size={28} className="translate-x-0.5" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Sign Out</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 px-4">Are you sure you want to sign out of your account?</p>
                  <div className="flex items-center gap-3">
                     <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 px-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">Cancel</button>
                     <button onClick={() => {
                        setShowLogoutModal(false);
                        logout();
                     }} className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200 dark:shadow-none">Sign Out</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

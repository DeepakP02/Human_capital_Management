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
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowProfileDropdown(false);
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

          <div className="relative">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Bell, 
  Monitor, 
  Clock, 
  Globe, 
  Lock, 
  Database, 
  Save, 
  RotateCcw, 
  ChevronRight, 
  Zap, 
  Info,
  Type,
  Palette,
  Eye,
  Key,
  Shield,
  History,
  CloudUpload,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAdmin } from '../../context/AdminContext';

const Settings = () => {
  const { appSettings, updateSettings, resetSettings, showToast } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');

  const menuItems = [
    { id: 'general', label: 'General', icon: Monitor },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'backup', label: 'Backup & Recovery', icon: Database },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-500 font-medium tracking-tight">Global platform preferences, security protocols and organization branding</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetSettings} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <RotateCcw size={18} />
            <span>Reset Defaults</span>
          </button>
          <button onClick={() => showToast('All configuration changes saved securely.')} className="btn-primary px-8 py-3 font-bold flex items-center gap-2 shadow-xl shadow-primary-200 active:scale-95 transition-transform">
             <Save size={18} />
             <span>Save All Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
         {/* Navigation Tab List */}
         <div className="lg:col-span-3 space-y-4">
            <div className="card p-4 bg-white border-none shadow-soft h-[500px]">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 p-4">Configuration Tabs</p>
               <nav className="space-y-2">
                  {menuItems.map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setActiveTab(item.id)}
                       className={cn(
                          "w-full group p-4 rounded-2xl transition-all text-left flex items-center justify-between",
                          activeTab === item.id 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                       )}
                     >
                        <div className="flex items-center gap-3">
                           <item.icon size={20} className={cn(activeTab === item.id ? "text-primary-400" : "text-slate-300")} />
                           <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        <ChevronRight size={16} className={cn("opacity-0 transition-opacity", activeTab === item.id ? "opacity-100" : "group-hover:opacity-40")} />
                     </button>
                  ))}
               </nav>
            </div>
         </div>

         {/* Settings Panel Area */}
         <div className="lg:col-span-9 space-y-8">
            {activeTab === 'general' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="card p-10 bg-white border-none shadow-soft space-y-10">
                     <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                           <Monitor size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">General Preferences</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">System Language</label>
                           <select value={appSettings.general.language} onChange={e => updateSettings('general', { language: e.target.value })} className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700">
                              <option>English (US) - Primary</option>
                              <option>Spanish (ES)</option>
                              <option>French (FR)</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Primary Timezone</label>
                           <div className="relative">
                              <Clock className="absolute left-4 top-4 text-slate-300" size={18} />
                              <select value={appSettings.general.timezone} onChange={e => updateSettings('general', { timezone: e.target.value })} className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700">
                                 <option>UTC-08:00 (Pacific Standard Time)</option>
                                 <option>UTC+00:00 (London)</option>
                              </select>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Date Format</label>
                           <select value={appSettings.general.dateFormat} onChange={e => updateSettings('general', { dateFormat: e.target.value })} className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700">
                              <option>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Default Multi-currency</label>
                           <div className="flex items-center gap-4 h-14 px-6 bg-slate-50 rounded-2xl border border-transparent cursor-pointer" onClick={() => updateSettings('general', { multiCurrency: !appSettings.general.multiCurrency })}>
                              <Zap size={18} className="text-amber-500 fill-amber-500 shrink-0" />
                              <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Convert at Current Spot Rate</span>
                              <input type="checkbox" checked={appSettings.general.multiCurrency} readOnly className="ml-auto w-5 h-5 rounded-lg accent-primary-600 cursor-pointer pointer-events-none" />
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'security' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="card p-10 bg-white border-none shadow-soft space-y-10">
                     <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                           <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Security & Authentication</h3>
                     </div>

                     <div className="space-y-8">
                        <div className="flex items-center justify-between p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent pointer-events-none" />
                           <div className="relative z-10 flex items-center gap-6">
                              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400 backdrop-blur-md shadow-lg border border-white/10">
                                 <Lock size={28} />
                              </div>
                              <div>
                                 <h4 className="text-lg font-extrabold text-white leading-none mb-2 tracking-tight">Two-Factor Auth (2FA)</h4>
                                 <p className="text-xs font-medium text-slate-400 tracking-tight">Enforce biometric or app-based authentication for all admin users.</p>
                              </div>
                           </div>
                           <div className="relative z-10" onClick={() => updateSettings('security', { twoFactor: !appSettings.security.twoFactor })}>
                              <div className={cn("w-14 h-7 rounded-full p-1 cursor-pointer shadow-lg custom-transition", appSettings.security.twoFactor ? "bg-emerald-500 shadow-emerald-500/20" : "bg-slate-700")}>
                                 <div className={cn("w-5 h-5 bg-white rounded-full custom-transition", appSettings.security.twoFactor ? "ml-auto" : "ml-0")} />
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password Policy</label>
                              <div className="space-y-4">
                                 {['Min 12 Characters', 'Mix of Alphanumeric', 'Must change every 90 days'].map((p, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <CheckCircle2 size={16} className="text-emerald-500" />
                                       <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{p}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6 flex flex-col justify-center">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Session Protocol</label>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm font-bold text-slate-900 tracking-tight">Auto-Logout Timeout</span>
                                 <select value={appSettings.security.sessionTimeout} onChange={e => updateSettings('security', { sessionTimeout: e.target.value })} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none">
                                    <option>15 Minutes</option>
                                    <option>30 Minutes</option>
                                    <option>1 Hour</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'branding' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="card p-10 bg-white border-none shadow-soft space-y-10">
                     <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
                        <div className="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl">
                           <Palette size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Custom Branding</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Organization Name</label>
                           <input type="text" value={appSettings.branding.brandName} onChange={e => updateSettings('branding', { brandName: e.target.value })} className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Primary Color HEX</label>
                           <input type="text" value={appSettings.branding.primaryColor} onChange={e => updateSettings('branding', { primaryColor: e.target.value })} className="input-field h-14 bg-slate-50 border-transparent font-bold text-slate-700" />
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'notifications' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="card p-10 bg-white border-none shadow-soft space-y-10">
                     <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                           <Bell size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Notification Rules</h3>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent cursor-pointer" onClick={() => updateSettings('notifications', { emailAlerts: !appSettings.notifications.emailAlerts })}>
                           <span className="text-sm font-bold text-slate-700">Email Alerts on Critical Activity</span>
                           <input type="checkbox" checked={appSettings.notifications.emailAlerts} readOnly className="w-5 h-5 rounded-lg accent-primary-600 cursor-pointer pointer-events-none" />
                        </div>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent cursor-pointer" onClick={() => updateSettings('notifications', { pushAlerts: !appSettings.notifications.pushAlerts })}>
                           <span className="text-sm font-bold text-slate-700">In-App Push Notifications</span>
                           <input type="checkbox" checked={appSettings.notifications.pushAlerts} readOnly className="w-5 h-5 rounded-lg accent-primary-600 cursor-pointer pointer-events-none" />
                        </div>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent cursor-pointer" onClick={() => updateSettings('notifications', { weeklyReports: !appSettings.notifications.weeklyReports })}>
                           <span className="text-sm font-bold text-slate-700">Send Weekly Summary Report</span>
                           <input type="checkbox" checked={appSettings.notifications.weeklyReports} readOnly className="w-5 h-5 rounded-lg accent-primary-600 cursor-pointer pointer-events-none" />
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'backup' && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="p-10 bg-indigo-50/50 rounded-[3rem] border border-indigo-100 border-dashed flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex items-center gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
                           <Database size={28} />
                        </div>
                        <div>
                           <h4 className="text-lg font-extrabold text-slate-900 leading-none mb-3 tracking-tight">Global System Backup</h4>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed tracking-tight max-w-sm">Last successful backup was at {appSettings.backup.lastBackup}. Automating every {appSettings.backup.frequency}.</p>
                        </div>
                     </div>
                     <button onClick={() => { updateSettings('backup', { lastBackup: 'Just now' }); showToast('Manual backup snapshot captured.'); }} className="px-5 py-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shrink-0">
                        <CloudUpload size={18} />
                        Trigger Sync
                     </button>
                  </div>
               </motion.div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Settings;

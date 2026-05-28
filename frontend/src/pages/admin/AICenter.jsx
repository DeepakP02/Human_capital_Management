import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
   Zap, Brain, Cpu, Search, Target, TrendingUp, MessageSquare, ShieldCheck,
   Settings, Activity, Play, BarChart3, Lightbulb, Sparkles, Bot, Terminal,
   Database, ArrowUpRight, MoreVertical, CheckCircle2, Sliders, PlayCircle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import AIModuleModal from '../../components/admin/AIModuleModal';
import TrainModelsModal from '../../components/admin/TrainModelsModal';
import LogsDrawer from '../../components/admin/LogsDrawer';
import ActionDropdown from '../../components/admin/ActionDropdown';

const AICenter = () => {
   const { aiModules, aiLogs, updateAiModule, showToast } = useAdmin();
   const [isTrainOpen, setIsTrainOpen] = useState(false);
   const [isLogsOpen, setIsLogsOpen] = useState(false);
   const [moduleToEdit, setModuleToEdit] = useState(null);
   const visualMap = {
      'Resume Screening': { icon: Search, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      'Attrition Prediction': { icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
      'Smart Hiring Suggestions': { icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      'AI Chat Assistant': { icon: MessageSquare, color: 'text-primary-600', bg: 'bg-primary-50' },
      'Performance Insights': { icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
      'Automated Job Posting': { icon: Lightbulb, color: 'text-indigo-600', bg: 'bg-indigo-50' },
   };

   return (
      <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-primary-100 text-primary-600 rounded-lg">
                     <Brain size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600">Enterprise AI Engine</span>
               </div>
               <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Center</h1>
               <p className="text-slate-500 font-medium tracking-tight">Manage and configure AI-powered automation across your HCM ecosystem</p>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => showToast('System Health checks passed.')} className="btn-secondary px-5 py-2.5 font-bold flex items-center gap-2">
                  <Activity size={18} />
                  <span className="hidden sm:inline">System Health</span>
               </button>
               <button onClick={() => setIsTrainOpen(true)} className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
                  <Bot size={18} fill="currentColor" />
                  <span>Train Models</span>
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
            {/* AI Module Grid */}
            <div className="lg:col-span-8 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {aiModules.map((mod) => {
                     const visuals = visualMap[mod.name] || { icon: Bot, color: 'text-slate-600', bg: 'bg-slate-50' };
                     const Icon = visuals.icon;
                     return (
                        <motion.div
                           key={mod.id}
                           whileHover={{ y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                           className="card p-8 bg-white border border-slate-100 shadow-soft group flex flex-col h-full"
                        >
                           <div className="flex items-center justify-between mb-8">
                              <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform", visuals.bg, visuals.color)}>
                                 <Icon size={28} />
                              </div>
                              <div className="flex flex-col items-end">
                                 <div className={cn(
                                    "px-2 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border mb-2 transition-colors",
                                    mod.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50" : "bg-slate-100 text-slate-400 border-slate-200"
                                 )}>
                                    {mod.status}
                                 </div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mod.confidence}% Precision</p>
                              </div>
                           </div>
                           <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-none">{mod.name}</h3>
                           <p className="text-xs font-medium text-slate-400 leading-relaxed tracking-tight flex-1">{mod.desc}</p>
                           <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                              <button onClick={() => setModuleToEdit(mod)} className="text-[10px] font-extrabold text-primary-600 uppercase tracking-widest flex items-center gap-2 group/btn hover:text-primary-700">
                                 Configure Rules <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </button>
                              <ActionDropdown
                                 actions={[
                                    { label: 'Configure Rules', icon: Sliders, onClick: () => setModuleToEdit(mod) },
                                    { label: mod.status === 'Active' ? 'Disable' : 'Enable', icon: Activity, onClick: () => updateAiModule(mod.id, { status: mod.status === 'Active' ? 'Inactive' : 'Active' }) },
                                    { label: 'View Analytics', icon: BarChart3, onClick: () => showToast(`Analytics loaded for ${mod.name}`) },
                                    { label: 'Test Module', icon: PlayCircle, onClick: () => showToast(`Test initiated for ${mod.name}`) }
                                 ]}
                              />
                           </div>
                        </motion.div>
                     )
                  })}
               </div>
            </div>

            {/* AI Activity & Global Config */}
            <div className="lg:col-span-4 space-y-8 flex flex-col h-full">
               <div className="card p-8 bg-slate-900 text-white border-none shadow-soft flex-1 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                     <Cpu size={120} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-400 mb-10">Real-time Inference</h3>
                  <div className="space-y-6">
                     {aiLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group/log">
                           <div className="flex items-center gap-3">
                              {log.type === 'In Progress' && <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />}
                              {log.type === 'Success' && <CheckCircle2 size={14} className="text-emerald-400" />}
                              <span className="text-xs font-bold text-slate-300">{log.label}</span>
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{log.type}</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 text-center">
                     <button onClick={() => setIsLogsOpen(true)} className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-white/5">View AI Logs</button>
                  </div>
               </div>

               <div className="card p-8 bg-white border-none shadow-soft">
                  <div className="flex items-center gap-3 mb-8">
                     <ShieldCheck size={20} className="text-emerald-500" />
                     <h3 className="text-lg font-bold text-slate-900">Ethics & Compliance</h3>
                  </div>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Bias Monitoring</span>
                        <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                           <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                        </div>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Data Privacy Shield</span>
                        <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                           <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                        </div>
                     </div>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 mt-8 leading-relaxed italic border-t border-slate-50 pt-6">All AI models are local-first and GDPR compliant. No PII is used for training without explicit consent.</p>
               </div>
            </div>
         </div>

         <AIModuleModal
            isOpen={!!moduleToEdit}
            onClose={() => setModuleToEdit(null)}
            module={moduleToEdit}
         />

         <TrainModelsModal
            isOpen={isTrainOpen}
            onClose={() => setIsTrainOpen(false)}
         />

         <LogsDrawer
            isOpen={isLogsOpen}
            onClose={() => setIsLogsOpen(false)}
         />
      </div>
   );
};

export default AICenter;

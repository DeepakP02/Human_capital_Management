import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Upload, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  CreditCard, 
  Clock, 
  Globe2, 
  Hash,
  Briefcase,
  Save,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../utils/cn';

const OrgSetup = () => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Organization Setup</h1>
          <p className="text-slate-500 font-medium tracking-tight">Configure core company information and regional preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
          <button className="btn-primary px-8 py-3 font-bold flex items-center gap-2 shadow-xl shadow-primary-200 active:scale-95 transition-transform">
             <Save size={18} />
             <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Form Area */}
         <div className="lg:col-span-8 space-y-8">
            <div className="card p-10 bg-white border-none shadow-soft">
               <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                     <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">General Information</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Company Name</label>
                     <div className="relative group">
                        <Building2 className="absolute left-4 top-4 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input type="text" placeholder="Global Tech Corp" className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Legal Name</label>
                     <input type="text" placeholder="Global Tech Corp International Ltd." className="input-field h-14 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Website URL</label>
                     <div className="relative group">
                        <Globe className="absolute left-4 top-4 text-slate-300 transition-colors" size={18} />
                        <input type="text" placeholder="https://globaltech.com" className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Industry</label>
                     <select className="input-field h-14 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700 appearance-none pr-10">
                        <option>Information Technology</option>
                        <option>Financial Services</option>
                        <option>Healthcare</option>
                        <option>Retail</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Company Size</label>
                     <select className="input-field h-14 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700">
                        <option>1-50 Employees</option>
                        <option>51-200 Employees</option>
                        <option>201-1000 Employees</option>
                        <option>1000+ Employees</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Tax ID / GSTIN</label>
                     <div className="relative group">
                        <Hash className="absolute left-4 top-4 text-slate-300 transition-colors" size={18} />
                        <input type="text" placeholder="US9882001X" className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Regional & Contact Settings */}
            <div className="card p-10 bg-white border-none shadow-soft">
               <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                     <Globe2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Regional & Contact Preferences</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Primary Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                        <input type="email" placeholder="admin@globaltech.com" className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Support Phone</label>
                     <div className="relative group">
                        <Phone className="absolute left-4 top-4 text-slate-300" size={18} />
                        <input type="text" placeholder="+1 (555) 000-0000" className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Default Timezone</label>
                     <div className="relative group">
                        <Clock className="absolute left-4 top-4 text-slate-300" size={18} />
                        <select className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700">
                           <option>UTC-08:00 (Pacific Time)</option>
                           <option>UTC+00:00 (GMT)</option>
                           <option>UTC+05:30 (India Standard Time)</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Currency</label>
                     <div className="relative group">
                        <CreditCard className="absolute left-4 top-4 text-slate-300" size={18} />
                        <select className="input-field h-14 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700">
                           <option>USD ($)</option>
                           <option>EUR (€)</option>
                           <option>INR (₹)</option>
                        </select>
                     </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Headquarters Address</label>
                     <div className="relative group">
                        <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                        <textarea className="input-field min-h-[100px] pl-12 py-4 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700 resize-none" placeholder="123 Tech Avenue, Silicon Valley, CA 94025, USA"></textarea>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar / Upload */}
         <div className="lg:col-span-4 space-y-8">
            <div className="card p-10 bg-white border-none shadow-soft flex flex-col items-center">
               <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-8 w-full">Company Logo</h3>
               <div className="w-40 h-40 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-6 group cursor-pointer hover:border-primary-100 hover:bg-primary-50/20 transition-all">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-300 group-hover:text-primary-600 transition-colors translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                     <Upload size={32} />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-6 text-center">Click or Drag to Upload</span>
               </div>
               <p className="text-[10px] font-medium text-slate-400 mt-6 text-center px-4 leading-relaxed tracking-tight italic">Preferred format: PNG or SVG (Max 5MB). Logo will be used in payslips and invoices.</p>
            </div>

            <div className="card p-8 bg-indigo-600 text-white border-none shadow-soft relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={160} />
               </div>
               <h3 className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary-300 mb-6">Setup Progress</h3>
               <div className="space-y-6 relative z-10">
                  {[
                     { label: 'Organization Profile', done: true },
                     { label: 'Branding & Identity', done: true },
                     { label: 'Regional Preferences', done: false },
                     { label: 'Billing Setup', done: false },
                  ].map((step, i) => (
                     <div key={i} className="flex items-center gap-4 group/step">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all group-hover/step:scale-110", step.done ? "bg-white border-white text-indigo-600 shadow-lg" : "border-white/20 text-white/40")}>
                           {step.done ? <CheckCircle2 size={14} /> : i+1}
                        </div>
                        <span className={cn("text-xs font-bold transition-opacity", step.done ? "text-white" : "text-white/40")}>{step.label}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrgSetup;

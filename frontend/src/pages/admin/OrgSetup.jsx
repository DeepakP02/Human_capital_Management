import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { saveOrgConfiguration } from '../../utils/apiService';
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
  CheckCircle2,
} from 'lucide-react';

const OrgSetup = () => {
  // Form data state
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    website: '',
    industry: 'Information Technology',
    companySize: '1-50 Employees',
    taxId: '',
    primaryEmail: '',
    supportPhone: '',
    timezone: 'UTC-08:00 (Pacific Time)',
    currency: 'USD ($)',
    address: '',
  });

  // Avatar / profile image state
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      legalName: '',
      website: '',
      industry: 'Information Technology',
      companySize: '1-50 Employees',
      taxId: '',
      primaryEmail: '',
      supportPhone: '',
      timezone: 'UTC-08:00 (Pacific Time)',
      currency: 'USD ($)',
      address: '',
    });
    setAvatarUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveOrgConfiguration(formData);
      console.log('Org configuration saved', response);
      alert('Organization configuration saved successfully!');
    } catch (error) {
      console.error('Error saving org config', error);
      alert('Failed to save organization configuration.');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <div className="max-w-[1000px] w-full max-h-[85vh] overflow-y-auto mx-auto bg-white rounded-lg shadow-lg p-6 animate-fade-in relative">
      {/* Header with avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <Upload size={24} />
            </div>
          )}
          {/* Online status indicator */}
          <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" title="Online"></span>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Organization Setup</h1>
          <p className="text-slate-500 font-medium tracking-tight">Configure core company information and regional preferences</p>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <label htmlFor="avatarUpload" className="px-4 py-2 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 cursor-pointer transition-colors">
            Upload Photo
            <input id="avatarUpload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
          {avatarUrl && (
            <button onClick={handleRemoveAvatar} className="px-3 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors">
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          onClick={handleReset}
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
        <button
          type="button"
          className="btn-primary px-8 py-3 font-bold flex items-center gap-2 shadow-xl shadow-primary-200 active:scale-95 transition-transform"
          onClick={handleSubmit}
        >
          <Save size={18} />
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-4">
          {/* General Information Card */}
          <div className="card p-6 bg-white border-none shadow-soft">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-50">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Building2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">General Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Company Name
                </label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Global Tech Corp"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Legal Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Legal Name
                </label>
                <input
                  type="text"
                  name="legalName"
                  placeholder="Global Tech Corp International Ltd."
                  className="input-field h-11 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                  value={formData.legalName}
                  onChange={handleChange}
                />
              </div>
              {/* Website URL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Website URL
                </label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors" size={18} />
                  <input
                    type="text"
                    name="website"
                    placeholder="https://globaltech.com"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Industry */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Industry
                </label>
                <select
                  name="industry"
                  className="input-field h-11 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700 appearance-none pr-10"
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option>Information Technology</option>
                  <option>Financial Services</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </div>
              {/* Company Size */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Company Size
                </label>
                <select
                  name="companySize"
                  className="input-field h-11 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                  value={formData.companySize}
                  onChange={handleChange}
                >
                  <option>1-50 Employees</option>
                  <option>51-200 Employees</option>
                  <option>201-1000 Employees</option>
                  <option>1000+ Employees</option>
                </select>
              </div>
              {/* Tax ID / GSTIN */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Tax ID / GSTIN
                </label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors" size={18} />
                  <input
                    type="text"
                    name="taxId"
                    placeholder="US9882001X"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.taxId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Regional & Contact Settings Card */}
          <div className="card p-6 bg-white border-none shadow-soft">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-50">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Globe2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Regional &amp; Contact Preferences</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Primary Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="email"
                    name="primaryEmail"
                    placeholder="admin@globaltech.com"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.primaryEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Support Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Support Phone
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text"
                    name="supportPhone"
                    placeholder="+1 (555) 000-0000"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.supportPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Default Timezone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Default Timezone
                </label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select
                    name="timezone"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.timezone}
                    onChange={handleChange}
                  >
                    <option>UTC-08:00 (Pacific Time)</option>
                    <option>UTC+00:00 (GMT)</option>
                    <option>UTC+05:30 (India Standard Time)</option>
                  </select>
                </div>
              </div>
              {/* Currency */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Currency
                </label>
                <div className="relative group">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select
                    name="currency"
                    className="input-field h-11 pl-12 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>INR (₹)</option>
                  </select>
                </div>
              </div>
              {/* Headquarters Address */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                  Headquarters Address
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                  <textarea
                    name="address"
                    className="input-field min-h-[80px] pl-12 py-3 bg-slate-50 border-transparent focus:bg-white font-bold text-slate-700 resize-none"
                    placeholder="123 Tech Avenue, Silicon Valley, CA 94025, USA"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Upload */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card p-6 bg-white border-none shadow-soft flex flex-col items-center">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 w-full">Company Logo</h3>
            <div className="w-32 h-32 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-4 group cursor-pointer hover:border-primary-100 hover:bg-primary-50/20 transition-all">
              <div className="p-3 bg-white rounded-xl shadow-sm text-slate-300 group-hover:text-primary-600 transition-colors translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <Upload size={24} />
              </div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-4 text-center">Click or Drag to Upload</span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 mt-4 text-center px-4 leading-relaxed tracking-tight italic">
              Preferred format: PNG or SVG (Max 5MB). Logo will be used in payslips and invoices.
            </p>
          </div>

          <div className="card p-6 bg-indigo-600 text-white border-none shadow-soft relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
              <CheckCircle2 size={140} />
            </div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary-300 mb-4">Setup Progress</h3>
            <div className="space-y-4 relative z-10">
              {[{ label: 'Organization Profile', done: true }, { label: 'Branding & Identity', done: true }, { label: 'Regional Preferences', done: false }, { label: 'Billing Setup', done: false }].map((step, i) => (
                <div key={i} className="flex items-center gap-3 group/step">
                  <div className={cn('w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all group-hover/step:scale-110 text-[10px]', step.done ? 'bg-white border-white text-indigo-600 shadow-lg' : 'border-white/20 text-white/40')}>
                    {step.done ? <CheckCircle2 size={12} /> : i + 1}
                  </div>
                  <span className={cn('text-xs font-bold transition-opacity', step.done ? 'text-white' : 'text-white/40')}>{step.label}</span>
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

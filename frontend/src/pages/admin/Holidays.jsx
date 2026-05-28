import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  CalendarDays, 
  Target, 
  MapPin, 
  Zap, 
  Globe,
  Globe2
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import HolidayModal from '../../components/admin/HolidayModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ActionDropdown from '../../components/admin/ActionDropdown';

const Holidays = () => {
  const { holidays, deleteHoliday, showToast } = useAdmin();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [holidayToEdit, setHolidayToEdit] = useState(null);
  const [holidayToDelete, setHolidayToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All Regions');

  const filteredHolidays = holidays.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All Regions' || h.region.includes(regionFilter);
    return matchesSearch && matchesRegion;
  });

  const upcomingHolidays = holidays.filter(h => h.status === 'Upcoming').length;
  
  const stats = [
    { label: 'Upcoming Holidays', value: upcomingHolidays, icon: CalendarDays, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Total in 2026', value: holidays.length, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Regional Packs', value: '3', icon: Globe2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in focus:outline-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Holiday Management</h1>
          <p className="text-slate-500 font-medium tracking-tight">Configure the corporate holiday calendar and synchronized regional events</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setHolidayToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="btn-primary px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
             <Plus size={18} />
             <span>Add Holiday</span>
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

      {/* Main List Area */}
      <div className="space-y-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="relative flex-1 w-full text-slate-400">
               <Search className="absolute left-3 top-3" size={18} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search holidays by name or region..." 
                 className="input-field pl-10 h-11 bg-white border-transparent shadow-sm" 
               />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
               <select 
                 value={regionFilter}
                 onChange={(e) => setRegionFilter(e.target.value)}
                 className="input-field h-11 pr-10 min-w-[140px] font-bold text-slate-600 bg-white shadow-sm border-none"
               >
                  <option>All Regions</option>
                  <option>Global</option>
                  <option>APAC</option>
                  <option>Europe</option>
                  <option>India</option>
                  <option>USA</option>
               </select>
               <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all h-11 w-11 flex items-center justify-center shrink-0">
                  <Download size={18} />
               </button>
            </div>
         </div>

         <div className="card p-0 border-none bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Holiday Name</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Date</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Type</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Region</th>
                        <th className="px-8 py-5 text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em] text-center">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase font-bold text-slate-400 tracking-[0.15em]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {filteredHolidays.length > 0 ? filteredHolidays.map((hday) => (
                        <tr key={hday.id} className="group hover:bg-slate-50/20 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600">
                                    <Target size={20} />
                                 </div>
                                 <p className="font-bold text-slate-900 tracking-tight">{hday.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center whitespace-nowrap">
                              <p className="text-xs font-bold text-slate-700">{hday.date}</p>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{hday.type}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2 text-slate-500">
                                 <MapPin size={12} />
                                 <span className="text-xs font-medium">{hday.region}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                                 hday.status === 'Upcoming' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                              )}>
                                 {hday.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <ActionDropdown 
                                actions={[
                                  { label: 'Edit Holiday', icon: Edit3, onClick: () => { setHolidayToEdit(hday); setIsAddModalOpen(true); } },
                                  { label: 'Duplicate', icon: Globe2, onClick: () => showToast('Holiday duplicated successfully') },
                                  { label: 'Delete', icon: Trash2, danger: true, onClick: () => setHolidayToDelete(hday) },
                                ]}
                              />
                           </td>
                        </tr>
                     )) : (
                        <tr>
                            <td colSpan="6" className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                        <Calendar size={32} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900">No holidays found</p>
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
      </div>

      {/* Modals */}
      <HolidayModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
            setIsAddModalOpen(false);
            setHolidayToEdit(null);
        }}
        holidayToEdit={holidayToEdit}
      />

      <ConfirmDialog 
        isOpen={!!holidayToDelete}
        onClose={() => setHolidayToDelete(null)}
        onConfirm={() => deleteHoliday(holidayToDelete.id)}
        title="Delete Holiday"
        message={`Are you sure you want to delete ${holidayToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Holidays;

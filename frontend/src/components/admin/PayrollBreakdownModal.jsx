import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, DollarSign } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const PayrollBreakdownModal = ({ isOpen, onClose, employee }) => {
  const { updatePayrollDetails } = useAdmin();
  const [formData, setFormData] = useState({
    basic: 0,
    bonus: 0,
    deductions: 0
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        basic: employee.basic,
        bonus: employee.bonus || 0,
        deductions: employee.deductions || 0
      });
    }
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      updatePayrollDetails(employee.id, formData);
    }
    onClose();
  };

  if (!employee) return null;

  const net = parseInt(formData.basic) + parseInt(formData.bonus) - parseInt(formData.deductions);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl max-h-[90vh] bg-white shadow-2xl z-[120] flex flex-col rounded-3xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg transform -rotate-6">
                  <Calculator size={22} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-none">
                    Payroll Breakdown
                  </h2>
                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mt-2 leading-none">
                    {employee.name}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col">
              <div className="flex-1 p-10 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src={employee.img} alt={employee.name} className="w-16 h-16 rounded-xl object-cover shadow-sm ring-2 ring-white" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{employee.name}</h3>
                    <p className="text-xs font-medium text-slate-500">Status: {employee.status}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Basic Salary</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-4 text-slate-300" size={18} />
                      <input
                        required
                        type="number"
                        value={formData.basic}
                        onChange={(e) => setFormData({...formData, basic: e.target.value})}
                        className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Bonus & Allowances</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-4 text-slate-300" size={18} />
                      <input
                        required
                        type="number"
                        value={formData.bonus}
                        onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                        className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Deductions</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-4 text-slate-300" size={18} />
                      <input
                        required
                        type="number"
                        value={formData.deductions}
                        onChange={(e) => setFormData({...formData, deductions: e.target.value})}
                        className="input-field h-14 pl-12 bg-slate-50 border-transparent font-bold text-rose-500"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 mt-4 bg-slate-900 rounded-2xl flex items-center justify-between text-white">
                     <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Net Payable</p>
                        <p className="text-3xl font-black text-white mt-1">${net}</p>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center gap-4 shrink-0">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95"
                >
                  Save Split
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PayrollBreakdownModal;

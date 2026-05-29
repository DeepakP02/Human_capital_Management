import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Download, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

const InvoiceDrawer = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return null;

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
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Invoice Details</h2>
                  <p className="text-xs font-medium text-slate-500 mt-1">{invoice.id}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
               <div className="flex justify-between items-start">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                    <span className={cn(
                       "px-2.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest border block w-max",
                       invoice.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                       invoice.status === 'Refunded' ? "bg-amber-50 text-amber-600 border-amber-100" :
                       "bg-rose-50 text-rose-600 border-rose-100"
                    )}>{invoice.status}</span>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Amount</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{invoice.amount}</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoice Date</p>
                    <p className="text-sm font-bold text-slate-900">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Method</p>
                    <p className="text-sm font-bold text-slate-900">{invoice.method}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">Line Items</h3>
                  <div className="space-y-3 font-bold text-slate-600 text-xs">
                     <div className="flex justify-between p-3 bg-white border border-slate-100 rounded-lg">
                        <span>Enterprise Plan Subscription</span>
                        <span>$4,000.00</span>
                     </div>
                     <div className="flex justify-between p-3 bg-white border border-slate-100 rounded-lg">
                        <span>Extra Add-ons</span>
                        <span>$280.00</span>
                     </div>
                     <div className="flex justify-between p-3 bg-white border border-slate-100 rounded-lg">
                        <span>Tax (0% B2B)</span>
                        <span>$0.00</span>
                     </div>
                  </div>
               </div>
               
               {invoice.status === 'Refunded' && (
                 <div className="p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 flex gap-3 text-sm font-medium">
                    <AlertTriangle size={18} className="shrink-0" />
                    <p>This invoice was refunded on {invoice.date} back to the original payment method.</p>
                 </div>
               )}

            </div>
            <div className="p-8 border-t border-slate-100 bg-slate-50">
                <button type="button" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                  <Download size={18} /> Download PDF
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InvoiceDrawer;

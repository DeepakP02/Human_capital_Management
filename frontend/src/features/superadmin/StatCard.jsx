import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ icon: Icon, label, value, sub, style }) => (
  <motion.div
    variants={style?.variants}
    whileHover={{ y: -4 }}
    className={`relative bg-white dark:bg-slate-900 rounded-2xl border ${style?.border} overflow-hidden shadow-soft hover:shadow-premium transition-all group p-5 text-left`}
  >
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style?.color}`} />
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl ${style?.bg} ${style?.text} flex items-center justify-center`}> 
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">
        +4.8%
      </span>
    </div>
    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
    <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1 mb-1 leading-none">{value}</h3>
    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{sub}</p>
  </motion.div>
);

export default StatCard;

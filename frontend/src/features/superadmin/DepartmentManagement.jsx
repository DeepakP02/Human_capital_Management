import React, { useState } from 'react';
import { useSuperAdmin } from '../../context/SuperAdminContext';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  User, 
  Users,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DepartmentManagement = () => {
  const { departments, addDept, updateDept, deleteDept } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  
  // Form State
  const [name, setName] = useState('');
  const [head, setHead] = useState('');
  const [count, setCount] = useState(0);

  const openAddModal = () => {
    setEditingDept(null);
    setName('');
    setHead('');
    setCount(0);
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setName(dept.name);
    setHead(dept.head);
    setCount(dept.count || 0);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !head) return;

    if (editingDept) {
      updateDept(editingDept.id, {
        name,
        head,
        count: parseInt(count, 10)
      });
    } else {
      addDept({
        id: Date.now().toString(),
        name,
        head,
        count: parseInt(count, 10)
      });
    }
    setIsModalOpen(false);
  };

  const filteredDepts = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Building2 className="text-amber-600" size={32} />
            Department Management
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Configure company divisions, department heads, and monitor personnel counts.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 self-start md:self-auto shadow-lg shadow-amber-200 dark:shadow-none transition-all"
        >
          <Plus size={18} />
          <span>Create Department</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search departments by name or head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          Departments: {departments.length} Divisions
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDepts.length > 0 ? (
            filteredDepts.map((dept) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
                      <Building2 size={22} />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1">
                      <Users size={12} />
                      {dept.count || 0} Staff
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-snug">{dept.name}</h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 mt-2">
                    <User size={14} className="text-slate-400" />
                    <span>Dept. Head: </span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{dept.head}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                  <button
                    onClick={() => openEditModal(dept)}
                    className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition-all"
                    title="Edit Department"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteDept(dept.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                    title="Delete Department"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-slate-900 p-12 text-center rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-400 font-medium text-sm">
              No divisions match your search query.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Department Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Grid className="text-amber-600" size={22} />
                  {editingDept ? 'Edit Division' : 'Create Department'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department Head</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter head manager name"
                    value={head}
                    onChange={(e) => setHead(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Staff Members Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-slate-100 text-sm font-semibold"
                  />
                </div>

                <div className="pt-4 flex items-center gap-3 border-t border-slate-50 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all text-sm shadow-lg shadow-amber-200 dark:shadow-none"
                  >
                    {editingDept ? 'Save Changes' : 'Create Dept.'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DepartmentManagement;

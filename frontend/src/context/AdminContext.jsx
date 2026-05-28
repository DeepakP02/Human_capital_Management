import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  // --- PERSISTENCE HELPERS ---
  const loadInitialData = (key, defaultData) => {
    const saved = localStorage.getItem(`hcm_admin_${key}`);
    return saved ? JSON.parse(saved) : defaultData;
  };

  const usePersistedState = (key, defaultData) => {
    const [state, setState] = useState(() => loadInitialData(key, defaultData));
    useEffect(() => {
      localStorage.setItem(`hcm_admin_${key}`, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };

  const [toasts, setToasts] = useState([]);

  // --- ACTIONS ---

  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // --- MOCK DATA INITIALIZATION ---
  const initialUsers = [
    { id: '1', name: 'John Wick', email: 'john@globaltech.com', role: 'Admin', department: 'Operations', lastLogin: '12m ago', status: 'Active', img: 'https://i.pravatar.cc/150?u=john', phone: '+1 555-0101', empId: 'EMP-001', joinDate: '2024-01-15', empType: 'Full-time', manager: 'None' },
    { id: '2', name: 'Alice Cooper', email: 'alice@globaltech.com', role: 'Manager', department: 'Product & Design', lastLogin: '2h ago', status: 'Active', img: 'https://i.pravatar.cc/150?u=alice', phone: '+1 555-0102', empId: 'EMP-002', joinDate: '2024-02-20', empType: 'Full-time', manager: 'John Wick' },
    { id: '3', name: 'Bob Marley', email: 'bob@globaltech.com', role: 'Employee', department: 'Engineering', lastLogin: '1d ago', status: 'Inactive', img: 'https://i.pravatar.cc/150?u=bob', phone: '+1 555-0103', empId: 'EMP-003', joinDate: '2024-03-10', empType: 'Contract', manager: 'Alice Cooper' },
    { id: '4', name: 'Sarah Connor', email: 'sarah@globaltech.com', role: 'HR', department: 'Human Resources', lastLogin: '4h ago', status: 'Active', img: 'https://i.pravatar.cc/150?u=sarah', phone: '+1 555-0104', empId: 'EMP-004', joinDate: '2024-01-05', empType: 'Full-time', manager: 'John Wick' },
    { id: '5', name: 'Diana Ross', email: 'diana@globaltech.com', role: 'Candidate', department: 'None', lastLogin: '-', status: 'Pending', img: 'https://i.pravatar.cc/150?u=diana', phone: '+1 555-0105', empId: 'EMP-005', joinDate: '2024-04-01', empType: 'Intern', manager: 'Sarah Connor' },
  ];
  const [users, setUsers] = usePersistedState('users', initialUsers);

  const initialDepartments = [
    { id: '1', name: 'Operations', code: 'OPS', head: 'John Wick', parent: 'Corporate', employees: 1, status: 'Active', description: 'Core business operations and logistics.', color: '#4f46e5' },
    { id: '2', name: 'Product & Design', code: 'PRD', head: 'Alice Cooper', parent: 'Operations', employees: 1, status: 'Active', description: 'Building the future of our product interface.', color: '#0ea5e9' },
    { id: '3', name: 'Engineering', code: 'ENG', head: 'Alice Cooper', parent: 'Operations', employees: 1, status: 'Active', description: 'Development and infrastructure.', color: '#8b5cf6' },
    { id: '4', name: 'Human Resources', code: 'HR', head: 'Sarah Connor', parent: 'Corporate', employees: 1, status: 'Active', description: 'People and culture management.', color: '#ec4899' },
    { id: '5', name: 'Finance', code: 'FIN', head: 'Bob Marley', parent: 'Operations', employees: 0, status: 'Archived', description: 'Accounting and financial planning.', color: '#f59e0b' },
  ];
  const [departments, setDepartments] = usePersistedState('departments', initialDepartments);

  const initialRoles = [
    { id: '1', name: 'Admin', description: 'Full system access', isCustom: false, permissions: { dashboard: ['view', 'edit', 'manage'], users: ['view', 'create', 'edit', 'delete'], departments: ['view', 'create', 'edit', 'delete'] } },
    { id: '2', name: 'Manager', description: 'Team management access', isCustom: false, permissions: { dashboard: ['view'], users: ['view', 'edit'], departments: ['view'] } },
    { id: '3', name: 'HR', description: 'People management access', isCustom: false, permissions: { dashboard: ['view'], users: ['view', 'create', 'edit', 'delete'], departments: ['view', 'create', 'edit'] } },
    { id: '4', name: 'Employee', description: 'Standard user access', isCustom: false, permissions: { dashboard: ['view'] } },
    { id: '5', name: 'Candidate', description: 'Limited portal access', isCustom: false, permissions: {} },
  ];
  const [roles, setRoles] = usePersistedState('roles', initialRoles);

  // User Actions
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      lastLogin: 'Never',
      status: user.status || 'Active',
      img: user.img || `https://i.pravatar.cc/150?u=${user.name}`,
    };
    setUsers([...users, newUser]);
    showToast(`User ${user.name} added successfully`);
  };

  const updateUser = (id, updatedData) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updatedData } : u));
    showToast(`User profile updated`);
  };

  const deleteUser = (id) => {
    const user = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    showToast(`User ${user?.name} removed`);
  };

  const bulkUpdateUsersStatus = (ids, status) => {
    setUsers(users.map(u => ids.includes(u.id) ? { ...u, status } : u));
    showToast(`Updated ${ids.length} users to ${status}`);
  };

  const bulkDeleteUsers = (ids) => {
    setUsers(users.filter(u => !ids.includes(u.id)));
    showToast(`Deleted ${ids.length} users`);
  };

  // Department Actions
  const addDepartment = (dept) => {
    const newDept = {
      ...dept,
      id: Date.now().toString(),
      employees: 0,
      status: 'Active'
    };
    setDepartments([...departments, newDept]);
    showToast(`Department ${dept.name} created`);
  };

  const updateDepartment = (id, updatedData) => {
    setDepartments(departments.map(d => d.id === id ? { ...d, ...updatedData } : d));
    showToast(`Department ${updatedData.name || ''} updated`);
  };

  const deleteDepartment = (id) => {
    const dept = departments.find(d => d.id === id);
    const assignedUsers = users.filter(u => u.department === dept?.name);
    if (assignedUsers.length > 0) {
      showToast(`Cannot delete: ${assignedUsers.length} users assigned to this department`, 'error');
      return false;
    }
    setDepartments(departments.filter(d => d.id !== id));
    showToast(`Department removed`);
    return true;
  };

  // Role Actions
  const addRole = (role) => {
    const newRole = { ...role, id: Date.now().toString(), isCustom: true };
    setRoles([...roles, newRole]);
    showToast(`Custom role ${role.name} created`);
  };

  const updateRole = (id, updatedData) => {
    setRoles(roles.map(r => r.id === id ? { ...r, ...updatedData } : r));
    showToast(`Role permissions updated`);
  };

  const deleteRole = (id) => {
    const role = roles.find(r => r.id === id);
    if (role && !role.isCustom) {
      showToast('Cannot delete system roles', 'error');
      return;
    }
    setRoles(roles.filter(r => r.id !== id));
    showToast(`Role deleted`);
  };

  // --- AUTO UPDATES ---
  useEffect(() => {
    setDepartments(prev => prev.map(dept => ({
      ...dept,
      employees: users.filter(u => u.department === dept.name).length
    })));
  }, [users]);

  // --- HOLIDAYS, BENEFITS, PAYROLL ---
  const initialHolidays = [
    { id: 1, name: 'New Year Day', date: '2026-01-01', type: 'Public', region: 'All Regions', status: 'Upcoming', repeat: true, description: '' },
    { id: 2, name: 'Spring Festival', date: '2026-02-12', type: 'Regional', region: 'APAC-India', status: 'Passed', repeat: false, description: '' },
    { id: 3, name: 'Labour Day', date: '2026-05-01', type: 'Public', region: 'All Regions', status: 'Passed', repeat: true, description: '' },
    { id: 4, name: 'Independence Day', date: '2026-07-04', type: 'Public', region: 'Global-US East', status: 'Passed', repeat: false, description: '' },
    { id: 5, name: 'Thanksgiving', date: '2026-11-26', type: 'Public', region: 'Global-US East', status: 'Upcoming', repeat: true, description: '' },
    { id: 6, name: 'Christmas Day', date: '2026-12-25', type: 'Public', region: 'All Regions', status: 'Upcoming', repeat: true, description: '' },
  ];
  const [holidays, setHolidays] = usePersistedState('holidays', initialHolidays);

  const addHoliday = (holiday) => {
    setHolidays(prev => [...prev, { ...holiday, id: Date.now() }]);
    showToast(`Holiday ${holiday.name} added`);
  };

  const updateHoliday = (id, updatedData) => {
    setHolidays(prev => prev.map(h => h.id === id ? { ...h, ...updatedData } : h));
    showToast(`Holiday updated`);
  };

  const deleteHoliday = (id) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
    showToast(`Holiday deleted`);
  };

  const initialBenefits = [
    { id: 1, name: 'Platinum Health Plus', category: 'Insurance', provider: 'Global Health Inc.', contribution: '$450/m', eligibility: 'Full-time Only', status: 'Active', empContribution: '0.00', description: '', autoEnroll: true },
    { id: 2, name: 'Mental Wellness Sub', category: 'Wellness', provider: 'MindScale', contribution: '$25/m', eligibility: 'All Employees', status: 'Active', empContribution: '0.00', description: '', autoEnroll: false },
    { id: 3, name: 'Learning & Dev Fund', category: 'Reimbursement', provider: 'Self-Funded', contribution: 'Up to $2k/y', eligibility: 'Full-time Only', status: 'Active', empContribution: '0.00', description: '', autoEnroll: false },
    { id: 4, name: '401(k) Match (Tier 1)', category: 'Retirement', provider: 'WealthGuard', contribution: '5% Match', eligibility: 'Senior Management', status: 'Active', empContribution: '0.00', description: '', autoEnroll: true },
    { id: 5, name: 'Commuter Allowance', category: 'Allowance', provider: 'CityTransit', contribution: '$100/m', eligibility: 'All Employees', status: 'Disabled', empContribution: '0.00', description: '', autoEnroll: false },
  ];
  const [benefits, setBenefits] = usePersistedState('benefits', initialBenefits);

  const addBenefit = (benefit) => {
    setBenefits(prev => [...prev, { ...benefit, id: Date.now() }]);
    showToast(`Benefit plan ${benefit.name} added`);
  };

  const updateBenefit = (id, updatedData) => {
    setBenefits(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    showToast(`Benefit plan updated`);
  };

  const deleteBenefit = (id) => {
    setBenefits(prev => prev.filter(b => b.id !== id));
    showToast(`Benefit plan deleted`);
  };

  const initialTaxRules = [
    { id: 1, name: 'Standard Federal Tax', region: 'Global', slabType: 'Progressive', percentage: '20', minSalary: '50000', maxSalary: '100000', effectiveDate: '2026-01-01', status: 'Active' },
    { id: 2, name: 'State Base Tax', region: 'USA', slabType: 'Flat', percentage: '5', minSalary: '0', maxSalary: '999999', effectiveDate: '2026-01-01', status: 'Active' },
  ];
  const [taxRules, setTaxRules] = usePersistedState('taxRules', initialTaxRules);

  const addTaxRule = (rule) => {
    setTaxRules(prev => [...prev, { ...rule, id: Date.now() }]);
    showToast(`Tax rule ${rule.name} added`);
  };

  const updateTaxRule = (id, updatedData) => {
    setTaxRules(prev => prev.map(r => r.id === id ? { ...r, ...updatedData } : r));
    showToast(`Tax rule updated`);
  };

  const deleteTaxRule = (id) => {
    setTaxRules(prev => prev.filter(r => r.id !== id));
    showToast(`Tax rule deleted`);
  };

  const initialPayroll = [
    { id: 1, name: 'John Wick', basic: 12000, bonus: 1200, deductions: 400, net: 12800, status: 'Draft', img: 'https://i.pravatar.cc/150?u=john' },
    { id: 2, name: 'Alice Cooper', basic: 9500, bonus: 800, deductions: 300, net: 10000, status: 'Draft', img: 'https://i.pravatar.cc/150?u=alice' },
    { id: 3, name: 'Bob Marley', basic: 6000, bonus: 0, deductions: 200, net: 5800, status: 'Processed', img: 'https://i.pravatar.cc/150?u=bob' },
  ];
  const [payrollList, setPayrollList] = usePersistedState('payroll', initialPayroll);

  const runPayroll = () => {
    setPayrollList(prev => prev.map(p => ({ ...p, status: 'Processed' })));
    showToast('Payroll processed successfully');
  };

  const updatePayrollDetails = (id, data) => {
    setPayrollList(prev => prev.map(p => {
      if (p.id === id) {
        const net = parseInt(data.basic || p.basic) + parseInt(data.bonus || p.bonus) - parseInt(data.deductions || p.deductions);
        return { ...p, ...data, net };
      }
      return p;
    }));
    showToast('Salary details updated');
  };

  // --- AI, COMPLIANCE, INTEGRATIONS ---
  const initialAiModules = [
    { id: 1, name: 'Resume Screening', desc: 'Auto-scan resumes and rank candidates by job fit score.', status: 'Active', confidence: 94, settings: {} },
    { id: 2, name: 'Attrition Prediction', desc: 'Analyze employee behavior to predict potential exit risks.', status: 'Active', confidence: 88, settings: {} },
    { id: 3, name: 'Smart Hiring Suggestions', desc: 'AI-driven recommendations for team composition & roles.', status: 'Inactive', confidence: 92, settings: {} },
    { id: 4, name: 'AI Chat Assistant', desc: 'Conversational agent for employee self-service queries.', status: 'Active', confidence: 98, settings: {} },
    { id: 5, name: 'Performance Insights', desc: 'Generative reports on workforce productivity & output.', status: 'Active', confidence: 85, settings: {} },
    { id: 6, name: 'Automated Job Posting', desc: 'AI-generated job descriptions based on skill gaps.', status: 'Inactive', confidence: 90, settings: {} },
  ];
  const [aiModules, setAiModules] = usePersistedState('aiModules', initialAiModules);

  const updateAiModule = (id, data) => {
    setAiModules(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    showToast('AI Module updated successfully');
  };

  const initialAiLogs = [
    { id: 1, label: 'Screening Candidates...', type: 'In Progress', timestamp: new Date().toISOString() },
    { id: 2, label: 'Aggregating Team Trends', type: 'Queue', timestamp: new Date().toISOString() },
    { id: 3, label: 'Updating Vector Store', type: 'Success', timestamp: new Date().toISOString() },
  ];
  const [aiLogs, setAiLogs] = usePersistedState('aiLogs', initialAiLogs);

  const addAiLog = (log) => {
    setAiLogs(prev => [{ ...log, id: Date.now(), timestamp: new Date().toISOString() }, ...prev]);
  };

  const initialPolicies = [
    { id: 1, name: 'Remote Work Policy', category: 'HR', department: 'All', owner: 'Sarah Connor', effectiveDate: '2025-01-01', expiryDate: '2026-01-01', version: '2.1', status: 'Active', description: 'Guidelines for working from home.' },
    { id: 2, name: 'Data Security Standards', category: 'Security', department: 'Engineering', owner: 'John Wick', effectiveDate: '2025-06-01', expiryDate: '2025-12-01', version: '1.5', status: 'Expiring Soon', description: 'Mandatory data protection protocols.' },
  ];
  const [policies, setPolicies] = usePersistedState('policies', initialPolicies);

  const addPolicy = (policy) => {
    setPolicies(prev => [{ ...policy, id: Date.now() }, ...prev]);
    showToast('Policy published successfully');
  };

  const updatePolicy = (id, data) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    showToast('Policy updated');
  };

  const deletePolicy = (id) => {
    setPolicies(prev => prev.filter(p => p.id !== id));
    showToast('Policy deleted');
  };

  const initialIntegrations = [
    { id: 1, name: 'Google Workspace', category: 'Productivity', status: 'Connected', health: '99.9%', sync: 'Real-time', icon: 'Google' },
    { id: 2, name: 'Slack Enterprise', category: 'Communication', status: 'Connected', health: '100%', sync: 'Every 5m', icon: 'Slack' },
    { id: 3, name: 'Zoom Meetings', category: 'Video', status: 'Disconnected', health: '-', sync: 'Manual', icon: 'Zoom' },
    { id: 4, name: 'OpenAI GPT-4', category: 'AI', status: 'Connected', health: '98.5%', sync: 'Real-time', icon: 'Brain' },
  ];
  const [integrations, setIntegrations] = usePersistedState('integrations', initialIntegrations);

  const addIntegration = (integration) => {
    setIntegrations(prev => [...prev, { ...integration, id: Date.now(), health: '100%' }]);
    showToast('Integration connected successfully');
  };

  const updateIntegration = (id, data) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
    showToast('Integration updated');
  };

  const deleteIntegration = (id) => {
    setIntegrations(prev => prev.filter(i => i.id !== id));
    showToast('Integration disconnected');
  };

  // --- SETTINGS ---
  const initialSettings = {
    general: { language: 'English (US) - Primary', timezone: 'UTC-08:00 (Pacific Standard Time)', dateFormat: 'MM/DD/YYYY', multiCurrency: true },
    security: { twoFactor: true, sessionTimeout: '15 Minutes', passwordPolicy: ['Min 12 Characters'] },
    branding: { brandName: 'Global Tech', primaryColor: '#4f46e5', accentColor: '#0ea5e9' },
    notifications: { emailAlerts: true, pushAlerts: true, weeklyReports: false },
    backup: { autoBackup: true, frequency: '24 Hours', lastBackup: 'Oct 20, 2026, 04:28 PM' }
  };
  const [appSettings, setAppSettings] = usePersistedState('settings', initialSettings);

  const updateSettings = (category, data) => {
    setAppSettings(prev => ({ ...prev, [category]: { ...prev[category], ...data } }));
  };

  const resetSettings = () => {
    setAppSettings(initialSettings);
    showToast('Settings reset to defaults');
  };

  // --- BILLING STATE ---
  const initialBillingPlan = { name: 'Enterprise Plan', price: 4280, cycle: 'Monthly', users: 500, addons: ['AI Engine', 'Security+'] };
  const [billingPlan, setBillingPlan] = usePersistedState('billingPlan', initialBillingPlan);

  const initialInvoices = [
    { id: 'INV-4820', date: 'Oct 01, 2026', amount: '$4,280.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-4712', date: 'Sep 01, 2026', amount: '$4,280.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-4601', date: 'Aug 01, 2026', amount: '$4,200.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-4521', date: 'Jul 01, 2026', amount: '$4,200.00', status: 'Refunded', method: 'Visa •••• 4242' },
  ];
  const [invoices, setInvoices] = usePersistedState('invoices', initialInvoices);

  const updatePlan = (plan) => {
    setBillingPlan(prev => ({ ...prev, ...plan }));
    showToast('Subscription plan updated successfully');
  };

  const updateInvoice = (id, data) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...data } : inv));
  };

  // --- AUDIT LOGS STATE ---
  const initialLogs = [
    { id: 1, user: 'John Wick', action: 'Login Success', module: 'Auth', ip: '192.168.1.4', device: 'MBP 16"', time: '2m ago', level: 'Security' },
    { id: 2, user: 'Sarah Connor', action: 'Changed Permissions', module: 'Roles', ip: '192.110.4.1', device: 'Windows Desktop', time: '14m ago', level: 'Critical' },
    { id: 3, user: 'Alice Cooper', action: 'Exported Payouts', module: 'Payroll', ip: '172.16.0.42', device: 'iPhone 15 Pro', time: '1h ago', level: 'Info' },
    { id: 4, user: 'John Wick', action: 'Integration Sync', module: 'Integrations', ip: '192.168.1.4', device: 'MBP 16"', time: '3h ago', level: 'System' },
    { id: 5, user: 'Bob Marley', action: 'Failed Login', module: 'Auth', ip: '45.12.8.99', device: 'Chrome / Linux', time: '5h ago', level: 'Warning' },
  ];
  const [systemLogs, setSystemLogs] = usePersistedState('logs', initialLogs);

  const addSystemLog = (log) => {
    setSystemLogs(prev => [{ ...log, id: Date.now(), time: 'Just now' }, ...prev]);
  };

  // --- REPORTS STATE ---
  const [reportSchedules, setReportSchedules] = usePersistedState('reportSchedules', []);
  
  const addReportSchedule = (schedule) => {
    setReportSchedules(prev => [...prev, { ...schedule, id: Date.now() }]);
    showToast(`Report schedule "${schedule.name}" created`);
  };

  const value = {
    users, addUser, updateUser, deleteUser, bulkUpdateUsersStatus, bulkDeleteUsers,
    departments, addDepartment, updateDepartment, deleteDepartment,
    roles, addRole, updateRole, deleteRole,
    toasts, showToast,
    holidays, addHoliday, updateHoliday, deleteHoliday,
    benefits, addBenefit, updateBenefit, deleteBenefit,
    taxRules, addTaxRule, updateTaxRule, deleteTaxRule,
    payrollList, runPayroll, updatePayrollDetails,
    aiModules, updateAiModule, aiLogs, addAiLog,
    policies, addPolicy, updatePolicy, deletePolicy,
    integrations, addIntegration, updateIntegration, deleteIntegration,
    appSettings, updateSettings, resetSettings,
    billingPlan, invoices, updatePlan, updateInvoice,
    systemLogs, addSystemLog,
    reportSchedules, addReportSchedule
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};


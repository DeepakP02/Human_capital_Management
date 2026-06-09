import React, { createContext, useContext, useState, useEffect } from 'react';

const PayrollContext = createContext();

const defaultSettings = {
  taxRate: 10, // 10%
  pfRate: 12, // 12%
  baseSalaries: {
    superuser: 8000,
    admin: 6500,
    hr: 5500,
    manager: 6000,
    employee: 5000,
  },
  allowances: {
    superuser: 2000,
    admin: 1500,
    hr: 1200,
    manager: 1300,
    employee: 1000,
  }
};

const generateDefaultHistory = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2026-06"
  const months = ["2026-03", "2026-04", "2026-05"];
  const employeesList = [
    { id: '1', name: 'John Doe', role: 'superuser', department: 'Executive' },
    { id: '2', name: 'Sarah Connor', role: 'admin', department: 'Operations' },
    { id: '3', name: 'Michael Scott', role: 'hr', department: 'Human Resources' },
    { id: '4', name: 'Dwight Schrute', role: 'manager', department: 'Sales' },
    { id: '5', name: 'Jim Halpert', role: 'employee', department: 'Sales' },
  ];
  
  const history = [];
  months.forEach(m => {
    employeesList.forEach(emp => {
      let basic = 5000;
      let allowance = 1000;
      let bonus = 100;
      if (emp.role === 'superuser') { basic = 8000; allowance = 2000; bonus = 300; }
      else if (emp.role === 'admin') { basic = 6500; allowance = 1500; bonus = 200; }
      else if (emp.role === 'hr') { basic = 5500; allowance = 1200; bonus = 150; }
      else if (emp.role === 'manager') { basic = 6000; allowance = 1300; bonus = 100; }
      
      const pf = Math.round(basic * 0.12);
      const tax = Math.round((basic + allowance + bonus) * 0.10);
      const deductions = pf + tax;
      const net = basic + allowance + bonus - deductions;
      
      history.push({
        id: `PAY-${emp.id}-${m.replace('-', '')}`,
        employeeId: `EMP-${emp.id.padStart(3, '0')}`,
        employeeName: emp.name,
        department: emp.department,
        designation: emp.role.charAt(0).toUpperCase() + emp.role.slice(1),
        basic,
        allowance,
        bonus,
        pf,
        tax,
        deductions,
        net,
        month: m,
        status: 'Paid',
        date: `${m}-30`,
        attendancePresent: 22,
        attendanceAbsent: 0,
        leavesTaken: 0,
      });
    });
  });
  
  // Seed current month entries as Draft/Processing/Approved
  employeesList.slice(1).forEach(emp => {
      let basic = 5000;
      let allowance = 1000;
      let bonus = 0;
      if (emp.role === 'admin') { basic = 6500; allowance = 1500; }
      else if (emp.role === 'hr') { basic = 5500; allowance = 1200; }
      else if (emp.role === 'manager') { basic = 6000; allowance = 1300; }
      
      const pf = Math.round(basic * 0.12);
      const tax = Math.round((basic + allowance + bonus) * 0.10);
      const deductions = pf + tax;
      const net = basic + allowance + bonus - deductions;
      
      history.push({
        id: `PAY-${emp.id}-${currentMonth.replace('-', '')}`,
        employeeId: `EMP-${emp.id.padStart(3, '0')}`,
        employeeName: emp.name,
        department: emp.department,
        designation: emp.role.charAt(0).toUpperCase() + emp.role.slice(1),
        basic,
        allowance,
        bonus,
        pf,
        tax,
        deductions,
        net,
        month: currentMonth,
        status: emp.id === '2' ? 'Approved' : emp.id === '3' ? 'Processing' : 'Draft',
        date: `${currentMonth}-15`,
        attendancePresent: 20,
        attendanceAbsent: 2,
        leavesTaken: 2,
      });
  });

  return history;
};

export const PayrollProvider = ({ children }) => {
  const [payrollHistory, setPayrollHistory] = useState(() => {
    const saved = localStorage.getItem('hcm_payroll_history');
    return saved ? JSON.parse(saved) : generateDefaultHistory();
  });

  const [payrollSettings, setPayrollSettings] = useState(() => {
    const saved = localStorage.getItem('hcm_payroll_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('hcm_payroll_history', JSON.stringify(payrollHistory));
  }, [payrollHistory]);

  useEffect(() => {
    localStorage.setItem('hcm_payroll_settings', JSON.stringify(payrollSettings));
  }, [payrollSettings]);

  const addPayrollRecord = (record) => {
    setPayrollHistory((prev) => [record, ...prev]);
  };

  const updatePayrollRecord = (id, updates) => {
    setPayrollHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deletePayrollRecord = (id) => {
    setPayrollHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const bulkApprovePayroll = (ids) => {
    setPayrollHistory((prev) =>
      prev.map((item) => (ids.includes(item.id) ? { ...item, status: 'Approved' } : item))
    );
  };

  const updatePayrollSettings = (settings) => {
    setPayrollSettings(settings);
  };

  return (
    <PayrollContext.Provider
      value={{
        payrollHistory,
        setPayrollHistory,
        payrollSettings,
        updatePayrollSettings,
        addPayrollRecord,
        updatePayrollRecord,
        deletePayrollRecord,
        bulkApprovePayroll
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayroll = () => useContext(PayrollContext);

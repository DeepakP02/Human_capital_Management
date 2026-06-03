import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSalaryStructures, processPayroll } from './api';

const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const [salaryStructures, setSalaryStructures] = useState([]);
  const [payrollHistory, setPayrollHistory] = useState([]);

  useEffect(() => {
    // Initial load (mocked if backend unavailable)
    fetchSalaryStructures()
      .then(setSalaryStructures)
      .catch(() => setSalaryStructures([]));
  }, []);

  // Mock payroll history for UI demo when none exists
  useEffect(() => {
    if (payrollHistory.length === 0) {
      const mock = [
        { id: 'PAY-101', month: new Date().toISOString().slice(0, 7), basic: 5000, hra: 1500, allowance: 800, bonus: 200, pf: 600, tax: 450, net: 6450, status: 'Paid', date: '2026-03-31' },
        { id: 'PAY-102', month: new Date().toISOString().slice(0, 7), basic: 5000, hra: 1500, allowance: 800, bonus: 0, pf: 600, tax: 420, net: 6280, status: 'Pending', date: '2026-04-15' },
      ];
      setPayrollHistory(mock);
    }
  }, []);


  const runPayroll = async (payload) => {
    const result = await processPayroll(payload);
    setPayrollHistory((prev) => [...prev, result]);
    return result;
  };

  return (
    <PayrollContext.Provider value={{ salaryStructures, setSalaryStructures, payrollHistory, runPayroll }}>
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayroll = () => useContext(PayrollContext);

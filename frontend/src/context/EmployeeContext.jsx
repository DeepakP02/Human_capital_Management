import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // --- Profile State ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('employee_profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'John Doe',
      email: 'john.doe@hcm.ai',
      phone: '+1 (555) 123-4567',
      dob: '1995-06-15',
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Tech Lane, Silicon Valley, CA',
      employeeId: 'EMP-2024-001',
      department: 'Engineering',
      role: 'Full Stack Developer',
      manager: 'Michael Scott',
      joiningDate: '2023-01-10',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      emergencyContact: {
        name: 'Jane Doe',
        relation: 'Spouse',
        phone: '+1 (555) 987-6543'
      }
    };
  });

  // --- Attendance State ---
  const [attendance, setAttendance] = useState({
    isClockedIn: false,
    clockInTime: null,
    totalWorkedToday: 0,
    breakStartTime: null,
    isOnBreak: false,
    history: []
  });

  // --- Leave Requests State ---
  const [leaves, setLeaves] = useState({
    balance: {
      sick: 10,
      annual: 15,
      casual: 5,
      unpaid: 0
    },
    requests: []
  });

  // --- Payroll State ---
  const [payroll, setPayroll] = useState(() => {
    const saved = localStorage.getItem('employee_payroll');
    return saved ? JSON.parse(saved) : {
      history: [
        { id: 'PAY-101', month: 'March 2026', basic: 5000, hra: 1500, allowance: 800, bonus: 200, pf: 600, tax: 450, net: 6450, status: 'Paid', date: '2026-03-31' },
        { id: 'PAY-100', month: 'February 2026', basic: 5000, hra: 1500, allowance: 800, bonus: 0, pf: 600, tax: 420, net: 6280, status: 'Paid', date: '2026-02-28' },
        { id: 'PAY-099', month: 'January 2026', basic: 5000, hra: 1500, allowance: 800, bonus: 500, pf: 600, tax: 480, net: 6720, status: 'Paid', date: '2026-01-31' },
      ]
    };
  });

  // --- Benefits State ---
  const [benefits, setBenefits] = useState({
    insurance: { plan: 'Premium Health Plus', provider: 'Blue Cross', status: 'Active' },
    dependents: [
      { name: 'Jane Doe', relation: 'Spouse', age: 28 },
      { name: 'Billy Doe', relation: 'Son', age: 4 }
    ],
    claims: []
  });

  // --- Documents State ---
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('employee_documents');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Passport_Copy.pdf', category: 'ID Proof', size: '2.4 MB', date: '2024-01-15' },
      { id: 2, name: 'Offer_Letter.pdf', category: 'Contracts', size: '1.2 MB', date: '2023-01-05' },
      { id: 3, name: 'Experience_Cert.pdf', category: 'Education', size: '3.1 MB', date: '2023-01-05' },
      { id: 4, name: 'Degree_Certificate.pdf', category: 'Education', size: '4.5 MB', date: '2023-01-05' }
    ];
  });

  // --- Performance State ---
  const [performance, setPerformance] = useState(() => {
    const saved = localStorage.getItem('employee_performance');
    return saved ? JSON.parse(saved) : {
      goals: [
        { id: 1, title: 'Learn Next.js', progress: 75, priority: 'High', deadline: '2026-05-30' },
        { id: 2, title: 'Improve Code Coverage', progress: 40, priority: 'Medium', deadline: '2026-06-15' },
        { id: 3, title: 'Accessibility Compliance', progress: 10, priority: 'High', deadline: '2026-07-01' }
      ],
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 75 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 95 }
      ]
    };
  });

  // --- Help Desk State ---
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('employee_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TIC-1234', subject: 'Laptop battery issue', category: 'Hardware', priority: 'High', status: 'Open', date: '2026-04-15', messages: [{ sender: 'John Doe', text: 'My laptop battery is draining very fast.', time: '10:00 AM' }] },
      { id: 'TIC-1235', subject: 'VPN access issue', category: 'IT Support', priority: 'Medium', status: 'Resolved', date: '2026-04-10', messages: [{ sender: 'John Doe', text: 'I cannot connect to the office VPN.', time: '02:00 PM' }, { sender: 'Support', text: 'Please reset your credentials.', time: '04:00 PM' }] }
    ];
  });

  // --- Global Synchronization Logic ---
  const syncWithGlobal = () => {
    // 1. Sync Attendance
    let globalAtt = localStorage.getItem('hcm_global_attendance');
    if (!globalAtt) {
      const defaults = [
        { id: '1', name: profile.fullName, date: '2026-04-20', clockIn: '09:00 AM', clockOut: '06:05 PM', totalHours: '9h 5m', status: 'Present', mode: 'Office' },
        { id: '2', name: profile.fullName, date: '2026-04-19', clockIn: '08:55 AM', clockOut: '05:45 PM', totalHours: '8h 50m', status: 'Present', mode: 'Remote' },
        { id: '3', name: profile.fullName, date: '2026-04-18', clockIn: '09:10 AM', clockOut: '06:30 PM', totalHours: '9h 20m', status: 'Late', mode: 'Office' },
        { id: '4', name: profile.fullName, date: '2026-04-17', clockIn: '-', clockOut: '-', totalHours: '0h', status: 'On Leave', mode: '-' },
        { id: '5', name: profile.fullName, date: '2026-04-16', clockIn: '09:00 AM', clockOut: '06:00 PM', totalHours: '9h 0m', status: 'Present', mode: 'Hybrid' },
      ];
      localStorage.setItem('hcm_global_attendance', JSON.stringify(defaults));
      globalAtt = JSON.stringify(defaults);
    }
    const attList = JSON.parse(globalAtt);
    const myAtt = attList.filter(a => a.name === profile.fullName);
    const activeSession = attList.find(a => a.name === profile.fullName && a.clockOut === '-');

    setAttendance(prev => ({
      ...prev,
      isClockedIn: !!activeSession,
      clockInTime: activeSession ? activeSession.clockInTime : null,
      history: myAtt.filter(a => a.clockOut !== '-')
    }));

    // 2. Sync Leaves
    let globalLeaves = localStorage.getItem('hcm_global_leaves');
    if (!globalLeaves) {
      const defaults = [
        { id: 1, name: profile.fullName, type: 'Sick Leave', startDate: '2026-04-17', endDate: '2026-04-17', days: 1, reason: 'Fever', status: 'Approved', managerComment: 'Get well soon!', emergencyContact: '+1 (555) 987-6543', submittedAt: '2026-04-16' },
        { id: 2, name: profile.fullName, type: 'Annual Leave', startDate: '2026-05-10', endDate: '2026-05-15', days: 6, reason: 'Family vacation', status: 'Pending', managerComment: '', emergencyContact: '+1 (555) 987-6543', submittedAt: '2026-04-20' },
      ];
      localStorage.setItem('hcm_global_leaves', JSON.stringify(defaults));
      globalLeaves = JSON.stringify(defaults);
    }
    const leaveList = JSON.parse(globalLeaves);
    const myLeaves = leaveList.filter(l => l.name === profile.fullName);
    
    // Recalculate balances
    setLeaves(prev => ({
      ...prev,
      balance: {
        sick: Math.max(0, 10 - myLeaves.filter(l => l.status === 'Approved' && l.type.includes('Sick')).reduce((acc, curr) => acc + (curr.days || 0), 0)),
        annual: Math.max(0, 15 - myLeaves.filter(l => l.status === 'Approved' && l.type.includes('Annual')).reduce((acc, curr) => acc + (curr.days || 0), 0)),
        casual: Math.max(0, 5 - myLeaves.filter(l => l.status === 'Approved' && l.type.includes('Casual')).reduce((acc, curr) => acc + (curr.days || 0), 0)),
        unpaid: myLeaves.filter(l => l.status === 'Approved' && l.type.includes('Unpaid')).reduce((acc, curr) => acc + (curr.days || 0), 0)
      },
      requests: myLeaves
    }));

    // 3. Sync Claims
    let globalClaims = localStorage.getItem('hcm_global_benefit_claims');
    if (!globalClaims) {
      const defaults = [
        { id: 'CLM-01', name: profile.fullName, type: 'Medical Expense', amount: '120', date: '2026-03-15', status: 'Approved', description: 'Monthly checkup' },
        { id: 'CLM-02', name: profile.fullName, type: 'Skill Development', amount: '50', date: '2026-04-05', status: 'Pending', description: 'Gym membership' }
      ];
      localStorage.setItem('hcm_global_benefit_claims', JSON.stringify(defaults));
      globalClaims = JSON.stringify(defaults);
    }
    const claimList = JSON.parse(globalClaims);
    const myClaims = claimList.filter(c => c.name === profile.fullName);
    setBenefits(prev => ({
      ...prev,
      claims: myClaims
    }));
  };

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('employee_profile', JSON.stringify(profile));
    localStorage.setItem('employee_payroll', JSON.stringify(payroll));
    localStorage.setItem('employee_documents', JSON.stringify(documents));
    localStorage.setItem('employee_performance', JSON.stringify(performance));
    localStorage.setItem('employee_tickets', JSON.stringify(tickets));
  }, [profile, payroll, documents, performance, tickets]);

  // --- Global Synchronization Hook ---
  useEffect(() => {
    syncWithGlobal();
    window.addEventListener('hcm_global_sync', syncWithGlobal);
    window.addEventListener('storage', syncWithGlobal);
    return () => {
      window.removeEventListener('hcm_global_sync', syncWithGlobal);
      window.removeEventListener('storage', syncWithGlobal);
    };
  }, [profile.fullName]);

  // --- Cross-Role Sync Listeners ---
  useEffect(() => {
    const handleLeaveSync = (e) => {
      syncWithGlobal();
    };
    window.addEventListener('manager_leave_updated', handleLeaveSync);
    return () => window.removeEventListener('manager_leave_updated', handleLeaveSync);
  }, []);

  // --- Actions ---
  const clockIn = (mode = 'Office') => {
    const now = new Date();
    const entry = {
      id: Date.now().toString(),
      name: profile.fullName,
      date: now.toISOString().split('T')[0],
      clockIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      clockOut: '-',
      totalHours: '0h',
      status: 'Present',
      mode,
      clockInTime: now.toISOString()
    };
    const globalAtt = JSON.parse(localStorage.getItem('hcm_global_attendance') || '[]');
    localStorage.setItem('hcm_global_attendance', JSON.stringify([entry, ...globalAtt]));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const clockOut = () => {
    const now = new Date();
    const globalAtt = JSON.parse(localStorage.getItem('hcm_global_attendance') || '[]');
    const activeIndex = globalAtt.findIndex(a => a.name === profile.fullName && a.clockOut === '-');
    if (activeIndex !== -1) {
      const activeEntry = globalAtt[activeIndex];
      const clockInDate = new Date(activeEntry.clockInTime);
      const diffMs = now - clockInDate;
      const hours = Math.floor(diffMs / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      
      globalAtt[activeIndex] = {
        ...activeEntry,
        clockOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        totalHours: `${hours}h ${mins}m`,
      };
      localStorage.setItem('hcm_global_attendance', JSON.stringify(globalAtt));
      window.dispatchEvent(new CustomEvent('hcm_global_sync'));
    }
  };

  const requestLeave = (req) => {
    const newReq = {
      ...req,
      id: Date.now(),
      name: profile.fullName,
      status: 'Pending',
      managerComment: '',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    const globalLeaves = JSON.parse(localStorage.getItem('hcm_global_leaves') || '[]');
    localStorage.setItem('hcm_global_leaves', JSON.stringify([newReq, ...globalLeaves]));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const cancelLeave = (id) => {
    const globalLeaves = JSON.parse(localStorage.getItem('hcm_global_leaves') || '[]');
    const filtered = globalLeaves.filter(l => l.id !== id);
    localStorage.setItem('hcm_global_leaves', JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const addBenefitClaim = (claim) => {
    const newClaim = {
      ...claim,
      id: `CLM-${Date.now().toString().slice(-4)}`,
      name: profile.fullName,
      status: 'Pending'
    };
    const globalClaims = JSON.parse(localStorage.getItem('hcm_global_benefit_claims') || '[]');
    localStorage.setItem('hcm_global_benefit_claims', JSON.stringify([newClaim, ...globalClaims]));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const uploadDoc = (doc) => setDocuments(prev => [{ ...doc, id: Date.now() }, ...prev]);
  const deleteDoc = (id) => setDocuments(prev => prev.filter(d => d.id !== id));

  const updateGoalProgress = (id, progress) => {
    setPerformance(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, progress } : g)
    }));
  };

  const createTicket = (ticket) => {
    setTickets(prev => [{ ...ticket, id: `TIC-${Math.floor(1000 + Math.random() * 9000)}`, date: new Date().toISOString().split('T')[0], messages: [{ sender: profile.fullName, text: ticket.description, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }, ...prev]);
  };

  const replyTicket = (id, text) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, messages: [...t.messages, { sender: profile.fullName, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] } : t));
  };

  const showToast = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, type } }));
  };

  return (
    <EmployeeContext.Provider value={{
      profile, setProfile,
      attendance, clockIn, clockOut,
      leaves, requestLeave, cancelLeave,
      payroll,
      benefits, addBenefitClaim,
      documents, uploadDoc, deleteDoc,
      performance, updateGoalProgress,
      tickets, createTicket, replyTicket,
      showToast
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployee must be used within an EmployeeProvider');
  return context;
};

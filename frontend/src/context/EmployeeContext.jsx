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
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('employee_attendance');
    return saved ? JSON.parse(saved) : {
      isClockedIn: false,
      clockInTime: null,
      totalWorkedToday: 0,
      breakStartTime: null,
      isOnBreak: false,
      history: [
        { date: '2026-04-20', clockIn: '09:00 AM', clockOut: '06:05 PM', totalHours: '9h 5m', status: 'Present', mode: 'Office' },
        { date: '2026-04-19', clockIn: '08:55 AM', clockOut: '05:45 PM', totalHours: '8h 50m', status: 'Present', mode: 'Remote' },
        { date: '2026-04-18', clockIn: '09:10 AM', clockOut: '06:30 PM', totalHours: '9h 20m', status: 'Late', mode: 'Office' },
        { date: '2026-04-17', clockIn: '-', clockOut: '-', totalHours: '0h', status: 'On Leave', mode: '-' },
        { date: '2026-04-16', clockIn: '09:00 AM', clockOut: '06:00 PM', totalHours: '9h 0m', status: 'Present', mode: 'Hybrid' },
      ]
    };
  });

  // --- Leave Requests State ---
  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('employee_leaves');
    return saved ? JSON.parse(saved) : {
      balance: {
        sick: 10,
        annual: 15,
        casual: 5,
        unpaid: 0
      },
      requests: [
        { id: 1, type: 'Sick Leave', startDate: '2026-04-17', endDate: '2026-04-17', days: 1, reason: 'Fever', status: 'Approved', managerComment: 'Get well soon!', emergencyContact: '+1 (555) 987-6543' },
        { id: 2, type: 'Annual Leave', startDate: '2026-05-10', endDate: '2026-05-15', days: 6, reason: 'Family vacation', status: 'Pending', managerComment: '', emergencyContact: '+1 (555) 987-6543' },
      ]
    };
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
  const [benefits, setBenefits] = useState(() => {
    const saved = localStorage.getItem('employee_benefits');
    return saved ? JSON.parse(saved) : {
      insurance: { plan: 'Premium Health Plus', provider: 'Blue Cross', status: 'Active' },
      dependents: [
        { name: 'Jane Doe', relation: 'Spouse', age: 28 },
        { name: 'Billy Doe', relation: 'Son', age: 4 }
      ],
      claims: [
        { id: 'CLM-01', type: 'Medical', amount: 120, date: '2026-03-15', status: 'Approved', description: 'Monthly checkup' },
        { id: 'CLM-02', type: 'Wellness', amount: 50, date: '2026-04-05', status: 'Pending', description: 'Gym membership' }
      ]
    };
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

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('employee_profile', JSON.stringify(profile));
    localStorage.setItem('employee_attendance', JSON.stringify(attendance));
    localStorage.setItem('employee_leaves', JSON.stringify(leaves));
    localStorage.setItem('employee_payroll', JSON.stringify(payroll));
    localStorage.setItem('employee_benefits', JSON.stringify(benefits));
    localStorage.setItem('employee_documents', JSON.stringify(documents));
    localStorage.setItem('employee_performance', JSON.stringify(performance));
    localStorage.setItem('employee_tickets', JSON.stringify(tickets));
  }, [profile, attendance, leaves, payroll, benefits, documents, performance, tickets]);

  // --- Actions ---
  const clockIn = () => {
    setAttendance(prev => ({
      ...prev,
      isClockedIn: true,
      clockInTime: new Date().toISOString(),
      isOnBreak: false
    }));
  };

  const clockOut = () => {
    const now = new Date();
    const clockInDate = new Date(attendance.clockInTime);
    const diffMs = now - clockInDate;
    const hours = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    
    const newEntry = {
      date: now.toISOString().split('T')[0],
      clockIn: clockInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      clockOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      totalHours: `${hours}h ${mins}m`,
      status: 'Present',
      mode: 'Office'
    };

    setAttendance(prev => ({
      ...prev,
      isClockedIn: false,
      clockInTime: null,
      history: [newEntry, ...prev.history]
    }));
  };

  const requestLeave = (req) => {
    setLeaves(prev => ({
      ...prev,
      requests: [{ ...req, id: Date.now(), status: 'Pending' }, ...prev.requests]
    }));
  };

  const cancelLeave = (id) => {
    setLeaves(prev => ({
      ...prev,
      requests: prev.requests.filter(r => r.id !== id)
    }));
  };

  const addBenefitClaim = (claim) => {
    setBenefits(prev => ({
      ...prev,
      claims: [{ ...claim, id: `CLM-${Date.now().toString().slice(-2)}`, status: 'Pending' }, ...prev.claims]
    }));
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

import React, { createContext, useContext, useState, useEffect } from 'react';

const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  // --- Data States ---
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('manager_team');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Alice Cooper', role: 'Senior Developer', department: 'Engineering', email: 'alice@hcm.ai', phone: '+1 555-0101', joinDate: '2022-03-15', status: 'Active', rating: 4.8, img: 'https://i.pravatar.cc/150?u=alice' },
      { id: 2, name: 'John Wick', role: 'UI/UX Designer', department: 'Product', email: 'john@hcm.ai', phone: '+1 555-0102', joinDate: '2021-11-20', status: 'Active', rating: 4.5, img: 'https://i.pravatar.cc/150?u=john' },
      { id: 3, name: 'Sarah Connor', role: 'QA Engineer', department: 'Engineering', email: 'sarah@hcm.ai', phone: '+1 555-0103', joinDate: '2023-01-10', status: 'Active', rating: 4.2, img: 'https://i.pravatar.cc/150?u=sarah' },
      { id: 4, name: 'Robert Smith', role: 'Product Manager', department: 'Product', email: 'robert@hcm.ai', phone: '+1 555-0104', joinDate: '2020-05-15', status: 'Active', rating: 4.9, img: 'https://i.pravatar.cc/150?u=robert' },
      { id: 5, name: 'Emma Wilson', role: 'Backend Dev', department: 'Engineering', email: 'emma@hcm.ai', phone: '+1 555-0105', joinDate: '2022-08-12', status: 'On Leave', rating: 4.6, img: 'https://i.pravatar.cc/150?u=emma' },
    ];
  });

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [kpis, setKpis] = useState(() => {
    const saved = localStorage.getItem('manager_kpis');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Q4 Product Launch', assignedTo: 'Alice Cooper', progress: 84, status: 'Active', priority: 'High', deadline: '2026-12-15', type: 'Core' },
      { id: 2, title: 'Customer Retention', assignedTo: 'Robert Smith', progress: 62, status: 'At Risk', priority: 'High', deadline: '2026-12-31', type: 'Support' },
      { id: 3, title: 'Team Hiring Phase', assignedTo: 'Emma Wilson', progress: 30, status: 'Delayed', priority: 'Medium', deadline: '2026-11-30', type: 'Growth' },
      { id: 4, title: 'UX Research Sprint', assignedTo: 'John Wick', progress: 100, status: 'Completed', priority: 'Low', deadline: '2026-10-15', type: 'Innovation' },
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('manager_reviews');
    return saved ? JSON.parse(saved) : [
      { id: 1, employeeId: 1, name: 'Alice Cooper', period: 'Q3 2026', rating: 4.8, status: 'Completed', completedAt: '2026-09-30' },
      { id: 2, employeeId: 2, name: 'John Wick', period: 'Q3 2026', rating: 4.5, status: 'Completed', completedAt: '2026-10-02' },
      { id: 3, employeeId: 3, name: 'Sarah Connor', period: 'Q4 2026', rating: 0, status: 'Draft', completedAt: null },
    ];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('manager_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Fix Dashboard Latency', user: 'Alice Cooper', priority: 'High', deadline: '2026-10-25', status: 'In Progress' },
      { id: 2, title: 'Review PR #452', user: 'Sarah Connor', priority: 'Medium', deadline: '2026-10-24', status: 'Pending' },
      { id: 3, title: 'Client Feedback Analysis', user: 'Robert Smith', priority: 'Low', deadline: '2026-10-26', status: 'Completed' },
    ];
  });

  // --- Global Synchronization Logic ---
  const syncWithGlobal = () => {
    // 1. Sync Leaves
    let globalLeaves = localStorage.getItem('hcm_global_leaves');
    if (!globalLeaves) {
      const defaults = [
        { id: 1, name: 'Alice Cooper', type: 'Sick Leave', startDate: '2026-10-24', endDate: '2026-10-26', days: 3, reason: 'Flu symptoms and fever', status: 'Pending', submittedAt: '2026-10-22', attachment: 'medical_report.pdf' },
        { id: 2, name: 'John Wick', type: 'Annual Leave', startDate: '2026-10-28', endDate: '2026-10-31', days: 4, reason: 'Family vacation', status: 'Pending', submittedAt: '2026-10-21', attachment: null },
        { id: 3, name: 'Sarah Connor', type: 'Casual Leave', startDate: '2026-11-02', endDate: '2026-11-02', days: 1, reason: 'Personal work', status: 'Pending', submittedAt: '2026-10-23', attachment: null },
      ];
      localStorage.setItem('hcm_global_leaves', JSON.stringify(defaults));
      globalLeaves = JSON.stringify(defaults);
    }
    setLeaveRequests(JSON.parse(globalLeaves));

    // 2. Sync Attendance
    let globalAtt = localStorage.getItem('hcm_global_attendance');
    if (!globalAtt) {
      const today = new Date().toISOString().split('T')[0];
      const defaults = [
        { id: 1, name: 'Alice Cooper', date: today, clockIn: '09:05 AM', clockOut: '06:15 PM', totalHours: '9h 10m', status: 'Present', mode: 'Office' },
        { id: 2, name: 'John Wick', date: today, clockIn: '08:55 AM', clockOut: '05:45 PM', totalHours: '8h 50m', status: 'Present', mode: 'Remote' },
        { id: 3, name: 'Sarah Connor', date: today, clockIn: '09:15 AM', clockOut: '06:30 PM', totalHours: '9h 15m', status: 'Late', mode: 'Office' },
        { id: 4, name: 'Robert Smith', date: today, clockIn: '09:00 AM', clockOut: '06:00 PM', totalHours: '9h 0m', status: 'Present', mode: 'Office' },
        { id: 5, name: 'Emma Wilson', date: today, clockIn: '-', clockOut: '-', totalHours: '0h', status: 'On Leave', mode: '-' },
      ];
      localStorage.setItem('hcm_global_attendance', JSON.stringify(defaults));
      globalAtt = JSON.stringify(defaults);
    }
    setAttendance(JSON.parse(globalAtt));
  };

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('manager_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('manager_kpis', JSON.stringify(kpis));
  }, [kpis]);

  useEffect(() => {
    localStorage.setItem('manager_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('manager_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- Global Synchronization Hook ---
  useEffect(() => {
    syncWithGlobal();
    window.addEventListener('hcm_global_sync', syncWithGlobal);
    window.addEventListener('storage', syncWithGlobal);
    return () => {
      window.removeEventListener('hcm_global_sync', syncWithGlobal);
      window.removeEventListener('storage', syncWithGlobal);
    };
  }, []);

  // --- Actions ---
  const addTeamMember = (member) => setTeamMembers(prev => [{ ...member, id: Date.now() }, ...prev]);
  const updateTeamMember = (id, data) => setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));

  const updateLeaveStatus = (id, status) => {
    const globalLeaves = JSON.parse(localStorage.getItem('hcm_global_leaves') || '[]');
    const updated = globalLeaves.map(l => {
      if (l.id === id) {
        if (status === 'Approved') {
          const newEntry = {
            id: Date.now() + Math.random(),
            name: l.name,
            date: l.startDate,
            clockIn: '-',
            clockOut: '-',
            totalHours: '0h',
            status: 'On Leave',
            mode: '-'
          };
          const globalAtt = JSON.parse(localStorage.getItem('hcm_global_attendance') || '[]');
          localStorage.setItem('hcm_global_attendance', JSON.stringify([newEntry, ...globalAtt]));
        }
        
        // Dispatch event for cross-role syncing (EmployeeContext)
        window.dispatchEvent(new CustomEvent('manager_leave_updated', { 
          detail: { id: l.id, status } 
        }));

        return { ...l, status };
      }
      return l;
    });
    localStorage.setItem('hcm_global_leaves', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const addLeaveRequest = (request) => {
    const newReq = {
      ...request,
      id: Date.now(),
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    const globalLeaves = JSON.parse(localStorage.getItem('hcm_global_leaves') || '[]');
    localStorage.setItem('hcm_global_leaves', JSON.stringify([newReq, ...globalLeaves]));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const addAttendanceEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      clockOut: entry.clockOut || '-'
    };
    const globalAtt = JSON.parse(localStorage.getItem('hcm_global_attendance') || '[]');
    localStorage.setItem('hcm_global_attendance', JSON.stringify([newEntry, ...globalAtt]));
    window.dispatchEvent(new CustomEvent('hcm_global_sync'));
  };

  const addKPI = (goal) => setKpis(prev => [{ ...goal, id: Date.now() }, ...prev]);
  const updateKPIProgress = (id, progress) => setKpis(prev => prev.map(k => k.id === id ? { ...k, progress, status: progress === 100 ? 'Completed' : k.status } : k));

  const addTask = (task) => setTasks(prev => [{ ...task, id: Date.now() }, ...prev]);
  const updateTaskStatus = (id, status) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));

  const addReview = (review) => setReviews(prev => [{ ...review, id: Date.now() }, ...prev]);

  const showToast = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, type } }));
  };

  return (
    <ManagerContext.Provider value={{
      teamMembers, setTeamMembers, addTeamMember, updateTeamMember,
      leaveRequests, setLeaveRequests, updateLeaveStatus, addLeaveRequest,
      attendance, setAttendance, addAttendanceEntry,
      kpis, setKpis, addKPI, updateKPIProgress,
      reviews, setReviews, addReview,
      tasks, setTasks, addTask, updateTaskStatus,
      showToast
    }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) throw new Error('useManager must be used within a ManagerProvider');
  return context;
};

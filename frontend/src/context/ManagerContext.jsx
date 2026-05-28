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

  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem('manager_leaves');
    return saved ? JSON.parse(saved) : [
      { id: 1, employeeId: 1, name: 'Alice Cooper', type: 'Sick Leave', startDate: '2026-10-24', endDate: '2026-10-26', days: 3, reason: 'Flu symptoms and fever', status: 'Pending', submittedAt: '2026-10-22', attachment: 'medical_report.pdf' },
      { id: 2, employeeId: 2, name: 'John Wick', type: 'Annual Leave', startDate: '2026-10-28', endDate: '2026-10-31', days: 4, reason: 'Family vacation', status: 'Pending', submittedAt: '2026-10-21', attachment: null },
      { id: 3, employeeId: 3, name: 'Sarah Connor', type: 'Casual Leave', startDate: '2026-11-02', endDate: '2026-11-02', days: 1, reason: 'Personal work', status: 'Pending', submittedAt: '2026-10-23', attachment: null },
    ];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('manager_attendance');
    const today = new Date().toISOString().split('T')[0];
    return saved ? JSON.parse(saved) : [
      { id: 1, employeeId: 1, name: 'Alice Cooper', date: today, checkIn: '09:05 AM', checkOut: '06:15 PM', status: 'Present', overtime: '0.25h', breakTime: '1h' },
      { id: 2, employeeId: 2, name: 'John Wick', date: today, checkIn: '08:55 AM', checkOut: '05:45 PM', status: 'Present', overtime: '0h', breakTime: '1h' },
      { id: 3, employeeId: 3, name: 'Sarah Connor', date: today, checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Late', overtime: '0.5h', breakTime: '45m' },
      { id: 4, employeeId: 4, name: 'Robert Smith', date: today, checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', overtime: '0h', breakTime: '1h' },
      { id: 5, employeeId: 5, name: 'Emma Wilson', date: today, checkIn: '-', checkOut: '-', status: 'On Leave', overtime: '0h', breakTime: '0h' },
    ];
  });

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
      { id: 1, title: 'Fix Dashboard Latency', assignee: 'Alice Cooper', priority: 'High', dueDate: '2026-10-25', status: 'In Progress' },
      { id: 2, title: 'Review PR #452', assignee: 'Sarah Connor', priority: 'Medium', dueDate: '2026-10-24', status: 'Pending' },
      { id: 3, title: 'Client Feedback Analysis', assignee: 'Robert Smith', priority: 'Low', dueDate: '2026-10-26', status: 'Completed' },
    ];
  });

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('manager_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('manager_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem('manager_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('manager_kpis', JSON.stringify(kpis));
  }, [kpis]);

  useEffect(() => {
    localStorage.setItem('manager_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('manager_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- Actions ---
  const addTeamMember = (member) => setTeamMembers(prev => [{ ...member, id: Date.now() }, ...prev]);
  const updateTeamMember = (id, data) => setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));

  const updateLeaveStatus = (id, status) => setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  const addLeaveRequest = (request) => setLeaveRequests(prev => [{ ...request, id: Date.now(), status: 'Pending', submittedAt: new Date().toISOString().split('T')[0] }, ...prev]);

  const addAttendanceEntry = (entry) => setAttendance(prev => [{ ...entry, id: Date.now() }, ...prev]);

  const addKPI = (goal) => setKpis(prev => [{ ...goal, id: Date.now() }, ...prev]);
  const updateKPIProgress = (id, progress) => setKpis(prev => prev.map(k => k.id === id ? { ...k, progress, status: progress === 100 ? 'Completed' : k.status } : k));

  const addTask = (task) => setTasks(prev => [{ ...task, id: Date.now() }, ...prev]);
  const updateTaskStatus = (id, status) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));

  const addReview = (review) => setReviews(prev => [{ ...review, id: Date.now() }, ...prev]);

  const showToast = (message, type = 'success') => {
    // Basic toast mock, actual implementation would use a toast library or custom hook
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Dispatch a custom event for toast components to listen to
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

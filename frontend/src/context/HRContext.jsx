import React, { createContext, useContext, useState, useEffect } from 'react';

const HRContext = createContext();

export const useHR = () => useContext(HRContext);

export const HRProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast({ message: '', visible: false, type: 'success' }), 3000);
  };

  // Check LocalStorage
  const loadInitialData = (key, defaultData) => {
    const saved = localStorage.getItem(`hcm_hr_${key}`);
    return saved ? JSON.parse(saved) : defaultData;
  };

  const usePersistedState = (key, defaultData) => {
    const [state, setState] = useState(() => loadInitialData(key, defaultData));
    useEffect(() => {
      localStorage.setItem(`hcm_hr_${key}`, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };

  // --- JOBS ---
  const initialJobs = [
    { id: 'J-1', title: 'Senior Frontend Developer', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-Time', status: 'Published', applied: 142, new: 12 },
    { id: 'J-2', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-Time', status: 'Published', applied: 89, new: 5 },
    { id: 'J-3', title: 'UX Designer', department: 'Design', location: 'New York, NY', type: 'Contract', status: 'Draft', applied: 0, new: 0 }
  ];
  const [jobs, setJobs] = usePersistedState('jobs', initialJobs);

  const addJob = (job) => {
    setJobs([{ ...job, id: `J-${Date.now()}`, applied: 0, new: 0 }, ...jobs]);
    showToast('Job created successfully');
  };
  const updateJob = (id, data) => {
    setJobs(jobs.map(j => (j.id === id ? { ...j, ...data } : j)));
    showToast('Job updated');
  };
  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    showToast('Job deleted');
  };

  // --- CANDIDATES / PIPELINE ---
  const initialCandidates = [
    { id: 'C-1', name: 'Sarah Connor', role: 'Senior Frontend Developer', stage: 'Interview', match: 95, date: 'Oct 20, 2026', email: 'sarah@example.com' },
    { id: 'C-2', name: 'John Wick', role: 'Product Manager', stage: 'Screening', match: 88, date: 'Oct 19, 2026', email: 'john@example.com' },
    { id: 'C-3', name: 'Alice Cooper', role: 'Senior Frontend Developer', stage: 'Applied', match: 76, date: 'Oct 21, 2026', email: 'alice@example.com' },
    { id: 'C-4', name: 'Bob Marley', role: 'UX Designer', stage: 'Shortlisted', match: 92, date: 'Oct 18, 2026', email: 'bob@example.com' },
    { id: 'C-5', name: 'Eve Adams', role: 'Product Manager', stage: 'Offer', match: 90, date: 'Oct 15, 2026', email: 'eve@example.com' },
  ];
  const [candidates, setCandidates] = usePersistedState('candidates', initialCandidates);

  const addCandidate = (cand) => {
    setCandidates([{ ...cand, id: `C-${Date.now()}`, date: new Date().toLocaleDateString() }, ...candidates]);
    showToast('Candidate added');
  };
  const updateCandidate = (id, data) => {
    setCandidates(candidates.map(c => (c.id === id ? { ...c, ...data } : c)));
    showToast('Candidate updated');
  };
  const moveCandidateStage = (id, stage) => {
    setCandidates(candidates.map(c => (c.id === id ? { ...c, stage } : c)));
    showToast(`Candidate moved to ${stage}`);
  };
  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
    showToast('Candidate removed');
  };

  // --- INTERVIEWS ---
  const initialInterviews = [
    { id: 'I-1', candidate: 'Sarah Connor', role: 'Senior Frontend Developer', date: 'Oct 22, 2026', time: '10:00 AM', interviewer: 'Mike Ross', status: 'Scheduled', type: 'Video Call' },
    { id: 'I-2', candidate: 'Bob Marley', role: 'UX Designer', date: 'Oct 22, 2026', time: '02:00 PM', interviewer: 'Harvey Specter', status: 'Completed', type: 'Technical' },
  ];
  const [interviews, setInterviews] = usePersistedState('interviews', initialInterviews);
  
  const addInterview = (intv) => {
    setInterviews([{ ...intv, id: `I-${Date.now()}` }, ...interviews]);
    showToast('Interview scheduled');
  };
  const updateInterview = (id, data) => {
    setInterviews(interviews.map(i => (i.id === id ? { ...i, ...data } : i)));
    showToast('Interview updated');
  };

  const deleteInterview = (id) => {
    setInterviews(interviews.filter(i => i.id !== id));
    showToast('Interview cancelled');
  };

  // --- OFFERS ---
  const initialOffers = [
    { id: 'O-1', candidate: 'Eve Adams', role: 'Product Manager', date: 'Oct 15, 2026', expiry: 'Oct 22, 2026', status: 'Sent' },
  ];
  const [offers, setOffers] = usePersistedState('offers', initialOffers);

  const addOffer = (offer) => {
    setOffers([{ ...offer, id: `O-${Date.now()}` }, ...offers]);
    showToast('Offer created');
  };
  const updateOffer = (id, data) => {
    setOffers(offers.map(o => (o.id === id ? { ...o, ...data } : o)));
    showToast('Offer updated');
  };

  // --- ONBOARDING ---
  const initialOnboarding = [
    { id: 'OB-1', name: 'Eve Adams', role: 'Product Manager', start: 'Nov 1, 2026', progress: 40, status: 'In Progress' },
  ];
  const [onboarding, setOnboarding] = usePersistedState('onboarding', initialOnboarding);

  const updateOnboarding = (id, data) => {
    setOnboarding(onboarding.map(o => (o.id === id ? { ...o, ...data} : o)));
  };
  const addOnboarding = (data) => {
    setOnboarding([{ ...data, id: `OB-${Date.now()}`, progress: 0, status: 'Not Started' }, ...onboarding]);
    showToast('New hire added to onboarding');
  };
  const deleteOnboarding = (id) => {
    setOnboarding(onboarding.filter(o => o.id !== id));
    showToast('Hire removed from onboarding', 'error');
  };

  return (
    <HRContext.Provider value={{
      jobs, addJob, updateJob, deleteJob,
      candidates, addCandidate, updateCandidate, moveCandidateStage, deleteCandidate,
      interviews, addInterview, updateInterview, deleteInterview,
      offers, addOffer, updateOffer,
      onboarding, addOnboarding, updateOnboarding, deleteOnboarding,
      showToast
    }}>
      {children}
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
          <p className="text-sm font-bold tracking-tight">{toast.message}</p>
        </div>
      )}
    </HRContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const CandidateContext = createContext();

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) throw new Error('useCandidate must be used within a CandidateProvider');
  return context;
};

export const CandidateProvider = ({ children }) => {
  const [candidate, setCandidate] = useState(() => {
    const saved = localStorage.getItem('hcm_candidate_data');
    if (saved) return JSON.parse(saved);

    // Premium Mock Data for first-time load
    return {
      profile: {
        fullName: 'Alex Rivera',
        role: 'Senior Product Designer',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 000-0000',
        location: 'New York, USA',
        address: '742 Design Avenue',
        city: 'New York',
        country: 'USA',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        dob: '1992-05-15',
        bio: 'Passionate product designer with 8+ years of experience in building scalable design systems and user-centric interfaces. Focused on bridging the gap between design and development.',
        linkedin: 'https://linkedin.com/in/alexrivera',
        portfolio: 'https://alexrivera.design',
        website: 'https://alexrivera.me',
        currentSalary: '$120,000',
        expectedSalary: '$145,000',
        experience: '8 Years',
        noticePeriod: '30 Days',
        skills: ['UI Rendering', 'UX Research', 'Figma', 'React.js', 'System Design'],
        settings: {
          account: {
            name: 'Alex Rivera',
            email: 'alex.rivera@example.com',
            phone: '+1 (555) 000-0000',
            location: 'New York, USA'
          },
          security: {
            twoFactor: true,
            activeSessions: [
              { id: 1, device: 'MacBook Pro 16"', location: 'New York, US', ip: '192.168.1.1', status: 'Active Now' },
              { id: 2, device: 'iPhone 15 Pro', location: 'New York, US', ip: '192.168.1.5', status: '2 hours ago' }
            ]
          },
          notifications: {
            emailAlerts: true,
            interviewAlerts: true,
            offerAlerts: true,
            jobRecommendations: true,
            pushNotifications: false
          },
          preferences: {
            theme: 'light',
            language: 'English',
            timezone: 'UTC -5 (Eastern Time)',
            defaultDashboard: 'Standard'
          }
        },
        documents: [
          { id: 'DOC-001', name: 'Identity_Proof.pdf', type: 'Identification', date: '2024-01-15' },
          { id: 'DOC-002', name: 'Degree_Certificate.pdf', type: 'Education', date: '2024-01-20' }
        ]
      },
      resume: {
        personal: {
          photo: 'https://i.pravatar.cc/150?u=alex',
          firstName: 'Alex',
          lastName: 'Rivera',
          title: 'Senior Product Designer',
          email: 'alex.rivera@example.com',
          phone: '+1 (555) 000-0000',
          address: '742 Design Avenue',
          city: 'New York',
          country: 'USA',
          summary: 'Creative Lead with extensive experience in fintech and SaaS sectors.',
          linkedin: 'linkedin.com/in/alex-rivera',
          portfolio: 'rivera.design'
        },
        experience: [
          { id: 1, company: 'DesignFlow Inc', role: 'Product Lead', type: 'Full-time', start: '2021-01', end: 'Present', current: true, desc: 'Leading the design system team of 12 designers. Orchestrating global UI standards across 4 core products.' },
          { id: 2, company: 'PixelPerfect', role: 'UI Designer', type: 'Full-time', start: '2018-03', end: '2020-12', current: false, desc: 'Crafted mobile-first experiences for over 2M users. Reduced churn rate by 15% through data-driven UX iterations.' }
        ],
        education: [
          { id: 1, school: 'Design Institute of Tech', degree: 'Masters', field: 'Interaction Design', start: '2016', end: '2018', grade: '3.9 GPA' }
        ],
        skills: [
          { name: 'Figma', level: 95 },
          { name: 'React', level: 80 },
          { name: 'Node.js', level: 60 },
          { name: 'System Design', level: 90 },
          { name: 'User Research', level: 85 }
        ],
        template: { id: 1, name: 'Tactical Clean' },
        extras: {
          certs: ['Google UX Design Professional', 'Certified Scrum Master', 'AWS Cloud Architect'],
          languages: ['English (Native)', 'Spanish (Fluent)', 'German (Intermediate)'],
          awards: ['Design of the Year 2023 - Awwwards', 'Top 50 Product Designers 2024'],
          interests: ['Motion Graphics', 'Photography', 'Synthesizers', 'Mountain Biking']
        }
      },
      jobs: {
        savedIndices: [1, 3],
        allJobs: [
          { id: 1, title: 'Senior UX Designer', company: 'GlobalTech', type: 'Full-time', location: 'Remote', salary: '$130k - $160k', department: 'Design', posted: '2d ago', desc: 'Join our award-winning team to revolutionize how humans interact with AI.', requirements: ['8+ years experience', 'Portfolio of SaaS work', 'Figma expert'], benefits: ['Stock options', 'Unlimited PTO', 'Home office budget'] },
          { id: 2, title: 'Frontend Engineer', company: 'CloudScale', type: 'Full-time', location: 'San Francisco', salary: '$140k - $180k', department: 'Eng', posted: '1d ago', desc: 'Scaling the next generation of cloud infrastructure interfaces.', requirements: ['React expertise', 'TypeScript', 'D3.js experience'], benefits: ['Health/Dental/Vision', '401k match', 'Free lunch'] },
          { id: 3, title: 'Product Manager', company: 'FinEdge', type: 'Hybrid', location: 'New York', salary: '$150k - $190k', department: 'Product', posted: '3d ago', desc: 'Lead the strategy for our new retail banking vertical.', requirements: ['Fintech background', 'Agile expert', 'Strong analytics'], benefits: ['Performance bonus', 'Global travel', 'Gym membership'] },
          { id: 4, title: 'Visual Designer', company: 'CreativePulse', type: 'Contract', location: 'London', salary: '£400 - £600 /day', department: 'Design', posted: '5h ago', desc: 'Focusing on brand identity and marketing assets for top-tier clients.', requirements: ['Adobe Suite master', 'Typography skills', 'Motion is a plus'], benefits: ['Flexible hours', 'Remote work', 'Creative autonomy'] },
          { id: 5, title: 'Design Ops Manager', company: 'Linear', type: 'Full-time', location: 'Remote', salary: '$160k - $200k', department: 'Design', posted: '12h ago', desc: 'Building the infrastructure for the most productive teams in the world.', requirements: ['Experience in scale', 'Figma power-user', 'Great empathy'], benefits: ['Premium equipment', 'Yearly retreats', 'Health insurance'] }
        ]
      },
      applications: [
        { id: 'APP-001', jobId: 1, date: '2026-04-10', status: 'Shortlisted', company: 'GlobalTech', role: 'Senior UX Designer', timeline: [{ status: 'Applied', date: '2026-04-10' }, { status: 'Under Review', date: '2026-04-12' }, { status: 'Shortlisted', date: '2026-04-15' }] },
        { id: 'APP-002', jobId: 3, date: '2026-04-18', status: 'Applied', company: 'FinEdge', role: 'Product Manager', timeline: [{ status: 'Applied', date: '2026-04-18' }] }
      ],
      interviews: [
        { id: 1, appId: 'APP-001', role: 'Senior UX Designer', company: 'GlobalTech', round: 'Technical Design Audit', date: 'Tomorrow, Oct 25', time: '10:00 AM', timezone: 'PST', interviewer: 'Sarah Connor', interviewerRole: 'Director of Design', link: 'https://meet.hcm.ai/globaltech-ux', isNext: true, status: 'Scheduled', type: 'Video Call' },
        { id: 2, appId: 'APP-002', role: 'Product Manager', company: 'FinEdge', round: 'Strategic Roadmap Review', date: 'Wed, Oct 28', time: '02:00 PM', timezone: 'EST', interviewer: 'David Vonderhaar', interviewerRole: 'Head of Product', link: 'https://meet.hcm.ai/finedge-strat', isNext: false, status: 'Scheduled', type: 'Video Call' }
      ],
      notifications: [
        { id: 1, type: 'offers', title: 'Tactical Offer Payload', message: 'HedgeLink has dispatched a formal career offer for the Chief Design Node role.', time: '2h ago', isUnread: true, action: 'Review Offer', priority: 'high' },
        { id: 2, type: 'jobs', title: 'Shortlist Activation', message: 'You have been advanced to Phase 2 for the Senior Architect role at TechFlow.', time: '1d ago', isUnread: true, action: 'View Details', priority: 'medium' },
        { id: 3, type: 'interviews', title: 'Audit Signal Reminder', message: 'Technical audit with GlobalTech initiates in 18 hours. Preparation required.', time: '3h ago', isUnread: false, action: 'Prepare Now', priority: 'high' }
      ],
      documents: [
        { id: 1, name: 'Alex_Rivera_CV_2026.pdf', type: 'PDF', size: '2.4 MB', date: '2026-04-01' },
        { id: 2, name: 'Portfolio_Selected_Works.pdf', type: 'PDF', size: '15.8 MB', date: '2026-04-05' }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('hcm_candidate_data', JSON.stringify(candidate));
  }, [candidate]);

  const showToast = (message, type = 'success') => {
    console.log(`[HCM_TOAST] ${message} (${type})`);
    // Unified UI feedback would trigger here
  };

  const updateProfile = (newData) => {
    setCandidate(prev => ({ ...prev, profile: { ...prev.profile, ...newData } }));
  };

  const updateResumeStep = (step, data) => {
    setCandidate(prev => ({
      ...prev,
      resume: { ...prev.resume, [step]: data }
    }));
  };

  const applyForJob = (jobId, details) => {
    const job = candidate.jobs.allJobs.find(j => j.id === jobId);
    const newApp = {
      id: `APP-${Math.floor(1000 + Math.random() * 9999)}`,
      jobId,
      date: new Date().toISOString().split('T')[0],
      status: 'Applied',
      company: job.company,
      role: job.title,
      timeline: [{ status: 'Applied', date: new Date().toISOString().split('T')[0] }],
      ...details
    };
    setCandidate(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications],
      notifications: [{
        id: Date.now(),
        type: 'jobs',
        title: 'Application Dispatched',
        message: `Your career payload for ${job.title} has been successfully submitted to ${job.company}.`,
        time: 'Just now',
        isUnread: true,
        priority: 'medium'
      }, ...prev.notifications]
    }));
    showToast(`Application successfully dispatched for ${job.title}`);
  };

  const saveJob = (jobId) => {
    setCandidate(prev => {
      const saved = prev.jobs.savedIndices.includes(jobId) 
        ? prev.jobs.savedIndices.filter(id => id !== jobId)
        : [...prev.jobs.savedIndices, jobId];
      return { ...prev, jobs: { ...prev.jobs, savedIndices: saved } };
    });
  };

  const withdrawApplication = (appId) => {
    setCandidate(prev => ({
      ...prev,
      applications: prev.applications.filter(a => a.id !== appId)
    }));
    showToast('Career node occupancy withdrawn', 'info');
  };

  // Notification Core Functions
  const markAsRead = (id) => {
    setCandidate(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, isUnread: false } : n)
    }));
  };

  const markAllAsRead = () => {
    setCandidate(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, isUnread: false }))
    }));
  };

  const deleteNotification = (id) => {
    setCandidate(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  };

  const clearAllNotifications = () => {
    setCandidate(prev => ({ ...prev, notifications: [] }));
  };

  const addDocument = (doc) => {
    setCandidate(prev => ({
      ...prev,
      documents: [{ id: Date.now(), ...doc }, ...prev.documents]
    }));
  };

  const deleteDocument = (id) => {
    setCandidate(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
  };

  const value = {
    ...candidate,
    updateProfile,
    updateResumeStep,
    applyForJob,
    saveJob,
    withdrawApplication,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addDocument,
    deleteDocument,
    showToast
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

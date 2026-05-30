import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Brain, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  BarChart3, 
  Target, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Lock,
  Globe,
  Bot,
  PieChart,
  CheckCircle2,
  HelpCircle,
  Mail, 
  Share2, 
  ChevronDown,
  Search,
  Heart,
  Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [demoFormData, setDemoFormData] = useState({ name: '', email: '', companySize: '11-50', requirement: 'AI Recruitment' });
  const [selectedDate, setSelectedDate] = useState('Monday, June 1');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900 scroll-smooth transition-colors duration-300">
      {/* 1. NAVBAR */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-300 border-b",
        scrolled ? "bg-white/80 backdrop-blur-xl border-slate-100 py-3 shadow-soft" : "bg-transparent border-transparent py-5"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200 group-hover:rotate-6 transition-transform">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">AI HCM <span className="text-primary-600">Platform</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'Features', 'Roles', 'Pricing', 'Careers', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors uppercase tracking-[0.15em]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Login</button>
            <button onClick={() => { setIsDemoModalOpen(true); setDemoStep(1); }} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95">Book Demo</button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                {['Home', 'Features', 'Roles', 'Pricing', 'Careers', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-slate-500"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                  <button onClick={() => navigate('/login')} className="w-full py-4 text-slate-600 font-bold border border-slate-100 rounded-2xl">Login</button>
                  <button onClick={() => { setIsMenuOpen(false); navigate('/book-demo'); }} className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg">Get Demo</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-32 lg:pt-48 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm border border-primary-100">
                <Sparkles size={14} fill="currentColor" />
                <span>Next-Gen Workforce OS</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                Transform Workforce <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Management</span> with AI
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                Manage recruitment, onboarding, payroll, attendance, performance and compliance in one intelligent platform powered by proprietary AI models.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                >
                  Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/book-demo')} className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-100 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-soft flex items-center justify-center gap-3">
                  Book Demo
                </button>
              </div>
              <div className="flex items-center gap-8 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-primary-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-indigo-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Smart Automation</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-[3rem] shadow-3xl p-4 border border-slate-100 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="rounded-[2.5rem] w-full"
                />
              </div>
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 -right-10 w-64 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hiring Efficiency</p>
                    <p className="text-xl font-black text-slate-900">+42%</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '74%' }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-10 w-64 p-6 bg-slate-900 rounded-3xl shadow-2xl z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      <Brain size={20} />
                   </div>
                   <span className="text-xs font-bold text-white tracking-tight">AI Screening Success</span>
                </div>
                <div className="space-y-3">
                   {[1, 2].map(i => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: i === 1 ? '90%' : '75%' }} className="h-full bg-primary-400" />
                         </div>
                      </div>
                   ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TRUST / STATS SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Faster Hiring', val: '10x', desc: 'AI-driven screening', icon: Zap },
              { label: 'System Uptime', val: '99.9%', desc: 'Enterprise reliability', icon: ShieldCheck },
              { label: 'Experience Roles', val: '5', desc: 'Custom portals', icon: Users },
              { label: 'Smart Insights', val: '24/7', desc: 'Real-time analytics', icon: Brain },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 flex flex-col items-center text-center group hover:bg-primary-600 transition-all duration-500"
              >
                <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-white">{stat.val}</h3>
                <p className="text-xs font-black text-primary-600 uppercase tracking-widest group-hover:text-primary-100 mb-1">{stat.label}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/60">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES SECTION */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em]">Core Capabilities</span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">Everything you need to <br /> scale your workforce</h2>
            <p className="text-lg text-slate-500 font-medium tracking-tight">Our platform brings together all aspects of HCM into a single, cohesive intelligent ecosystem.</p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Search, title: 'AI Recruitment', desc: 'Auto-scan resumes and rank candidates with proprietary ML models.' },
              { icon: Zap, title: 'Smart Onboarding', desc: 'Automated document collection and workflow assignment for new hires.' },
              { icon: Calendar, title: 'Attendance Tracking', desc: 'Biometric, geo-fenced and web-based attendance monitoring.' },
              { icon: DollarSign, title: 'Payroll Automation', desc: 'Seamless monthly payouts with integrated tax and deduction rules.' },
              { icon: Target, title: 'Performance KPI', desc: 'Real-time objective tracking and balanced scorecards for teams.' },
              { icon: Heart, title: 'Benefits Mgmt', desc: 'Configure multi-tier insurance, wellness and reimbursement plans.' },
              { icon: ShieldCheck, title: 'Compliance Center', desc: 'Immutable audit logs and organizational policy alignment tools.' },
              { icon: BarChart3, title: 'Reports & Analytics', desc: 'Deep-dive visualization of every metric across your organization.' },
            ].map((feat, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-5 bg-slate-50 text-slate-400 rounded-[2rem] mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <feat.icon size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-none">{feat.title}</h4>
                <p className="text-sm font-medium text-slate-400 leading-relaxed tracking-tight">{feat.desc}</p>
                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                   <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-2 group/btn">
                      Learn More <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. ROLE-BASED PLATFORM SECTION */}
      <section id="roles" className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-primary-600 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
               <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-6 inline-block">Experience-Centric Design</span>
               <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none mb-10 text-slate-900">
                 Unified Experience, <br /> 
                 <span className="text-primary-600">Dedicated Portals.</span>
               </h2>
               <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
                 We've engineered specialized high-fidelity interfaces for every role in your organization, ensuring maximum efficiency and minimal learning curve.
               </p>
               <div className="space-y-6">
                  {[
                    { role: 'Candidate', action: 'Apply jobs, check resume score' },
                    { role: 'Employee', action: 'Track attendance, manage payroll' },
                    { role: 'Manager', action: 'Approve leave, review team KPI' },
                    { role: 'HR / Recruiter', action: 'Manage pipeline, publish job posts' },
                    { role: 'Admin', action: 'Full organization oversight & AI config' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-white hover:shadow-soft transition-all">
                       <div className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform" />
                       <div className="flex-1">
                          <span className="text-lg font-black tracking-tight text-slate-800 group-hover:text-primary-600 transition-colors">{item.role}</span>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{item.action}</p>
                       </div>
                       <ArrowRight size={20} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  ))}
               </div>
            </motion.div>

            <motion.div 
               {...fadeIn}
               transition={{ delay: 0.3 }}
               className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
               {[
                 { title: 'Candidate Portal', img: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2671' },
                 { title: 'Manager Suite', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2670' },
                 { title: 'Employee Hub', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671' },
                 { title: 'Admin Control', img: 'https://images.unsplash.com/photo-1454165833772-d9962308607c?q=80&w=2670' },
               ].map((card, i) => (
                 <div key={i} className={cn("relative group rounded-[2.5rem] overflow-hidden aspect-[4/5]", i % 2 !== 0 ? "sm:mt-12" : "")}>
                    <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-2">Role Experience</p>
                       <h4 className="text-2xl font-black tracking-tight">{card.title}</h4>
                    </div>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. AI AUTOMATION SECTION */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div {...fadeIn} className="flex-1 space-y-10 order-2 lg:order-1">
               <div className="p-10 bg-white text-slate-900 border border-slate-100 shadow-soft relative rounded-[3.5rem] overflow-hidden group">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary-600 transition-all duration-1000 group-hover:scale-x-110" />
                  <div className="flex items-center gap-4 mb-10">
                     <div className="p-4 bg-primary-600 rounded-2xl shadow-xl shadow-primary-200">
                        <Brain size={32} className="text-white" />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black tracking-tight">AI Engine v4.0</h4>
                        <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mt-1">Deep Learning Module Active</p>
                     </div>
                  </div>
                  <div className="space-y-8">
                     {[
                       { label: 'Resume Screening', score: 98 },
                       { label: 'Candidate Rank Accuracy', score: 94 },
                       { label: 'Attrition Predictor', score: 87 },
                     ].map((item, i) => (
                       <div key={i} className="space-y-3">
                          <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                             <span className="text-slate-800">{item.label}</span>
                             <span className="text-primary-600">{item.score}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                             <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.score}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className="h-full bg-primary-600" />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="card p-8 bg-white border border-slate-100 shadow-soft rounded-[2.5rem]">
                     <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-4 w-fit">
                        <Bot size={24} />
                     </div>
                     <p className="text-xl font-black text-slate-900 mb-2">Smart Assist</p>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed tracking-tight">Real-time candidate Q&A via proprietary LLM endpoints.</p>
                  </div>
                  <div className="card p-8 bg-white border border-slate-100 shadow-soft rounded-[2.5rem]">
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mb-4 w-fit">
                        <TrendingUp size={24} />
                     </div>
                     <p className="text-xl font-black text-slate-900 mb-2">Bias Neutral</p>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed tracking-tight">AI models audited for fairness and EEOC compliance.</p>
                  </div>
               </div>
            </motion.div>

            <motion.div {...fadeIn} className="flex-1 order-1 lg:order-2">
               <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-6 inline-block">Automation First</span>
               <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-10 leading-none">
                 Intelligent Decisions. <br /> 
                 <span className="text-slate-400">Zero Guesswork.</span>
               </h2>
               <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed tracking-tight">
                 Let our AI handle the volume while you focus on the people. From ranking resumes to predicting exit risks, we provide the insights you need to lead.
               </p>
               <ul className="space-y-6">
                  {['Automated Skill Gap Analysis', 'Proprietary Attrition Prediction Model', 'Dynamic Interview Question Generator', 'Smart Workforce Planning Insights'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 tracking-tight">{item}</span>
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
           <motion.div {...fadeIn} className="max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em]">Implementation</span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">Your journey to <br /> smart HR in 4 steps</h2>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             {/* Connector Line */}
             <div className="hidden lg:block absolute top-[60px] inset-x-32 h-[2px] bg-slate-200 border-dashed border-t-2" />

             {[
               { step: '01', title: 'Setup Org', desc: 'Define roles, departments and global branding in minutes.' },
               { step: '02', title: 'Invite Users', desc: 'Seamlessly onboard your entire workforce with one-click.' },
               { step: '03', title: 'Automate', desc: 'Deploy AI modules to handle hiring and compliance.' },
               { step: '04', title: 'Grow', desc: 'Leverage data insights to enhance productivity and retention.' },
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 {...fadeIn}
                 transition={{ delay: i * 0.1 }}
                 className="relative z-10 space-y-6 flex flex-col items-center group"
               >
                 <div className="w-16 h-16 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-xl font-black text-primary-600 shadow-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                   {item.step}
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h4>
                 <p className="text-sm font-medium text-slate-400 tracking-tight leading-relaxed max-w-[200px]">{item.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 8. DASHBOARD PREVIEW SECTION */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <motion.div {...fadeIn} className="text-center mb-16 px-4">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-none">Designed for <span className="text-primary-600">Visual High Fidelity</span></h2>
              <p className="text-lg text-slate-500 font-medium tracking-tight">Experience our premium interfaces designed for every role.</p>
           </motion.div>
           
           <div className="p-4 bg-slate-50 rounded-[4rem] border border-slate-100 shadow-inner">
             <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
                <div className="p-8 lg:p-12">
                   <div className="flex flex-wrap items-center gap-3 lg:gap-6 mb-12">
                      {['Admin Center', 'Employee Hub', 'Hiring Suite', 'Team Manager'].map((tab, i) => (
                        <button key={i} className={cn(
                           "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                           i === 0 ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
                        )}>
                          {tab}
                        </button>
                      ))}
                   </div>
                   <div className="aspect-video bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center relative overflow-hidden group">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670" 
                        alt="Preview" 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-primary-600/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                            <Play size={24} fill="currentColor" className="text-primary-600 ml-1" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="py-32 bg-slate-50 text-slate-900">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-20 space-y-4">
             <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900">Loved by Industry Leaders</h2>
             <p className="text-slate-500 font-medium">Join 500+ enterprises modernizing their workforce with our platform.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', role: 'HR Director', co: 'TechGlobal', quote: "The AI recruitment engine saved us 200+ hours in the first month of implementation." },
              { name: 'David Chen', role: 'COO', co: 'ScaleUp Systems', quote: "Unified payroll and compliance across 12 countries. It just works seamlessly." },
              { name: 'Marcus Aurelius', role: 'Founder', co: 'Empire Inc.', quote: "The cleanest HCM interface I've seen in 20 years. My employees actually love using it." },
            ].map((t, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 p-12 rounded-[3.5rem] relative hover:shadow-2xl transition-all group shadow-soft"
              >
                <div className="flex gap-1 mb-8">
                   {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" className="text-amber-400" />)}
                </div>
                <p className="text-xl font-bold italic text-slate-600 leading-relaxed mb-10 group-hover:text-slate-900 transition-colors">"{t.quote}"</p>
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center text-lg font-black">{t.name[0]}</div>
                   <div>
                      <p className="font-black tracking-tight text-slate-900">{t.name}</p>
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{t.role} • {t.co}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PRICING / CTA SECTION */}
      <section id="pricing" className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
           <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
              <div className="w-24 h-24 bg-primary-50 text-primary-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg rotate-12 transition-transform hover:rotate-0">
                 <Zap size={48} />
              </div>
              <h2 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">Ready to modernize <br /> your workforce?</h2>
              <p className="text-xl text-slate-500 font-medium tracking-tight max-w-2xl mx-auto">
                 Start your 14-day free trial today. No credit card required. Scalable pricing designed for every stage of growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                 <button 
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-12 py-6 bg-primary-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-3xl shadow-primary-200 hover:bg-primary-700 transition-all hover:scale-105 active:scale-95"
                >
                   Start Trial
                </button>
                 <button onClick={() => navigate('/book-demo')} className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[2.5rem] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-soft active:scale-95">
                   Book A Demo
                </button>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] pt-8">Trusted by 5,000+ Teams Worldwide</p>
           </motion.div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <motion.div {...fadeIn}>
                <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-4 inline-block">Frequently Asked</span>
                <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-10">Commonly Asked <br /> Knowledge.</h2>
                <p className="text-lg text-slate-400 font-medium leading-relaxed tracking-tight mb-10">Find quick answers to common questions about our platform and how it integrates into your existing workflows.</p>
                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft flex items-center gap-6">
                   <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl">
                      <HelpCircle size={28} />
                   </div>
                   <div>
                      <p className="font-bold text-slate-900 tracking-tight">Need dedicated support?</p>
                      <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest mt-2 hover:underline">Contact Support Desk</button>
                   </div>
                </div>
             </motion.div>

             <div className="space-y-4">
               {[
                 { q: 'Is the platform customizable?', a: 'Yes, every aspect of the branding and portal flows can be tailored to match your organizational identity.' },
                 { q: 'Does it support multi-country payroll?', a: 'We currently support integrated payroll for 12+ regions with automated tax and compliance handling.' },
                 { q: 'Is my data secure?', a: 'We employ bank-grade encryption and satisfy SOC2 Type II and GDPR requirements globally.' },
                 { q: 'Can I manage multiple roles?', a: 'Absolutely. A single user can hold multiple roles and switch between portals seamlessly.' },
                 { q: 'Does AI really screen resumes?', a: 'Yes, our proprietary ML models analyze resumes against job requirements providing a 0-100 fit score instantly.' },
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   {...fadeIn}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-soft group cursor-pointer"
                 >
                   <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-slate-900 tracking-tight">{item.q}</h4>
                      <ChevronDown size={20} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                   </div>
                   <div className="mt-4 text-sm font-medium text-slate-400 leading-relaxed overflow-hidden h-0 group-hover:h-auto transition-all">
                      {item.a}
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="pt-32 pb-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
             <div className="lg:col-span-2 space-y-8">
               <Link to="/" className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:rotate-6">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">AI HCM <span className="text-primary-600">Platform</span></span>
               </Link>
               <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm tracking-tight">
                  The world's most intelligent workforce management ecosystem. Built for growth-driven enterprises that prioritize their people.
               </p>
               <div className="flex items-center gap-4">
                  {[Share2, Globe, Mail].map((Icon, i) => (
                    <button key={i} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary-600 hover:text-white transition-all">
                       <Icon size={20} />
                    </button>
                  ))}
               </div>
             </div>

             {[
               { title: 'Product', links: ['Features', 'Pricing', 'API Docs', 'Integrations'] },
               { title: 'Company', links: ['About Us', 'Careers', 'Brand Guide', 'Contact'] },
               { title: 'Resources', links: ['Help Center', 'Privacy Policy', 'Terms of Use', 'Security'] }
             ].map((col, i) => (
               <div key={i} className="space-y-8">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">{col.title}</h5>
                  <ul className="space-y-4">
                     {col.links.map(link => (
                       <li key={link}>
                         <a href="#" className="text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-widest">{link}</a>
                       </li>
                     ))}
                  </ul>
               </div>
             ))}
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 AI HCM Platform • Enterprise Grade Workforce OS</p>
             <div className="flex items-center gap-8">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">US • UK • APAC</span>
                <div className="flex items-center gap-2 text-emerald-500">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Systems Operational</span>
                </div>
             </div>
          </div>
        </div>
      </footer>

      {/* Book A Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 text-left p-8 md:p-12 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X size={20} />
              </button>

              {demoStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-2 block">Step 1 of 2</span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                      Tell us about your team
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-2">
                      Help us customize the product tour for your organization.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDemoStep(2);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={demoFormData.name}
                          onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                          placeholder="Alex Rivera"
                          className="input-field h-14 bg-slate-50 border-transparent font-medium text-slate-950"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                        <input
                          type="email"
                          required
                          value={demoFormData.email}
                          onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="input-field h-14 bg-slate-50 border-transparent font-medium text-slate-950"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Size</label>
                        <select
                          value={demoFormData.companySize}
                          onChange={(e) => setDemoFormData({ ...demoFormData, companySize: e.target.value })}
                          className="input-field h-14 bg-slate-50 border-transparent font-medium text-slate-950 cursor-pointer"
                        >
                          <option value="1-10">1 - 10 Employees</option>
                          <option value="11-50">11 - 50 Employees</option>
                          <option value="51-200">51 - 200 Employees</option>
                          <option value="200+">200+ Employees</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Interest</label>
                        <select
                          value={demoFormData.requirement}
                          onChange={(e) => setDemoFormData({ ...demoFormData, requirement: e.target.value })}
                          className="input-field h-14 bg-slate-50 border-transparent font-medium text-slate-950 cursor-pointer"
                        >
                          <option value="AI Recruitment">AI Recruitment & Scoring</option>
                          <option value="Global Payroll">Global Payroll Suite</option>
                          <option value="Time & Attendance">Time & Attendance Tracking</option>
                          <option value="Enterprise Compliance">Compliance & Policy Mgmt</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary h-16 shadow-xl shadow-primary-200 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 text-xs mt-4"
                    >
                      Choose Date & Time <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              )}

              {demoStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-2 block">Step 2 of 2</span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                      Schedule a Live Tour
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-2">
                      Select a date and time slot for a personalized session with our product strategy team.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Date Cards */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Available Dates</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          'Monday, June 1',
                          'Tuesday, June 2',
                          'Wednesday, June 3',
                          'Thursday, June 4'
                        ].map((dateOption) => {
                          const isSelected = selectedDate === dateOption;
                          const [dayName, monthAndNum] = dateOption.split(', ');
                          return (
                            <button
                              key={dateOption}
                              type="button"
                              onClick={() => setSelectedDate(dateOption)}
                              className={cn(
                                "p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center",
                                isSelected 
                                  ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-200" 
                                  : "bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600"
                              )}
                            >
                              <span className={cn("text-[9px] font-black uppercase tracking-widest", isSelected ? "text-primary-200" : "text-slate-400")}>
                                {dayName}
                              </span>
                              <span className="text-base font-black tracking-tight mt-1">
                                {monthAndNum}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Time Slot</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          '09:30 AM',
                          '11:00 AM',
                          '01:30 PM',
                          '03:00 PM'
                        ].map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                "py-3.5 rounded-xl border text-center text-xs font-bold transition-all duration-250",
                                isSelected
                                  ? "bg-primary-600 border-primary-600 text-white shadow-xl"
                                  : "bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-650"
                              )}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Confirmation */}
                    <div className="pt-4 flex gap-4">
                      <button
                        onClick={() => setDemoStep(1)}
                        className="flex-1 py-4 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setDemoStep(3)}
                        className="flex-2 py-4 btn-primary shadow-xl shadow-primary-200 font-bold uppercase tracking-[0.2em] text-[10px]"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {demoStep === 3 && (
                <div className="text-center space-y-10 py-6">
                  <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                    <CheckCircle2 size={48} className="animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] block">Demo Staged & Booked</span>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                      See you soon, {demoFormData.name}!
                    </h3>
                    <p className="text-sm font-medium text-slate-500 max-w-md mx-auto leading-relaxed mt-2">
                      Your live demonstration of the <strong>{demoFormData.requirement}</strong> module has been scheduled for:
                    </p>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl max-w-sm mx-auto space-y-2 text-slate-800 mt-4">
                      <div className="flex items-center gap-3 justify-center text-xs font-bold">
                        <Calendar size={16} className="text-primary-600" />
                        <span>{selectedDate}</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center text-xs font-bold">
                        <Clock size={16} className="text-primary-600" />
                        <span>{selectedSlot} (PST Timezone)</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-450 leading-normal max-w-xs mx-auto pt-4">
                      A calendar invite and dynamic meet room link (`meet.google.com/hcm-ai-demo`) has been dispatched to your email: <strong>{demoFormData.email}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsDemoModalOpen(false)}
                    className="btn-primary w-full max-w-xs mx-auto py-5 shadow-xl shadow-primary-200 font-bold uppercase tracking-[0.3em] text-[10px]"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sparkles = ({ size, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path d="M12 2L13.8 6.2L18 8L13.8 9.8L12 14L10.2 9.8L6 8L10.2 6.2L12 2Z" fill="currentColor" />
    <path d="M19 12L20.1 14.9L23 16L20.1 17.1L19 20L17.9 17.1L15 16L17.9 14.9L19 12Z" fill="currentColor" />
    <path d="M5 16L6.5 19.5L10 21L6.5 22.5L5 26L3.5 22.5L0 21L3.5 19.5L5 16Z" fill="currentColor" />
  </svg>
);

export default LandingPage;

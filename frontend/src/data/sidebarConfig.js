import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Award, 
  Calendar, 
  Bell, 
  Settings, 
  Briefcase, 
  Users, 
  UserCheck, 
  FilePlus, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  CalendarDays, 
  CreditCard, 
  Heart, 
  GraduationCap, 
  HelpCircle, 
  UserPlus, 
  Building2, 
  ShieldCheck, 
  Zap, 
  History, 
  Wallet
} from 'lucide-react';

export const sidebarConfig = {
  candidate: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/candidate/dashboard' },
    { label: 'Browse Jobs', icon: Search, path: '/candidate/jobs' },
    { label: 'My Applications', icon: FileText, path: '/candidate/applications' },
    { label: 'Resume Builder', icon: FilePlus, path: '/candidate/resume' },
    { label: 'AI Resume Score', icon: Award, path: '/candidate/ai-score' },
    { label: 'Interview Schedule', icon: Calendar, path: '/candidate/interviews' },
    { label: 'Notifications', icon: Bell, path: '/candidate/notifications' },
    { label: 'My Profile', icon: UserCheck, path: '/candidate/profile' },
    { label: 'Settings', icon: Settings, path: '/candidate/settings' },
  ],
  hr: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { label: 'Job Posts', icon: Briefcase, path: '/hr/jobs' },
    { label: 'Candidates', icon: Users, path: '/hr/candidates' },
    { label: 'Interviews', icon: Calendar, path: '/hr/interviews' },
    { label: 'Hiring Pipeline', icon: Zap, path: '/hr/pipeline' },
    { label: 'Offers', icon: FileText, path: '/hr/offers' },
    { label: 'Onboarding', icon: UserPlus, path: '/hr/onboarding' },
    { label: 'Reports', icon: BarChart3, path: '/hr/reports' },
    { label: 'Messages', icon: MessageSquare, path: '/hr/messages' },
    { label: 'My Profile', icon: UserCheck, path: '/hr/profile' },
    { label: 'Settings', icon: Settings, path: '/hr/settings' },
  ],
  employee: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/employee/dashboard' },
    { label: 'My Profile', icon: UserCheck, path: '/employee/profile' },
    { label: 'Attendance', icon: Clock, path: '/employee/attendance' },
    { label: 'Leave Requests', icon: CalendarDays, path: '/employee/leave' },
    { label: 'Payroll', icon: CreditCard, path: '/employee/payroll' },
    { label: 'Benefits', icon: Heart, path: '/employee/benefits' },
    { label: 'Documents', icon: FileText, path: '/employee/documents' },
    { label: 'Performance', icon: Award, path: '/employee/performance' },
    { label: 'Help Desk', icon: HelpCircle, path: '/employee/help' },
  ],
  manager: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/manager/dashboard' },
    { label: 'Team Members', icon: Users, path: '/manager/team' },
    { label: 'Attendance Review', icon: Clock, path: '/manager/attendance' },
    { label: 'Leave Approval', icon: CalendarDays, path: '/manager/leave' },
    { label: 'KPI Tracking', icon: BarChart3, path: '/manager/kpi' },
    { label: 'Reviews', icon: Award, path: '/manager/reviews' },
    { label: 'Reports', icon: BarChart3, path: '/manager/reports' },
    { label: 'My Profile', icon: UserCheck, path: '/manager/profile' },
    { label: 'Settings', icon: Settings, path: '/manager/settings' },
  ],
  admin: [
    { 
      group: 'General',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { label: 'Organization Setup', icon: Building2, path: '/admin/org' },
        { label: 'Departments', icon: Building2, path: '/admin/departments' },
        { label: 'Users', icon: Users, path: '/admin/users' },
        { label: 'Roles & Permissions', icon: ShieldCheck, path: '/admin/roles' },
      ]
    },
    {
      group: 'Finance & HR',
      items: [
        { label: 'Payroll Center', icon: CreditCard, path: '/admin/payroll' },
        { label: 'Holidays', icon: CalendarDays, path: '/admin/holidays' },
        { label: 'Benefits', icon: Heart, path: '/admin/benefits' },
      ]
    },
    {
      group: 'Intelligence',
      items: [
        { label: 'AI Center', icon: Zap, path: '/admin/ai' },
        { label: 'Compliance Center', icon: ShieldCheck, path: '/admin/compliance' },
        { label: 'Integrations', icon: Zap, path: '/admin/integrations' },
      ]
    },
    {
      group: 'System',
      items: [
        { label: 'Billing', icon: Wallet, path: '/admin/billing' },
        { label: 'Audit Logs', icon: History, path: '/admin/audit' },
        { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
        { label: 'Settings', icon: Settings, path: '/admin/settings' },
        { label: 'Profile', icon: UserCheck, path: '/admin/profile' },
      ]
    }
  ]
};

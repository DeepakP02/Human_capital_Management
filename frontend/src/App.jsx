import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AdminProvider } from './context/AdminContext';
import { SuperAdminProvider } from './context/SuperAdminContext';
import SuperAdminLayout from './shared/components/layout/SuperAdminLayout';
import SuperAdminDashboard from './features/superadmin/SuperAdminDashboard';
import UserManagement from './features/superadmin/UserManagement';
import RoleManagement from './features/superadmin/RoleManagement';
import DepartmentManagement from './features/superadmin/DepartmentManagement';
import GlobalAnalytics from './features/superadmin/GlobalAnalytics';
import { HRProvider } from './context/HRContext';
import { ManagerProvider } from './context/ManagerContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { CandidateProvider } from './context/CandidateContext';
import BenefitsDashboard from './features/benefits/BenefitsDashboard';
import TimeDashboard from './features/time/TimeDashboard';

// Layout & Auth
import LoginPage from './features/auth/LoginPage';
import AppLayout from './shared/components/layout/AppLayout';
import LandingPage from './features/LandingPage';
import BookDemo from './features/BookDemo';

// Candidate Pages
import CandidateDashboard from './features/candidate/CandidateDashboard';
import BrowseJobs from './features/candidate/BrowseJobs';
import ApplicationForm from './features/candidate/ApplicationForm';
import MyApplications from './features/candidate/MyApplications';
import ResumeBuilder from './features/candidate/ResumeBuilder';
import AIResumeScore from './features/candidate/AIResumeScore';
import InterviewSchedule from './features/candidate/InterviewSchedule';
import Notifications from './features/candidate/Notifications';
import CandidateProfile from './features/candidate/CandidateProfile';
import CandidateSettings from './features/candidate/CandidateSettings';

// HR Pages
import HRDashboard from './features/hr/HRDashboard';
import JobPosts from './features/hr/JobPosts';
import Candidates from './features/hr/Candidates';
import InterviewManagement from './features/hr/InterviewManagement';
import HiringPipeline from './features/hr/HiringPipeline';
import OfferManagement from './features/hr/OfferManagement';
import Onboarding from './features/hr/Onboarding';
import HRReports from './features/hr/Reports';
import Messages from './features/hr/Messages';
import HRProfile from './features/hr/HRProfile';
import HRSettings from './features/hr/HRSettings';

// Employee Pages
import EmployeeDashboard from './features/employee/EmployeeDashboard';
import EmployeeProfile from './features/employee/EmployeeProfile';
import EmployeeAttendance from './features/employee/EmployeeAttendance';
import EmployeeLeave from './features/employee/EmployeeLeave';
import EmployeePayroll from './features/employee/EmployeePayroll';
import EmployeeBenefits from './features/employee/EmployeeBenefits';
import EmployeeDocuments from './features/employee/EmployeeDocuments';
import EmployeePerformance from './features/employee/EmployeePerformance';
import EmployeeHelpDesk from './features/employee/EmployeeHelpDesk';
import EmployeeSettings from './features/employee/EmployeeSettings';

// Manager Pages
import ManagerDashboard from './features/manager/ManagerDashboard';
import TeamMembers from './features/manager/TeamMembers';
import AttendanceReview from './features/manager/AttendanceReview';
import LeaveApproval from './features/manager/LeaveApproval';
import KPITracking from './features/manager/KPITracking';
import Tasks from './features/manager/Tasks';
import Reviews from './features/manager/Reviews';
import ManagerReports from './features/manager/Reports';
import ManagerProfile from './features/manager/ManagerProfile';
import ManagerSettings from './features/manager/ManagerSettings';

// Admin Pages
import AdminDashboard from './features/admin/AdminDashboard';
import OrgSetup from './features/admin/OrgSetup';
import Departments from './features/admin/Departments';
import Users from './features/admin/Users';
import RolesPermissions from './features/admin/RolesPermissions';
import PayrollCenter from './features/admin/PayrollCenter';
import Holidays from './features/admin/Holidays';
import BenefitsConfig from './features/admin/BenefitsConfig';
import AICenter from './features/admin/AICenter';
import ComplianceCenter from './features/admin/ComplianceCenter';
import Integrations from './features/admin/Integrations';
import Billing from './features/admin/Billing';
import AuditLogs from './features/admin/AuditLogs';
import AdminReports from './features/admin/AdminReports';
import Settings from './features/admin/Settings';
import AdminProfile from './features/admin/AdminProfile';

const RoleDashboardRedirect = ({ children }) => {
  const { effectiveRole } = useAuth();
  if (effectiveRole?.toLowerCase() === 'superuser' || effectiveRole?.toLowerCase() === 'superadmin') {
    return <Navigate to="/superadmin/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AdminProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            
            {/* Candidate Routes */}
            <Route path="/candidate" element={
              <CandidateProvider>
                <AppLayout />
              </CandidateProvider>
            }>
              <Route index element={<Navigate to="/candidate/dashboard" replace />} />
              <Route path="dashboard" element={<RoleDashboardRedirect><CandidateDashboard /></RoleDashboardRedirect>} />
              <Route path="jobs" element={<BrowseJobs />} />
              <Route path="jobs/apply" element={<ApplicationForm />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="ai-score" element={<AIResumeScore />} />
              <Route path="interviews" element={<InterviewSchedule />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<CandidateProfile />} />
              <Route path="settings" element={<CandidateSettings />} />
            </Route>

            {/* HR Routes */}
            <Route path="/hr" element={
              <HRProvider>
                <AppLayout />
              </HRProvider>
            }>
              <Route index element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="dashboard" element={<RoleDashboardRedirect><HRDashboard /></RoleDashboardRedirect>} />
              <Route path="jobs" element={<JobPosts />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="interviews" element={<InterviewManagement />} />
              <Route path="pipeline" element={<HiringPipeline />} />
              <Route path="offers" element={<OfferManagement />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="reports" element={<HRReports />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<HRProfile />} />
              <Route path="settings" element={<HRSettings />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={
              <EmployeeProvider>
                <AppLayout />
              </EmployeeProvider>
            }>
              <Route index element={<Navigate to="/employee/dashboard" replace />} />
              <Route path="dashboard" element={<RoleDashboardRedirect><EmployeeDashboard /></RoleDashboardRedirect>} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="leave" element={<EmployeeLeave />} />
              <Route path="payroll" element={<EmployeePayroll />} />
              <Route path="benefits" element={<EmployeeBenefits />} />
              <Route path="documents" element={<EmployeeDocuments />} />
              <Route path="performance" element={<EmployeePerformance />} />
              <Route path="help" element={<EmployeeHelpDesk />} />
              <Route path="settings" element={<EmployeeSettings />} />
            </Route>

            {/* Manager Routes */}
            <Route path="/manager" element={
              <ManagerProvider>
                <AppLayout />
              </ManagerProvider>
            }>
              <Route index element={<Navigate to="/manager/dashboard" replace />} />
              <Route path="dashboard" element={<RoleDashboardRedirect><ManagerDashboard /></RoleDashboardRedirect>} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="attendance" element={<AttendanceReview />} />
              <Route path="leave" element={<LeaveApproval />} />
              <Route path="kpi" element={<KPITracking />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="reports" element={<ManagerReports />} />
              <Route path="profile" element={<ManagerProfile />} />
              <Route path="settings" element={<ManagerSettings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/superadmin/*" element={<SuperAdminProvider><SuperAdminLayout /></SuperAdminProvider>}> 
              <Route index element={<SuperAdminDashboard />} />
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="analytics" element={<GlobalAnalytics />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="departments" element={<DepartmentManagement />} />
            </Route>
            <Route path="/admin" element={<AppLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<RoleDashboardRedirect><AdminDashboard /></RoleDashboardRedirect>} />
              <Route path="org" element={<OrgSetup />} />
              <Route path="departments" element={<Departments />} />
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<RolesPermissions />} />
              <Route path="payroll" element={<PayrollCenter />} />
              <Route path="holidays" element={<Holidays />} />
              <Route path="benefits" element={<BenefitsConfig />} />
              <Route path="ai" element={<AICenter />} />
              <Route path="compliance" element={<ComplianceCenter />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="billing" element={<Billing />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* Additional Modules */}
            <Route path="/benefits" element={<AppLayout />}>
              <Route index element={<BenefitsDashboard />} />
            </Route>
            <Route path="/time" element={<AppLayout />}>
              <Route index element={<TimeDashboard />} />
            </Route>

            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/" element={<LandingPage />} />
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

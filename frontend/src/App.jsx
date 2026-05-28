import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import { AuthProvider } from './hooks/useAuth';
import { AdminProvider } from './context/AdminContext';
import { HRProvider } from './context/HRContext';
import { ManagerProvider } from './context/ManagerContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { CandidateProvider } from './context/CandidateContext';

// Layout & Auth
import LoginPage from './pages/auth/LoginPage';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import BrowseJobs from './pages/candidate/BrowseJobs';
import ApplicationForm from './pages/candidate/ApplicationForm';
import MyApplications from './pages/candidate/MyApplications';
import ResumeBuilder from './pages/candidate/ResumeBuilder';
import AIResumeScore from './pages/candidate/AIResumeScore';
import InterviewSchedule from './pages/candidate/InterviewSchedule';
import Notifications from './pages/candidate/Notifications';
import CandidateProfile from './pages/candidate/CandidateProfile';
import CandidateSettings from './pages/candidate/CandidateSettings';

// HR Pages
import HRDashboard from './pages/hr/HRDashboard';
import JobPosts from './pages/hr/JobPosts';
import Candidates from './pages/hr/Candidates';
import InterviewManagement from './pages/hr/InterviewManagement';
import HiringPipeline from './pages/hr/HiringPipeline';
import OfferManagement from './pages/hr/OfferManagement';
import Onboarding from './pages/hr/Onboarding';
import HRReports from './pages/hr/Reports';
import Messages from './pages/hr/Messages';
import HRProfile from './pages/hr/HRProfile';
import HRSettings from './pages/hr/HRSettings';

// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeLeave from './pages/employee/EmployeeLeave';
import EmployeePayroll from './pages/employee/EmployeePayroll';
import EmployeeBenefits from './pages/employee/EmployeeBenefits';
import EmployeeDocuments from './pages/employee/EmployeeDocuments';
import EmployeePerformance from './pages/employee/EmployeePerformance';
import EmployeeHelpDesk from './pages/employee/EmployeeHelpDesk';
import EmployeeSettings from './pages/employee/EmployeeSettings';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TeamMembers from './pages/manager/TeamMembers';
import AttendanceReview from './pages/manager/AttendanceReview';
import LeaveApproval from './pages/manager/LeaveApproval';
import KPITracking from './pages/manager/KPITracking';
import Tasks from './pages/manager/Tasks';
import Reviews from './pages/manager/Reviews';
import ManagerReports from './pages/manager/Reports';
import ManagerProfile from './pages/manager/ManagerProfile';
import ManagerSettings from './pages/manager/ManagerSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import OrgSetup from './pages/admin/OrgSetup';
import Departments from './pages/admin/Departments';
import Users from './pages/admin/Users';
import RolesPermissions from './pages/admin/RolesPermissions';
import PayrollCenter from './pages/admin/PayrollCenter';
import Holidays from './pages/admin/Holidays';
import BenefitsConfig from './pages/admin/BenefitsConfig';
import AICenter from './pages/admin/AICenter';
import ComplianceCenter from './pages/admin/ComplianceCenter';
import Integrations from './pages/admin/Integrations';
import Billing from './pages/admin/Billing';
import AuditLogs from './pages/admin/AuditLogs';
import AdminReports from './pages/admin/AdminReports';
import Settings from './pages/admin/Settings';
import AdminProfile from './pages/admin/AdminProfile';

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
              <Route path="dashboard" element={<CandidateDashboard />} />
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
              <Route path="dashboard" element={<HRDashboard />} />
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
              <Route path="dashboard" element={<EmployeeDashboard />} />
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
              <Route path="dashboard" element={<ManagerDashboard />} />
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
            <Route path="/admin" element={<AppLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
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

            <Route path="/" element={<LandingPage />} />
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

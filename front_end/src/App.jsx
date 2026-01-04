import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Context Providers (From Dev-b)
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LeaveProvider } from './context/LeaveContext';
import { AttendanceProvider } from './context/AttendanceContext';

// 2. Components & Pages
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/EmployeeList";
import Departments from "./pages/admin/DepartmentManagement";
import AuthPage from "./pages/auth/Login";
import Payroll from './pages/admin/PayrollManagement';
import LeaveManagement from './pages/admin/LeaveApproval';
import Attendance from './pages/admin/AttendanceManagement';

// 3. Employee Pages (From Dev-b)
import EmployeeDashboard from './pages/employee/Dashboard';
import LeavePortal from './pages/employee/LeavePortal';
import EmployeePayroll from './pages/employee/Payroll';
import Profile from './pages/common/Profile';
import HRDashboard from './pages/hr/Dashboard';

// 4. Placeholder
const PlaceholderPage = ({ title }) => (
  <div className="flex-1 p-10 h-screen overflow-y-auto">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2">This module is currently under development.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <LeaveProvider>
            <AttendanceProvider>
              {/* Main Layout Container (Dev-A Theme) */}
              <div className="flex h-screen bg-gray-50 overflow-hidden">

                {/* The Sidebar stays static on the left */}
                <Sidebar />

                {/* The Content Area changes based on the Route */}
                <div className="flex-1 flex flex-col h-full relative">
                  <Routes>
                    {/* --- Redirect Root to Dashboard --- */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* --- Admin Modules --- */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/leave" element={<LeaveManagement />} />
                    <Route path="/attendance" element={<Attendance />} />

                    {/* --- HR Modules --- */}
                    <Route path="/hr/dashboard" element={<HRDashboard />} />
                    <Route path="/hr/leaves" element={<LeaveManagement />} />
                    <Route path="/hr/employees" element={<Employees />} />
                    <Route path="/hr" element={<Navigate to="/hr/dashboard" replace />} />

                    {/* --- Employee Modules (Restored from Dev-b) --- */}
                    <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                    <Route path="/employee/leave" element={<LeavePortal />} />
                    <Route path="/employee/payroll" element={<EmployeePayroll />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* --- Placeholders --- */}
                    <Route path="/jobs" element={<PlaceholderPage title="Recruitment: Jobs" />} />
                    <Route path="/candidates" element={<PlaceholderPage title="Recruitment: Candidates" />} />
                    <Route path="/settings" element={<PlaceholderPage title="Settings" />} />

                    {/* --- Auth Route --- */}
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} /> {/* Assuming Login handles register or we map it */}

                    {/* --- 404 Fallback --- */}
                    <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
                  </Routes>
                </div>
              </div>
            </AttendanceProvider>
          </LeaveProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
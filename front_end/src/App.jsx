import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

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

              <Routes>
                {/* --- PUBLIC ROUTES (No Sidebar) --- */}
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />

                {/* Default Redirect to Login (First Page) */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* --- PROTECTED ROUTES (Sidebar Layout) --- */}
                <Route
                  element={
                    <div className="flex h-screen bg-gray-50 overflow-hidden">
                      <Sidebar />
                      <div className="flex-1 flex flex-col h-full relative">
                        <Outlet />
                      </div>
                    </div>
                  }
                >
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

                  {/* --- 404 Fallback --- */}
                  <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
                </Route>
              </Routes>
            </AttendanceProvider>
          </LeaveProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router >
  );
};

export default App;
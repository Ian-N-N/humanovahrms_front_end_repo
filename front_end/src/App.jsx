import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// 1. Context Providers
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LeaveProvider } from './context/LeaveContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { PayrollProvider } from './context/PayrollContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { NotificationProvider } from './context/NotificationContext';

// 2. Components & Pages
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/EmployeeList";
import EmployeeCreate from "./pages/admin/EmployeeCreate";
import Departments from "./pages/admin/DepartmentManagement";
import AuthPage from "./pages/auth/Login";
import Payroll from './pages/admin/Payroll';
import LeaveManagement from './pages/admin/LeaveManagement';
import Attendance from './pages/admin/AttendanceManagement';
import Analytics from './pages/admin/Analytics';
import RolePermission from './pages/admin/RolePermission';

// 3. Employee & HR Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import LeavePortal from './pages/employee/LeavePortal';
import EmployeePayroll from './pages/employee/Payroll';
import Profile from './pages/common/Profile';
import HRDashboard from './pages/hr/Dashboard';
import LeaveReview from './pages/hr/LeaveReview';
import AttendanceSummary from './pages/hr/AttendanceSummary';
import DepartmentAnalytics from './pages/hr/DepartmentAnalytics';

// 4. Placeholder
const PlaceholderPage = ({ title }) => (
  <div className="flex-1 p-10 h-screen overflow-y-auto bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <span className="material-icons-round text-6xl text-gray-200 mb-4 block">construction</span>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500 mt-2">This module is currently being finalized.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <LeaveProvider>
            <AttendanceProvider>
              <PayrollProvider>
                <DepartmentProvider>
                  <NotificationProvider>

                    <Routes>
                      {/* --- PUBLIC ROUTES --- */}
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/register" element={<AuthPage />} />

                      <Route path="/" element={<Navigate to="/login" replace />} />

                      {/* --- PROTECTED ROUTES --- */}
                      <Route
                        element={
                          <div className="flex h-screen bg-gray-50 overflow-hidden">
                            <Sidebar />
                            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                              <Outlet />
                            </div>
                          </div>
                        }
                      >
                        {/* Admin Modules */}
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/roles" element={<RolePermission />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/employees/new" element={<EmployeeCreate />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/payroll" element={<Payroll />} />
                        <Route path="/leave" element={<LeaveManagement />} />
                        <Route path="/attendance" element={<Attendance />} />

                        {/* HR Modules */}
                        <Route path="/hr/dashboard" element={<HRDashboard />} />
                        <Route path="/hr/employees" element={<Employees />} />
                        <Route path="/hr/departments" element={<Departments />} />
                        <Route path="/hr/leaves" element={<LeaveReview />} />
                        <Route path="/hr/attendance" element={<AttendanceSummary />} />
                        <Route path="/hr/analytics" element={<DepartmentAnalytics />} />
                        <Route path="/hr" element={<Navigate to="/hr/dashboard" replace />} />

                        {/* Employee Modules */}
                        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                        <Route path="/employee/leave" element={<LeavePortal />} />
                        <Route path="/employee/payroll" element={<EmployeePayroll />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* Settings & Extras */}
                        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />

                        {/* 404 Fallback */}
                        <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
                      </Route>
                    </Routes>

                  </NotificationProvider>
                </DepartmentProvider>
              </PayrollProvider>
            </AttendanceProvider>
          </LeaveProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router >
  );
};

export default App;
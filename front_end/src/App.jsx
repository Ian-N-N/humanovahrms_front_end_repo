import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import EmployeeList from './pages/admin/EmployeeList';
import Departments from './pages/admin/Departments';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LeaveProvider } from './context/LeaveContext';
import { AttendanceProvider } from './context/AttendanceContext';
import LeaveManagement from './pages/admin/LeaveManagement';
import Payroll from './pages/admin/Payroll';
import HRDashboard from './pages/hr/Dashboard';
import Profile from './pages/common/Profile';
import EmployeeDashboard from './pages/employee/Dashboard';
import LeavePortal from './pages/employee/LeavePortal';
import EmployeePayroll from './pages/employee/Payroll';
import EmployeeCreate from './pages/admin/EmployeeCreate';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <LeaveProvider>
            <AttendanceProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<MainLayout role="admin" />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="employees" element={<EmployeeList />} />
                  <Route path="employees/new" element={<EmployeeCreate />} />
                  <Route path="departments" element={<Departments />} />
                  <Route path="leaves" element={<LeaveManagement />} />
                  <Route path="payroll" element={<Payroll />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* HR Routes */}
                <Route path="/hr" element={<MainLayout role="hr" />}>
                  <Route path="dashboard" element={<HRDashboard />} />
                  <Route path="leaves" element={<LeaveManagement />} />
                  <Route path="profile" element={<Profile />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Employee Routes */}
                <Route path="/employee" element={<MainLayout role="employee" />}>
                  <Route path="dashboard" element={<EmployeeDashboard />} />
                  <Route path="leave" element={<LeavePortal />} />
                  <Route path="payroll" element={<EmployeePayroll />} />
                  <Route path="profile" element={<Profile />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Common Profile */}
                <Route path="/profile" element={<Profile />} />

                {/* Root Redirect */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AttendanceProvider>
          </LeaveProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

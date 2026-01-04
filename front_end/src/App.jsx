import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Import your Components
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/EmployeeList";
import Departments from "./pages/admin/DepartmentManagement";
import AuthPage from "./pages/auth/Login";
import Payroll from './pages/admin/PayrollManagement';
import LeaveManagement from './pages/admin/LeaveApproval';
import Attendance from './pages/admin/AttendanceManagement';

// 2. A Simple Placeholder for pages not built yet 
const PlaceholderPage = ({ title }) => (
  <div className="flex-1 p-10 h-screen overflow-y-auto">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2">This module is currently under development.</p>
  </div>
);

const App = () => {
  return (
    // Main Layout Container
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* The Sidebar stays static on the left */}
      <Sidebar />

      {/* The Content Area changes based on the Route */}
      <div className="flex-1 flex flex-col h-full relative">
        <Routes>
          {/* --- Redirect Root to Dashboard --- */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* --- Main Modules --- */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/leave" element={<LeaveManagement />} />
          <Route path="/attendance" element={<Attendance />} />



          {/* --- Placeholders for other Sidebar Links --- */}
          <Route path="/jobs" element={<PlaceholderPage title="Recruitment: Jobs" />} />
          <Route path="/candidates" element={<PlaceholderPage title="Recruitment: Candidates" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />

          {/* --- Auth Route (Optional: You might want to move this outside the Sidebar layout later) --- */}
          <Route path="/login" element={<AuthPage />} />
          
          {/* --- 404 Fallback --- */}
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
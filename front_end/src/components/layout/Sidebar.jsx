import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // 1. Import these

// Modified NavLink to use 'to' instead of 'href' and handle the Link component
const NavLink = ({ icon, label, to = "#", active = false, badge = null }) => {
  return (
    <Link 
      to={to} 
      className={`
        flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 mb-1 group
        ${active 
          ? 'bg-blue-50 text-blue-600' // This blue style now activates automatically
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900' 
        }
      `}
    >
      <span className={`material-icons-round mr-3 text-xl ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
        {icon}
      </span>
      {label}
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  // 2. Get the current URL location
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper to check if a link is active
  const isActive = (path) => currentPath === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-screen font-sans z-20">
      
      {/* Brand Section */}
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <span className="material-icons-round text-lg">grid_view</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">ecoHRMS</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 overflow-hidden border border-gray-200">
                 <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">Alex Morgan</h4>
                <p className="text-xs text-gray-500 truncate">HR Administrator</p>
            </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-2">Menu</p>
          
          {/* 3. Pass the path and check if it is active */}
          <NavLink 
            to="/dashboard" 
            icon="dashboard" 
            label="Dashboard" 
            active={isActive('/dashboard') || isActive('/')} 
          />
          <NavLink 
            to="/employees" 
            icon="people" 
            label="Employees" 
            active={isActive('/employees')} 
          />
          <NavLink 
            to="/departments" 
            icon="business" 
            label="Departments" 
            active={isActive('/departments')} 
          />
          <NavLink 
            to="/payroll" 
            icon="payments" 
            label="Payroll" 
            active={isActive('/payroll')} 
          />
          <NavLink 
            to="/leave" 
            icon="event_available" 
            label="Leave Management" 
            active={isActive('/leave')} 
          />
          <NavLink 
            to="/attendance" 
            icon="schedule" 
            label="Attendance" 
            active={isActive('/attendance')} 
          />
        </div>

        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recruitment</p>
          <NavLink 
            to="/jobs" 
            icon="work" 
            label="Jobs" 
            active={isActive('/jobs')} 
          />
          <NavLink 
            to="/candidates" 
            icon="person_search" 
            label="Candidates" 
            badge="13" 
            active={isActive('/candidates')} 
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="space-y-1">
            <NavLink 
              to="/settings" 
              icon="settings" 
              label="Settings" 
              active={isActive('/settings')} 
            />
            
            <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group">
                <span className="material-icons-round mr-3 text-xl text-gray-400 group-hover:text-red-500">logout</span>
                <span className="font-medium">Log Out</span>
            </button>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
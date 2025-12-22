import React from 'react';

// Helper component for Navigation Links to keep code DRY
const NavLink = ({ icon, label, href = "#", active = false, badge = null, special = false }) => {
  if (active) {
    return (
      <a href={href} className="flex items-center px-4 py-3 bg-primary text-gray-900 rounded-lg font-medium shadow-md transition-transform hover:scale-[1.02] mb-1">
        <span className="material-icons-round mr-3 text-xl">{icon}</span>
        {label}
      </a>
    );
  }

  // The "Leave Management" style from your HTML (Border left + transparent bg)
  if (special) {
    return (
      <a href={href} className="flex items-center px-4 py-2.5 text-white bg-white/10 rounded-lg transition-colors border-l-4 border-white group mb-1">
        <span className="material-icons-round mr-3 text-xl text-white">{icon}</span>
        {label}
      </a>
    );
  }

  // Standard inactive link
  return (
    <a href={href} className="flex items-center px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors group mb-1">
      <span className="material-icons-round mr-3 text-xl group-hover:text-primary transition-colors">{icon}</span>
      {label}
      {badge && (
        <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-72 bg-sidebar-bg dark:bg-black text-white flex-shrink-0 flex flex-col h-screen overflow-hidden relative shadow-xl z-20 font-sans">
      
      {/* --- Header Section --- */}
      <div className="p-6 pb-2">
        <h1 className="font-serif text-3xl tracking-wide text-white">HumaNova</h1>
      </div>

      {/* --- User Profile Section --- */}
      <div className="px-6 py-6 flex items-center space-x-4 border-b border-gray-700/50">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden bg-blue-900">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/a/default-user=s96-c" // Placeholder used since original source was generic
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg leading-tight">Alex ADMIN</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Admin</p>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
        
        {/* Features Group */}
        <div className="mb-6">
          <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Features</p>
          <NavLink icon="dashboard" label="Dashboard" active={true} />
          <NavLink icon="mail" label="Messages" badge="13" />
        </div>

        {/* Recruitment Group */}
        <div className="mb-6">
          <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recruitment</p>
          <NavLink icon="work" label="Jobs" />
          <NavLink icon="people" label="Candidates" />
          <NavLink icon="description" label="Resumes" />
        </div>

        {/* Organization Group */}
        <div className="mb-6">
          <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Organization</p>
          <NavLink icon="manage_accounts" label="Employee Management" />
          <NavLink icon="menu_book" label="Leave Management" />
          <NavLink icon="balance" label="Performance Management" />
          <NavLink icon="payments" label="Payroll Management" />
        </div>
      </nav>

      {/* --- Logout Button --- */}
      <div className="p-4 bg-sidebar-bg dark:bg-black relative z-10">
        <button className="w-full flex items-center justify-center px-4 py-3 bg-secondary-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg">
          <span className="material-icons-round mr-2 text-xl">power_settings_new</span>
          Log Out
        </button>
      </div>

      {/* --- Decorative Footer (Geometric Shapes) --- */}
      <div className="h-16 w-full relative overflow-hidden bg-sidebar-accent">
        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end">
          <div className="w-12 h-12 rounded-full bg-primary/20 -mb-6 -ml-2"></div>
          <div className="w-20 h-20 rounded-full bg-white/10 -mb-10 ml-4"></div>
          <div className="w-16 h-16 rounded-full bg-secondary-red/20 -mb-8 ml-auto mr-4"></div>
        </div>
      </div>
      
    </aside>
  );
};

export default Sidebar;
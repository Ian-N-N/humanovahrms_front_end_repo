import React from 'react';
import SystemDateTime from '../../components/common/SystemDate.jsx';

/* --- MOCK DATA --- */
const stats = [
  { label: "Total Employees", value: "1,240", badge: "+5%", badgeColor: "bg-blue-100 text-blue-600", icon: "groups" },
  { label: "Active Departments", value: "12", badge: null, icon: "apartment" },
  { label: "Pending Leave", value: "8 Requests", badge: "Action Needed", badgeColor: "bg-orange-100 text-orange-600", icon: "pending_actions" },
  { label: "Today's Attendance", value: "94%", badge: "+2%", badgeColor: "bg-blue-100 text-blue-600", icon: "how_to_reg" },
];

const recentActivity = [
  { name: "John Austine", action: "requested leave", time: "10 mins ago", type: "Sick Leave", avatar: "https://i.pravatar.cc/150?u=1" },
  { name: "New Employee", action: "Onboarded", time: "2 hours ago", type: "Dan Odhiambo", avatar: "https://i.pravatar.cc/150?u=2" },
  { name: "Nancy Adelice", action: "processed payroll", time: "Yesterday", type: "October Cycle", avatar: "https://i.pravatar.cc/150?u=3" },
  { name: "Ian Njuguna", action: "updated profile", time: "1 day ago", type: "Personal Info", avatar: "https://i.pravatar.cc/150?u=4" },
];

const topDepartments = [
  { name: "Engineering", score: "98%", width: "98%" },
  { name: "Sales", score: "92%", width: "92%" },
];

/* --- SUBCOMPONENTS --- */

// 1. Stat Card
const StatCard = ({ label, value, badge, badgeColor, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
        <span className="material-icons-round">{icon}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
  </div>
);

// 2. Action Buttons
const ActionButtons = () => (
  <div className="flex flex-wrap gap-4 mb-8">
    <button onClick={() => window.location.href = '/admin/employees/new'} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-colors">
      <span className="material-icons-round text-lg">person_add</span>
      Add Employee
    </button>
    <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors">
      <span className="material-icons-round text-lg">domain</span>
      Manage Departments
    </button>
    <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors">
      <span className="material-icons-round text-lg">bar_chart</span>
      View Reports
    </button>
  </div>
);

/* --- MAIN DASHBOARD COMPONENT --- */
const DashboardOverview = () => {
  return (
    <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-8 font-sans custom-scrollbar">

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Administrator. Here's what's happening today.</p>
        </div>

        <SystemDateTime />

      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 3. Actions Row */}
      <ActionButtons />

      {/* 4. Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* Attendance Trends (Line Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Attendance Trends</h3>
              <p className="text-xs text-gray-400">Monthly overview</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs text-gray-500">Present</span>
            </div>
          </div>

          {/* Simulated SVG Line Chart */}
          <div className="h-64 w-full relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <svg className="absolute inset-0 w-full h-full pl-8" preserveAspectRatio="none">
              {/* Gradient Area */}
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,200 C100,150 200,250 300,150 C400,50 500,180 600,150 C700,120 800,160 900,140 L900,250 L0,250 Z"
                fill="url(#gradient)"
              />
              {/* Blue Line */}
              <path
                d="M0,200 C100,150 200,250 300,150 C400,50 500,180 600,150 C700,120 800,160 900,140"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400 pt-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Recent Activity</h3>
            <button className="text-blue-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex gap-3">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">{item.name}</span> {item.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.time} • <span className="text-gray-400">{item.type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Employees by Department (Donut Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Employees by Department</h3>
            <p className="text-xs text-gray-400 mb-4">Distribution across sectors</p>
          </div>

          {/* CSS Conic Gradient Donut */}
          <div className="relative w-40 h-40 rounded-full"
            style={{ background: 'conic-gradient(#3B82F6 0% 35%, #1E40AF 35% 60%, #93C5FD 60% 75%, #E5E7EB 75% 100%)' }}>
            <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">1,240</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <div><p className="font-bold text-gray-800">35%</p><p className="text-xs text-gray-500">Engineering</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-900"></span>
              <div><p className="font-bold text-gray-800">25%</p><p className="text-xs text-gray-500">Sales</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-300"></span>
              <div><p className="font-bold text-gray-800">15%</p><p className="text-xs text-gray-500">Marketing</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-200"></span>
              <div><p className="font-bold text-gray-800">25%</p><p className="text-xs text-gray-500">Other</p></div>
            </div>
          </div>
        </div>

        {/* Top Departments */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Top Departments</h3>
          <div className="space-y-6">
            {topDepartments.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <span className="material-icons-round text-blue-500 text-sm bg-blue-50 p-1 rounded">code</span>
                    {dept.name}
                  </span>
                  <span className="font-bold text-blue-600">{dept.score}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: dept.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
};

export default DashboardOverview;
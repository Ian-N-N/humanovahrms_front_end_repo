import React from 'react';

/* --- MOCK DATA --- */
const announcements = [
  { title: "Office Maintenance", desc: "Scheduled maintenance for the HVAC system this Friday. Please work remotely...", time: "2 hours ago", icon: "campaign", color: "bg-blue-100 text-blue-600" },
  { title: "Health Benefit Update", desc: "New dental coverage has been added to the standard plan effective next...", time: "Yesterday", icon: "health_and_safety", color: "bg-blue-100 text-blue-600" },
];

const activities = [
  { title: "Clock In", time: "08:58 AM • Today", icon: "fiber_manual_record", color: "text-blue-600" },
  { title: "Clock Out", time: "06:02 PM • Yesterday", icon: "fiber_manual_record", color: "text-gray-300" },
  { title: "Clock In", time: "09:05 AM • Yesterday", icon: "fiber_manual_record", color: "text-gray-300" },
  { title: "Leave Approved", time: "Oct 27", icon: "fiber_manual_record", color: "text-green-500" },
];

const weeklyHours = [
  { day: "Mon", height: "60%", active: false },
  { day: "Tue", height: "100%", active: true }, // The tall blue bar
  { day: "Wed", height: "80%", active: true },
  { day: "Thu", height: "45%", active: false }, // Light blue
  { day: "Fri", height: "70%", active: false },
  { day: "Sat", height: "30%", active: false },
  { day: "Sun", height: "30%", active: false },
];

/* --- SUBCOMPONENTS --- */

// 1. Top Header Component
const Header = () => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 text-sm mt-1">Welcome back, Alex! Here's what's happening with you today.</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
        Online
      </div>
      <div className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg shadow-sm">
        Wed, Dec 17, 2025
      </div>
    </div>
  </div>
);

// 2. Stat Card Component
const StatCard = ({ title, value, subtext, icon, iconColor, footer, footerColor }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${iconColor} bg-opacity-10`}>
        <span className={`material-icons-round text-2xl ${iconColor.replace('bg-', 'text-')}`}>{icon}</span>
      </div>
    </div>
    
    {/* Optional Progress Bar style footer */}
    {footer === 'progress' && (
      <div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
    )}

    {/* Standard text footer */}
    {footer !== 'progress' && (
      <p className={`text-xs font-bold ${footerColor} flex items-center gap-1`}>
        {footer} <span className="text-gray-400 font-normal">{subtext}</span>
      </p>
    )}
  </div>
);

// 3. Quick Action Button
const QuickAction = ({ icon, label, primary = false }) => (
  <button className={`
    flex flex-col items-center justify-center py-6 px-4 rounded-xl border transition-all duration-200 w-full group
    ${primary 
      ? 'bg-blue-600 border-blue-600 text-white shadow-lg hover:bg-blue-700' 
      : 'bg-white border-gray-100 text-gray-700 shadow-sm hover:border-blue-200 hover:shadow-md'
    }
  `}>
    <div className={`
      p-3 rounded-full mb-3 flex items-center justify-center
      ${primary ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'}
    `}>
      <span className="material-icons-round text-xl">{icon}</span>
    </div>
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

/* --- MAIN DASHBOARD COMPONENT --- */
const Dashboard = () => {
  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans custom-scrollbar">
      
      {/* 1. Header Section */}
      <Header />

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Attendance" 
          value="92%" 
          icon="donut_large" 
          iconColor="text-blue-600 bg-blue-50"
          footer="+2%" 
          footerColor="text-green-600"
          subtext="from last month"
        />
        <StatCard 
          title="Leave Balance" 
          value="12 days" 
          icon="beach_access" 
          iconColor="text-blue-600 bg-blue-50"
          footer="progress"
          subtext="12 of 20 days remaining"
        />
        <StatCard 
          title="Next Payroll" 
          value="Oct 30" 
          icon="attach_money" 
          iconColor="text-blue-600 bg-blue-50"
          footer="5 days left" 
          footerColor="text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
          subtext="Processing soon"
        />
        <StatCard 
          title="Clocked In" 
          value="08:58 AM" 
          icon="schedule" 
          iconColor="text-blue-600 bg-blue-50"
          footer="On Time" 
          footerColor="text-green-600"
          subtext="Today"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Quick Actions</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Customize</button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <QuickAction icon="timer_off" label="Clock Out" primary={true} />
              <QuickAction icon="event_busy" label="Request Leave" />
              <QuickAction icon="receipt_long" label="Payslip" />
            </div>
          </section>

          {/* Weekly Work Hours Chart */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Weekly Work Hours</h3>
              <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg p-2 cursor-pointer focus:ring-0">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            
            {/* CSS Bar Chart */}
            <div className="flex items-end justify-between h-48 px-2">
              {weeklyHours.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer w-full">
                  <div className="relative w-full flex justify-center h-full items-end">
                    <div 
                      className={`w-8 rounded-t-lg transition-all duration-300 ${item.active ? 'bg-blue-600' : 'bg-blue-50 group-hover:bg-blue-200'}`}
                      style={{ height: item.height }}
                    >
                        {/* Tooltip on hover */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded transition-opacity">
                            8hrs
                        </div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* --- RIGHT COLUMN (Widgets) --- */}
        <div className="space-y-6">
          
          {/* Announcements Widget */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Announcements</h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">2 New</span>
            </div>
            <div className="space-y-5">
              {announcements.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${item.color}`}>
                    <span className="material-icons-round text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-2">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors">
              View All Announcements
            </button>
          </div>

          {/* Recent Activity Widget */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="relative pl-2">
              {/* Vertical Line */}
              <div className="absolute top-2 bottom-4 left-[9px] w-[2px] bg-gray-100"></div>
              
              <div className="space-y-6">
                {activities.map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <div className={`z-10 bg-white mt-0.5`}>
                         <span className={`material-icons-round text-[10px] ${item.color}`}>fiber_manual_record</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 leading-none">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default Dashboard;
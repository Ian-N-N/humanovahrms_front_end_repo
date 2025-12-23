import React from 'react';

/* --- MOCK DATA (So the UI looks populated) --- */
const statsData = [
  { icon: 'mail', count: 4, label: 'Messages', color: 'bg-yellow-400' },
  { icon: 'work', count: 1, label: 'Jobs', color: 'bg-blue-600' },
  { icon: 'people', count: 30, label: 'Candidates', color: 'bg-lime-600' },
  { icon: 'description', count: 2, label: 'Resumes', color: 'bg-gray-800' },
  { icon: 'person', count: 20, label: 'Employees', color: 'bg-yellow-400' },
  { icon: 'menu_book', count: 8, label: 'Leaves', color: 'bg-blue-800' },
  { icon: 'payments', count: 7, label: 'Payrolls', color: 'bg-lime-700' },
];

const jobsData = [
  { title: 'Sales Executive', company: 'Access Bank', time: '20m ago', icon: 'account_balance' },
  { title: 'User Experience Designer', company: 'Paystack', time: '10m ago', icon: 'brush' },
  { title: 'Product Manager', company: 'Google', time: '1hr ago', icon: 'layers' },
];

const employeeData = [
  { name: 'Aman', role: 'Product Manager', bg: 'bg-yellow-400' },
  { name: 'Gelila', role: 'Sales Executive', bg: 'bg-blue-500' },
  { name: 'Biruk', role: 'UI/UX Designer', bg: 'bg-red-500' },
];

/* --- SUBCOMPONENT 1: HEADER --- */
const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      {/* Search Section */}
      <div className="flex items-center w-full md:w-auto flex-1 max-w-2xl bg-white rounded-lg shadow-sm p-1">
        <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium mr-2">
          All Candidates <span className="material-icons-round text-sm ml-1">expand_more</span>
        </button>
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-600 placeholder-gray-400"
        />
        <button className="p-2 text-gray-400 hover:text-blue-600">
          <span className="material-icons-round">search</span>
        </button>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 bg-blue-900 text-white rounded-full relative shadow-md hover:scale-105 transition">
          <span className="material-icons-round text-lg">notifications</span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 bg-yellow-400 text-gray-900 rounded-full shadow-md hover:scale-105 transition">
          <span className="material-icons-round text-lg">build</span>
        </button>
        <button className="p-2 bg-lime-600 text-white rounded-full relative shadow-md hover:scale-105 transition">
          <span className="material-icons-round text-lg">mail</span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </div>
  );
};

/* --- SUBCOMPONENT 2: STAT CARD --- */
const StatCard = ({ icon, count, label, color }) => {
  return (
    <div className={`${color} rounded-xl p-4 text-white shadow-lg flex items-center min-w-[140px] transform hover:-translate-y-1 transition-transform cursor-pointer`}>
      <span className="material-icons-round text-4xl opacity-80 mr-3">{icon}</span>
      <div>
        <h3 className="text-2xl font-bold leading-none">{count}</h3>
        <p className="text-xs font-medium opacity-90 mt-1">{label}</p>
      </div>
    </div>
  );
};

/* --- SUBCOMPONENT 3: CONTENT CARD WRAPPER --- */
const ContentCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="material-icons-round">more_vert</span>
        </button>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

/* --- MAIN DASHBOARD COMPONENT --- */
const Dashboard = () => {
  return (
    <div className="flex-1 bg-[#F3F6FD] h-screen overflow-y-auto p-6 lg:p-10 font-sans custom-scrollbar">
      
      {/* 1. Top Header */}
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <DashboardHeader />
      </div>

      {/* 2. Statistics Row */}
      {/* This row is horizontally scrollable on smaller screens */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Applied Jobs Section */}
          <ContentCard title="Applied Jobs">
            {jobsData.map((job, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm mr-3">
                  <span className="material-icons-round">{job.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{job.title}</h4>
                  <p className="text-xs text-gray-500">{job.company}</p>
                </div>
                <span className="text-xs text-gray-400">{job.time}</span>
              </div>
            ))}
          </ContentCard>

          {/* Candidates Section (Reusing structure for demo) */}
          <ContentCard title="Candidates">
            {employeeData.map((emp, index) => (
               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full ${emp.bg} flex items-center justify-center text-white text-xs font-bold`}>
                   {emp.name.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                   <p className="text-[10px] text-gray-500">Applicant</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600"><span className="material-icons-round text-sm">check</span></button>
                 <button className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"><span className="material-icons-round text-sm">close</span></button>
               </div>
             </div>
            ))}
          </ContentCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Employees Section */}
          <ContentCard title="Employees">
            {employeeData.map((emp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${emp.bg} border-2 border-white shadow-sm flex items-center justify-center overflow-hidden`}>
                     {/* Placeholder Avatar */}
                     <span className="material-icons-round text-white">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                    <span className="material-icons-round text-lg">visibility</span>
                  </button>
                  <button className="p-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                    <span className="material-icons-round text-lg">download</span>
                  </button>
                </div>
              </div>
            ))}
          </ContentCard>

           {/* April Payrolls Section */}
           <ContentCard title="April Payrolls">
            {employeeData.map((emp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${emp.bg} flex items-center justify-center text-white text-xs font-bold`}>
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                    <p className="text-[10px] text-gray-500">Salary: 40,000 Birr</p>
                  </div>
                </div>
                <div className="w-24">
                  <div className="flex justify-between text-[10px] mb-1 text-gray-500">
                    <span>Processing</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </ContentCard>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useMemo } from 'react'; /* --- NEW: Import useMemo --- */
import AttendanceDetails from './AttendanceDetails';

/* --- MOCK DATA (unchanged) --- */
const ATTENDANCE_DATA = [
  { 
    id: 1, 
    employee: { name: "Sarah Connor", role: "Product Designer", dept: "Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    checkIn: "08:55 AM", checkOut: "05:00 PM", workHours: "8h 05m", progress: 100, status: "On Time"
  },
  { 
    id: 2, 
    employee: { name: "John Doe", role: "Senior Engineer", dept: "Engineering", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    checkIn: "09:15 AM", checkOut: "--:--", workHours: "6h 30m", progress: 75, status: "Late"
  },
  { 
    id: 3, 
    employee: { name: "Emily Chen", role: "Marketing Lead", dept: "Sales", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    checkIn: "08:45 AM", checkOut: "--:--", workHours: "7h 15m", progress: 85, status: "On Time"
  },
  { 
    id: 4, 
    employee: { name: "Michael Scott", role: "Regional Manager", dept: "Sales", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    checkIn: "--:--", checkOut: "--:--", workHours: "0h 00m", progress: 0, status: "Absent"
  },
  { 
    id: 5, 
    employee: { name: "Alice M", role: "Intern", dept: "Engineering", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    checkIn: "09:00 AM", checkOut: "01:00 PM", workHours: "4h 00m", progress: 50, status: "Half Day"
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    "On Time": "bg-green-50 text-green-700 border-green-100",
    "Late": "bg-orange-50 text-orange-700 border-orange-100",
    "Absent": "bg-red-50 text-red-700 border-red-100",
    "Half Day": "bg-blue-50 text-blue-700 border-blue-100",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status] || styles["On Time"]}`}>
      {status}
    </span>
  );
};

/* --- MAIN COMPONENT --- */
const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  /* --- NEW: STATE FOR INTERACTIVITY --- */
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  /* --- NEW: FILTER LOGIC --- */
  // This calculates 'filteredData' every time search/dept changes
  const filteredData = useMemo(() => {
    return ATTENDANCE_DATA.filter(item => {
      // Check if name matches search
      const matchesSearch = item.employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      // Check if dept matches filter (or if filter is 'All')
      const matchesDept = filterDept === 'All' || (item.employee.dept && item.employee.dept === filterDept); // Added safety check for dept
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, filterDept]);

  /* --- NEW: HANDLER FUNCTION --- */
  const handleViewDetails = (record) => {
    setSelectedRecord({ ...record, date: currentDate });
    setView('details');
  };

  return (
    <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
      
      {/* --- NEW: CONDITIONAL RENDERING --- */}
      {view === 'details' ? (
        // IF VIEW IS DETAILS, SHOW THE DETAILS COMPONENT
        <AttendanceDetails 
          record={selectedRecord} 
          onBack={() => setView('list')} 
        />
      ) : (
        // ELSE SHOW THE STANDARD LIST DASHBOARD
        <>
          {/* 1. Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                <span>Dashboard</span> / <span className="text-gray-900 font-medium">Attendance</span>
              </nav>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Daily Attendance</h1>
              <p className="text-gray-500 mt-1 text-sm">Real-time tracking for <span className="font-bold text-gray-800">Today</span></p>
            </div>
            
            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
              <input 
                type="date" 
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="px-3 py-2 bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* 2. Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-xs font-bold text-gray-400 uppercase">Total Employees</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">{ATTENDANCE_DATA.length}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-xs font-bold text-green-600 uppercase">Present</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">
                 {ATTENDANCE_DATA.filter(i => i.status !== 'Absent').length}
               </h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-xs font-bold text-orange-500 uppercase">Late Arrival</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">
                 {ATTENDANCE_DATA.filter(i => i.status === 'Late').length}
               </h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
               <p className="text-xs font-bold text-red-500 uppercase">Absent</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">
                 {ATTENDANCE_DATA.filter(i => i.status === 'Absent').length}
               </h3>
            </div>
          </div>

          {/* 3. Main Content Box */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            
            {/* Filters */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-72">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                {/* --- NEW: CONNECTED INPUT TO STATE --- */}
                <input 
                  type="text" 
                  placeholder="Search employee..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-700" 
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                 {/* --- NEW: CONNECTED SELECT TO STATE --- */}
                 <select 
                   value={filterDept}
                   onChange={(e) => setFilterDept(e.target.value)}
                   className="px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-600 cursor-pointer focus:ring-2 focus:ring-blue-500/20 w-full sm:w-auto"
                 >
                   <option value="All">All Departments</option>
                   <option value="Engineering">Engineering</option>
                   <option value="Sales">Sales</option>
                   <option value="Design">Design</option>
                 </select>
                 <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                   <span className="material-icons-round text-lg">download</span>
                   Export
                 </button>
              </div>
            </div>

            {/* --- DESKTOP VIEW: TABLE --- */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Check In</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Check Out</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-48">Work Hours</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* --- NEW: MAP OVER filteredData INSTEAD OF ATTENDANCE_DATA --- */}
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={row.employee.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{row.employee.name}</p>
                            <p className="text-xs text-gray-400">{row.employee.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {row.checkIn}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500">
                        {row.checkOut}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${row.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${row.progress}%` }}></div>
                           </div>
                           <span className="text-xs font-medium text-gray-600 w-12 text-right">{row.workHours}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        {/* --- NEW: ADDED ONCLICK HANDLER --- */}
                        <button 
                          onClick={() => handleViewDetails(row)}
                          className="text-gray-400 hover:text-blue-600 p-1 cursor-pointer"
                        >
                          <span className="material-icons-round">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                     <tr><td colSpan="6" className="text-center py-8 text-gray-500">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE VIEW: CARDS --- */}
            <div className="block lg:hidden bg-gray-50 p-4 space-y-4">
              {/* --- NEW: MAP OVER filteredData --- */}
              {filteredData.map((row) => (
                <div key={row.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={row.employee.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{row.employee.name}</h4>
                        <p className="text-xs text-gray-500">{row.employee.role}</p>
                      </div>
                    </div>
                    <StatusBadge status={row.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-3">
                    <div>
                       <p className="text-gray-400 text-xs mb-0.5">Check In</p>
                       <p className="font-bold text-gray-800">{row.checkIn}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-gray-400 text-xs mb-0.5">Check Out</p>
                       <p className="font-bold text-gray-800">{row.checkOut}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Work Duration</span>
                        <span className="font-bold text-blue-600">{row.workHours}</span>
                     </div>
                     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${row.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${row.progress}%` }}></div>
                     </div>
                     {/* --- NEW: ADDED BUTTON HANDLER --- */}
                     <button 
                       onClick={() => handleViewDetails(row)}
                       className="w-full mt-3 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors"
                     >
                       View Timeline
                     </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center rounded-b-2xl">
               <span className="text-xs text-gray-500">Showing {filteredData.length} records</span>
               <div className="flex gap-2">
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                    <span className="material-icons-round text-sm">chevron_left</span>
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                    <span className="material-icons-round text-sm">chevron_right</span>
                 </button>
               </div>
            </div>

          </div>
        </>
      )}
    </main>
  );
};

export default Attendance;
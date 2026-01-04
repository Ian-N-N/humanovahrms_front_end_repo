import React, { useState, useMemo } from 'react';

/* --- MOCK DATA --- */
const LEAVE_REQUESTS = [
  { 
    id: 1, 
    employee: { name: "Sarah Connor", role: "Product Designer", dept: "Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    type: "Sick Leave",
    duration: "Feb 12 - Feb 14",
    days: "3 Days",
    reason: "Recovering from seasonal flu...",
    status: "Pending"
  },
  { 
    id: 2, 
    employee: { name: "John Doe", role: "Senior Engineer", dept: "Engineering", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    type: "Vacation",
    duration: "Mar 01 - Mar 10",
    days: "10 Days",
    reason: "Family trip to Europe.",
    status: "Approved"
  },
  { 
    id: 3, 
    employee: { name: "Emily Chen", role: "Marketing Lead", dept: "Marketing", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    type: "Personal",
    duration: "Feb 20",
    days: "1 Day",
    reason: "Attending sister's wedding reh...",
    status: "Pending"
  },
  { 
    id: 4, 
    employee: { name: "Michael Scott", role: "Regional Manager", dept: "Management", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    type: "Casual Leave",
    duration: "Feb 14",
    days: "1 Day",
    reason: "Just because I felt like it.",
    status: "Rejected"
  },
  { 
    id: 5, 
    employee: { name: "Alan Smithee", role: "Developer", dept: "Engineering", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    type: "Sick Leave",
    duration: "Feb 18 - Feb 22",
    days: "5 Days",
    reason: "Surgery recovery.",
    status: "Pending"
  },
];

/* --- HELPER COMPONENTS --- */
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Approved: "bg-green-50 text-green-700 border-green-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.Pending} flex items-center gap-1.5 w-fit`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current`}></span>
      {status}
    </span>
  );
};

/* --- MAIN COMPONENT --- */
const LeaveManagement = () => {
  // 1. Define State for Interactivity
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  // 2. Filter Logic
  const filteredRequests = useMemo(() => {
    return LEAVE_REQUESTS.filter(req => {
      const matchesSearch = req.employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
      const matchesDept = deptFilter === 'All' || req.employee.dept === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [searchTerm, statusFilter, deptFilter]);

  // 3. Handlers
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDeptFilter('All');
  };

  const handleNewRequest = () => {
    alert("Open New Request Modal"); // Placeholder for modal logic
  };

  return (
    <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <span>Dashboard</span> / <span>Leave Management</span> / <span className="text-gray-900 font-medium">Requests</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage and review employee time-off applications.</p>
        </div>
        <button 
          onClick={handleNewRequest}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors transition-transform active:scale-95"
        >
          <span className="material-icons-round text-lg">add</span>
          New Request
        </button>
      </div>

      {/* Stats Cards (Static for now, but could be dynamic based on filteredRequests) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <span className="material-icons-round text-xl">pending_actions</span>
            </div>
            <span className="text-xs font-medium text-gray-500">Pending Requests</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">12</h3>
            <p className="text-xs text-orange-600 font-medium mt-1">+2 from yesterday</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <span className="material-icons-round text-xl">check_circle</span>
            </div>
            <span className="text-xs font-medium text-gray-500">Approved This Month</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">45</h3>
            <p className="text-xs text-green-600 font-medium mt-1">+12% vs last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="material-icons-round text-xl">flight_takeoff</span>
            </div>
            <span className="text-xs font-medium text-gray-500">On Leave Today</span>
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-bold text-gray-900">3</h3>
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?u=a" alt="" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?u=b" alt="" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                +1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Filters & Table) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
        
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Input (Added) */}
            <div className="relative">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-600 focus:ring-2 focus:ring-blue-500/20 w-full sm:w-48"
                />
            </div>

            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-600 cursor-pointer focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Department Filter */}
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-600 cursor-pointer focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
             <button 
                onClick={handleReset}
                className="text-sm text-blue-600 font-bold hover:underline"
             >
                Reset Filters
             </button>
             <button className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <span className="material-icons-round text-lg">download</span>
                Export
             </button>
          </div>
        </div>

        {/* --- VIEW 1: TABLE (Hidden on small screens) --- */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Leave Type</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Reason</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.length > 0 ? filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={request.employee.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{request.employee.name}</p>
                        <p className="text-xs text-gray-400">{request.employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">{request.type}</td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{request.duration}</p>
                    <p className="text-xs text-gray-500">{request.days}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{request.reason}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors">
                      <span className="material-icons-round">more_vert</span>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">No requests found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- VIEW 2: CARDS (Visible on Mobile/Tablet) --- */}
        <div className="block lg:hidden bg-gray-50 p-4 space-y-4">
          {filteredRequests.length > 0 ? filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={request.employee.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{request.employee.name}</h4>
                    <p className="text-xs text-gray-500">{request.employee.role}</p>
                  </div>
                </div>
                <button className="text-gray-400">
                  <span className="material-icons-round">more_vert</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-3 mb-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Leave Type</p>
                  <p className="font-medium text-gray-700">{request.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Status</p>
                  <div className="flex justify-end"><StatusBadge status={request.status} /></div>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs mb-1">Duration</p>
                  <p className="font-medium text-gray-900">{request.duration} <span className="text-gray-400">({request.days})</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg italic">
                "{request.reason}"
              </p>
            </div>
          )) : (
            <div className="py-8 text-center text-gray-500">No requests found.</div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center rounded-b-2xl">
           <span className="text-xs text-gray-500">Showing {filteredRequests.length} records</span>
           <div className="flex gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50">
                <span className="material-icons-round text-sm">chevron_left</span>
             </button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                <span className="material-icons-round text-sm">chevron_right</span>
             </button>
           </div>
        </div>

      </div>
    </main>
  );
};

export default LeaveManagement;
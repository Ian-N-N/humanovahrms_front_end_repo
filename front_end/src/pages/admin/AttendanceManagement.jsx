import React, { useState, useMemo, useEffect } from 'react';
import AttendanceDetails from './AttendanceDetails';
import { useAttendance } from '../../context/AttendanceContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useNotification } from '../../context/NotificationContext';

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

const Attendance = () => {
  const { records, loading, refetch } = useAttendance();
  const { departments } = useDepartment();
  const { employees } = useEmployee();
  const { showNotification } = useNotification();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('list');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const transformedRecords = useMemo(() => {
    return records.map(rec => {
      // Find matching employee by user_id or employee_id
      const empId = rec.user_id || rec.employee_id || rec.user?.id;
      const matchedEmployee = employees.find(e => e.id === empId || e.user_id === empId);

      return {
        ...rec,
        employee: rec.employee || matchedEmployee || {
          name: "Unknown Employee",
          role: "Unknown",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(rec.user_id || 'U')}&background=random`
        },
        checkIn: rec.clock_in_time || rec.clock_in || rec.clockIn || rec.checkIn || rec.check_in || "--:--",
        checkOut: rec.clock_out_time || rec.clock_out || rec.clockOut || rec.checkOut || rec.check_out || "--:--",
        workHours: rec.work_hours || rec.workHours || "0h 00m",
        status: rec.status || "On Time"
      };
    });
  }, [records, employees]);

  const filteredData = useMemo(() => {
    return transformedRecords.filter(item => {
      const matchesSearch = item.employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = filterDept === 'All' || (item.employee.dept && item.employee.dept === filterDept) || (item.department && item.department === filterDept);
      const matchesDate = !item.date || item.date === currentDate;
      return matchesSearch && matchesDept && matchesDate;
    });
  }, [transformedRecords, searchQuery, filterDept, currentDate]);

  const stats = useMemo(() => {
    const total = transformedRecords.length;
    const present = transformedRecords.filter(i => i.status !== 'Absent').length;
    const late = transformedRecords.filter(i => i.status === 'Late').length;
    const absent = transformedRecords.filter(i => i.status === 'Absent').length;
    return { total, present, late, absent };
  }, [transformedRecords]);

  const handleViewDetails = (record) => {
    setSelectedRecord({ ...record, date: record.date || currentDate });
    setView('details');
  };

  if (loading && records.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
      {view === 'details' ? (
        <AttendanceDetails
          record={selectedRecord}
          onBack={() => setView('list')}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                <span>Dashboard</span> / <span className="text-gray-900 font-medium">Attendance</span>
              </nav>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Daily Attendance Log</h1>
              <p className="text-gray-500 mt-1 text-sm">Managing records for <span className="font-bold text-gray-800">{currentDate}</span></p>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">Total Logged</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-green-600 uppercase">Present</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.present}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-orange-500 uppercase">Late</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.late}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-red-500 uppercase">Absent</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.absent}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-72">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-700"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-600 cursor-pointer focus:ring-2 focus:ring-blue-500/20 w-full sm:w-auto"
                >
                  <option value="All">All Departments</option>
                  {departments && departments.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => refetch()}
                  className="p-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  <span className="material-icons-round text-lg">refresh</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Employee</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Clock In</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Clock Out</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Duration</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase text-center">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => handleViewDetails(row)}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={row.employee.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{row.employee.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">{row.employee.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{row.checkIn}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500">{row.checkOut}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{row.workHours}</td>
                      <td className="py-4 px-6 text-center"><StatusBadge status={row.status} /></td>
                      <td className="py-4 px-6 text-right">
                        <span className="material-icons-round text-gray-300 group-hover:text-blue-500">chevron_right</span>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr><td colSpan="6" className="text-center py-20 text-gray-400">No attendance reports found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Attendance;
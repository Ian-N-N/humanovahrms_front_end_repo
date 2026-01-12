import React, { useMemo } from 'react';
import SystemDateTime from '../../components/common/SystemDate.jsx';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useLeave } from '../../context/LeaveContext';
import { useAttendance } from '../../context/AttendanceContext';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ label, value, badge, badgeColor, icon, onClick }) => (
  <div onClick={onClick} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-blue-200' : ''}`}>
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
        <span className="material-icons-round text-2xl">{icon}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${badgeColor}`}>
          {badge}
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { employees } = useEmployee();
  const { departments } = useDepartment();
  const { leaves } = useLeave();
  const { records } = useAttendance();

  const stats = useMemo(() => {
    return [
      { label: "Total Workforce", value: employees.length, icon: "groups", onClick: () => navigate('/admin/employees') },
      { label: "Business Units", value: departments.length, icon: "corporate_fare", onClick: () => navigate('/admin/departments') },
      { label: "Pending Leave", value: leaves.filter(l => l.status === 'Pending').length, icon: "event_note", badge: "Action Required", badgeColor: "bg-orange-100 text-orange-700", onClick: () => navigate('/admin/leave') },
      { label: "Today's Pulse", value: records.length > 0 ? `${Math.round((records.filter(r => r.status !== 'Absent').length / (employees.length || 1)) * 100)}%` : "0%", icon: "speed", onClick: () => navigate('/admin/attendance') },
    ];
  }, [employees, departments, leaves, records, navigate]);

  const displayName = user?.name || user?.email?.split('@')[0] || 'Administrator';
  const firstName = displayName.split(' ')[0];

  return (
    <main className="flex-1 bg-[#FDFDFD] h-full overflow-y-auto p-6 lg:p-10 font-sans custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Executive Control</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">Welcome back, {firstName}. Here's the organizational overview today.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <SystemDateTime />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        <button onClick={() => navigate('/admin/new_employee')} className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all active:scale-95">
          <span className="material-icons-round text-lg">person_add</span>
          Onboard Talent
        </button>
        <button onClick={() => navigate('/admin/departments')} className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm transition-all active:scale-95">
          <span className="material-icons-round text-lg">domain</span>
          Org Structure
        </button>
        <button onClick={() => navigate('/admin/analytics')} className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm transition-all active:scale-95">
          <span className="material-icons-round text-lg">analytics</span>
          Insights
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Attendance Momentum</h3>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Global Activity Trends</p>
            </div>
          </div>
          <div className="h-72 bg-gray-50 rounded-3xl flex items-center justify-center border border-dashed border-gray-200">
            <div className="text-center">
              <span className="material-icons-round text-5xl text-gray-200 block mb-4">insights</span>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Real-time charts loading...</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 tracking-tight">Live Activity</h3>
          <div className="space-y-6">
            {employees.slice(0, 5).map((emp, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-black text-sm group-hover:scale-110 transition-transform">
                  {emp.name?.charAt(0)}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {emp.name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                    {emp.department || 'General'} • Profile Unified
                  </p>
                </div>
              </div>
            ))}
            {employees.length === 0 && <p className="text-center py-10 text-gray-400 font-bold italic text-sm">No activity stream found.</p>}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-colors">
            View Detailed Logs
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardOverview;
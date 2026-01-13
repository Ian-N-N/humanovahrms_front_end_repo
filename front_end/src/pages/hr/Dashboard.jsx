import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useLeave } from '../../context/LeaveContext';
import { useAttendance } from '../../context/AttendanceContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const HRDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { employees, refetch: fetchEmployees } = useEmployee();
    const { departments, refetch: fetchDepartments } = useDepartment();
    const { leaves, refetch: fetchLeaves } = useLeave();
    const { records, refetch: fetchAttendance } = useAttendance();

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
        fetchLeaves();
        fetchAttendance();
    }, []);

    const displayName = user?.name || user?.email?.split('@')[0] || 'HR Manager';
    const firstName = displayName.split(' ')[0];

    // --- REAL DATA CALCULATIONS ---
    const stats = useMemo(() => {
        const safeEmployees = Array.isArray(employees) ? employees : [];
        const safeRecords = Array.isArray(records) ? records : [];
        const safeLeaves = Array.isArray(leaves) ? leaves : [];

        // 1. Team Presence (Percentage of people clocked in today)
        // Note: For a real app, you'd filter records by today's date
        // Since database might be sparse, we'll just check active sessions
        const activeSessions = safeRecords.filter(r => !r.clock_out).length;
        const presence = safeEmployees.length > 0
            ? `${Math.round((activeSessions / safeEmployees.length) * 100)}%`
            : "0%";

        // 2. Pending Approvals
        const pendingCount = safeLeaves.filter(l => l.status === 'Pending').length;

        // 3. New Hires (Last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newHiresCount = safeEmployees.filter(emp => {
            const hireDate = new Date(emp.hire_date || emp.created_at);
            return hireDate >= thirtyDaysAgo;
        }).length;

        return [
            { label: 'Team Presence', value: presence, note: activeSessions > 0 ? 'Live Now' : 'Quiet', badgeColor: 'bg-emerald-100 text-emerald-800', icon: 'groups', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
            { label: 'Pending Approvals', value: pendingCount, note: 'Action Required', badgeColor: 'bg-orange-100 text-orange-800', icon: 'pending_actions', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
            { label: 'Recent Onboarding', value: newHiresCount, note: 'Last 30 Days', badgeColor: 'bg-blue-100 text-blue-800', icon: 'person_add', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
        ];
    }, [employees, records, leaves]);

    const activeLeaves = useMemo(() => {
        return (Array.isArray(leaves) ? leaves : [])
            .filter(l => l.status === 'Pending')
            .slice(0, 4)
            .map(l => ({
                id: l.id,
                name: l.employee_name || `Employee #${l.employee_id}`,
                date: `${l.start_date} - ${l.end_date}`,
                type: l.leave_type || 'General Leave',
                avatar: (l.employee_name || 'E').charAt(0)
            }));
    }, [leaves]);

    const densityData = useMemo(() => {
        const safeDepts = Array.isArray(departments) ? departments : [];
        const safeEmps = Array.isArray(employees) ? employees : [];
        const total = safeEmps.length || 1;

        return safeDepts.slice(0, 3).map(dept => {
            const count = safeEmps.filter(e => e.department_id === dept.id || e.department === dept.name).length;
            return {
                name: dept.name,
                percent: Math.round((count / total) * 100)
            };
        });
    }, [departments, employees]);

    return (
        <main className="flex-1 bg-[#FDFDFD] h-full overflow-y-auto p-6 lg:p-10 font-sans custom-scrollbar">
            <div className="space-y-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Good morning, {firstName} ☕</h2>
                        <p className="text-gray-400 text-sm mt-1 font-medium">Manage your people and processes from one central hub.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                            Export PDF
                        </button>
                        <button
                            onClick={() => navigate('/hr/employees/new')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                        >
                            + New Employee
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center`}>
                                    <span className={`material-icons-round ${stat.iconColor} text-2xl`}>{stat.icon}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg ${stat.badgeColor}`}>
                                    {stat.note}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <section className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase tracking-widest">Active Requests</h3>
                            <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">View Ledger</button>
                        </div>
                        <div className="space-y-4">
                            {activeLeaves.map(leave => (
                                <div key={leave.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-3xl transition-all border border-gray-50 group">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm group-hover:scale-110 transition-transform">
                                            {leave.avatar}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">{leave.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg font-black tracking-widest uppercase">{leave.type}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase">{leave.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate('/hr/leave')}
                                            className="w-10 h-10 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors" title="Reject">
                                            <span className="material-icons-round text-lg">close</span>
                                        </button>
                                        <button
                                            onClick={() => navigate('/hr/leave')}
                                            className="w-10 h-10 rounded-2xl text-emerald-500 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors shadow-sm" title="Approve">
                                            <span className="material-icons-round text-lg">check</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {activeLeaves.length === 0 && (
                                <p className="text-center py-10 text-gray-400 font-bold italic text-sm">No pending requests to show.</p>
                            )}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative border-t-4 border-t-indigo-600/20">
                        <h3 className="text-lg font-black text-gray-900 mb-8 tracking-tight uppercase tracking-widest">Global Density</h3>
                        <div className="h-48 flex items-center justify-center relative mb-8">
                            <div className="h-40 w-40 rounded-full border-[12px] border-blue-600 border-t-transparent border-r-indigo-200 border-b-gray-100 transform -rotate-45 relative flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-gray-900 tracking-tighter">{employees.length || 0}</span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest -mt-1">Total</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {densityData.map((dept, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{dept.name}</span>
                                    <span className="text-xs font-black text-gray-900">{dept.percent}%</span>
                                </div>
                            ))}
                            {densityData.length === 0 && (
                                <p className="text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">No department data</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default HRDashboard;

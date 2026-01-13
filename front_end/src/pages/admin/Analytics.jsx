import React, { useMemo } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useLeave } from '../../context/LeaveContext';

const Analytics = () => {
    const { employees } = useEmployee();
    const { departments } = useDepartment();
    const { leaves } = useLeave();

    const stats = useMemo(() => {
        const totalEmployees = employees.length;
        const activeEmployees = employees.filter(e => e.status === 'Active').length;
        const deptsCount = departments.length;
        const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;

        // Dept breakdown
        const deptStats = departments.map(d => {
            const count = employees.filter(e => e.department_id === d.id || e.department === d.name).length;
            const percentage = totalEmployees > 0 ? (count / totalEmployees) * 100 : 0;
            return { name: d.name, count, percentage };
        });

        return { totalEmployees, activeEmployees, deptsCount, pendingLeaves, deptStats };
    }, [employees, departments, leaves]);

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <nav className="text-sm text-gray-500 mb-1">
                        <span>Dashboard</span> / <span className="text-gray-900 font-medium">Analytics</span>
                    </nav>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Organizational Overview</h1>
                    <p className="text-gray-500 mt-1 text-sm">Key performance indicators and departmental insights.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <span className="material-icons-round">groups</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Total Employees</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalEmployees}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                        <span className="material-icons-round">check_circle</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Active Status</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.activeEmployees}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                        <span className="material-icons-round">business</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Departments</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.deptsCount}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                        <span className="material-icons-round">event_busy</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Pending Requests</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.pendingLeaves}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Breakdown */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Distribution by Department</h3>
                    <div className="space-y-6">
                        {stats.deptStats.map((dept, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-gray-700">{dept.name}</span>
                                    <span className="text-gray-500">{dept.count} members</span>
                                </div>
                                <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${dept.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {stats.deptStats.length === 0 && <p className="text-gray-400 italic text-center py-10">No department data available</p>}
                    </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Internal Workforce Growth</h3>
                    <div className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <div className="text-center p-6">
                            <span className="material-icons-round text-4xl text-gray-300">bar_chart</span>
                            <p className="text-sm font-bold text-gray-500 mt-2">Historical Growth Trends</p>
                            <p className="text-xs text-gray-400 max-w-[200px] mt-1 mx-auto">This visualization will display cumulative hiring trends over the last 12 months.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Analytics;

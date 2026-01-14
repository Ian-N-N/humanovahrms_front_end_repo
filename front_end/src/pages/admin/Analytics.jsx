import React, { useMemo } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useLeave } from '../../context/LeaveContext';


const WorkforceGrowthChart = ({ employees }) => {
    const growthData = useMemo(() => {
        // Get last 12 months
        const months = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                label: d.toLocaleDateString('en-US', { month: 'short' }),
                date: d
            });
        }

        // Calculate cumulative hires by month
        let cumulative = 0;
        const data = months.map(month => {
            const monthEnd = new Date(month.date.getFullYear(), month.date.getMonth() + 1, 0);
            const hiredByMonth = employees.filter(e => {
                if (!e.hire_date) return false;
                const hireDate = new Date(e.hire_date);
                return hireDate <= monthEnd;
            }).length;

            return {
                label: month.label,
                count: hiredByMonth
            };
        });

        const maxCount = Math.max(...data.map(d => d.count), 1);
        return { data, maxCount };
    }, [employees]);

    if (growthData.data.length === 0 || growthData.maxCount === 0) {
        return (
            <div className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">No hiring data available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Chart */}
            <div className="flex items-end justify-between h-48 gap-2 px-4">
                {growthData.data.map((item, i) => {
                    const height = (item.count / growthData.maxCount) * 100;
                    return (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                            <div className="relative w-full flex justify-center h-full items-end">
                                <div
                                    className="w-full max-w-[32px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500 relative"
                                    style={{ height: `${Math.max(height, 5)}%` }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded transition-opacity whitespace-nowrap">
                                        {item.count} employees
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-xs font-medium text-gray-600">Cumulative Headcount</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                    {growthData.data[growthData.data.length - 1]?.count || 0} Total
                </span>
            </div>
        </div>
    );
};

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

                {/* Workforce Growth Chart */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Internal Workforce Growth</h3>
                    <WorkforceGrowthChart employees={employees} />
                </div>
            </div>
        </main>
    );
};

export default Analytics;

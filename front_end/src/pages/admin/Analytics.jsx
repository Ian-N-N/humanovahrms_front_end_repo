import React, { useMemo } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useLeave } from '../../context/LeaveContext';


const WorkforceGrowthChart = ({ employees }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

    const growthData = useMemo(() => {
        // Get last 12 months
        const months = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                label: d.toLocaleDateString('en-US', { month: 'short' }),
                monthKey: d.getMonth(),
                year: d.getFullYear(),
                date: d
            });
        }

        // Calculate data
        const data = months.map(month => {
            const monthStart = new Date(month.date.getFullYear(), month.date.getMonth(), 1);
            const monthEnd = new Date(month.date.getFullYear(), month.date.getMonth() + 1, 0);

            // New hires this month
            const newHires = employees.filter(e => {
                if (!e.hire_date) return false;
                const hireDate = new Date(e.hire_date);
                return hireDate >= monthStart && hireDate <= monthEnd;
            }).length;

            // Cumulative headcount up to this month
            const cumulative = employees.filter(e => {
                if (!e.hire_date) return false;
                const hireDate = new Date(e.hire_date);
                return hireDate <= monthEnd;
            }).length;

            return {
                label: month.label,
                newHires,
                cumulative
            };
        });

        const maxCumulative = Math.max(...data.map(d => d.cumulative), 1);
        const maxNewHires = Math.max(...data.map(d => d.newHires), 1);

        // Find top hiring month
        let topHiringMonth = data[0];
        data.forEach(m => {
            if (m.newHires > topHiringMonth.newHires) topHiringMonth = m;
        });

        return { data, maxCumulative, maxNewHires, topHiringMonth };
    }, [employees]);

    if (growthData.data.length === 0) return null;

    // SVG scaling constants
    const width = 1000;
    const height = 300;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Generate Area Path
    const areaPoints = growthData.data.map((item, i) => {
        const x = padding + (i * (chartWidth / (growthData.data.length - 1)));
        const y = padding + chartHeight - (item.cumulative / growthData.maxCumulative) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    const areaPath = `M ${padding},${height - padding} L ${areaPoints} L ${width - padding},${height - padding} Z`;
    const linePath = `M ${areaPoints}`;

    const totalGrowth = growthData.data[11].cumulative - growthData.data[0].cumulative;
    const growthRate = growthData.data[0].cumulative > 0
        ? ((totalGrowth / growthData.data[0].cumulative) * 100).toFixed(1)
        : totalGrowth > 0 ? '100+' : '0';

    return (
        <div className="space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                    <p className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Hiring Momentum</p>
                    <p className="text-lg font-bold text-blue-900 mt-1">+{totalGrowth} <span className="text-xs font-medium text-blue-600">Since {growthData.data[0].label}</span></p>
                </div>
                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                    <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">Top Month</p>
                    <p className="text-lg font-bold text-indigo-900 mt-1">{growthData.topHiringMonth.label} <span className="text-xs font-medium text-indigo-600">(+{growthData.topHiringMonth.newHires})</span></p>
                </div>
            </div>

            {/* SVG Chart Container */}
            <div className="relative group/chart h-64 bg-white">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                >
                    {/* Gradients */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map(v => (
                        <line
                            key={v}
                            x1={padding} y1={padding + v * chartHeight}
                            x2={width - padding} y2={padding + v * chartHeight}
                            stroke="#f1f5f9" strokeWidth="1"
                        />
                    ))}

                    {/* Area fill */}
                    <path d={areaPath} fill="url(#areaGradient)" className="transition-all duration-700" />

                    {/* Main growth line */}
                    <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700" />

                    {/* Interactive Columns/Bars for New Hires */}
                    {growthData.data.map((item, i) => {
                        const x = padding + (i * (chartWidth / (growthData.data.length - 1)));
                        const barWidth = 30;
                        const barHeight = (item.newHires / Math.max(growthData.maxNewHires, 1)) * (chartHeight * 0.4);
                        const isHovered = hoveredIndex === i;

                        return (
                            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                                {/* Invisible touch/hover area */}
                                <rect
                                    x={x - (chartWidth / (growthData.data.length - 1)) / 2}
                                    y={padding}
                                    width={chartWidth / (growthData.data.length - 1)}
                                    height={chartHeight}
                                    fill="transparent"
                                    className="cursor-pointer"
                                />

                                {/* Vertical Guideline on hover */}
                                {isHovered && (
                                    <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                                )}

                                {/* Monthly Hire Bar */}
                                <rect
                                    x={x - barWidth / 2}
                                    y={height - padding - barHeight}
                                    width={barWidth}
                                    height={barHeight}
                                    rx="4"
                                    fill={isHovered ? '#1d4ed8' : '#cbd5e1'}
                                    className="transition-all duration-300"
                                />

                                {/* Data Point dot */}
                                <circle
                                    cx={x}
                                    cy={padding + chartHeight - (item.cumulative / growthData.maxCumulative) * chartHeight}
                                    r={isHovered ? 6 : 4}
                                    fill={isHovered ? "#1d4ed8" : "#3b82f6"}
                                    stroke="white"
                                    strokeWidth="2"
                                    className="transition-all duration-300"
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Legend/Labels Overlays */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[3.5%] pointer-events-none">
                    {growthData.data.map((item, i) => (
                        <span key={i} className={`text-[10px] font-bold tracking-tighter ${hoveredIndex === i ? 'text-blue-600' : 'text-gray-400'} transition-colors uppercase`}>
                            {item.label}
                        </span>
                    ))}
                </div>

                {/* Premium Floating Tooltip */}
                {hoveredIndex !== null && (
                    <div
                        className="absolute z-10 bg-white/90 backdrop-blur-md border border-blue-100 shadow-xl rounded-xl p-3 pointer-events-none transition-all duration-200 animate-fade-in"
                        style={{
                            left: `${(hoveredIndex / (growthData.data.length - 1)) * 90 + 5}%`,
                            bottom: '100%',
                            marginBottom: '10px',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{growthData.data[hoveredIndex].label} Snapshot</p>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-600">Total Workforce:</span>
                                <span className="text-xs font-bold text-blue-600">{growthData.data[hoveredIndex].cumulative}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-50">
                                <span className="text-xs text-gray-600">New Monthly Hires:</span>
                                <span className="text-xs font-bold text-gray-900">+{growthData.data[hoveredIndex].newHires}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Legend */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-gray-500">Cumulative Headcount (Line)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-300"></div>
                    <span className="text-xs font-medium text-gray-500">Monthly Net Hires (Bars)</span>
                </div>
                <div className="ml-auto text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {growthRate}% Yearly Delta
                </div>
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

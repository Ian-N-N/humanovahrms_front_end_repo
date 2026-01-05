
import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';

const HRDashboard = () => {
    const stats = [
        { label: 'Team Presence', value: '92%', note: 'Good', badgeColor: 'bg-green-100 text-green-800', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
        { label: 'Pending Approvals', value: '4', note: 'Action needed', badgeColor: 'bg-blue-100 text-blue-800', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        { label: 'Upcoming Birthdays', value: '2', note: 'This week', badgeColor: 'bg-purple-100 text-purple-800', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
        { label: 'Avg Attendance', value: '95%', note: 'Last month', badgeColor: 'bg-red-100 text-red-800', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    ];

    const pendingLeaves = [
        { id: 1, name: 'Mark Stevens', date: 'Oct 24 - 25', type: 'Sick Leave', avatar: 'M' },
        { id: 2, name: 'Linda Thorne', date: 'Nov 01 - Nov 05', type: 'Vacation', avatar: 'L' },
        { id: 3, name: 'David Chen', date: 'Oct 26', type: 'Remote Work', avatar: 'D' },
    ];

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-8 font-sans custom-scrollbar">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Good morning, Sarah</h2>
                        <p className="text-gray-500">Here's what's happening in your organization today.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Export Report</Button>
                        <Button onClick={() => window.location.href = '/admin/employees/new'}>+ Add Employee</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl ${stat.iconBg} bg-opacity-20`}>
                                    {/* Using simple SVGs based on index/context */}
                                    {idx === 0 && <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                                    {idx === 1 && <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    {idx === 2 && <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>}
                                    {idx === 3 && <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stat.badgeColor.replace('text-', 'bg-').split(' ')[0]} bg-opacity-30 ${stat.badgeColor.split(' ')[1]}`}>
                                    {stat.note}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card title="Pending Leave Requests" className="lg:col-span-2">
                        <div className="space-y-4">
                            {pendingLeaves.map(leave => (
                                <div key={leave.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {leave.avatar}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{leave.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">{leave.type}</span>
                                                <span className="text-xs text-gray-500">{leave.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50" title="Reject">
                                            <span className="sr-only">Reject</span>
                                            ✕
                                        </button>
                                        <button className="p-1 rounded-full text-blue-500 hover:bg-blue-50" title="Approve">
                                            <span className="sr-only">Approve</span>
                                            ✓
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <button className="text-sm text-primary font-medium hover:underline">View All Requests</button>
                        </div>
                    </Card>

                    <Card title="Department Headcount">
                        <div className="h-48 flex items-center justify-center relative">
                            {/* Mock Donut Chart */}
                            <div className="h-32 w-32 rounded-full border-8 border-primary border-t-transparent border-r-blue-300 transform -rotate-45 relative flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-800">124</span>
                            </div>
                            <span className="absolute bottom-4 text-xs text-gray-500">Total Employees</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 mt-4">
                            <li className="flex justify-between"><span>Engineering</span> <span>56%</span></li>
                            <li className="flex justify-between"><span>Product</span> <span>25%</span></li>
                            <li className="flex justify-between"><span>HR & Admin</span> <span>17%</span></li>
                        </ul>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default HRDashboard;

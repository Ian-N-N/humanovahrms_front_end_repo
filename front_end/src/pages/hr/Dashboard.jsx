
import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';

const HRDashboard = () => {
    const stats = [
        { label: 'Team Presence', value: '92%', note: 'Good', color: 'bg-green-100 text-green-800' },
        { label: 'Pending Approvals', value: '4', note: 'Action needed', color: 'bg-blue-100 text-blue-800' },
        { label: 'Upcoming Birthdays', value: '2', note: 'This week', color: 'bg-purple-100 text-purple-800' },
        { label: 'Avg Attendance', value: '95%', note: 'Last month', color: 'bg-red-100 text-red-800' },
    ];

    const pendingLeaves = [
        { id: 1, name: 'Mark Stevens', date: 'Oct 24 - 25', type: 'Sick Leave', avatar: 'M' },
        { id: 2, name: 'Linda Thorne', date: 'Nov 01 - Nov 05', type: 'Vacation', avatar: 'L' },
        { id: 3, name: 'David Chen', date: 'Oct 26', type: 'Remote Work', avatar: 'D' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Good morning, Sarah</h2>
                    <p className="text-gray-500">Here's what's happening in your organization today.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export Report</Button>
                    <Button>+ Add Employee</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${stat.color}`}>
                                {stat.note}
                            </span>
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
    );
};

export default HRDashboard;

import { useAuth } from '../../context/AuthContext';

import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Dashboard = () => {
    // Mock Data
    const metrics = [
        { label: 'Total Employees', value: '1,240', change: '+5%', note: 'last month', color: 'bg-blue-100 text-blue-800' },
        { label: 'Active Departments', value: '12', change: '', note: '', color: 'bg-green-100 text-green-800' },
        { label: 'Pending Leave', value: '8 Requests', change: '', note: 'Action needed', color: 'bg-yellow-100 text-yellow-800' },
        { label: 'Attendance', value: '94%', change: '+2%', note: 'Today', color: 'bg-purple-100 text-purple-800' },
    ];

    const recentActivity = [
        { id: 1, user: 'John Audine', action: 'requested leave', time: '10 min ago', avatar: null },
        { id: 2, user: 'New Employee', action: 'Onboarded', time: '2 hours ago', avatar: null },
        { id: 3, user: 'Nancy Adelice', action: 'processed payroll', time: 'Yesterday', avatar: null },
    ];

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back, Administrator. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <Card key={index} className="flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</h3>
                            </div>
                            {metric.change && (
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${metric.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {metric.change}
                                </span>
                            )}
                        </div>
                        {metric.note && <p className="text-xs text-gray-400 mt-2">{metric.note}</p>}
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button>+ Add Employee</Button>
                <Button variant="outline">Manage Departments</Button>
                <Button variant="ghost">View Reports</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance Trends Placeholder */}
                <Card title="Attendance Trends" className="lg:col-span-2">
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center border-2 border-dashed border-gray-200">
                        <span className="text-gray-400">Chart Visualization Placeholder</span>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card title="Recent Activity" action={<a href="#" className="text-sm text-primary">View All</a>}>
                    <ul className="space-y-4">
                        {recentActivity.map((activity) => (
                            <li key={activity.id} className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-500">
                                        {activity.user.charAt(0)}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Employees by Department">
                    <div className="h-48 flex items-center justify-center">
                        <span className="text-gray-400">Pie Chart Placeholder</span>
                    </div>
                </Card>
                <Card title="Top Departments">
                    <div className="space-y-4">
                        {['Engineering', 'Sales', 'Marketing'].map(dept => (
                            <div key={dept}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{dept}</span>
                                    <span className="font-bold">94%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

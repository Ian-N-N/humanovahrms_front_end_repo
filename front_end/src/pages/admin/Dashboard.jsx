

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
                            <div className={`p-3 rounded-xl ${metric.color.replace('text-', 'bg-').split(' ')[0]} bg-opacity-20`}>
                                {/* Using simple SVGs based on label logic for demo */}
                                {index === 0 && <svg className={`w-6 h-6 ${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                {index === 1 && <svg className={`w-6 h-6 ${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                {index === 2 && <svg className={`w-6 h-6 ${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                                {index === 3 && <svg className={`w-6 h-6 ${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            </div>
                            {metric.change && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${metric.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {metric.change}
                                </span>
                            )}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                            <p className="text-sm font-medium text-gray-500 mt-1">{metric.label}</p>
                            {metric.note && <p className="text-xs text-gray-400 mt-1">{metric.note}</p>}
                        </div>
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
                    <div className="h-64 mt-4 relative">
                        {/* Mock Graph using SVG */}
                        <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,150 Q100,100 200,120 T400,80 T600,100 V200 H0 Z" fill="url(#chartGradient)" />
                            <path d="M0,150 Q100,100 200,120 T400,80 T600,100" fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
                            {/* Grid Lines */}
                            <line x1="0" y1="50" x2="600" y2="50" stroke="#E5E7EB" strokeDasharray="4" />
                            <line x1="0" y1="100" x2="600" y2="100" stroke="#E5E7EB" strokeDasharray="4" />
                            <line x1="0" y1="150" x2="600" y2="150" stroke="#E5E7EB" strokeDasharray="4" />
                        </svg>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
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
                    <div className="h-48 flex items-center justify-center relative">
                        {/* Mock Donut */}
                        <div className="w-32 h-32 rounded-full border-8 border-blue-500 border-r-blue-200 border-b-blue-100 transform -rotate-45"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">1,240</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                        </div>
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


import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAttendance } from '../../context/AttendanceContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const { isCheckedIn, checkInTime, clockIn, clockOut } = useAttendance();
    const navigate = useNavigate();

    const handleClockAction = () => {
        if (isCheckedIn) {
            clockOut();
        } else {
            clockIn();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-500">Welcome back, {user?.name || 'Employee'}! Here's what's happening with you today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 ${isCheckedIn ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        ● {isCheckedIn ? 'Online' : 'Offline'}
                    </span>
                    <span className="text-gray-500 text-sm">{new Date().toDateString()}</span>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-500 mb-2">Attendance</p>
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">92%</h3>
                    </div>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded w-max mt-3 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        +2% increase
                    </span>
                </Card>

                <Card className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-500 mb-2">Leave Balance</p>
                            <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-3xl font-bold text-gray-900">12</h3>
                            <span className="text-sm text-gray-500">days</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                </Card>

                <Card className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-500 mb-2">Next Payroll</p>
                            <span className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">Oct 30</h3>
                    </div>
                    <span className="text-xs text-orange-600 font-medium mt-2 bg-orange-50 px-2 py-1 rounded w-max">Processing</span>
                </Card>

                <Card className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-blue-100 text-sm font-medium mb-1">{isCheckedIn ? 'Clocked In' : 'Not Clocked In'}</p>
                        <h3 className="text-4xl font-bold text-white tracking-tight">{checkInTime || '08:58'}</h3>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-medium bg-blue-500 bg-opacity-30 rounded px-2 py-1 w-max">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {isCheckedIn ? 'On Time Today' : 'Ready to start'}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                            <button className="text-sm text-primary">Customize</button>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <button
                                onClick={handleClockAction}
                                className={`flex flex-col items-center justify-center p-6 text-white rounded-2xl shadow-lg shadow-blue-200 transition-transform hover:scale-105 active:scale-95 ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-blue-700'}`}
                            >
                                <span className="text-3xl mb-3">{isCheckedIn ? '🛑' : '⏱'}</span>
                                <span className="font-bold text-lg">{isCheckedIn ? 'Clock Out' : 'Check In'}</span>
                            </button>
                            <button onClick={() => navigate('/employee/leave')} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md hover:border-blue-100 transition-all group">
                                <div className="p-3 bg-purple-50 rounded-full mb-3 group-hover:bg-purple-100 transition-colors">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-purple-700">Request Leave</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md hover:border-blue-100 transition-all group">
                                <div className="p-3 bg-orange-50 rounded-full mb-3 group-hover:bg-orange-100 transition-colors">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-orange-700">Payslip</span>
                            </button>
                        </div>
                    </div>

                    {/* Weekly Hours Chart Placeholder */}
                    <Card title="Weekly Work Hours" action={<span className="text-sm text-gray-500">This Week ▼</span>}>
                        <div className="h-64 flex items-end justify-between px-4 gap-2">
                            {/* Mock Bars */}
                            {[8, 7.5, 8.2, 8, 4, 0, 0].map((h, i) => (
                                <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500"
                                        style={{ height: `${h * 10}%` }}
                                    ></div>
                                    <div className="absolute -bottom-6 w-full text-center text-xs text-gray-500">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card title="Announcements" action={<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2 New</span>}>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Office Maintenance</p>
                                    <p className="text-xs text-gray-500 mt-1">Scheduled maintenance for HVAC system this Friday.</p>
                                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Health Benefit Update</p>
                                    <p className="text-xs text-gray-500 mt-1">New dental coverage added effective next month.</p>
                                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-sm text-center text-gray-500 hover:text-primary">View All Announcements</button>
                    </Card>

                    <Card title="Recent Activity">
                        <ul className="space-y-4 border-l-2 border-gray-100 ml-2 pl-4">
                            <li className="relative">
                                <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></span>
                                <p className="text-sm font-medium text-gray-900">Clock In</p>
                                <p className="text-xs text-gray-500">08:58 AM · Today</p>
                            </li>
                            <li className="relative">
                                <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 border-2 border-white"></span>
                                <p className="text-sm font-medium text-gray-900">Clock Out</p>
                                <p className="text-xs text-gray-500">05:02 PM · Yesterday</p>
                            </li>
                            <li className="relative">
                                <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 border-2 border-white"></span>
                                <p className="text-sm font-medium text-gray-900">Clock In</p>
                                <p className="text-xs text-gray-500">09:05 AM · Yesterday</p>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;

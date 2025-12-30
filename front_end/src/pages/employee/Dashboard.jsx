
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
                    <p className="text-sm text-gray-500 mb-2">Attendance</p>
                    <h3 className="text-3xl font-bold text-blue-600">92%</h3>
                    <span className="text-xs text-green-600 mt-2">↑ +2% vs last month</span>
                </Card>
                <Card className="flex flex-col justify-between">
                    <p className="text-sm text-gray-500 mb-2">Leave Balance</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">12</h3>
                        <span className="text-sm text-gray-500 mb-1">days</span>
                    </div>
                    <span className="text-xs text-gray-400 mt-2">12 of 20 days remaining</span>
                </Card>
                <Card className="flex flex-col justify-between">
                    <p className="text-sm text-gray-500 mb-2">Next Payroll</p>
                    <h3 className="text-xl font-bold text-gray-900">Oct 30</h3>
                    <span className="text-xs text-orange-600 mt-2">5 days left · Processing soon</span>
                </Card>
                <Card className="flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white">
                    <p className="text-sm text-gray-500 mb-1">{isCheckedIn ? 'Clocked In At' : 'Not Clocked In'}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{checkInTime || '--:--'}</h3>
                    <span className={`text-xs mt-1 ${isCheckedIn ? 'text-green-600' : 'text-gray-400'}`}>
                        {isCheckedIn ? '● On Time Today' : 'Click Clock In to start'}
                    </span>
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
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={handleClockAction}
                                className={`flex flex-col items-center justify-center p-6 text-white rounded-xl shadow-lg transition ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-blue-700'}`}
                            >
                                <span className="text-2xl mb-2">⏱</span>
                                <span className="font-medium">{isCheckedIn ? 'Clock Out' : 'Clock In'}</span>
                            </button>
                            <button onClick={() => navigate('/employee/leave')} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                                <span className="text-2xl mb-2 text-gray-600">📅</span>
                                <span className="font-medium text-gray-700">Request Leave</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                                <span className="text-2xl mb-2 text-gray-600">📄</span>
                                <span className="font-medium text-gray-700">Payslip</span>
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

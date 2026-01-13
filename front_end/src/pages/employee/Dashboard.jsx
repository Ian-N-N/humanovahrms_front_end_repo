import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAttendance } from '../../context/AttendanceContext';
import { useNotification } from '../../context/NotificationContext';
import { useLeave } from '../../context/LeaveContext';
// import { usePayroll } from '../../context/PayrollContext'; // Uncomment if PayrollContext is available/used

/* --- MOCK DATA --- */
// const announcements = [
//     { title: "Office Maintenance", desc: "Scheduled maintenance for the HVAC system this Friday. Please work remotely...", time: "2 hours ago", icon: "campaign", color: "bg-blue-100 text-blue-600" },
//     { title: "Health Benefit Update", desc: "New dental coverage has been added to the standard plan effective next...", time: "Yesterday", icon: "health_and_safety", color: "bg-indigo-100 text-indigo-600" },
// ];

// const weeklyHours = [
//     { day: "Mon", height: "60%", active: false },
//     { day: "Tue", height: "100%", active: true },
//     { day: "Wed", height: "80%", active: true },
//     { day: "Thu", height: "45%", active: false },
//     { day: "Fri", height: "70%", active: false },
//     { day: "Sat", height: "30%", active: false },
//     { day: "Sun", height: "30%", active: false },
// ];

const StatCard = ({ title, value, subtext, icon, iconBg, iconColor, footer, footerColor }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}>
                <span className={`material-icons-round ${iconColor}`}>{icon}</span>
            </div>
            {footer && (
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${footerColor || 'bg-gray-100 text-gray-500'}`}>
                    {footer}
                </span>
            )}
        </div>
        <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
            {subtext && <p className="text-gray-400 text-xs mt-2 font-medium">{subtext}</p>}
        </div>
    </div>
);

const QuickAction = ({ icon, label, primary = false, onClick }) => (
    <button onClick={onClick} className={`
        flex flex-row items-center gap-4 p-5 rounded-3xl border transition-all duration-300 group
        ${primary
            ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95'
            : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:shadow-lg hover:scale-[1.02] active:scale-95'}
    `}>
        <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
            ${primary ? 'bg-white/20' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}
        `}>
            <span className="material-icons-round text-xl">{icon}</span>
        </div>
        <div className="text-left">
            <span className="block font-bold text-sm leading-tight">{label}</span>
            <span className={`text-[10px] font-medium opacity-60`}>{primary ? 'Action Required' : 'Quick Access'}</span>
        </div>
    </button>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { isCheckedIn, checkInTime, checkOutTime, clockIn, clockOut, records, refetch: refetchAttendance } = useAttendance();
    const { showNotification } = useNotification();
    const { leaves, fetchLeaves } = useLeave();
    const navigate = useNavigate();

    useEffect(() => {
        refetchAttendance();
        fetchLeaves();
    }, [refetchAttendance, fetchLeaves]);

    const handleClockAction = async () => {
        try {
            if (isCheckedIn) {
                const response = await clockOut();
                const outTime = response?.clock_out_time || 'now';
                showNotification(`Session ended at ${outTime}. Have a great evening!`, 'success');
            } else {
                const time = await clockIn();
                showNotification(`You clocked in successfully at ${time}`, 'success');
            }
        } catch (error) {
            console.error("Clock action error:", error);
            // Try to get a specific error message
            const errorMsg = error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                'Could not complete clock action.';
            showNotification(errorMsg, 'error');
        }
    }
    // --- REAL DATA CALCULATIONS ---

    // 1. Leave Balance
    const safeLeaves = Array.isArray(leaves) ? leaves : [];
    const approvedLeaves = safeLeaves.filter(l => l.status === 'Approved');
    // Assuming a default allocation of 21 days if not from backend
    const totalLeaveDaysTaken = approvedLeaves.reduce((acc, curr) => {
        // Simple 1 day per request logic if duration not present, ideally backend sends this
        return acc + (curr.duration || 1);
    }, 0);
    const leaveBalance = 21 - totalLeaveDaysTaken;

    // 2. Attendance Score (Based on records in the current month)
    const attendanceScore = useMemo(() => {
        const safeRecords = Array.isArray(records) ? records : [];
        if (safeRecords.length === 0) return "--%";

        // Simple logic: If you have records, we'll show a high score for now
        // A more complex logic would compare required days vs actual days
        const uniqueDays = new Set(safeRecords.map(r => r.date)).size;
        const today = new Date();
        const daysPassed = today.getDate(); // Days in current month

        const score = Math.min(100, Math.round((uniqueDays / daysPassed) * 100));
        return `${score}%`;
    }, [records]);

    // 3. Weekly Engagement (Chart Data based on actual hours)
    const weeklyHours = useMemo(() => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = new Date();
        const safeRecords = Array.isArray(records) ? records : [];

        // Get the start of the current week (Sunday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        return days.map((dayName, index) => {
            const isToday = index === today.getDay();

            // Find records for this specific day of the current week
            const dayRecords = safeRecords.filter(r => {
                const recDate = new Date(r.date || r.clock_in);
                return recDate.getDay() === index && recDate >= startOfWeek;
            });

            // Calculate active level (height)
            // If clocked in today, or has records, show some height
            let height = "15%";
            if (isToday && isCheckedIn) {
                height = "85%";
            } else if (dayRecords.length > 0) {
                // If they have multiple records or long hours, height could vary
                // For now, simple presence indicator
                height = "60%";
            }

            return { day: dayName, height, active: isToday };
        });
    }, [records, isCheckedIn]);

    // Safe defaults for user
    const displayName = user?.name || user?.email?.split('@')[0] || 'Member';
    const firstName = displayName.split(' ')[0] || 'Member';

    return (
        <main className="flex-1 bg-[#FDFDFD] h-full overflow-y-auto p-6 lg:p-10 font-sans custom-scrollbar">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="animate-fade-in">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Howdy, {firstName}! 👋</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">It's a great day to be productive. Here's your status.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${isCheckedIn ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <span className={`w-2 h-2 rounded-full transform scale-125 ${isCheckedIn ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></span>
                        {isCheckedIn ? 'Online' : 'Offline'}
                    </div>
                    <div className="px-4 py-2 border-l border-gray-100 text-gray-500 text-sm font-bold font-mono tracking-tighter">
                        {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Attendance Score"
                    value={attendanceScore}
                    icon="auto_graph"
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    footer="Good"
                    footerColor="bg-blue-100 text-blue-700"
                // subtext="Top 10% this month" // Removed as it's mock data
                />
                <StatCard
                    title="Leave Balance"
                    value={`${leaveBalance} Days`}
                    icon="holiday_village"
                    iconBg="bg-indigo-50"
                    iconColor="text-indigo-600"
                    footer="Available"
                    footerColor="bg-indigo-100 text-indigo-700"
                // subtext="Next accrual in 12 days" // Removed as it's mock data
                />
                <StatCard
                    title="Next Payday"
                    value="Jan 30"
                    icon="token"
                    iconBg="bg-emerald-50"
                    iconColor="text-emerald-600"
                    footer="Upcoming"
                    footerColor="bg-emerald-100 text-emerald-700"
                />
                <StatCard
                    title={isCheckedIn ? "Session Start" : (checkOutTime ? "Daily Session" : "Session Start")}
                    value={isCheckedIn ? (checkInTime || '--:--') : (checkOutTime ? "Completed" : "--:--")}
                    icon="alarm"
                    iconBg="bg-orange-50"
                    iconColor="text-orange-600"
                    footer={isCheckedIn ? "Active" : (checkOutTime ? "Clocked Out" : "Inactive")}
                    footerColor={isCheckedIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}
                    subtext={isCheckedIn ? `In: ${checkInTime}` : (checkOutTime ? `In: ${checkInTime} • Out: ${checkOutTime}` : "Standard Shift: 9:00 AM")}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Side */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Actions */}
                    <section>
                        <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                            Quick Launch
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <QuickAction
                                icon={isCheckedIn ? "logout" : "login"}
                                label={isCheckedIn ? "Clock Out" : "Check In"}
                                primary={true}
                                onClick={handleClockAction}
                            />
                            <QuickAction
                                icon="calendar_month"
                                label="Leave Portal"
                                onClick={() => navigate('/employee/leave')}
                            />
                            <QuickAction
                                icon="payments"
                                label="View Payroll"
                                onClick={() => navigate('/employee/payroll')}
                            />
                        </div>
                    </section>

                    {/* Productivity Chart */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 leading-tight">Weekly Engagement</h3>
                                <p className="text-gray-400 text-xs font-medium">Logged hours per day</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl cursor-default">
                                <span className="material-icons-round text-sm">trending_up</span>
                                Stable
                            </div>
                        </div>

                        {/* Bar Chart Container */}
                        <div className="flex items-end justify-between h-48 px-2 gap-4">
                            {weeklyHours.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-4 flex-1 group">
                                    <div className="relative w-full flex justify-center h-full items-end">
                                        <div
                                            className={`w-full max-w-[40px] rounded-2xl transition-all duration-500 ease-out shadow-sm
                                                ${item.active ? 'bg-gradient-to-t from-blue-700 to-blue-500' : 'bg-gray-50 group-hover:bg-gray-100'}`}
                                            style={{ height: item.height }}
                                        >
                                            {/* <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black py-1 px-2 rounded-lg transition-all duration-300">
                                                8.5h
                                            </div> */}
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.active ? 'text-blue-600' : 'text-gray-300'}`}>
                                        {item.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Side */}
                <div className="space-y-8">

                    {/* Feed */}
                    {/* <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm border-b-4 border-b-blue-600/10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-black text-gray-900">Feed</h3>
                            <button className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
                                <span className="material-icons-round text-gray-400 text-sm">more_horiz</span>
                            </button>
                        </div>
                        <div className="space-y-6">
                            {announcements.map((item, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                                            <span className="material-icons-round text-xl">{item.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                    {index === 0 && <div className="ml-16 mt-6 h-px bg-gray-50"></div>}
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Quick Profile Widget */}
                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl font-black border border-white/20">
                                {firstName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-white font-black text-sm tracking-tight">{user?.name || "User"}</h4>
                                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">
                                    {/* Handle role whether it is a string or an object */}
                                    {typeof user?.role === 'object' ? user.role.name || 'Employee' : user?.role || 'Employee'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/profile')}
                            className="mt-8 w-full py-3 bg-white text-gray-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-colors shadow-lg shadow-black/20"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Dashboard;

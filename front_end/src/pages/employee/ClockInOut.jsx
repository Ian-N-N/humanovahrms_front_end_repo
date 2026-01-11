import React, { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const ClockInOut = () => {
    const { user } = useAuth();
    const { isCheckedIn, clockIn, clockOut, checkInTime, loading } = useAttendance();
    const { showNotification } = useNotification();

    const handleClockIn = async () => {
        try {
            const time = await clockIn();
            showNotification(`Successfully clocked in at ${time}`, 'success');
        } catch (err) {
            showNotification('Failed to clock in. Please try again.', 'error');
        }
    };

    const handleClockOut = async () => {
        try {
            await clockOut();
            showNotification('Successfully clocked out. Have a great day!', 'success');
        } catch (err) {
            showNotification('Failed to clock out.', 'error');
        }
    };

    return (
        <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-6 lg:p-12 font-sans overflow-y-auto">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden text-center p-10 animate-fade-in-up">

                {/* User Greeting */}
                <div className="mb-10">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-xl shadow-blue-100/50">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Welcome, {user?.name?.split(' ')[0]}</h2>
                    <p className="text-gray-400 text-sm mt-1">Ready for your shift today?</p>
                </div>

                {/* Clock Visualization */}
                <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100 mb-10 transition-all">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Current Status</div>
                    <div className={`text-sm font-bold mb-4 ${isCheckedIn ? 'text-green-500' : 'text-orange-400'}`}>
                        {isCheckedIn ? 'Currently Active' : 'Off Shift'}
                    </div>
                    {isCheckedIn && (
                        <div className="space-y-1">
                            <p className="text-4xl font-black text-gray-900">{checkInTime || '--:--'}</p>
                            <p className="text-xs text-gray-400 font-medium italic">Clocked in time</p>
                        </div>
                    )}
                    {!isCheckedIn && (
                        <div className="space-y-1">
                            <p className="text-4xl font-black text-gray-300">--:--</p>
                            <p className="text-xs text-gray-400 font-medium">No active session</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {!isCheckedIn ? (
                        <button
                            onClick={handleClockIn}
                            disabled={loading}
                            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                        >
                            <span className="material-icons-round">login</span>
                            Clock In
                        </button>
                    ) : (
                        <button
                            onClick={handleClockOut}
                            disabled={loading}
                            className="w-full py-5 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                        >
                            <span className="material-icons-round">logout</span>
                            Clock Out
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 text-center">
                    <span className="material-icons-round text-blue-500 mb-2">info</span>
                    <p className="text-xs font-bold text-gray-600">Ensure your GPS is enabled for biometric verification.</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 text-center">
                    <span className="material-icons-round text-orange-500 mb-2">history</span>
                    <p className="text-xs font-bold text-gray-600">View your full attendance log in the History tab.</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 text-center">
                    <span className="material-icons-round text-purple-500 mb-2">emergency</span>
                    <p className="text-xs font-bold text-gray-600">Contact HR immediately if you encounter login issues.</p>
                </div>
            </div>
        </main>
    );
};

export default ClockInOut;


import React, { createContext, useContext, useState } from 'react';

const AttendanceContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
    const [records, setRecords] = useState([
        { id: 1, employeeId: 'EMP-001', name: 'Sarah Jenkins', date: '2025-10-29', clockIn: '08:55 AM', clockOut: '05:05 PM', status: 'Present' },
        { id: 2, employeeId: 'EMP-002', name: 'Michael Foster', date: '2025-10-29', clockIn: '09:15 AM', clockOut: '05:00 PM', status: 'Late' },
        { id: 3, employeeId: 'EMP-003', name: 'Dries Vincent', date: '2025-10-29', clockIn: '-', clockOut: '-', status: 'Absent' },
    ]);

    // Mock state for the currently logged-in user
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);

    const clockIn = () => {
        setIsCheckedIn(true);
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCheckInTime(time);

        // Mock adding record for current user
        setRecords(prev => [
            {
                id: Date.now(),
                employeeId: 'USR-001', // Current user
                name: 'Current User',
                date: new Date().toISOString().split('T')[0],
                clockIn: time,
                clockOut: '-',
                status: 'Present'
            },
            ...prev
        ]);
        return time;
    };

    const clockOut = () => {
        setIsCheckedIn(false);
        setCheckInTime(null);
        // Mock update
        setRecords(prev => prev.map(rec =>
            rec.employeeId === 'USR-001' && rec.clockOut === '-'
                ? { ...rec, clockOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                : rec
        ));
    };

    return (
        <AttendanceContext.Provider value={{ records, isCheckedIn, checkInTime, clockIn, clockOut }}>
            {children}
        </AttendanceContext.Provider>
    );
};

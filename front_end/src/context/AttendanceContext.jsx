import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import attendanceService from '../api/attendanceService';
import { useAuth } from './AuthContext';

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const fetchAttendance = useCallback(async () => {
        const role = user?.role;
        if (!role) return;

        let roleStr = '';
        if (typeof role === 'string') {
            roleStr = role;
        } else if (typeof role === 'object' && role !== null && role.name) {
            roleStr = role.name;
        } else {
            console.warn("AttendanceContext: Unknown role format", role);
            return;
        }

        const r = roleStr.toLowerCase();
        // alert(`Debug: Role detected as "${role}". Lower case: "${r}". Starting fetch...`);

        try {
            setLoading(true);
            let data = [];

            if (r.includes('admin') || r.includes('hr') || r.includes('manager')) {
                // alert("Debug: Utilizing getAll() route due to Admin/HR/Manager privileges.");
                data = await attendanceService.getAll();
            } else {
                try {
                    data = await attendanceService.getPersonalHistory();
                } catch (err) {
                    if (err.response?.status === 404) {
                        data = await attendanceService.getAll();
                    } else {
                        throw err;
                    }
                }
            }

            // alert(`Debug: Fetch complete. Received ${Array.isArray(data) ? data.length : 'invalid'} records.`);

            // Ensure data is an array
            if (!Array.isArray(data)) {
                console.warn("Attendance data is not an array:", data);
                data = [];
            }

            setRecords(data);

            // ... rest of logic

            const activeRecord = data.find(rec => !rec.clock_out && !rec.clockOut && !rec.checkOut && !rec.check_out);

            if (activeRecord) {
                setIsCheckedIn(true);
                setCheckInTime(activeRecord.clock_in_time || activeRecord.clock_in);
                setCheckOutTime(null);
            } else {
                setIsCheckedIn(false);
                const today = new Date().toISOString().split('T')[0];
                const todayRecord = data.find(rec => rec.date === today);
                if (todayRecord) {
                    setCheckInTime(todayRecord.clock_in_time || todayRecord.clock_in);
                    setCheckOutTime(todayRecord.clock_out_time || todayRecord.clock_out);
                } else {
                    setCheckInTime(null);
                    setCheckOutTime(null);
                }
            }
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
            // alert(`Debug: Error fetching attendance: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);

    const clockIn = async () => {
        try {
            // Passing user details in case backend requires validation
            const payload = {
                user_id: user?.id,
                email: user?.email,
                timestamp: new Date().toISOString()
            };
            const response = await attendanceService.clockIn(payload);
            const time = response.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setIsCheckedIn(true);
            setCheckInTime(time);
            await fetchAttendance(); // Refresh records
            return time;
        } catch (error) {
            console.error("Clock-in failed:", error);
            if (error.response?.status === 422) {
                console.error("Validation Error: Backend requires more data or record doesn't exist.");
            }
            throw error;
        }
    };

    const clockOut = async () => {
        try {
            const response = await attendanceService.clockOut();
            setIsCheckedIn(false);
            // Don't clear checkInTime, let Dashboard handle it
            setCheckOutTime(response.clock_out_time || response.clock_out);
            await fetchAttendance(); // Refresh records
            return response;
        } catch (error) {
            console.error("Clock-out failed:", error);
            throw error;
        }
    };

    const updateAttendanceRecord = async (id, updatedData) => {
        try {
            const updated = await attendanceService.updateRecord(id, updatedData);
            setRecords(prev => prev.map(rec => rec.id === id ? updated : rec));
            return updated;
        } catch (error) {
            console.error("Failed to update attendance record:", error);
            throw error;
        }
    };

    const value = {
        records,
        loading,
        isCheckedIn,
        checkInTime,
        checkOutTime,
        clockIn,
        clockOut,
        updateAttendanceRecord,
        refetch: fetchAttendance
    };

    return (
        <AttendanceContext.Provider value={value}>
            {children}
        </AttendanceContext.Provider>
    );
};

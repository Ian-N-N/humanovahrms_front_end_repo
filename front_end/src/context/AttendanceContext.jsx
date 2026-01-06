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

    const fetchAttendance = useCallback(async () => {
        const role = user?.role;
        if (!role) return;

        try {
            setLoading(true);
            let data = [];

            if (role === 'admin' || role === 'hr') {
                data = await attendanceService.getAll();
            } else {
                try {
                    data = await attendanceService.getPersonalHistory();
                } catch (err) {
                    if (err.response?.status === 404) {
                        console.log("Personal history endpoint (404) not found. Falling back to base /attendance GET.");
                        data = await attendanceService.getAll();
                    } else {
                        throw err;
                    }
                }
            }

            setRecords(data || []);

            // Logic to determine if user is checked in based on records
            // Look for a record with no clockOut/checkOut time
            const activeRecord = (data || []).find(rec => !rec.clock_out && !rec.clockOut && !rec.checkOut && !rec.check_out);

            if (activeRecord) {
                setIsCheckedIn(true);
                setCheckInTime(activeRecord.clock_in || activeRecord.clockIn || activeRecord.checkIn || activeRecord.check_in || activeRecord.time);
            } else {
                setIsCheckedIn(false);
                setCheckInTime(null);
            }
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
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
            await attendanceService.clockOut();
            setIsCheckedIn(false);
            setCheckInTime(null);
            await fetchAttendance(); // Refresh records
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

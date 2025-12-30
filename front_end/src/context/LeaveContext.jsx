
import React, { createContext, useContext, useState } from 'react';

const LeaveContext = createContext();

export const useLeave = () => useContext(LeaveContext);

export const LeaveProvider = ({ children }) => {
    const [leaves, setLeaves] = useState([
        { id: 1, employeeId: 'EMP-001', employeeName: 'Sarah Jenkins', type: 'Sick', startDate: '2025-10-24', endDate: '2025-10-25', status: 'Pending', reason: 'Flu' },
        { id: 2, employeeId: 'EMP-002', employeeName: 'Michael Foster', type: 'Vacation', startDate: '2025-11-01', endDate: '2025-11-05', status: 'Approved', reason: 'Family trip' },
        { id: 3, employeeId: 'EMP-003', employeeName: 'Dries Vincent', type: 'Remote', startDate: '2025-10-26', endDate: '2025-10-26', status: 'Rejected', reason: 'Team onsite day' },
    ]);

    const applyLeave = (data) => {
        const newLeave = {
            id: Date.now(),
            status: 'Pending',
            ...data
        };
        setLeaves((prev) => [newLeave, ...prev]);
    };

    const updateStatus = (id, status) => {
        setLeaves((prev) => prev.map(leave => leave.id === id ? { ...leave, status } : leave));
    };

    const getPendingCount = () => leaves.filter(l => l.status === 'Pending').length;

    return (
        <LeaveContext.Provider value={{ leaves, applyLeave, updateStatus, getPendingCount }}>
            {children}
        </LeaveContext.Provider>
    );
};

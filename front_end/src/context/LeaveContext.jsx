import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import leaveService from '../api/leaveService';
import { useAuth } from './AuthContext';

const LeaveContext = createContext();

export const useLeave = () => useContext(LeaveContext);

export const LeaveProvider = ({ children }) => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaves = useCallback(async () => {
        const role = user?.role;
        // Handle role object or string
        const roleName = typeof role === 'object' ? role?.name?.toLowerCase() : role?.toLowerCase();

        if (!roleName) return;

        try {
            setLoading(true);
            let data = [];

            if (roleName === 'admin' || roleName === 'hr' || roleName === 'hr manager') {
                data = await leaveService.getAll();
            } else {
                // For employees, fetch personal leaves
                // Assuming leaveService.getPersonalHistory exists, otherwise fall back to getAll and filter (though less secure)
                try {
                    data = await leaveService.getPersonalHistory();
                } catch (err) {
                    console.warn("Personal leave history endpoint failed, falling back to empty list", err);
                    data = [];
                }
            }
            setLeaves(data || []);
        } catch (error) {
            console.error("Failed to fetch leaves:", error);
            // Don't crash the app, just empty list
            setLeaves([]);
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);

    const applyLeave = async (data) => {
        try {
            const newLeave = await leaveService.request(data);
            setLeaves((prev) => [newLeave, ...prev]);
            return newLeave;
        } catch (error) {
            console.error("Failed to apply for leave:", error);
            throw error;
        }
    };

    const updateStatus = async (id, status) => {
        try {
            if (status === 'Approved') {
                await leaveService.approve(id);
            } else if (status === 'Rejected') {
                await leaveService.reject(id);
            }
            setLeaves((prev) => prev.map(leave => leave.id === id ? { ...leave, status } : leave));
        } catch (error) {
            console.error(`Failed to ${status} leave:`, error);
            throw error;
        }
    };

    const getPendingCount = () => leaves.filter(l => l.status === 'Pending').length;

    const value = {
        leaves,
        loading,
        applyLeave,
        updateStatus,
        getPendingCount,
        fetchLeaves,
        refetch: fetchLeaves
    };

    return (
        <LeaveContext.Provider value={value}>
            {children}
        </LeaveContext.Provider>
    );
};

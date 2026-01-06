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
        // Guard: Only Admin and HR can fetch the full list
        const role = user?.role;
        if (role !== 'admin' && role !== 'hr') {
            console.log("Skipping full leave fetch for non-admin/hr user.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await leaveService.getAll();
            setLeaves(data || []);
        } catch (error) {
            console.error("Failed to fetch leaves:", error);
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
        refetch: fetchLeaves
    };

    return (
        <LeaveContext.Provider value={value}>
            {children}
        </LeaveContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import payrollService from '../api/payrollService';
import { useAuth } from './AuthContext';

const PayrollContext = createContext();

export const usePayroll = () => useContext(PayrollContext);

export const PayrollProvider = ({ children }) => {
    const { user } = useAuth();
    const [payrolls, setPayrolls] = useState([]);
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        const roleObj = user.role;
        const roleName = (roleObj?.name || (typeof roleObj === 'string' ? roleObj : '')).toLowerCase();

        const isAuthorized = roleName === 'admin' || roleName === 'hr' || roleName === 'hr manager';

        try {
            setLoading(true);
            if (isAuthorized) {
                const [payrollData, cyclesData] = await Promise.all([
                    payrollService.getAll(),
                    payrollService.getCycles()
                ]);
                setPayrolls(payrollData || []);
                setCycles(cyclesData || []);
            } else {
                // Employee fetching their own data
                const personalData = await payrollService.getPersonalHistory();
                setPayrolls(personalData || []);
            }
        } catch (error) {
            console.error("Failed to fetch payroll data:", error);
            // Don't clear data on error to prevent flashing empty states if it was just a transient network error
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const runPayroll = async (data) => {
        try {
            const result = await payrollService.runPayroll(data);
            await fetchData(); // Refresh
            return result;
        } catch (error) {
            console.error("Failed to run payroll:", error);
            throw error;
        }
    };

    const createCycle = async (data) => {
        try {
            const result = await payrollService.createCycle(data);
            setCycles(prev => [...prev, result]);
            return result;
        } catch (error) {
            console.error("Failed to create payroll cycle:", error);
            throw error;
        }
    };

    const deletePayroll = async (id) => {
        try {
            await payrollService.deletePayroll(id);
            setPayrolls(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (error) {
            console.error("Failed to delete payroll:", error);
            throw error;
        }
    };

    const value = {
        payrolls,
        cycles,
        loading,
        runPayroll,
        createCycle,
        deletePayroll,
        refetch: fetchData
    };

    return (
        <PayrollContext.Provider value={value}>
            {children}
        </PayrollContext.Provider>
    );
};

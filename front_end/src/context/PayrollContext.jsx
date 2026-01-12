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
        const roleObj = user?.role;
        const roleName = (roleObj?.name || (typeof roleObj === 'string' ? roleObj : '')).toLowerCase();

        const isAuthorized = roleName === 'admin' || roleName === 'hr' || roleName === 'hr manager';

        if (!isAuthorized) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const [payrollData, cyclesData] = await Promise.all([
                payrollService.getAll(),
                payrollService.getCycles()
            ]);
            setPayrolls(payrollData || []);
            setCycles(cyclesData || []);
        } catch (error) {
            console.error("Failed to fetch payroll data:", error);
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

    const value = {
        payrolls,
        cycles,
        loading,
        runPayroll,
        createCycle,
        refetch: fetchData
    };

    return (
        <PayrollContext.Provider value={value}>
            {children}
        </PayrollContext.Provider>
    );
};

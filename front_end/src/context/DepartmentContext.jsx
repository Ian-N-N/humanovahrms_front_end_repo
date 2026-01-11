import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import departmentService from '../api/departmentService';
import { useAuth } from './AuthContext';

const DepartmentContext = createContext();

export const useDepartment = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDepartments = useCallback(async () => {
        // Guard: Only Admin and HR can fetch departments (usually)
        const role = user?.role;
        if (role !== 'admin' && role !== 'hr' && role !== 'employee') {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await departmentService.getAll();
            setDepartments(data || []);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const addDepartment = async (data) => {
        try {
            const newDept = await departmentService.create(data);
            setDepartments(prev => [...prev, newDept]);
            return newDept;
        } catch (error) {
            console.error("Failed to add department:", error);
            throw error;
        }
    };

    const updateDepartment = async (id, data) => {
        try {
            const updatedDept = await departmentService.update(id, data);
            setDepartments(prev => prev.map(d => d.id === id ? updatedDept : d));
            return updatedDept;
        } catch (error) {
            console.error("Failed to update department:", error);
            throw error;
        }
    };

    const deleteDepartment = async (id) => {
        try {
            await departmentService.delete(id);
            setDepartments(prev => prev.filter(d => d.id !== id));
        } catch (error) {
            console.error("Failed to delete department:", error);
            throw error;
        }
    };

    const value = {
        departments,
        loading,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        refetch: fetchDepartments
    };

    return (
        <DepartmentContext.Provider value={value}>
            {children}
        </DepartmentContext.Provider>
    );
};

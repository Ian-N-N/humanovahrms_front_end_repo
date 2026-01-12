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
        // Fix: Handle role being an object or string
        const roleObj = user?.role;
        const role = roleObj?.name ? roleObj.name.toLowerCase() : (typeof roleObj === 'string' ? roleObj : 'employee');

        // Guard: Only Admin and HR can fetch departments (usually)
        if (role !== 'admin' && role !== 'hr' && role !== 'employee') {
            setLoading(false);
            return;
        }

        const sampleDepartments = [
            { id: 'dept-1', name: 'Engineering' },
            { id: 'dept-2', name: 'Product' },
            { id: 'dept-3', name: 'Design' },
            { id: 'dept-4', name: 'Marketing' },
            { id: 'dept-5', name: 'Sales' },
            { id: 'dept-6', name: 'Human Resources' },
            { id: 'dept-7', name: 'Finance' }
        ];

        try {
            setLoading(true);
            const data = await departmentService.getAll();
            if (data && data.length > 0) {
                setDepartments(data);
            } else {
                console.warn("No departments found from API, using samples.");
                setDepartments(sampleDepartments);
            }
        } catch (error) {
            console.error("Failed to fetch departments, falling back to samples:", error);
            setDepartments(sampleDepartments);
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

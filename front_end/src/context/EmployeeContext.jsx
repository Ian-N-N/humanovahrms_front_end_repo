import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import employeeService from '../api/employeeService';
import { useAuth } from './AuthContext';

const EmployeeContext = createContext();

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = useCallback(async () => {
        // Guard: Only Admin and HR can fetch the full list
        const role = user?.role;
        if (role !== 'admin' && role !== 'hr') {
            console.log("Skipping full employee fetch for non-admin/hr user.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await employeeService.getAll();
            console.log("Employee list from backend:", data);
            setEmployees(data || []);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    }, [user?.role]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const addEmployee = async (employeeData) => {
        try {
            const newEmployee = await employeeService.create(employeeData);
            console.log("Newly added employee record:", newEmployee);
            setEmployees(prev => [...prev, newEmployee]);
            return newEmployee;
        } catch (error) {
            console.error("Failed to add employee:", error);
            if (error.response) {
                console.error("Employee Creation Error Data:", error.response.data);
            }
            throw error;
        }
    };

    const updateEmployee = async (id, updatedData) => {
        try {
            const updatedEmployee = await employeeService.update(id, updatedData);
            setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
            return updatedEmployee;
        } catch (error) {
            console.error("Failed to update employee:", error);
            throw error;
        }
    };

    const deleteEmployee = async (id) => {
        try {
            // await employeeService.delete(id); 
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        } catch (error) {
            console.error("Failed to delete employee:", error);
            throw error;
        }
    };

    const deactivateEmployee = async (id) => {
        try {
            await employeeService.deactivate(id);
            setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'Inactive' } : emp));
        } catch (error) {
            console.error("Failed to deactivate employee:", error);
            throw error;
        }
    };

    const activateEmployee = async (id) => {
        try {
            await employeeService.activate(id);
            setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'Active' } : emp));
        } catch (error) {
            console.error("Failed to activate employee:", error);
            throw error;
        }
    };

    const getEmployeeById = (id) => {
        return employees.find(emp => emp.id === id) || null;
    };

    const value = {
        employees,
        loading,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        activateEmployee,
        deactivateEmployee,
        refetch: fetchEmployees,
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
};

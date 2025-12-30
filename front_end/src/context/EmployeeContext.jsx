
import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    // Mock Data
    const [employees, setEmployees] = useState([
        { id: 'EMP-001', name: 'Sarah Jenkins', email: 'sarah@example.com', department: 'Engineering', role: 'Senior Dev', supervisor: 'Michael S.', status: 'Active', joinDate: '2023-01-15' },
        { id: 'EMP-002', name: 'Michael Foster', email: 'michael@example.com', department: 'Product', role: 'Product Manager', supervisor: 'Admin User', status: 'On Leave', joinDate: '2022-11-01' },
        { id: 'EMP-003', name: 'Dries Vincent', email: 'dries@example.com', department: 'Marketing', role: 'SEO Specialist', supervisor: 'Michael T.', status: 'Inactive', joinDate: '2023-06-10' },
        { id: 'EMP-004', name: 'Lindsay Walton', email: 'lindsay@example.com', department: 'Design', role: 'UX Designer', supervisor: 'Michael T.', status: 'Active', joinDate: '2023-03-22' },
        { id: 'EMP-005', name: 'Courtney Henry', email: 'courtney@example.com', department: 'Design', role: 'Senior Designer', supervisor: 'Lindsay W.', status: 'Active', joinDate: '2021-08-15' },
    ]);

    const addEmployee = (employeeData) => {
        const newEmployee = {
            id: `EMP-${Math.floor(Math.random() * 1000)}`,
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            ...employeeData
        };
        setEmployees([...employees, newEmployee]);
    };

    const updateEmployee = (id, updatedData) => {
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const getEmployeeById = (id) => {
        return employees.find(emp => emp.id === id);
    };

    const value = {
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
};

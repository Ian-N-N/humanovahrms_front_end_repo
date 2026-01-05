
import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    // Mock Data
    const [employees, setEmployees] = useState([
        { id: 'EMP-001', name: 'Sarah Jenkins', email: 'sarah@humanova.co.ke', department: 'Engineering', role: 'Senior Dev', supervisor: 'Michael S.', status: 'Active', joinDate: '2023-01-15', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', phone: '+254 712 345 678', location: 'Nairobi, Kenya' },
        { id: 'EMP-002', name: 'Michael Foster', email: 'michael@humanova.co.ke', department: 'Product', role: 'Product Manager', supervisor: 'Admin User', status: 'On Leave', joinDate: '2022-11-01', image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', phone: '+254 722 987 654', location: 'Mombasa, Kenya' },
        { id: 'EMP-003', name: 'Dries Vincent', email: 'dries@humanova.co.ke', department: 'Marketing', role: 'SEO Specialist', supervisor: 'Michael T.', status: 'Inactive', joinDate: '2023-06-10', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', phone: '+254 733 456 789', location: 'Nairobi, Kenya' },
        { id: 'EMP-004', name: 'Lindsay Walton', email: 'lindsay@humanova.co.ke', department: 'Design', role: 'UX Designer', supervisor: 'Michael T.', status: 'Active', joinDate: '2023-03-22', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', phone: '+254 710 112 233', location: 'Kisumu, Kenya' },
        { id: 'EMP-005', name: 'Courtney Henry', email: 'courtney@humanova.co.ke', department: 'Design', role: 'Senior Designer', supervisor: 'Lindsay W.', status: 'Active', joinDate: '2021-08-15', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', phone: '+254 799 554 433', location: 'Nakedi, Nairobi' },
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

import { useAuth } from '../../context/AuthContext';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple SVG Icons
const IconDashboard = () => <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconUsers = () => <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconDepartment = () => <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconCalendar = () => <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconCurrency = () => <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const Sidebar = ({ role = 'admin' }) => {
    const { user } = useAuth();
    const location = useLocation();
    const path = location.pathname;

    const navLinks = {
        admin: [
            { name: 'Dashboard', path: '/admin/dashboard', icon: <IconDashboard /> },
            { name: 'Employees', path: '/admin/employees', icon: <IconUsers /> },
            { name: 'Departments', path: '/admin/departments', icon: <IconDepartment /> },
            { name: 'Leaves', path: '/admin/leaves', icon: <IconCalendar /> },
            { name: 'Payroll', path: '/admin/payroll', icon: <IconCurrency /> },
        ],
        hr: [
            { name: 'Dashboard', path: '/hr/dashboard', icon: <IconDashboard /> },
            { name: 'Leaves', path: '/hr/leaves', icon: <IconCalendar /> },
            { name: 'Employees', path: '/hr/employees', icon: <IconUsers /> },
            { name: 'Profile', path: '/hr/profile', icon: <IconUsers /> },
        ],
        employee: [
            { name: 'Dashboard', path: '/employee/dashboard', icon: <IconDashboard /> },
            { name: 'Leave Portal', path: '/employee/leave', icon: <IconCalendar /> },
            { name: 'My Payroll', path: '/employee/payroll', icon: <IconCurrency /> },
            { name: 'Profile', path: '/employee/profile', icon: <IconUsers /> },
        ]
    };

    const links = navLinks[role] || navLinks.admin;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <span className="text-xl font-bold text-primary">ecoHRMS</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {links.map((link) => {
                    const isActive = path.startsWith(link.path);
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                    {/* User Profile placeholder */}
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white">
                        {user?.name?.charAt(0) || role.toUpperCase().slice(0, 2)}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 capitalize">{user?.name || `${role} User`}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'View Profile'}</p>
                    </div>
                </div>
            </div>
        </aside >
    );
};

export default Sidebar;

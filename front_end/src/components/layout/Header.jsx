import React from 'react';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

const Header = ({ title }) => {
    const { logout } = useAuth();
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">{title || 'Dashboard'}</h1>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg className="w-4 h-4 absolute left-2.5 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Notifications */}
                <NotificationBell />

                {/* Logout */}
                <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Sign Out"
                >
                    <span className="sr-only">Sign out</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;

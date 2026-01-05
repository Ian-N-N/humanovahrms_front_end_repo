
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Mock User State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // Check for saved session
            const savedUser = localStorage.getItem('hrms_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user session:", error);
            localStorage.removeItem('hrms_user'); // Clear corrupted data
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (email) => {
        // Mock Login Logic
        // In a real app, this would be an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                let role = 'employee';
                let name = 'John Doe';

                if (email.includes('admin')) {
                    role = 'admin';
                    name = 'Administrator';
                } else if (email.includes('hr')) {
                    role = 'hr';
                    name = 'Sarah HR';
                }

                const userData = { email, role, name, id: 'USR-001' };
                setUser(userData);
                localStorage.setItem('hrms_user', JSON.stringify(userData));
                resolve(userData);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hrms_user');
        navigate('/login');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

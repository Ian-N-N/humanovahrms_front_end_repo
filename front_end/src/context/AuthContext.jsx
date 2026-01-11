import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('hrms_user');
            const token = localStorage.getItem('hrms_token');
            if (savedUser && token) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user session:", error);
            localStorage.removeItem('hrms_user');
            localStorage.removeItem('hrms_token');
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, user } = response;

            localStorage.setItem('hrms_token', access_token);
            localStorage.setItem('hrms_user', JSON.stringify(user));
            setUser(user);
            return user;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            // Register endpoint returns { message: "User created..." }
            // Usually doesn't auto-login, so we just return response
            return await api.post('/auth/register', { name, email, password });
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const logout = () => {
        authService.logout();
        setUser(null);
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('hrms_token');
        navigate('/login');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

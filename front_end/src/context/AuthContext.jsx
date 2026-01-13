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
            const savedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (savedUser && token) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user session:", error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const access_token = response.access_token || response.token;
            const user = response.user;

            if (!access_token) {
                console.error("Login response missing token:", response);
                throw new Error("Login failed: No access token received from server.");
            }

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return user;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (name, username, email, password, role) => {
        try {
            console.log("Registering with role:", role); // DEBUG LOG
            // Register endpoint now accepts username
            return await api.post('/auth/register', { name, username, email, password, role });
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const updateUser = async (data) => {
        try {
            // Optimistically update local state first for speed
            setUser(prev => ({ ...prev, ...data }));

            // Call API
            const updatedUser = await api.put('/auth/profile', data);

            // Update storage and state with confirmed data from backend
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

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

        // Listen for 401 Unauthorized events from httpClient
        const handleUnauthorized = () => {
            console.log("Received auth:unauthorized event. Logging out...");
            logout();
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, []);

    const login = async (email, password) => {
        try {
            // Normalize email to lowercase
            const normalizedEmail = String(email).toLowerCase().trim();
            const response = await authService.login({ email: normalizedEmail, password });
            const access_token = response.access_token || response.token;
            const userData = response.user;

            if (!access_token) {
                console.error("Login response missing token:", response);
                throw new Error("Login failed: No access token received from server.");
            }

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (nameOrData, username, email, password, role) => {
        try {
            let payload;
            if (typeof nameOrData === 'object' && nameOrData !== null) {
                payload = { ...nameOrData };
            } else {
                payload = { name: nameOrData, username, email, password, role };
            }

            // Handle FormData for multipart/image uploads
            if (payload instanceof FormData) {
                console.log("Registering with FormData (detected photo upload)");
                // No normalization safe on FormData, assume sanitized or handled by caller/backend
                return await authService.register(payload);
            }

            // Forced Normalization for JSON payloads
            payload.email = String(payload.email).toLowerCase().trim();
            // Default role is admin per new requirements
            payload.role = payload.role || 'admin';

            console.log("Registering with payload:", payload);
            return await authService.register(payload);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        authService.logout();
        navigate('/login');
    };

    const updateUser = async (data) => {
        try {
            setUser(prev => ({ ...prev, ...data }));
            const updatedUser = await authService.updateProfile(data);
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

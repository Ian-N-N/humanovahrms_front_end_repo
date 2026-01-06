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
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        // Ensure both exist and token isn't a "null" string
        if (savedUser && token && token !== 'null' && token !== 'undefined') {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(normalizeUser(parsedUser));
            } catch (err) {
                console.error("Auth initialization failed:", err);
                logout();
            }
        } else if (savedUser || token) {
            // Half-logged in state detected, clear it for safety
            console.warn("Incomplete auth state detected (missing token or user). Clearing session.");
            authService.logout();
            setUser(null);
        }
        setLoading(false);
    }, []);

    const normalizeUser = (userData) => {
        if (!userData) return null;

        // 1. Existing role from backend
        let role = userData.role;

        // 2. Map role_id if present
        if (!role && userData.role_id) {
            const roleMap = { 1: 'admin', 2: 'hr', 3: 'employee' };
            role = roleMap[userData.role_id];
        }

        // 3. SMART ROLE INFERENCE: Fallback to email/username if role is still missing
        if (!role || role === 'employee') {
            const email = (userData.email || '').toLowerCase();
            const handle = email.split('@')[0] || (userData.username || '').toLowerCase();

            // Check for admin/hr as prefixes, suffixes or separated by dots
            const isAdmin = handle === 'admin' || handle.startsWith('admin.') || handle.endsWith('.admin') || handle.includes('.admin.');
            const isHR = handle === 'hr' || handle.startsWith('hr.') || handle.endsWith('.hr') || handle.includes('.hr.');

            if (isAdmin) role = 'admin';
            else if (isHR) role = 'hr';
        }

        return {
            ...userData,
            name: userData.name || userData.full_name || userData.first_name || userData.username || (userData.email ? userData.email.split('@')[0] : 'User'),
            role: role || 'employee'
        };
    };

    const login = async (credentials) => {
        try {
            // Clear any stale local state before new login attempt
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            const response = await authService.login(credentials);
            console.log("[Auth] Login Response Data:", response);

            // Flexible extraction from response.data (provided by httpClient)
            const userData = response.user || response;
            const finalToken = response.token ||
                response.access_token ||
                (response.user && (response.user.token || response.user.access_token));

            console.log("[Auth] Extracted Token:", finalToken ? "YES (masked)" : "--- NOT FOUND IN BODY ---");
            const normalizedUser = normalizeUser(userData);
            setUser(normalizedUser);
            localStorage.setItem('user', JSON.stringify(normalizedUser));

            if (finalToken) {
                localStorage.setItem('token', finalToken);
            } else {
                console.error("CRITICAL: Login succeeded but no token was found in body or headers!");
            }
            return normalizedUser;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            console.log("DEBUG: Full Register Response:", response);

            const rawUser = response.user || response;
            const finalToken = response.token || response.access_token || (response.user && (response.user.token || response.user.access_token));

            console.log("DEBUG: Extracted Registered User:", rawUser);
            console.log("DEBUG: Extracted Register Token:", finalToken ? "PRESENT (masked)" : "MISSING");

            const normalizedUser = normalizeUser(rawUser) || { role: 'employee' };

            // PERSIST REGISTRATION ROLE: If the user explicitly chose a role during sign-up,
            // we use that for the initial session, as the backend might still be syncing.
            if (userData.role && (normalizedUser.role === 'employee' || !normalizedUser.role)) {
                normalizedUser.role = userData.role;
                console.log("DEBUG: Using registration role for initial session:", normalizedUser.role);
            }

            setUser(normalizedUser);
            localStorage.setItem('user', JSON.stringify(normalizedUser));

            if (finalToken) {
                localStorage.setItem('token', finalToken);
            }
            return normalizedUser;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
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

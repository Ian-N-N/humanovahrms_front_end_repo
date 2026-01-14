import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { notificationService } from '../api/notificationService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [toasts, setToasts] = useState([]);
    const [systemNotifications, setSystemNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- TOAST LOGIC (Temporary UI messages) ---
    const showNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((n) => n.id !== id));
        }, duration);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((n) => n.id !== id));
    };

    // --- SYSTEM NOTIFICATIONS LOGIC (Persistent Announcements) ---
    const fetchNotifications = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await notificationService.fetchSystemNotifications(user);
            setSystemNotifications(data);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const pushNotification = async (data) => {
        try {
            const newNotif = await notificationService.sendNotification(data);
            showNotification('Notification sent successfully!', 'success');
            // Optimistically update if current user is a recipient (admin usually is too for their own broadcasts)
            await fetchNotifications();
            return newNotif;
        } catch (error) {
            showNotification('Failed to send notification', 'error');
            throw error;
        }
    };

    const markAsRead = async (id) => {
        await notificationService.markNotificationAsRead(id);
        setSystemNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    useEffect(() => {
        fetchNotifications();
        // Simple polling every 30 seconds to simulate live updates
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const unreadCount = systemNotifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            showNotification,
            systemNotifications,
            unreadCount,
            loading,
            fetchNotifications,
            pushNotification,
            markAsRead
        }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map((n) => (
                    <div
                        key={n.id}
                        className={`
                            pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-fade-in-right
                            ${n.type === 'success' ? 'bg-white border-green-100 text-green-800' :
                                n.type === 'error' ? 'bg-white border-red-100 text-red-800' :
                                    'bg-white border-blue-100 text-blue-800'}
                        `}
                    >
                        <span className="material-icons-round text-xl">
                            {n.type === 'success' ? 'check_circle' :
                                n.type === 'error' ? 'error' : 'info'}
                        </span>
                        <p className="text-sm font-bold">{n.message}</p>
                        <button
                            onClick={() => removeToast(n.id)}
                            className="ml-2 hover:opacity-50 transition-opacity"
                        >
                            <span className="material-icons-round text-sm">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};


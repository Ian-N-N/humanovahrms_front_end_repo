import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {notifications.map((n) => (
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
                            onClick={() => removeNotification(n.id)}
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

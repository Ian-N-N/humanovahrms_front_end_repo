import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const NotificationBell = () => {
    const navigate = useNavigate();
    const { unreadCount } = useNotification();

    return (
        <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all group flex items-center justify-center"
            title="Notifications"
        >
            <span className="material-icons-round text-gray-400 group-hover:text-blue-600 transition-colors">
                notifications
            </span>
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-red-200 animate-bounce">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;

import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const Notifications = () => {
    const { systemNotifications, loading, markAsRead } = useNotification();

    const getIcon = (type) => {
        switch (type) {
            case 'important': return 'warning';
            case 'update': return 'auto_awesome';
            default: return 'notifications';
        }
    };

    const getColors = (type) => {
        switch (type) {
            case 'important': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'update': return 'bg-purple-50 text-purple-600 border-purple-100';
            default: return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notification Center</h1>
                        <p className="text-gray-500 mt-2 font-medium">Stay updated with the latest announcements and system updates.</p>
                    </div>
                </div>

                {loading && systemNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing Notifications...</p>
                    </div>
                ) : systemNotifications.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-icons-round text-gray-300 text-4xl">notifications_off</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-500 font-medium">You don't have any notifications at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {systemNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => !notification.read && markAsRead(notification.id)}
                                className={`
                                    bg-white p-6 rounded-[2rem] border transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1
                                    ${notification.read ? 'border-gray-100 opacity-80' : 'border-blue-100 shadow-md ring-1 ring-blue-50'}
                                `}
                            >
                                <div className="flex gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${getColors(notification.type)}`}>
                                        <span className="material-icons-round text-2xl">{getIcon(notification.type)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className={`text-lg font-black tracking-tight ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                {new Date(notification.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${notification.read ? 'text-gray-500' : 'text-gray-600 font-medium'}`}>
                                            {notification.message}
                                        </p>

                                        {!notification.read && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">New message</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Notifications;

import httpClient from './httpClient';

export const notificationService = {
    /**
     * Fetches notifications for the current user.
     */
    fetchSystemNotifications: async () => {
        const data = await httpClient.get('/notifications');
        // Map backend fields to frontend expectations if needed
        if (!Array.isArray(data)) return [];
        return data.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type || 'info',
            timestamp: n.created_at,
            read: n.is_read
        }));
    },

    /**
     * HR/Admin pushes a new notification.
     */
    sendNotification: async (data) => {
        const response = await httpClient.post('/notifications', data);
        return response;
    },

    /**
     * Marks a notification as read.
     */
    markNotificationAsRead: async (id) => {
        const response = await httpClient.put(`/notifications/${id}`);
        return response;
    },

    /**
     * Deletes a notification.
     */
    deleteNotification: async (id) => {
        await httpClient.delete(`/notifications/${id}`);
        return true;
    }
};

/**
 * Notification Service
 * Placeholders for backend integration.
 */

// Mock data to simulate starting point
let mockNotifications = [
    {
        id: '1',
        title: 'Welcome to ecoHRMS',
        message: 'We are glad to have you on board. Explore your dashboard to get started.',
        type: 'announcement',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        recipientType: 'all'
    }
];

export const notificationService = {
    /**
     * Fetches notifications for the current user based on their ID and role.
     */
    fetchSystemNotifications: async (user) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const roleName = user?.role?.name?.toLowerCase() || user?.role || 'employee';
        const userId = user?.id;

        // Filter notifications that are either broadcast ('all'), matching role, or specific to user ID
        return mockNotifications.filter(n =>
            n.recipientType === 'all' ||
            (n.recipientType === 'role' && n.recipientId?.toLowerCase() === roleName) ||
            (n.recipientType === 'specific' && String(n.recipientId) === String(userId))
        ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    /**
     * Admin pushes a new notification.
     */
    sendNotification: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const newNotification = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            timestamp: new Date().toISOString(),
            read: false
        };

        mockNotifications.push(newNotification);
        return newNotification;
    },

    /**
     * Marks a notification as read.
     */
    markNotificationAsRead: async (id) => {
        mockNotifications = mockNotifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        return true;
    },

    /**
     * Deletes a notification.
     */
    deleteNotification: async (id) => {
        mockNotifications = mockNotifications.filter(n => n.id !== id);
        return true;
    }
};

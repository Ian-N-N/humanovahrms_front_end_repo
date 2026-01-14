import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useEmployee } from '../../context/EmployeeContext';
import Input from '../../components/common/Input';

const PushNotifications = () => {
    const { pushNotification } = useNotification();
    const { employees } = useEmployee();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('announcement');
    const [recipientType, setRecipientType] = useState('all');
    const [recipientId, setRecipientId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await pushNotification({
                title,
                message,
                type,
                recipientType,
                recipientId: recipientType === 'all' ? null : recipientId
            });
            // Reset form
            setTitle('');
            setMessage('');
            setRecipientType('all');
            setRecipientId('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Push Notifications</h1>
                    <p className="text-gray-500 mt-2 font-medium">Send broadcast announcements or targeted messages to your workforce.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <Input
                            label="Notification Title"
                            placeholder="e.g. System Maintenance Update"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        {/* Content */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Message Content</label>
                            <textarea
                                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-32 resize-none"
                                placeholder="Write your announcement here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category/Type */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="announcement">General Announcement</option>
                                    <option value="important">Important Warning</option>
                                    <option value="update">Feature Update</option>
                                </select>
                            </div>

                            {/* Recipient Type */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Send To</label>
                                <select
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                                    value={recipientType}
                                    onChange={(e) => {
                                        setRecipientType(e.target.value);
                                        setRecipientId('');
                                    }}
                                >
                                    <option value="all">Everyone (Global)</option>
                                    <option value="role">Specific Role</option>
                                    <option value="specific">Individual Employee</option>
                                </select>
                            </div>
                        </div>

                        {/* Targeted Selection */}
                        {recipientType === 'role' && (
                            <div className="flex flex-col animate-fade-in-down">
                                <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Select Role</label>
                                <select
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                                    value={recipientId}
                                    onChange={(e) => setRecipientId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Choose a role...</option>
                                    <option value="hr">HR Managers</option>
                                    <option value="employee">All Employees</option>
                                </select>
                            </div>
                        )}

                        {recipientType === 'specific' && (
                            <div className="flex flex-col animate-fade-in-down">
                                <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Select Employee</label>
                                <select
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                                    value={recipientId}
                                    onChange={(e) => setRecipientId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Find an employee...</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name || emp.email} ({emp.department})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className="material-icons-round text-lg">send</span>
                            {loading ? 'Sending...' : 'Broadcast Notification'}
                        </button>
                    </form>
                </div>

                {/* Info Card */}
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                    <span className="material-icons-round text-blue-600">info</span>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                        Notifications sent from this dashboard are persistent. They will appear for the selected recipients in their notification center and via the bell icon. Placeholder logic is currently used for backend integration.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PushNotifications;

import React, { useState, useEffect } from 'react';
import httpClient from '../../api/httpClient';
import Input from '../../components/common/Input';

const Settings = () => {
    const [settings, setSettings] = useState({
        company_name: '',
        contact_email: '',
        shift_start_time: '09:00',
        currency_symbol: '$',
        pay_date: '28'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await httpClient.get('/settings');
            // Merge defaults with fetched data to ensure all keys exist
            setSettings(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await httpClient.put('/settings', settings);
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">System Settings</h1>
                    <p className="text-gray-500 mt-1 text-sm">Configure global application parameters and policies.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <span className="material-icons-round text-blue-600 bg-blue-50 p-2 rounded-lg">business</span>
                            <h2 className="text-lg font-bold text-gray-800">General Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Company Name"
                                name="company_name"
                                value={settings.company_name}
                                onChange={handleChange}
                                placeholder="e.g. Acme Corp"
                            />
                            <Input
                                label="Contact Email"
                                name="contact_email"
                                type="email"
                                value={settings.contact_email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    {/* Attendance Settings Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <span className="material-icons-round text-orange-600 bg-orange-50 p-2 rounded-lg">schedule</span>
                            <h2 className="text-lg font-bold text-gray-800">Attendance Policy</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Input
                                    label="Standard Shift Start Time"
                                    name="shift_start_time"
                                    type="time"
                                    value={settings.shift_start_time}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-400 mt-1.5 ml-1">
                                    Employees clocking in more than 15 mins after this time will be marked as 'Late'.
                                </p>
                            </div>
                            <div>
                                <Input
                                    label="Standard Shift End Time"
                                    name="shift_end_time"
                                    type="time"
                                    value={settings.shift_end_time || '17:00'}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-400 mt-1.5 ml-1">
                                    Clock-outs after this time will count towards Overtime.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payroll Settings Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <span className="material-icons-round text-green-600 bg-green-50 p-2 rounded-lg">payments</span>
                            <h2 className="text-lg font-bold text-gray-800">Payroll Configuration</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Currency Symbol"
                                name="currency_symbol"
                                value={settings.currency_symbol}
                                onChange={handleChange}
                                placeholder="$"
                            />
                            <Input
                                label="Standard Pay Date (Day of Month)"
                                name="pay_date"
                                type="number"
                                min="1" max="31"
                                value={settings.pay_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70"
                        >
                            {saving ? <span className="material-icons-round animate-spin text-sm">refresh</span> : <span className="material-icons-round text-sm">save</span>}
                            {saving ? 'Saving Changes...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import httpClient from '../../api/httpClient';

const RolePermission = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Initial state for functional modules - this could also come from backend if fully dynamic
    const modules = [
        { id: 'dashboard', name: 'Dashboard Access' },
        { id: 'employees', name: 'Employee Management' },
        { id: 'departments', name: 'Department Management' },
        { id: 'attendance', name: 'Attendance Tracking' },
        { id: 'leave', name: 'Leave Management' },
        { id: 'payroll', name: 'Payroll Processing' },
        { id: 'settings', name: 'System Settings' },
    ];

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await httpClient.get('/roles');
            setRoles(data);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionToggle = (roleIndex, moduleId) => {
        const newRoles = [...roles];
        const role = newRoles[roleIndex];

        // Ensure permissions object exists
        if (!role.permissions) role.permissions = {};

        // Toggle specific permission
        // Using simple boolean for now: true = Full Access, false/undefined = No Access
        // Could be expanded to { view: true, edit: false } later
        const currentVal = role.permissions[moduleId];
        role.permissions[moduleId] = !currentVal;

        setRoles(newRoles);
    };

    const savePermissions = async () => {
        setSaving(true);
        try {
            // Send entire roles array or just the modified ones
            // Our backend supports bulk update via PUT /roles
            await httpClient.put('/roles', roles);
            alert("Permissions updated successfully!");
        } catch (error) {
            console.error("Failed to save permissions:", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Roles & Permissions</h1>
                    <p className="text-gray-500 mt-1 text-sm">Configure system hierarchical access levels and module permissions.</p>
                </div>
                <button
                    onClick={savePermissions}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70"
                >
                    {saving ? <span className="material-icons-round animate-spin text-sm">refresh</span> : <span className="material-icons-round text-sm">save</span>}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {/* Role Cards Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {roles.map((r) => (
                            <div key={r.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                    <span className="material-icons-round text-6xl text-gray-400">security</span>
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600`}>
                                    {r.name}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">{r.name} Level</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                    {Object.keys(r.permissions || {}).filter(k => r.permissions[k]).length} active permissions
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">Advanced Permissions Matrix</h3>
                            <p className="text-xs text-gray-500 mt-1">Check boxes to grant module access to specific roles.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase w-1/3">Module / Feature</th>
                                        {roles.map(role => (
                                            <th key={role.id} className="py-4 px-6 text-xs font-bold text-gray-900 uppercase text-center min-w-[120px]">
                                                {role.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {modules.map((module) => (
                                        <tr key={module.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <span className="material-icons-round text-sm">extension</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700">{module.name}</span>
                                                </div>
                                            </td>
                                            {roles.map((role, rIndex) => (
                                                <td key={`${role.id}-${module.id}`} className="py-4 px-6 text-center">
                                                    <div className="flex justify-center">
                                                        <label className="relative flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                                                            <input
                                                                type="checkbox"
                                                                className="peer w-5 h-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-blue-500 checked:bg-blue-500"
                                                                checked={role.permissions ? !!role.permissions[module.id] : false}
                                                                onChange={() => handlePermissionToggle(rIndex, module.id)}
                                                            />
                                                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                                </svg>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default RolePermission;

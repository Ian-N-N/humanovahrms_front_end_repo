import React from 'react';

const RolePermission = () => {
    const roles = [
        { name: 'Admin', desc: 'Full system access, manage employees, payroll, and settings.', color: 'bg-red-50 text-red-700' },
        { name: 'HR Manager', desc: 'Manage departments, leave approvals, and employee records.', color: 'bg-blue-50 text-blue-700' },
        { name: 'Employee', desc: 'Standard access to personal dashboard, clock-ins, and leave requests.', color: 'bg-green-50 text-green-700' },
    ];

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Roles & Permissions</h1>
                <p className="text-gray-500 mt-1">Configure system hierarchical access levels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {roles.map((r, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.color}`}>{r.name}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">{r.name} Level</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">{r.desc}</p>
                        <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-all">
                            Edit Policy
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Advanced Permissions Matrix</h3>
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <span className="material-icons-round text-4xl text-gray-300">security</span>
                    <p className="text-sm font-bold text-gray-500 mt-2">Fine-grained control coming soon</p>
                    <p className="text-xs text-gray-400 mt-1 italic">Modular permission toggles for specific HR modules are being finalized.</p>
                </div>
            </div>
        </main>
    );
};

export default RolePermission;

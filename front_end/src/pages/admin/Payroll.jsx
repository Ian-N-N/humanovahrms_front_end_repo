import React, { useState } from 'react';
import { usePayroll } from '../../context/PayrollContext';

const PayrollAdmin = () => {
    const { payrolls, cycles, loading, createCycle, runPayroll, refetch } = usePayroll();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCycle, setNewCycle] = useState({ name: '', startDate: '', endDate: '' });

    const handleCreateCycle = async (e) => {
        e.preventDefault();
        try {
            await createCycle(newCycle);
            alert("Payroll cycle created!");
            setIsModalOpen(false);
            setNewCycle({ name: '', startDate: '', endDate: '' });
        } catch (err) {
            alert("Failed to create cycle.");
        }
    };

    const handleRunPayroll = async (cycleId) => {
        try {
            if (!window.confirm("Confirm running payroll for this cycle?")) return;
            await runPayroll({ cycle_id: cycleId });
            alert("Payroll processed successfully!");
        } catch (err) {
            alert("Failed to process payroll.");
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <nav className="text-sm text-gray-500 mb-1">
                        <span>Dashboard</span> / <span className="text-gray-900 font-medium">Payroll Management</span>
                    </nav>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payroll Cycles</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage payment cycles and employee compensation.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    <span className="material-icons-round text-lg">add</span>
                    New Cycle
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {cycles.length === 0 ? (
                    <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-100 italic text-gray-400">
                        No payroll cycles defined yet. Create one to get started.
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Cycle Name</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Period</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {cycles.map((c) => (
                                    <tr key={c.id}>
                                        <td className="py-4 px-6 font-bold text-gray-900">{c.name}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">{c.startDate} to {c.endDate}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {c.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleRunPayroll(c.id)}
                                                disabled={c.status === 'Completed'}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${c.status === 'Completed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                            >
                                                {c.status === 'Completed' ? 'Processed' : 'Run Payroll'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Placeholder */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Create New Cycle</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateCycle} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Cycle Name</label>
                                <input
                                    type="text" required
                                    value={newCycle.name}
                                    onChange={e => setNewCycle(p => ({ ...p, name: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. January 2024"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Start Date</label>
                                    <input
                                        type="date" required
                                        value={newCycle.startDate}
                                        onChange={e => setNewCycle(p => ({ ...p, startDate: e.target.value }))}
                                        className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">End Date</label>
                                    <input
                                        type="date" required
                                        value={newCycle.endDate}
                                        onChange={e => setNewCycle(p => ({ ...p, endDate: e.target.value }))}
                                        className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4">
                                Create Cycle
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default PayrollAdmin;

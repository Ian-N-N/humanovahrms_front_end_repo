import React, { useState, useMemo } from 'react';
import { useLeave } from '../../context/LeaveContext';

const StatusBadge = ({ status }) => {
    const styles = {
        "Pending": "bg-orange-50 text-orange-700 border-orange-100",
        "Approved": "bg-green-50 text-green-700 border-green-100",
        "Rejected": "bg-red-50 text-red-700 border-red-100",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status]}`}>
            {status}
        </span>
    );
};

const LeaveManagement = () => {
    const { leaves, loading, updateStatus, refetch } = useLeave();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeaves = useMemo(() => {
        return leaves.filter(leave => {
            const matchesSearch = leave.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                leave.type?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'All' || leave.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [leaves, searchTerm, filter]);

    const handleAction = async (id, status) => {
        try {
            if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this leave request?`)) return;
            await updateStatus(id, status);
            alert(`Leave request ${status.toLowerCase()} successfully.`);
        } catch (err) {
            alert(`Failed to update leave status.`);
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <nav className="text-sm text-gray-500 mb-1">
                        <span>Dashboard</span> / <span className="text-gray-900 font-medium">Leave Management</span>
                    </nav>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Requests</h1>
                    <p className="text-gray-500 mt-1 text-sm">Review and manage company-wide leave applications.</p>
                </div>

                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                >
                    <span className="material-icons-round text-lg">refresh</span>
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-orange-500 uppercase">Pending Review</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{leaves.filter(l => l.status === 'Pending').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-green-600 uppercase">Approved Total</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{leaves.filter(l => l.status === 'Approved').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-red-500 uppercase">Requests Rejected</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{leaves.filter(l => l.status === 'Rejected').length}</h3>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 border border-gray-200 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Search by employee or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-700"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Employee</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Leave Type</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Duration</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Reason</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredLeaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                {leave.employee?.name?.charAt(0) || 'E'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{leave.employee?.name || 'Unknown'}</p>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">{leave.employee?.role || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-medium text-gray-700">{leave.type}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col text-xs">
                                            <span className="font-bold text-gray-900">{leave.startDate} - {leave.endDate}</span>
                                            <span className="text-gray-400">{leave.days} days</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 max-w-xs">
                                        <p className="text-xs text-gray-500 truncate">{leave.reason}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <StatusBadge status={leave.status} />
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {leave.status === 'Pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(leave.id, 'Approved')}
                                                    className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                                    title="Approve"
                                                >
                                                    <span className="material-icons-round text-lg">check</span>
                                                </button>
                                                <button
                                                    onClick={() => handleAction(leave.id, 'Rejected')}
                                                    className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                                    title="Reject"
                                                >
                                                    <span className="material-icons-round text-lg">close</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredLeaves.length === 0 && (
                                <tr><td colSpan="6" className="text-center py-20 text-gray-400">No leave requests found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default LeaveManagement;

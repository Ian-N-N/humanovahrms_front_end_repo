import React, { useState, useMemo } from 'react';
import { useLeave } from '../../context/LeaveContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const LeavePortal = () => {
    const { user } = useAuth();
    const { leaves, applyLeave, loading } = useLeave();
    const { showNotification } = useNotification();
    const [isApplying, setIsApplying] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Sick Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const myLeaves = useMemo(() => {
        return leaves.filter(l => l.user_id === user?.id || l.employee_id === user?.id);
    }, [leaves, user?.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await applyLeave(formData);
            showNotification('Leave application submitted successfully!', 'success');
            setIsApplying(false);
            setFormData({ type: 'Sick Leave', startDate: '', endDate: '', reason: '' });
        } catch (err) {
            showNotification('Failed to submit leave request.', 'error');
        }
    };

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-10 font-sans custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Leave Portal</h1>
                    <p className="text-gray-500 mt-1">Manage your time off and track request status.</p>
                </div>
                {!isApplying && (
                    <button
                        onClick={() => setIsApplying(true)}
                        className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2"
                    >
                        <span className="material-icons-round">add</span>
                        New Application
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form Section */}
                {isApplying && (
                    <div className="lg:col-span-1 animate-fade-in-up">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-8 sticky top-0">
                            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <span className="material-icons-round text-blue-600">edit_note</span>
                                Apply for Leave
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Leave Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Sick Leave</option>
                                        <option>Annual Leave</option>
                                        <option>Casual Leave</option>
                                        <option>Maternity/Paternity</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">From</label>
                                        <input
                                            type="date" required
                                            value={formData.startDate}
                                            onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">To</label>
                                        <input
                                            type="date" required
                                            value={formData.endDate}
                                            onChange={e => setFormData(p => ({ ...p, endDate: e.target.value }))}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Reason</label>
                                    <textarea
                                        rows="4" required
                                        value={formData.reason}
                                        onChange={e => setFormData(p => ({ ...p, reason: e.target.value }))}
                                        placeholder="Detailed explanation..."
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 resize-none"
                                    ></textarea>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsApplying(false)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 text-sm disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Status List */}
                <div className={`${isApplying ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Your Applications</h3>
                    {myLeaves.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-20 text-center border-4 border-dashed border-gray-50">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-icons-round text-gray-200 text-3xl">inbox</span>
                            </div>
                            <p className="font-bold text-gray-400">No leave history found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myLeaves.map(l => (
                                <div key={l.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                            {l.type.charAt(0)}
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${l.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' :
                                            l.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            {l.status}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900 mb-1">{l.type}</h4>
                                    <p className="text-xs text-blue-500 font-bold mb-4">{l.startDate} • {l.days} Days</p>
                                    <p className="text-xs text-gray-400 font-medium line-clamp-2 italic mb-6">"{l.reason}"</p>
                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                        <span className="material-icons-round text-gray-300 text-sm">history_edu</span>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Applied on {new Date(l.created_at || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default LeavePortal;

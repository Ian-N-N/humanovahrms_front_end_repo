import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const HRDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const displayName = user?.name || user?.email?.split('@')[0] || 'HR Manager';
    const firstName = displayName.split(' ')[0];

    const stats = [
        { label: 'Team Presence', value: '94%', note: 'Steady', badgeColor: 'bg-emerald-100 text-emerald-800', icon: 'groups', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { label: 'Pending Approvals', value: '7', note: 'Priority', badgeColor: 'bg-orange-100 text-orange-800', icon: 'pending_actions', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
        { label: 'New Inquiries', value: '12', note: '2 today', badgeColor: 'bg-blue-100 text-blue-800', icon: 'mark_email_unread', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    ];

    const pendingLeaves = [
        { id: 1, name: 'Mark Stevens', date: 'Oct 24 - 25', type: 'Sick Leave', avatar: 'MS' },
        { id: 2, name: 'Linda Thorne', date: 'Nov 01 - Nov 05', type: 'Vacation', avatar: 'LT' },
        { id: 3, name: 'David Chen', date: 'Oct 26', type: 'Remote Work', avatar: 'DC' },
    ];

    return (
        <main className="flex-1 bg-[#FDFDFD] h-full overflow-y-auto p-6 lg:p-10 font-sans custom-scrollbar">
            <div className="space-y-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Good morning, {firstName} ☕</h2>
                        <p className="text-gray-400 text-sm mt-1 font-medium">Manage your people and processes from one central hub.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                            Export PDF
                        </button>
                        <button
                            onClick={() => navigate('/hr/employees/new')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                        >
                            + New Employee
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center`}>
                                    <span className={`material-icons-round ${stat.iconColor} text-2xl`}>{stat.icon}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg ${stat.badgeColor}`}>
                                    {stat.note}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <section className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase tracking-widest">Active Requests</h3>
                            <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">View Ledger</button>
                        </div>
                        <div className="space-y-4">
                            {pendingLeaves.map(leave => (
                                <div key={leave.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-3xl transition-all border border-gray-50 group">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm group-hover:scale-110 transition-transform">
                                            {leave.avatar}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">{leave.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg font-black tracking-widest uppercase">{leave.type}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase">{leave.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors" title="Reject">
                                            <span className="material-icons-round text-lg">close</span>
                                        </button>
                                        <button className="w-10 h-10 rounded-2xl text-emerald-500 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors shadow-sm" title="Approve">
                                            <span className="material-icons-round text-lg">check</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative border-t-4 border-t-indigo-600/20">
                        <h3 className="text-lg font-black text-gray-900 mb-8 tracking-tight uppercase tracking-widest">Global Density</h3>
                        <div className="h-48 flex items-center justify-center relative mb-8">
                            <div className="h-40 w-40 rounded-full border-[12px] border-blue-600 border-t-transparent border-r-indigo-200 border-b-gray-100 transform -rotate-45 relative flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-gray-900 tracking-tighter">148</span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest -mt-1">Total</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Engineering</span>
                                <span className="text-xs font-black text-gray-900">62%</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Creative</span>
                                <span className="text-xs font-black text-gray-900">28%</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Executives</span>
                                <span className="text-xs font-black text-gray-900">10%</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default HRDashboard;

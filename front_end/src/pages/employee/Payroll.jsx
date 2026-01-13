import React, { useMemo } from 'react';
import { usePayroll } from '../../context/PayrollContext';
import { useAuth } from '../../context/AuthContext';
import { formatKSh } from '../../utils/formatters';

const PayrollEmployee = () => {
    const { user } = useAuth();
    const { payrolls, cycles, loading } = usePayroll();

    const myPayrolls = useMemo(() => {
        return payrolls.filter(p => p.user_id === user?.id || p.employee_id === user?.id);
    }, [payrolls, user?.id]);

    return (
        <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-10 font-sans custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Compensation</h1>
                    <p className="text-gray-500 mt-1">Review your salary payments and download paystubs.</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                        <span className="material-icons-round text-2xl">account_balance_wallet</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Salary</p>
                        <p className="text-xl font-black text-gray-900">{formatKSh(myPayrolls[0]?.gross_salary || 0)}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                    <h3 className="text-xl font-black text-gray-900">Payment History</h3>
                </div>

                {myPayrolls.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-icons-round text-gray-200 text-4xl">receipt_long</span>
                        </div>
                        <p className="font-bold text-gray-400">No payment records found yet.</p>
                        <p className="text-xs text-gray-300 mt-2">Your payments will appear here once processed by HR.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Payment Cycle</th>
                                    <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Date Paid</th>
                                    <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Gross</th>
                                    <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Net Pay</th>
                                    <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {myPayrolls.map(pay => (
                                    <tr key={pay.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <p className="font-black text-gray-900">{pay.cycle_name || 'Regular Cycle'}</p>
                                        </td>
                                        <td className="py-6 px-8 text-sm font-bold text-gray-600">
                                            {pay.paid_at || new Date().toLocaleDateString()}
                                        </td>
                                        <td className="py-6 px-8 text-sm font-bold text-gray-600">
                                            {formatKSh(pay.gross_salary)}
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <span className="text-lg font-black text-green-600">{formatKSh(pay.net_salary)}</span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button className="px-6 py-2 bg-blue-50 text-blue-600 font-black rounded-xl text-xs hover:bg-blue-600 hover:text-white transition-all">
                                                View Slip
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tax Info Banner */}
            <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-200">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">
                        <span className="material-icons-round">description</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-black">2023 Tax Statements</h4>
                        <p className="text-blue-100 text-sm">Your W-2 and other tax documents are now available for download.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white text-blue-600 font-extrabold rounded-2xl hover:scale-105 transition-all shadow-xl">
                    Get Tax Documents
                </button>
            </div>
        </main>
    );
};

export default PayrollEmployee;

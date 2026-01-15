import Modal from '../../components/common/modal';
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePayroll } from '../../context/PayrollContext';
import { formatKSh } from '../../utils/formatters';

const PayrollEmployee = () => {
    const { user } = useAuth();
    const { payrolls } = usePayroll();
    const [selectedSlip, setSelectedSlip] = useState(null);

    const myPayrolls = useMemo(() => {
        if (!user?.employee?.id) return [];
        return (payrolls || []).filter(p => p.employee?.id === user.employee.id);
    }, [payrolls, user?.employee?.id]);

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
                        <p className="text-xl font-black text-gray-900">{formatKSh(myPayrolls[0]?.basic_salary || myPayrolls[0]?.gross_salary || 0)}</p>
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
                                            <p className="font-black text-gray-900">{pay.cycle?.name || 'Regular Cycle'}</p>
                                        </td>
                                        <td className="py-6 px-8 text-sm font-bold text-gray-600">
                                            {pay.payment_date || pay.paid_at || new Date().toLocaleDateString()}
                                        </td>
                                        <td className="py-6 px-8 text-sm font-bold text-gray-600">
                                            {formatKSh(pay.gross_salary)}
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <span className="text-lg font-black text-green-600">{formatKSh(pay.net_salary)}</span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button
                                                onClick={() => setSelectedSlip(pay)}
                                                className="px-6 py-2 bg-blue-50 text-blue-600 font-black rounded-xl text-xs hover:bg-blue-600 hover:text-white transition-all">
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

            {/* Payslip Modal */}
            <Modal
                isOpen={!!selectedSlip}
                onClose={() => setSelectedSlip(null)}
                title="Payslip Details"
                size="lg"
            >
                {selectedSlip && (
                    <div className="space-y-6 font-mono text-sm">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Pay Period</p>
                                <p className="font-bold text-gray-900">{selectedSlip.pay_period_start} - {selectedSlip.pay_period_end}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs uppercase">Payment Date</p>
                                <p className="font-bold text-gray-900">{selectedSlip.payment_date || 'Processing'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Earnings</h4>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Basic Salary</span>
                                    <span className="font-bold">{formatKSh(selectedSlip.basic_salary)}</span>
                                </div>
                                {/* Add logic for allowances loop if JSON exists */}
                                <div className="flex justify-between pt-2 border-t border-dashed">
                                    <span className="font-bold text-gray-900">Total Gross</span>
                                    <span className="font-bold text-gray-900">{formatKSh(selectedSlip.gross_salary)}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Deductions</h4>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">PAYE (Tax)</span>
                                    <span className="font-bold text-red-600">-{formatKSh(selectedSlip.tax_paid)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">NSSF</span>
                                    <span className="font-bold text-red-600">-{formatKSh(selectedSlip.nssf)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">SHIF (SHIF)</span>
                                    <span className="font-bold text-red-600">-{formatKSh(selectedSlip.shif)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Housing Levy</span>
                                    <span className="font-bold text-red-600">-{formatKSh(selectedSlip.housing_levy)}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-dashed">
                                    <span className="font-bold text-gray-900">Total Deductions</span>
                                    <span className="font-bold text-red-600">
                                        -{formatKSh(
                                            Number(selectedSlip.tax_paid) +
                                            Number(selectedSlip.nssf) +
                                            Number(selectedSlip.nhif) +
                                            Number(selectedSlip.housing_levy)
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex justify-between items-center mt-6">
                            <span className="font-black text-green-900 text-lg uppercase tracking-widest">Net Pay</span>
                            <span className="font-black text-green-600 text-2xl">{formatKSh(selectedSlip.net_salary)}</span>
                        </div>
                    </div>
                )}

                <div className="p-6 border-t border-gray-50 flex justify-end gap-3 no-print">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        <span className="material-icons-round text-sm">print</span>
                        Print Payslip
                    </button>
                </div>
            </Modal>

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

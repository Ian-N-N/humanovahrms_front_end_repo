
import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';

const EmployeePayroll = () => {
    const payslips = [
        { id: 101, month: 'October 2025', basic: '$5,000', deductions: '$500', net: '$4,500', status: 'Paid', date: 'Oct 30, 2025' },
        { id: 102, month: 'September 2025', basic: '$5,000', deductions: '$500', net: '$4,500', status: 'Paid', date: 'Sep 30, 2025' },
        { id: 103, month: 'August 2025', basic: '$5,000', deductions: '$500', net: '$4,500', status: 'Paid', date: 'Aug 30, 2025' },
    ];

    const columns = [
        { header: 'Month', accessor: 'month' },
        { header: 'Basic Pay', accessor: 'basic' },
        { header: 'Deductions (Tax, etc.)', accessor: 'deductions' },
        { header: 'Net Pay', accessor: 'net' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {row.status}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Payroll</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <p className="text-blue-100 mb-1">Last Net Pay</p>
                    <h3 className="text-4xl font-bold mb-4">$4,500.00</h3>
                    <p className="text-sm text-blue-100">Paid on Oct 30, 2025</p>
                </Card>
                <Card>
                    <p className="text-gray-500 mb-2">Tax Information</p>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span>Tax Code:</span> <span className="font-medium">1250L</span></div>
                        <div className="flex justify-between text-sm"><span>NI Number:</span> <span className="font-medium">QQ 12 34 56 C</span></div>
                        <div className="flex justify-between text-sm"><span>Tax YTD:</span> <span className="font-medium">$4,200.00</span></div>
                    </div>
                </Card>
            </div>

            <Card title="Payslip History">
                <Table
                    columns={columns}
                    data={payslips}
                    actions={(row) => <Button variant="ghost" size="sm">Download PDF</Button>}
                />
            </Card>
        </div>
    );
};

export default EmployeePayroll;


import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';

const Payroll = () => {
    // Mock Data
    const payrollData = [
        { id: 1, employee: 'Sarah Jenkins', role: 'Senior Dev', salary: '$5,000', bonus: '$500', total: '$5,500', status: 'Paid', date: 'Oct 30, 2025' },
        { id: 2, employee: 'Michael Foster', role: 'Product Manager', salary: '$5,200', bonus: '$0', total: '$5,200', status: 'Processing', date: 'Oct 30, 2025' },
        { id: 3, employee: 'Dries Vincent', role: 'SEO Specialist', salary: '$4,000', bonus: '$200', total: '$4,200', status: 'Paid', date: 'Oct 30, 2025' },
    ];

    const columns = [
        { header: 'Employee', accessor: 'employee' },
        { header: 'Role', accessor: 'role' },
        { header: 'Basic Salary', accessor: 'salary' },
        { header: 'Bonus', accessor: 'bonus' },
        { header: 'Total Payout', accessor: 'total' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Pay Date', accessor: 'date' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Payroll Management</h2>
                <div className="flex gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button>Run Payroll (Oct)</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <p className="text-sm text-gray-500">Total Payroll Cost</p>
                    <h3 className="text-2xl font-bold text-gray-900">$14,900</h3>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Pending Payments</p>
                    <h3 className="text-2xl font-bold text-yellow-600">1</h3>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Next Pay Date</p>
                    <h3 className="text-2xl font-bold text-blue-600">Nov 30, 2025</h3>
                </Card>
            </div>

            <Card title="Salary History">
                <Table
                    columns={columns}
                    data={payrollData}
                    actions={(row) => (
                        <button className="text-primary hover:text-blue-900 text-sm font-medium">Edit</button>
                    )}
                />
            </Card>
        </div>
    );
};

export default Payroll;

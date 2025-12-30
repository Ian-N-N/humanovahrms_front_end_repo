
import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { useLeave } from '../../context/LeaveContext';

const LeaveManagement = () => {
    const { leaves, updateStatus } = useLeave();

    const columns = [
        { header: 'Employee', accessor: 'employeeName' },
        { header: 'Type', accessor: 'type' },
        { header: 'Dates', render: (row) => `${row.startDate} to ${row.endDate}` },
        { header: 'Reason', accessor: 'reason' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        row.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
    ];

    const handleAction = (id, status) => {
        if (window.confirm(`Are you sure you want to ${status} this request?`)) {
            updateStatus(id, status);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>

            <Card title="Pending Requests">
                <Table
                    columns={columns}
                    data={leaves.filter(l => l.status === 'Pending')}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button onClick={() => handleAction(row.id, 'Approved')} className="text-green-600 hover:text-green-800 font-medium text-sm">Approve</button>
                            <button onClick={() => handleAction(row.id, 'Rejected')} className="text-red-600 hover:text-red-800 font-medium text-sm">Reject</button>
                        </div>
                    )}
                />
                {leaves.filter(l => l.status === 'Pending').length === 0 && <p className="text-gray-500 text-sm mt-4">No pending requests.</p>}
            </Card>

            <Card title="Leave History">
                <Table
                    columns={columns}
                    data={leaves.filter(l => l.status !== 'Pending')}
                />
            </Card>
        </div>
    );
};

export default LeaveManagement;

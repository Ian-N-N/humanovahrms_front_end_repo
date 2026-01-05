
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { useLeave } from '../../context/LeaveContext';
import { useAuth } from '../../context/AuthContext';

const LeavePortal = () => {
    const { user } = useAuth();
    const { leaves, applyLeave } = useLeave();
    const [isApplying, setIsApplying] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        type: 'Sick',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const myLeaves = leaves.filter(l => l.employeeId === 'USR-001' || l.employeeName === 'Current User');

    const handleSubmit = (e) => {
        e.preventDefault();
        applyLeave({
            employeeId: 'USR-001',
            employeeName: user?.name || 'Current User',
            ...formData
        });
        setIsApplying(false);
        setFormData({ type: 'Sick', startDate: '', endDate: '', reason: '' });
    };

    const columns = [
        { header: 'Type', accessor: 'type' },
        { header: 'Start Date', accessor: 'startDate' },
        { header: 'End Date', accessor: 'endDate' },
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
        { header: 'Reason', accessor: 'reason' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Leave Portal</h2>
                    <p className="text-gray-500">Manage your time off.</p>
                </div>
                <Button onClick={() => setIsApplying(!isApplying)}>
                    {isApplying ? 'Cancel Request' : '+ Request Leave'}
                </Button>
            </div>

            {isApplying && (
                <Card title="New Leave Request">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Sick</option>
                                    <option>Vacation</option>
                                    <option>Remote Work</option>
                                    <option>Personal</option>
                                </select>
                            </div>
                            <Input
                                label="Reason"
                                placeholder="Brief reason..."
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            />
                            <Input
                                label="Start Date"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                required
                            />
                            <Input
                                label="End Date"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Submit Request</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card title="My Leave History">
                {myLeaves.length > 0 ? (
                    <Table columns={columns} data={myLeaves} />
                ) : (
                    <p className="text-gray-500 text-center py-4">No leave history found.</p>
                )}
            </Card>
        </div>
    );
};

export default LeavePortal;

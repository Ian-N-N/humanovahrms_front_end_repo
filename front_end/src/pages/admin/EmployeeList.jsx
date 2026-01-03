import { Link } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';

import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const EmployeeList = ({ readOnly = false }) => {
    const columns = [
        {
            header: 'Employee', accessor: 'name', render: (row) => (
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {row.image ? (
                            <img src={row.image} alt={row.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-gray-500 font-bold">{row.name.charAt(0)}</span>
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{row.name}</div>
                        <div className="text-gray-500 text-xs">{row.email}</div>
                    </div>
                </div>
            )
        },
        { header: 'ID', accessor: 'id' },
        { header: 'Department', accessor: 'department' },
        { header: 'Role', accessor: 'role' },
        { header: 'Supervisor', accessor: 'supervisor' },
        {
            header: 'Status', accessor: 'status', render: (row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
    ];

    const { employees } = useEmployee();
    const data = employees;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
                {!readOnly && (
                    <Link to="/admin/employees/new">
                        <Button>+ Add New Employee</Button>
                    </Link>
                )}
            </div>

            <Card>
                <div className="flex gap-4 mb-6">
                    <Input placeholder="Search by name, ID, or role..." className="max-w-md" />
                    <select className="border-gray-300 border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
                        <option>All Departments</option>
                        <option>Engineering</option>
                    </select>
                    <select className="border-gray-300 border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
                        <option>All Status</option>
                        <option>Active</option>
                    </select>
                </div>

                <Table
                    columns={columns}
                    data={data}
                    actions={(row) => (
                        <div className="flex gap-3">
                            {readOnly && (
                                <Link to={`/hr/employees/${row.id}`} className="text-gray-500 hover:text-blue-600 font-medium text-sm">
                                    View
                                </Link>
                            )}
                            {!readOnly && <button className="text-primary hover:text-blue-900">Edit</button>}
                        </div>
                    )}
                />
            </Card>
        </div>
    );
};

export default EmployeeList;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEmployeeById } = useEmployee();
    const employee = getEmployeeById(id);

    if (!employee) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">Employee not found</h3>
                <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    ← Back to List
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="danger">Terminate</Button>
                </div>
            </div>

            {/* Header Profile Card */}
            <div className="bg-white shadow rounded-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="px-6 pb-6">
                    <div className="flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end">
                            <div className="h-24 w-24 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden">
                                {employee.image ? (
                                    <img src={employee.image} alt={employee.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
                                        {employee.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="ml-4 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                                <p className="text-gray-500">{employee.role}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {employee.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Info</h3>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{employee.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="text-gray-900">{employee.phone || '+254 7XX XXX XXX'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-gray-900">{employee.location || 'Nairobi, Kenya'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Employment Details</h3>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Department</label>
                                <p className="text-gray-900">{employee.department}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Supervisor</label>
                                <p className="text-gray-900">{employee.supervisor}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Join Date</label>
                                <p className="text-gray-900">{employee.joinDate}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-blue-600">98%</span>
                                    <span className="text-xs text-gray-500">Attendance</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-green-600">12</span>
                                    <span className="text-xs text-gray-500">Leave Balance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;

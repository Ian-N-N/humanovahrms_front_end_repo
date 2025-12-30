
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ImageUpload from '../../components/common/ImageUpload';
import { useEmployee } from '../../context/EmployeeContext';

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const { addEmployee } = useEmployee();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        supervisor: '',
        salary: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            addEmployee({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                department: formData.department,
                role: formData.role,
                supervisor: 'Unassigned', // Simplified for MVP
                ...formData
            });
            setIsLoading(false);
            navigate('/admin/employees');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 text-sm mb-1">
                        &larr; Back to Employees
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Employee</h2>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="submit" form="create-employee-form" isLoading={isLoading}>Save Employee</Button>
                </div>
            </div>

            <form id="create-employee-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Photo & Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Personal Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. John" required />
                            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" required />
                            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@company.com" required className="md:col-span-2" />
                            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            <Input label="Date of Birth" type="date" />
                        </div>
                    </Card>

                    <Card title="Employment Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Job Title / Role" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Senior Accountant" required />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Product">Product</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Design">Design</option>
                                    <option value="Sales">Sales</option>
                                    <option value="HR">Human Resources</option>
                                </select>
                            </div>
                            <Input label="Start Date" type="date" />
                            <Input label="Work Location" placeholder="e.g. Headquarters (Hybrid)" />
                        </div>
                    </Card>
                </div>

                {/* Right Column - Aux Info */}
                <div className="space-y-6">
                    <Card>
                        <div className="flex flex-col items-center">
                            <ImageUpload label="Profile Photo" />
                        </div>
                    </Card>

                    <Card title="Account Status">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-700">Active Status</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-400" />
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            Invitation will be sent to email upon saving.
                        </p>
                    </Card>

                    <Card title="Compensation">
                        <Input label="Basic Salary (Monthly)" name="salary" value={formData.salary} onChange={handleChange} type="number" placeholder="0.00" />
                    </Card>
                </div>
            </form>
        </div>
    );
};

export default EmployeeCreate;

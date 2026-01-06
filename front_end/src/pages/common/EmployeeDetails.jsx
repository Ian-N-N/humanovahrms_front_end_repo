import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = ({ employee, onBack }) => {
    if (!employee) return null;

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 shadow-sm transition-all hover:scale-105 active:scale-95">
                    <span className="material-icons-round">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                    <p className="text-gray-500 text-sm">Employee Profile • {employee.status}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden text-center p-8">
                        <div className="relative inline-block mb-6">
                            <img src={employee.photo_url || "https://i.pravatar.cc/300"} alt="" className="w-32 h-32 rounded-full object-cover border-8 border-gray-50 shadow-lg" />
                            <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${employee.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-1">{employee.name}</h3>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{employee.job_title || employee.role}</p>

                        <div className="flex items-center justify-center gap-4 py-6 border-t border-gray-50 mt-4">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Joined</p>
                                <p className="text-xs font-bold text-gray-700">{employee.join_date || 'N/A'}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Dept</p>
                                <p className="text-xs font-bold text-gray-700">{employee.department || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <span className="material-icons-round text-blue-600">contact_mail</span>
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Official Email</p>
                                <p className="text-sm font-bold text-gray-700">{employee.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Phone Number</p>
                                <p className="text-sm font-bold text-gray-700">{employee.phone || 'Not Provided'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Emergency Contact</p>
                                <p className="text-sm font-bold text-gray-700">{employee.emergency_contact || 'None'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Home Address</p>
                                <p className="text-sm font-bold text-gray-700">{employee.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <span className="material-icons-round text-orange-500">account_balance</span>
                            Employment & Financial
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Monthly Gross Salary</p>
                                <p className="text-sm font-bold text-gray-900">${employee.salary || '0.00'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-300 uppercase">Reported Supervisor</p>
                                <p className="text-sm font-bold text-gray-700">{employee.supervisor_name || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeeProfile = ({ employee, onBack, onEdit }) => {
  const { user } = useAuth();
  if (!employee) return null;

  // Extract role safely
  const roleObj = user?.role;
  const roleName = (roleObj?.name || (typeof roleObj === 'string' ? roleObj : '')).toLowerCase();
  const isHR = roleName.includes('hr');

  return (
    <div className="animate-fade-in-up">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <span className="material-icons-round mr-2">arrow_back</span>
        Back to List
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
          <span className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${employee.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
          <p className="text-blue-600 font-medium">{employee.job_title || 'Employee'} • {employee.status}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <button onClick={onEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">Edit Profile</button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50">Export CV</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Personal Information</h3>
            <button
              onClick={onEdit}
              className="text-blue-600 text-sm font-medium">Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Full Name</p>
              <p className="font-medium text-gray-800 mt-1">{employee.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Email Address</p>
              <p className="font-medium text-gray-800 mt-1">{employee.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
              <p className="font-medium text-gray-800 mt-1">{employee.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Date Joined</p>
              <p className="font-medium text-gray-800 mt-1">{employee.joined}</p>
            </div>
          </div>
        </div>

        {/* Leave Balance Widget */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Leave Balance</h3>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
              <span className="block text-2xl font-bold text-blue-600">12</span>
              <span className="text-xs text-gray-500">Casual</span>
            </div>
            <div className="flex-1 bg-orange-50 rounded-xl p-4 text-center">
              <span className="block text-2xl font-bold text-orange-600">08</span>
              <span className="text-xs text-gray-500">Sick</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
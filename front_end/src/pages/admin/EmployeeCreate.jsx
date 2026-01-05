import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Employee Created Successfully!'); // Simulation
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
          <p className="text-gray-500 text-sm mt-1">Enter the details below to create a new employee profile.</p>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>

          {/* Photo Upload Placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="material-icons-round text-gray-400">add_a_photo</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Profile Photo</p>
              <p className="text-xs text-gray-400">Supports JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Jane" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Doe" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="jane@company.com" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Product Designer" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button type="button" onClick={handleCancel} className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Create Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
import React, { useState } from 'react';

const EmployeeEdit = ({ employee, onCancel, onSave }) => {
  // Helper to split name if first/last not provided
  const splitName = (fullName) => {
    const parts = (fullName || '').split(' ');
    return { first: parts[0] || '', last: parts.slice(1).join(' ') || '' };
  };

  const { first: derivedFirst, last: derivedLast } = splitName(employee.name);

  // Initialize state with CORRECT field mapping
  const [formData, setFormData] = useState({
    first_name: employee.first_name || derivedFirst,
    last_name: employee.last_name || derivedLast,
    // email: employee.email || '', // Removed: Backend rejects this
    // phone: employee.phone || '', // Removed: Backend rejects this
    department_id: employee.department_id || 1, // Defaulting to 1 if unknown, strictly strictly strictly needs ID
    job_title: employee.job_title || employee.role || '',
    status: employee.status || 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct CLEAN payload matching backend schema
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      department_id: parseInt(formData.department_id) || 1,
      job_title: formData.job_title,
      // Backend seems to NOT accept 'status' updates on core profile, or it's 'status' field?
      // We'll try sending it, but if it fails we might need an activation endpoint.
      // status: formData.status 
    };
    onSave(payload);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <p className="text-gray-500 text-sm mt-1">Update employee information.</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 
            Email and Phone removed from edit form as backend rejects them.
            Future: Link to User Account edit if needed.
          */}

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
            <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
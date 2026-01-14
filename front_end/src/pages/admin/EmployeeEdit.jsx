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
    department_id: employee.department_id || 1,
    job_title: employee.job_title || employee.role || '',
    status: employee.status || 'Active',
    basic_salary: employee.basic_salary || 0
  });

  // Add photo state
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(employee.avatar || employee.image || employee.profile_photo_url || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct CLEAN payload matching backend schema
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      department_id: parseInt(formData.department_id) || 1,
      job_title: formData.job_title,
      basic_salary: formData.basic_salary,
      status: formData.status
    };

    // If photo file is provided, include it
    if (photoFile) {
      payload.photo = photoFile;
    }

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

          {/* Avatar Section */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={previewUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <label className="cursor-pointer text-sm font-bold text-blue-600 hover:underline">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
              <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Basic Salary (KES)</label>
              <input
                type="number"
                name="basic_salary"
                value={formData.basic_salary}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Note: Email and Phone are tied to User Account, not editable here */}
          <p className="text-xs text-gray-500 italic">
            Note: Email and phone are managed through the user account settings.
          </p>

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
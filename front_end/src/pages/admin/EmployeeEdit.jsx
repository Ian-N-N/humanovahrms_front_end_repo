import React, { useState } from 'react';

const EmployeeEdit = ({ employee, onCancel, onSave }) => {
  // Initialize state with existing employee data
  const [formData, setFormData] = useState({
    name: employee.name || '',
    email: employee.email || '',
    phone: employee.phone || '',
    department: employee.department || 'Engineering', // Default fallback
    role: employee.role || '',
    status: employee.status || 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated data back to parent
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
          
          {/* Avatar Section (Read-only visual for now) */}
          <div className="flex items-center gap-4 mb-6">
            <img src={employee.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
            <div>
               <button type="button" className="text-sm font-bold text-blue-600 hover:underline">Change Photo</button>
               <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700">Department</label>
               <select 
                 name="department"
                 value={formData.department} 
                 onChange={handleChange}
                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
               >
                 <option value="Engineering">Engineering</option>
                 <option value="Design">Design</option>
                 <option value="Marketing">Marketing</option>
                 <option value="HR">HR</option>
               </select>
            </div>
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
          </div>

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
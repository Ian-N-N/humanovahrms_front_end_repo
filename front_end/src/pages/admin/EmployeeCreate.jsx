import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useNotification } from '../../context/NotificationContext';
import useCloudinary from '../../hooks/useCloudinary';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { addEmployee, employees } = useEmployee();
  const { departments } = useDepartment();
  const { showNotification } = useNotification();
  const { uploadImage, uploading: uploadingImage } = useCloudinary();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    joined: new Date().toISOString().split('T')[0],
    role: '',
    status: 'Active',
    salary: '',
    supervisor: '',
    system_role: 'employee' // admin, hr, employee
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => navigate(-1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let photo_url = '';
      if (formData.photo) {
        showNotification('Uploading profile photo...', 'info');
        photo_url = await uploadImage(formData.photo);
      }

      const employeeData = {
        ...formData,
        photo_url,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        join_date: formData.joined,
        salary: formData.salary,
        supervisor_id: formData.supervisor,
        role: formData.system_role,
        job_title: formData.role
      };

      await addEmployee(employeeData);
      showNotification('Employee created successfully!', 'success');
      navigate(-1);
    } catch (error) {
      console.error("Failed to create employee:", error);
      showNotification(error.response?.data?.error || 'Failed to create employee.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-6 lg:p-10 custom-scrollbar">
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
            <p className="text-gray-500 text-sm mt-1">Enter the details below to create a new employee profile.</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {/* Photo Upload */}
            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                  {formData.photo ? (
                    <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-icons-round text-gray-400 text-3xl">add_a_photo</span>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setFormData(p => ({ ...p, photo: e.target.files[0] }))}
                />
              </label>
              <div>
                <p className="text-sm font-bold text-gray-700">Profile Photo</p>
                <p className="text-xs text-gray-400">Click to upload (Cloudinary ready)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Jane"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="jane@company.com"
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
                  placeholder="e.g. +1 234 567 890"
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
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  <option value="">Select Department</option>
                  {departments && departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Product Designer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Monthly Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. 5000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">System Role</label>
                <select
                  name="system_role"
                  value={formData.system_role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  <option value="employee">Employee</option>
                  <option value="hr">HR Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Supervisor</label>
                <select
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  <option value="">No Supervisor</option>
                  {employees && employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date Joined</label>
                <input
                  type="date"
                  name="joined"
                  value={formData.joined}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-8 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EmployeeForm;
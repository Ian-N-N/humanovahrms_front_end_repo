import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import { useDepartment } from '../../context/DepartmentContext';
import { useNotification } from '../../context/NotificationContext';
import useCloudinary from '../../hooks/useCloudinary';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { addEmployee, employees } = useEmployee();
  const { departments, refetch: refetchDepartments } = useDepartment();
  const { showNotification } = useNotification();
  const { uploadImage, uploading: uploadingImage } = useCloudinary();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Personal email (used for notification)
    phone: '',
    department: '',
    joined: new Date().toISOString().split('T')[0],
    role: '',
    status: 'Active',
    supervisor: '',
    salary: '',
    // Account creation fields
    create_account: true,
    account_email: '', // Work Email (used for login)
    account_password: Math.random().toString(36).slice(-8), // Generate default password
    account_role: 'Employee'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCancel = () => navigate(-1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append('first_name', formData.firstName);
      data.append('last_name', formData.lastName);
      data.append('phone_number', formData.phone);
      data.append('department_id', formData.department);
      if (formData.supervisor) data.append('supervisor_id', formData.supervisor);
      data.append('job_title', formData.role);
      data.append('basic_salary', formData.salary);
      data.append('hire_date', formData.joined);

      // Account Creation Data
      data.append('create_account', formData.create_account);
      if (formData.create_account) {
        data.append('account_email', formData.account_email.toLowerCase().trim());
        data.append('personal_email', formData.email.toLowerCase().trim());
        data.append('account_password', formData.account_password);
        data.append('account_role', formData.account_role);
      }

      // Append the file if it exists
      if (formData.photo) {
        data.append('image', formData.photo);
      }

      // Call service with the FormData object
      await addEmployee(data);

      // Refresh departments to update member counts
      if (refetchDepartments) {
        await refetchDepartments();
      }

      showNotification('Employee and User account created successfully!', 'success');
      navigate(-1);
    } catch (error) {
      console.error("Failed to onboard talent:", error);

      const resData = error.response?.data;
      let errorMessage = 'Failed to onboard talent.';

      if (resData) {
        errorMessage = resData.error || resData.message || resData.msg || errorMessage;
        if (typeof errorMessage === 'object') errorMessage = JSON.stringify(errorMessage);
      } else if (error.message) {
        errorMessage = error.message;
      }

      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-6 lg:p-10 custom-scrollbar">
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Onboard New Talent</h2>
            <p className="text-gray-500 text-sm mt-1">Create an employee profile and setup their HRMS access.</p>
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
                <p className="text-xs text-gray-400">Identification photo for the HRMS profile.</p>
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
                <label className="text-sm font-medium text-gray-700">Personal Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="jane.doe@personal.com"
                />
                <p className="text-[10px] text-gray-400">Used for sending onboarding credentials.</p>
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
                <label className="text-sm font-medium text-gray-700">Monthly Salary (KES)</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. 50000"
                />
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
                  <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                ))}
              </select>
            </div>

            {/* User Account Setup Section */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">User Account Setup</h3>
                  <p className="text-xs text-gray-500">Create login credentials for the HRMS portal.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="create_account"
                    checked={formData.create_account}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.create_account && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-down">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Work Email (Login)</label>
                    <input
                      type="email"
                      name="account_email"
                      value={formData.account_email}
                      onChange={handleChange}
                      required={formData.create_account}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="j.doe@company-portal.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Portal Role</label>
                    <select
                      name="account_role"
                      value={formData.account_role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="Employee">Employee</option>
                      <option value="HR Manager">HR Manager</option>
                      <option value="Admin">Administrator</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Default Password</label>
                    <input
                      type="text"
                      name="account_password"
                      value={formData.account_password}
                      onChange={handleChange}
                      required={formData.create_account}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                      placeholder="••••••••"
                    />
                    <p className="text-[10px] text-gray-400">Sent to personal email upon creation.</p>
                  </div>
                </div>
              )}
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
                {loading ? 'Onboarding...' : 'Onboard Talent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EmployeeForm;
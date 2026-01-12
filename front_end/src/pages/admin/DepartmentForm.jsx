import React, { useState, useEffect } from 'react';
import employeeService from '../../api/employeeService';

const DepartmentForm = ({ department, onCancel, onSave }) => {
  const isEdit = !!department;

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: department?.name || '',
    manager_id: department?.manager_id || '',
    description: department?.description || '',
    theme: department?.theme || 'blue'
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeService.getAll();
        // Assuming response is array or has employees property
        setEmployees(Array.isArray(response) ? response : response.employees || []);
      } catch (error) {
        console.error("Failed to load employees for manager selection", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Department' : 'New Department'}</h2>
            <p className="text-gray-500 text-sm mt-1">{isEdit ? 'Update department details below.' : 'Create a new internal structure.'}</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Engineering"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department Head (Manager)</label>
              <select
                name="manager_id"
                value={formData.manager_id}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="">Select Manager...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Theme Color</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="teal">Teal</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Brief description of responsibilities..."
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm">
              {isEdit ? 'Save Changes' : 'Create Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
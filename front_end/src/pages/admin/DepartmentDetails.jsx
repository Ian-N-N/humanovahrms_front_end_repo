import React from 'react';

const DepartmentDetails = ({ department, onBack, onEdit, onDelete }) => {
  if (!department) return null;

  return (
    <div className="animate-fade-in-up">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <span className="material-icons-round mr-2">arrow_back</span>
        Back to Departments
      </button>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${department.theme}-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50`}></div>

        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-${department.theme}-50 text-${department.theme}-600`}>
              <span className="material-icons-round text-4xl">{department.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
              <p className="text-gray-500 mt-1">{department.employee_count || 0} Active Members</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
            >
              <span className="material-icons-round text-sm">edit</span>
              Edit Details
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-600 font-bold rounded-lg hover:bg-red-50 shadow-sm transition-colors"
              >
                <span className="material-icons-round text-sm">delete</span>
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Department Head</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {department.manager?.name ? department.manager.name.charAt(0) : 'N'}
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  {department.manager?.name || 'Not Assigned'}
                </p>
                <p className="text-xs text-gray-500">Head of {department.name}</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">About</p>
            <p className="text-gray-600 mt-2 leading-relaxed">{department.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Team Members</h3>
          <span className="text-sm text-gray-500">{department.employee_count || 0} members</span>
        </div>
        {department.employees && department.employees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {department.employees.map((employee) => (
              <div key={employee.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <img
                  src={employee.profile_photo_url || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{employee.name}</p>
                  <p className="text-xs text-gray-500 truncate">{employee.job_title || 'Employee'}</p>
                  <p className="text-xs text-gray-400 truncate">{employee.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {employee.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <span className="material-icons-round text-gray-300 text-4xl mb-2">groups</span>
            <p className="text-gray-500">No employees assigned to this department yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetails;
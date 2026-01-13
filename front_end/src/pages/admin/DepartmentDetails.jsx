import React from 'react';

const DepartmentDetails = ({ department, onBack, onEdit }) => {
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
              <p className="text-gray-500 mt-1">{department.members} Active Members</p>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
          >
            <span className="material-icons-round text-sm">edit</span>
            Edit Details
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Department Head</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {department.manager ? department.manager.first_name.charAt(0) : 'N'}
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  {department.manager ? `${department.manager.first_name} ${department.manager.last_name}` : 'Not Assigned'}
                </p>
                <p className="text-xs text-gray-500">Head of {department.name}</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">About</p>
            <p className="text-gray-600 mt-2 leading-relaxed">{department.description}</p>
          </div>
        </div>
      </div>

      {/* Team Members Placeholder */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Team Members</h3>
          <button className="text-blue-600 text-sm font-bold">View All</button>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <span className="material-icons-round text-gray-300 text-4xl mb-2">groups</span>
          <p className="text-gray-500">List of {department.members} employees would appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
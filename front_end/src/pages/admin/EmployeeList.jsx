import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import EmployeeProfile from './EmployeeProfile';
import EmployeeEdit from './EmployeeEdit';

// Helper to group flat employee data by department and role
const groupEmployees = (flatList) => {
  const depts = {};
  flatList.forEach(emp => {
    const deptName = emp.department || 'Unassigned';
    const roleName = emp.role || 'General';

    if (!depts[deptName]) depts[deptName] = { department: deptName, groups: {} };
    if (!depts[deptName].groups[roleName]) depts[deptName].groups[roleName] = { role: roleName, members: [] };

    depts[deptName].groups[roleName].members.push({
      ...emp,
      id: emp.id || Math.random(),
      name: emp.name || 'Unknown',
      avatar: emp.avatar || emp.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=256&h=256&q=80',
      joined: emp.joinDate || emp.joined || 'N/A'
    });
  });

  return Object.values(depts).map(d => ({
    ...d,
    groups: Object.values(d.groups)
  }));
};

/* --- INTERNAL COMPONENT: LIST VIEW --- */
const EmployeesList = ({ data, onAddNew, onViewProfile, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Search Logic: Filters the nested structure
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowerTerm = searchTerm.toLowerCase();

    return data.map(dept => {
      const filteredGroups = dept.groups.map(group => {
        const filteredMembers = group.members.filter(member =>
          member.name.toLowerCase().includes(lowerTerm) ||
          group.role.toLowerCase().includes(lowerTerm)
        );
        return { ...group, members: filteredMembers };
      }).filter(group => group.members.length > 0);

      return { ...dept, groups: filteredGroups };
    }).filter(dept => dept.groups.length > 0);
  }, [searchTerm, data]);

  return (
    <div className="animate-fade-in-up">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and their account permissions.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-56">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* View Toggle Buttons */}
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <span className="material-icons-round text-xl block">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="List View"
            >
              <span className="material-icons-round text-xl block">view_list</span>
            </button>
          </div>

          {/* Add Button */}
          <button onClick={onAddNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-colors whitespace-nowrap">
            <span className="material-icons-round text-lg">add</span>
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      <div className="space-y-10">
        {filteredData.length > 0 ? filteredData.map((dept, idx) => (
          <div key={idx}>
            {/* Department Header */}
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-800">{dept.department}</h2>
            </div>

            <div className="space-y-6">
              {dept.groups.map((group, gIdx) => (
                <div key={gIdx}>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{group.role}
                  </h3>

                  {/* --- CONDITIONAL LAYOUT: GRID OR LIST --- */}
                  <div className={viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                    : "space-y-3"
                  }>
                    {group.members.map((member) => (
                      <div key={member.id} className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group ${viewMode === 'grid'
                        ? "p-4 flex flex-col items-center text-center" // Grid Styling
                        : "p-3 flex items-center justify-between gap-4" // List Styling
                        }`}>

                        {/* Avatar & Basic Info */}
                        <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center' : 'items-center gap-4 flex-1'}`}>
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className={`${viewMode === 'grid' ? 'w-16 h-16 mb-3' : 'w-10 h-10'} rounded-full object-cover`}
                          />
                          <div className={viewMode === 'grid' ? 'text-center' : 'text-left'}>
                            <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                            <p className="text-[10px] text-gray-400">{member.email}</p>
                          </div>
                        </div>

                        {/* Status (Visible in both, slightly different layout) */}
                        <div className={viewMode === 'grid' ? 'mt-3 mb-4' : ''}>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {member.status}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'w-full' : ''}`}>
                          <button
                            onClick={() => onViewProfile(member)}
                            className={viewMode === 'grid'
                              ? "flex-1 py-2 rounded-lg border border-blue-100 text-blue-600 text-[10px] font-bold hover:bg-blue-50 transition-colors"
                              : "px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[10px] font-bold hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            }
                          >
                            {viewMode === 'grid' ? 'Profile' : 'View'}
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); onToggleStatus(member); }}
                            className={viewMode === 'grid'
                              ? `flex-1 py-2 rounded-lg border text-[10px] font-bold transition-colors ${member.status === 'Active' ? 'border-orange-100 text-orange-600 hover:bg-orange-50' : 'border-green-100 text-green-600 hover:bg-green-50'}`
                              : `px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-colors ${member.status === 'Active' ? 'border-orange-100 text-orange-600 hover:bg-orange-50' : 'border-green-100 text-green-600 hover:bg-green-50'}`
                            }
                          >
                            {member.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                  {/* --- END CONDITIONAL LAYOUT --- */}

                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-gray-400">
            <span className="material-icons-round text-4xl mb-2">search_off</span>
            <p>No employees found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- MAIN PARENT CONTROLLER --- */
const Employees = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { employees, loading, addEmployee, updateEmployee, activateEmployee, deactivateEmployee } = useEmployee();
  const role = user?.role || 'admin';

  const groupedData = useMemo(() => groupEmployees(employees), [employees]);

  // --- HANDLERS ---
  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView('profile');
  };

  const handleAddNew = () => {
    navigate(`/${role}/employees/new`);
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setCurrentView('list');
  };

  const handleEditProfile = () => {
    setCurrentView('edit');
  };

  const handleToggleStatus = async (employee) => {
    try {
      if (employee.status === 'Active') {
        await deactivateEmployee(employee.id);
        alert(`${employee.name} deactivated successfully.`);
      } else {
        await activateEmployee(employee.id);
        alert(`${employee.name} activated successfully.`);
      }
    } catch (error) {
      alert('Failed to update employee status.');
    }
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const updatedEmployee = await updateEmployee(selectedEmployee.id, updatedData);
      setSelectedEmployee(updatedEmployee);
      alert('Profile Updated Successfully!');
      setCurrentView('profile');
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  const handleCancelEdit = () => {
    setCurrentView('profile');
  };

  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans custom-scrollbar relative">

      {/* View Switcher Logic */}
      {loading && currentView === 'list' ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : currentView === 'list' && (
        <EmployeesList
          data={groupedData}
          onAddNew={handleAddNew}
          onViewProfile={handleViewProfile}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {currentView === 'profile' && (
        <EmployeeProfile
          employee={selectedEmployee}
          onBack={handleBackToList}
          onEdit={handleEditProfile}
        />
      )}

      {currentView === 'edit' && (
        <EmployeeEdit
          employee={selectedEmployee}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}

    </main>
  );
};

export default Employees;
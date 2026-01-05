import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import EmployeeEdit from './EmployeeEdit';

/* --- MOCK DATA --- */
const INITIAL_DATA = [
  {
    department: "Engineering",
    groups: [
      {
        role: "Senior Software Engineers",
        members: [
          { id: 1, name: "Marcus Johnson", email: "marcus.j@ecohrms.com", phone: "+1 (555) 123-4567", status: "Active", joined: "April 15, 2023", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { id: 2, name: "Sarah Connor", email: "sarah.c@ecohrms.com", phone: "+1 (555) 987-6543", status: "On Leave", joined: "May 10, 2022", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      },
      {
        role: "QA Engineers",
        members: [
          { id: 3, name: "David Chen", email: "david.c@ecohrms.com", phone: "+1 (555) 555-5555", status: "Active", joined: "Jan 12, 2024", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      }
    ]
  },
  {
    department: "Design",
    groups: [
      {
        role: "Product Designers",
        members: [
          { id: 4, name: "Jessica Pearson", email: "jessica.p@ecohrms.com", phone: "+1 (555) 111-2222", status: "Active", joined: "Oct 04, 2023", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
        ]
      }
    ]
  }
];

/* --- INTERNAL COMPONENT: LIST VIEW --- */
const EmployeesList = ({ data, onAddNew, onViewProfile }) => {
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

                        {/* Action Button */}
                        <button
                          onClick={() => onViewProfile(member)}
                          className={viewMode === 'grid'
                            ? "w-full py-2 rounded-lg border border-blue-100 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition-colors"
                            : "px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          }
                        >
                          {viewMode === 'grid' ? 'View Profile' : 'View'}
                        </button>

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

  // --- HANDLERS ---
  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView('profile');
  };

  const handleAddNew = () => {
    navigate('/admin/employees/new');
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setCurrentView('list');
  };

  const handleEditProfile = () => {
    setCurrentView('edit');
  };

  const handleSaveEdit = (updatedData) => {
    // Merge new data with existing employee data
    const updatedEmployee = { ...selectedEmployee, ...updatedData };
    setSelectedEmployee(updatedEmployee);
    alert('Profile Updated Successfully!');
    setCurrentView('profile');
  };

  const handleCancelEdit = () => {
    setCurrentView('profile');
  };

  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans custom-scrollbar relative">

      {/* View Switcher Logic */}
      {currentView === 'list' && (
        <EmployeesList
          data={INITIAL_DATA}
          onAddNew={handleAddNew}
          onViewProfile={handleViewProfile}
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
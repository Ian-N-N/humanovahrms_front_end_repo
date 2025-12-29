import React, { useState, useMemo } from 'react';
import EmployeeProfile from './EmployeeProfile';
import EmployeeForm from './EmployeeCreate';
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

  // Search Logic: Filters the nested structure
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    const lowerTerm = searchTerm.toLowerCase();
    
    // We Map to create a new structure, filtering out empty groups/departments
    return data.map(dept => {
      const filteredGroups = dept.groups.map(group => {
        const filteredMembers = group.members.filter(member => 
          member.name.toLowerCase().includes(lowerTerm) || 
          group.role.toLowerCase().includes(lowerTerm)
        );
        return { ...group, members: filteredMembers };
      }).filter(group => group.members.length > 0); // Remove empty groups

      return { ...dept, groups: filteredGroups };
    }).filter(dept => dept.groups.length > 0); // Remove empty departments
  }, [searchTerm, data]);

  return (
    <div className="animate-fade-in-up">
       {/* Header & Search */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and their account permissions.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={onAddNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-colors whitespace-nowrap">
            <span className="material-icons-round text-lg">add</span>
            Add New
          </button>
        </div>
      </div>

      {/* The Grid */}
      <div className="space-y-10">
        {filteredData.length > 0 ? filteredData.map((dept, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-800">{dept.department}</h2>
            </div>
            <div className="space-y-6">
              {dept.groups.map((group, gIdx) => (
                <div key={gIdx}>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{group.role}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {group.members.map((member) => (
                      <div key={member.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group">
                        <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                        <p className="text-[10px] text-gray-400 mb-3">{member.email}</p>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold mb-4 ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {member.status}
                        </span>
                        <button onClick={() => onViewProfile(member)} className="w-full py-2 rounded-lg border border-blue-100 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition-colors">
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
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

/* --- MAIN COMPONENT EXPORT --- */
/* --- 5. MAIN PARENT CONTROLLER --- */
const Employees = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- HANDLERS ---
  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView('profile');
  };

  const handleAddNew = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setCurrentView('list');
  };

  // [CHANGE 1]: Add these new handlers for Editing
  const handleEditProfile = () => {
    setCurrentView('edit'); // Switches to the Edit screen
  };

  const handleSaveEdit = (updatedData) => {
    // Merge new data with existing employee data
    const updatedEmployee = { ...selectedEmployee, ...updatedData };
    setSelectedEmployee(updatedEmployee); 
    alert('Profile Updated Successfully!');
    setCurrentView('profile'); // Go back to profile view
  };

  const handleCancelEdit = () => {
    setCurrentView('profile'); // Go back without saving
  };

  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans custom-scrollbar relative">
      
      {/* List View */}
      {currentView === 'list' && (
        <EmployeesList 
          data={INITIAL_DATA} 
          onAddNew={handleAddNew} 
          onViewProfile={handleViewProfile} 
        />
      )}

      {/* Add View */}
      {currentView === 'add' && (
        <EmployeeForm 
          onCancel={handleBackToList} 
          onSubmit={() => { alert('Employee Added!'); handleBackToList(); }} 
        />
      )}

      {/* Profile View */}
      {currentView === 'profile' && (
        <EmployeeProfile 
          employee={selectedEmployee} 
          onBack={handleBackToList}
          onEdit={handleEditProfile} /* [CHANGE 2]: Pass the edit handler here */
        />
      )}

      {/* [CHANGE 3]: Add the Edit View Render Block */}
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
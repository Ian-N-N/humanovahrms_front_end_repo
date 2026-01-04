import React, { useState } from 'react';
import DepartmentForm from './DepartmentForm';
import DepartmentDetails from './DepartmentDetails';

/* --- MOCK DATA --- */
const INITIAL_DATA = [
  { id: 1, name: "Engineering", description: "Responsible for software development, QA, and infrastructure.", head: "Sarah Jenkins", members: 42, icon: "code", theme: "blue", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 2, name: "Human Resources", description: "Managing recruitment, employee relations, and company culture.", head: "Mike Ross", members: 5, icon: "groups", theme: "pink", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 3, name: "Marketing", description: "Handling brand awareness, campaigns, social media, and market research.", head: "Jessica Pearson", members: 12, icon: "campaign", theme: "purple", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 4, name: "Design", description: "UI/UX design, graphic assets, and brand identity management.", head: "David Kim", members: 8, icon: "palette", theme: "orange", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 5, name: "Finance", description: "Budgeting, forecasting, payroll processing, and financial reporting.", head: "Amanda Lee", members: 6, icon: "account_balance", theme: "teal", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 6, name: "Sales", description: "Client acquisition, account management, and revenue growth.", head: "Robert Fox", members: 28, icon: "trending_up", theme: "cyan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
];

/* --- MAIN COMPONENT --- */
const Departments = () => {
  // STATE MANAGEMENT
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentView, setCurrentView] = useState('main'); // 'main', 'add', 'details', 'edit'
  const [selectedDept, setSelectedDept] = useState(null);

  // --- HANDLERS ---
  
  // Navigation
  const handleViewDetails = (dept) => {
    setSelectedDept(dept);
    setCurrentView('details');
  };

  const handleAddNew = () => {
    setSelectedDept(null);
    setCurrentView('add');
  };

  const handleEdit = (dept) => {
    // If passed directly (from list/grid) use it, otherwise use state (from details view)
    setSelectedDept(dept || selectedDept); 
    setCurrentView('edit');
  };

  const handleBack = () => {
    setSelectedDept(null);
    setCurrentView('main');
  };

  // Actions
  const handleSave = (formData) => {
    // In real app: API call here
    alert(`Successfully ${selectedDept ? 'updated' : 'created'} ${formData.name}!`);
    
    // Logic to return to correct view
    if (selectedDept) {
      // If we were editing, go back to details
      setSelectedDept({ ...selectedDept, ...formData }); // Optimistic update
      setCurrentView('details');
    } else {
      handleBack();
    }
  };

  // --- RENDER HELPERS ---

  const renderGridItem = (dept) => (
    <div key={dept.id} onClick={() => handleViewDetails(dept)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group animate-fade-in-up">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${dept.theme}-50 text-${dept.theme}-600 group-hover:scale-110 transition-transform`}>
          <span className="material-icons-round text-2xl">{dept.icon}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleEdit(dept); }}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-300 hover:text-blue-600 transition-colors"
        >
          <span className="material-icons-round text-lg">edit</span>
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{dept.description}</p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <img src={dept.avatar} alt={dept.head} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Head</p>
            <p className="text-xs font-bold text-gray-700">{dept.head}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md text-gray-500">
          <span className="material-icons-round text-sm">people</span>
          <span className="text-xs font-bold">{dept.members}</span>
        </div>
      </div>
    </div>
  );

  const renderListItem = (dept) => (
    <div key={dept.id} onClick={() => handleViewDetails(dept)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-6 animate-fade-in-up mb-3">
       <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-${dept.theme}-50 text-${dept.theme}-600`}>
          <span className="material-icons-round text-xl">{dept.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900">{dept.name}</h3>
          <p className="text-xs text-gray-500 truncate">{dept.description}</p>
        </div>
        <div className="hidden md:block text-right pr-4">
             <p className="text-[10px] text-gray-400 uppercase font-semibold">Head</p>
             <p className="text-sm font-medium text-gray-700">{dept.head}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-md text-gray-500">
          <span className="material-icons-round text-sm">people</span>
          <span className="text-xs font-bold">{dept.members}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleEdit(dept); }}
          className="p-2 text-gray-300 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
        >
           <span className="material-icons-round">edit</span>
        </button>
    </div>
  );

  /* --- RENDER LOGIC --- */
  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-8 font-sans custom-scrollbar">
      
      {/* 1. Main View (List/Grid) */}
      {currentView === 'main' && (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
              <p className="text-gray-500 mt-1">Manage your organization's internal structure and teams.</p>
            </div>
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
            >
              <span className="material-icons-round text-lg">add</span>
              Add Department
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6">
            {/* Search/Filter Mock */}
            <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm">
                    <option>Sort by Name (A-Z)</option>
                    <option>Sort by Size (High-Low)</option>
                </select>
                <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">expand_more</span>
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <span className="material-icons-round text-xl block">grid_view</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <span className="material-icons-round text-xl block">view_list</span>
                </button>
            </div>
          </div>

          {/* Render Content based on ViewMode */}
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8" : "space-y-2 pb-8"}>
            {INITIAL_DATA.map((dept) => (
              viewMode === 'grid' ? renderGridItem(dept) : renderListItem(dept)
            ))}
          </div>
        </>
      )}

      {/* 2. Add / Edit Form */}
      {(currentView === 'add' || currentView === 'edit') && (
        <DepartmentForm 
          department={selectedDept} // Null for Add, Object for Edit
          onCancel={handleBack} 
          onSave={handleSave}
        />
      )}

      {/* 3. Details View */}
      {currentView === 'details' && (
        <DepartmentDetails 
          department={selectedDept}
          onBack={handleBack}
          onEdit={() => handleEdit(null)} // Uses current selectedDept from state
        />
      )}

    </main>
  );
};

export default Departments;
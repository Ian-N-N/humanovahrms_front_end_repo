import React, { useState, useMemo } from 'react';
import DepartmentForm from './DepartmentForm';
import DepartmentDetails from './DepartmentDetails';
import { useDepartment } from '../../context/DepartmentContext';

const Departments = () => {
  const { departments, loading, addDepartment, updateDepartment, deleteDepartment, refetch } = useDepartment();
  const [viewMode, setViewMode] = useState('grid');
  const [currentView, setCurrentView] = useState('main');
  const [selectedDept, setSelectedDept] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepts = useMemo(() => {
    return departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [departments, searchTerm]);

  const handleViewDetails = (dept) => {
    setSelectedDept(dept);
    setCurrentView('details');
  };

  const handleAddNew = () => {
    setSelectedDept(null);
    setCurrentView('add');
  };

  const handleEdit = (dept) => {
    setSelectedDept(dept || selectedDept);
    setCurrentView('edit');
  };

  const handleBack = () => {
    setSelectedDept(null);
    setCurrentView('main');
  };

  const handleSave = async (formData) => {
    try {
      if (selectedDept) {
        await updateDepartment(selectedDept.id, formData);
        alert("Department updated successfully!");
      } else {
        await addDepartment(formData);
        alert("Department created successfully!");
      }
      handleBack();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to save department.";
      alert(errorMsg);
    }
  };

  const renderGridItem = (dept) => (
    <div key={dept.id} onClick={() => handleViewDetails(dept)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group animate-fade-in-up">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform`}>
          <span className="material-icons-round text-2xl">{dept.icon || 'business'}</span>
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
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{dept.description || 'No description provided.'}</p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
            {dept.manager?.name ? dept.manager.name.charAt(0) : 'N'}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Head</p>
            <p className="text-xs font-bold text-gray-700">
              {dept.manager?.name || 'Not Assigned'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md text-gray-500">
          <span className="material-icons-round text-sm">people</span>
          <span className="text-xs font-bold uppercase tracking-tighter">{dept.employee_count || 0}</span>
        </div>
      </div>
    </div>
  );

  const renderListItem = (dept) => (
    <div key={dept.id} onClick={() => handleViewDetails(dept)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-6 animate-fade-in-up mb-3">
      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-blue-50 text-blue-600`}>
        <span className="material-icons-round text-xl">{dept.icon || 'business'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-gray-900">{dept.name}</h3>
        <p className="text-xs text-gray-500 truncate">{dept.description || 'No description.'}</p>
      </div>
      <div className="hidden md:block text-right pr-4">
        <p className="text-[10px] text-gray-400 uppercase font-semibold">Head</p>
        <p className="text-sm font-medium text-gray-700">
          {dept.manager?.name || 'N/A'}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-md text-gray-500">
        <span className="material-icons-round text-sm">people</span>
        <span className="text-xs font-bold">{dept.employee_count || 0}</span>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); handleEdit(dept); }}
        className="p-2 text-gray-300 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
      >
        <span className="material-icons-round">edit</span>
      </button>
    </div>
  );

  return (
    <main className="flex-1 bg-gray-50 h-screen overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar">

      {currentView === 'main' && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
              <p className="text-gray-500 mt-1">Manage your organization's internal structure and teams.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => refetch()}
                className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-blue-600 shadow-sm"
              >
                <span className="material-icons-round">refresh</span>
              </button>
              <button
                onClick={handleAddNew}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <span className="material-icons-round text-lg">add</span>
                Add Department
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm self-end sm:self-auto">
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

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8" : "space-y-2 pb-8"}>
            {filteredDepts.map((dept) => (
              viewMode === 'grid' ? renderGridItem(dept) : renderListItem(dept)
            ))}
            {filteredDepts.length === 0 && !loading && (
              <div className="col-span-full py-20 text-center text-gray-400">No departments found.</div>
            )}
            {loading && (
              <div className="col-span-full py-20 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
          </div>
        </>
      )}

      {(currentView === 'add' || currentView === 'edit') && (
        <DepartmentForm
          department={selectedDept}
          onCancel={handleBack}
          onSave={handleSave}
        />
      )}

      {currentView === 'details' && (
        <DepartmentDetails
          department={selectedDept}
          onBack={handleBack}
          onEdit={() => handleEdit(null)}
          onDelete={async () => {
            if (window.confirm("Delete this department?")) {
              await deleteDepartment(selectedDept.id);
              handleBack();
            }
          }}
        />
      )}
    </main>
  );
};

export default Departments;
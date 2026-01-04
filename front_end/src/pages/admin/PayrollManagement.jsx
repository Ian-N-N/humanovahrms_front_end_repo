import React, { useState } from 'react';
import PayrollDetails from './PayrollDetails'; /* --- 1. IMPORT THE NEW COMPONENT --- */

/* --- MOCK DATA (Same as before) --- */
const PAYROLL_DATA = [
  { id: 'EMP-001', name: 'Sarah Wanjiru', role: 'Senior Engineer', dept: 'Engineering', basic: 180000, allowance: 20000, deduction: 15000, status: 'Paid', date: 'Oct 2023', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 'EMP-002', name: 'Michael Otieno', role: 'Sales Lead', dept: 'Sales', basic: 120000, allowance: 45000, deduction: 12000, status: 'Pending', date: 'Oct 2023', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 'EMP-003', name: 'Emily Nyambura', role: 'HR Manager', dept: 'HR', basic: 150000, allowance: 10000, deduction: 14000, status: 'Paid', date: 'Oct 2023', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 'EMP-004', name: 'David Kim', role: 'Product Designer', dept: 'Design', basic: 140000, allowance: 5000, deduction: 11000, status: 'Processing', date: 'Oct 2023', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 'EMP-005', name: 'Chris Paul', role: 'Intern', dept: 'Engineering', basic: 40000, allowance: 2000, deduction: 500, status: 'Pending', date: 'Oct 2023', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const formatKES = (amount) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount);
};

const StatCard = ({ label, value, subtext, icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between min-w-[200px]">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      <p className={`text-xs mt-1 font-medium ${subtext.includes('+') ? 'text-green-600' : 'text-gray-400'}`}>{subtext}</p>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <span className="material-icons-round text-lg">{icon}</span>
    </div>
  </div>
);

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedMonth, setSelectedMonth] = useState('October 2023');

  /* --- 2. ADDED STATE FOR VIEW SWITCHING --- */
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Totals Calculation
  const totalDeductions = PAYROLL_DATA.reduce((acc, curr) => acc + curr.deduction, 0);
  const totalNet = PAYROLL_DATA.reduce((acc, curr) => acc + (curr.basic + curr.allowance - curr.deduction), 0);
  const totalAllowances = PAYROLL_DATA.reduce((acc, curr) => acc + curr.allowance, 0);

  /* --- 3. ADDED HANDLER FUNCTIONS --- */
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee); // Remember who was clicked
    setCurrentView('details');     // Switch screen
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);     // Clear selection
    setCurrentView('list');        // Go back
  };

  return (
    <main className="flex-1 bg-gray-50 h-full overflow-y-auto p-4 lg:p-8 font-sans custom-scrollbar w-full">
      
      {/* --- 4. THE SWITCH LOGIC --- */}
      {currentView === 'details' ? (
        // SHOW DETAILS COMPONENT IF VIEW IS 'details'
        <PayrollDetails 
          employee={selectedEmployee} 
          onBack={handleBackToList} 
        />
      ) : (
        // SHOW NORMAL DASHBOARD IF VIEW IS 'list'
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payroll Management</h1>
              <p className="text-gray-500 text-sm mt-1">Manage salaries for <span className="font-semibold text-gray-800">{selectedMonth}</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                <span className="material-icons-round text-gray-400 text-lg">calendar_today</span>
                {selectedMonth}
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm whitespace-nowrap">
                <span className="material-icons-round text-lg">payments</span>
                Run Payroll
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Net Pay" value={formatKES(totalNet)} subtext="+2.4% vs last month" icon="account_balance_wallet" color="bg-blue-50 text-blue-600" />
            <StatCard label="Total Deductions" value={formatKES(totalDeductions)} subtext="Tax, NHIF, NSSF" icon="content_cut" color="bg-orange-50 text-orange-600" />
            <StatCard label="Allowances" value={formatKES(totalAllowances)} subtext="Bonuses & Overtime" icon="trending_up" color="bg-green-50 text-green-600" />
            <StatCard label="Status" value="2 / 5 Paid" subtext="3 Pending Processing" icon="pie_chart" color="bg-purple-50 text-purple-600" />
          </div>

          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button onClick={() => setActiveTab('current')} className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'current' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Current Payroll
            </button>
            <button onClick={() => setActiveTab('history')} className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Payment History
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-64">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input type="text" placeholder="Search employees..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Filter</button>
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Export</button>
              </div>
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Employee</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">Basic Pay</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">Allowances</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">Deductions</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">Net Pay</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-center">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PAYROLL_DATA.map((row, index) => {
                    const netPay = row.basic + row.allowance - row.deduction;
                    return (
                      <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{row.name}</p>
                              <p className="text-xs text-gray-400">{row.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-gray-600">{formatKES(row.basic)}</td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-green-600">+{formatKES(row.allowance)}</td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-red-500">-{formatKES(row.deduction)}</td>
                        <td className="py-4 px-6 text-right text-sm font-bold text-gray-900">{formatKES(netPay)}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border 
                            ${row.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 
                              row.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                              'bg-blue-50 text-blue-700 border-blue-100'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                           {/* --- 5. ATTACH HANDLER TO BUTTON --- */}
                           <button 
                             onClick={() => handleViewEmployee(row)} 
                             className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline"
                           >
                             View Slip
                           </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="block lg:hidden bg-gray-50 p-4 space-y-4">
              {PAYROLL_DATA.map((row, index) => {
                 const netPay = row.basic + row.allowance - row.deduction;
                 return (
                  <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={row.avatar} alt={row.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                        <div>
                          <h4 className="font-bold text-gray-900">{row.name}</h4>
                          <p className="text-xs text-gray-500">{row.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold border 
                          ${row.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 
                            'bg-orange-50 text-orange-700 border-orange-100'}`}>
                          {row.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-t border-gray-100 pt-3">
                       <div>
                         <p className="text-gray-400 text-xs mb-0.5">Basic Pay</p>
                         <p className="font-medium text-gray-700">{formatKES(row.basic)}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-gray-400 text-xs mb-0.5">Net Pay</p>
                         <p className="font-bold text-blue-600 text-lg leading-tight">{formatKES(netPay)}</p>
                       </div>
                    </div>

                    {/* --- 6. ATTACH HANDLER TO MOBILE BUTTON --- */}
                    <button 
                      onClick={() => handleViewEmployee(row)}
                      className="w-full mt-4 py-2.5 rounded-lg border border-blue-100 text-blue-600 bg-blue-50 font-bold text-sm hover:bg-blue-100 transition-colors"
                    >
                      View Full Payslip
                    </button>
                  </div>
                 );
              })}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center rounded-b-2xl">
               <span className="text-xs text-gray-500">Showing 5 records</span>
               <div className="flex gap-2">
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                    <span className="material-icons-round text-sm">chevron_left</span>
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
                    <span className="material-icons-round text-sm">chevron_right</span>
                 </button>
               </div>
            </div>

          </div>
        </>
      )}

    </main>
  );
};

export default Payroll;
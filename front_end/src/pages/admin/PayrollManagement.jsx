import React, { useState, useMemo } from 'react';
import PayrollDetails from './PayrollDetails';
import { formatKSh } from '../../utils/formatters';
import { usePayroll } from '../../context/PayrollContext';

const Payroll = () => {
  const { payrolls, cycles, loading, createCycle, runPayroll, deletePayroll } = usePayroll();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedMonth, setSelectedMonth] = useState('January 2024');

  const [currentView, setCurrentView] = useState('list');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeletePayroll = async (payrollId, employeeName) => {
    if (!window.confirm(`Delete payroll record for ${employeeName}? This cannot be undone.`)) {
      return;
    }

    try {
      await deletePayroll(payrollId);
      alert('Payroll record deleted successfully');
    } catch (error) {
      alert('Failed to delete payroll record');
    }
  };


  // Filter payrolls for current month/cycle if needed
  const displayPayrolls = useMemo(() => {
    // For now, show all payrolls or filter by selected month
    return Array.isArray(payrolls) ? payrolls : [];
  }, [payrolls]);

  // Totals Calculation
  const totalDeductions = displayPayrolls.reduce((acc, curr) => acc + (Number(curr.tax_paid) + Number(curr.nssf) + Number(curr.shif) + Number(curr.housing_levy)), 0);
  const totalNet = displayPayrolls.reduce((acc, curr) => acc + Number(curr.net_salary), 0);
  const totalGross = displayPayrolls.reduce((acc, curr) => acc + Number(curr.gross_salary), 0);

  const handleRunPayroll = async () => {
    try {
      const activeCycle = cycles.find(c => c.status === 'Active');
      if (!activeCycle) {
        alert("Please create an active payroll cycle first.");
        return;
      }
      if (!window.confirm(`Run payroll for ${activeCycle.name}?`)) return;
      await runPayroll({ cycle_id: activeCycle.id });
      alert("Payroll processed successfully!");
    } catch (err) {
      alert("Failed to process payroll.");
    }
  };

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
              <button
                onClick={handleRunPayroll}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm whitespace-nowrap"
              >
                <span className="material-icons-round text-lg">payments</span>
                Run Payroll
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Net Pay" value={formatKES(totalNet)} subtext="+2.4% vs last month" icon="account_balance_wallet" color="bg-blue-50 text-blue-600" />
            <StatCard label="Total Deductions" value={formatKES(totalDeductions)} subtext="Tax, SHIF, NSSF" icon="content_cut" color="bg-orange-50 text-orange-600" />
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
                  {displayPayrolls.map((row, index) => {
                    const totalDeds = Number(row.tax_paid) + Number(row.nssf) + Number(row.shif) + Number(row.housing_levy);
                    return (
                      <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                              {row.employee?.name?.charAt(0) || 'E'}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{row.employee?.name || 'Unknown'}</p>
                              <p className="text-xs text-gray-400">{row.employee?.role || 'Staff'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-gray-600">{formatKSh(row.basic_salary)}</td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-green-600">+{formatKSh(0)}</td>
                        <td className="py-4 px-6 text-right text-sm font-medium text-red-500">-{formatKSh(totalDeds)}</td>
                        <td className="py-4 px-6 text-right text-sm font-bold text-gray-900">{formatKSh(row.net_salary)}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border 
                            ${row.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' :
                              row.status === 'processed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                'bg-orange-50 text-orange-700 border-orange-100'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewEmployee(row)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline">
                              View Slip
                            </button>
                            <button
                              onClick={() => handleDeletePayroll(row.id, row.employee?.name || 'this employee')}
                              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">
                              <span className="material-icons-round text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="block lg:hidden bg-gray-50 p-4 space-y-4">
              {displayPayrolls.map((row, index) => {
                const totalDeds = Number(row.tax_paid) + Number(row.nssf) + Number(row.shif) + Number(row.housing_levy);
                return (
                  <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {row.employee?.name?.charAt(0) || 'E'}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{row.employee?.name || 'Unknown'}</h4>
                          <p className="text-xs text-gray-500">{row.employee?.role || 'Staff'}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold border 
                          ${row.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' :
                          'bg-orange-50 text-orange-700 border-orange-100'}`}>
                        {row.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-t border-gray-100 pt-3">
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Basic Pay</p>
                        <p className="font-medium text-gray-700">{formatKSh(row.basic_salary)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs mb-0.5">Net Pay</p>
                        <p className="font-bold text-blue-600 text-lg leading-tight">{formatKSh(row.net_salary)}</p>
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
              <span className="text-xs text-gray-500">Showing {displayPayrolls.length} records</span>
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
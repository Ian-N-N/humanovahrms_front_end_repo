import React, { useState } from 'react';
import { formatKSh } from '../../utils/formatters';

const PayrollDetails = ({ employee, onBack }) => {
  if (!employee) return null;

  const [isEditing, setIsEditing] = useState(false);

  // 1. STATE: Split Earnings (Static Object) and Deductions (Dynamic Array)
  const [earnings, setEarnings] = useState({
    basic: employee.basic || 180000,
    houseAllowance: 15000,
    transportAllowance: 10000,
  });

  // Initial Deductions as an Array for dynamic adding/removing
  const [deductions, setDeductions] = useState([
    { id: 1, name: 'PAYE Tax', amount: 12500 },
    { id: 2, name: 'NHIF', amount: 1700 },
    { id: 3, name: 'NSSF', amount: 1080 },
    { id: 4, name: 'Pension Scheme', amount: 3220 },
  ]);

  // 2. CALCULATIONS
  const totalEarnings = Object.values(earnings).reduce((a, b) => a + Number(b), 0);
  const totalDeductions = deductions.reduce((a, b) => a + Number(b.amount), 0);
  const netPay = totalEarnings - totalDeductions;

  // 3. HANDLERS

  // Handle Earnings Change (Simple Object Update)
  const handleEarningChange = (e) => {
    const { name, value } = e.target;
    setEarnings(prev => ({ ...prev, [name]: Number(value) }));
  };

  // Handle Deduction Change (Array Update)
  const handleDeductionChange = (id, field, value) => {
    const newDeductions = deductions.map(item => {
      if (item.id === id) {
        return { ...item, [field]: field === 'amount' ? Number(value) : value };
      }
      return item;
    });
    setDeductions(newDeductions);
  };

  // ADD NEW DEDUCTION
  const addDeduction = () => {
    const newId = deductions.length > 0 ? Math.max(...deductions.map(d => d.id)) + 1 : 1;
    setDeductions([...deductions, { id: newId, name: 'New Deduction', amount: 0 }]);
  };

  // REMOVE DEDUCTION
  const removeDeduction = (id) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert(`Payroll Updated! New Net Pay: ${formatKSh(netPay)}`);
  };


  return (
    <div className="w-full animate-fade-in-up pb-8">

      {/* Header & Nav (Same as before) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="material-icons-round text-gray-400">payments</span>
          <span>Payroll</span>
          <span className="material-icons-round text-xs">chevron_right</span>
          <span>Employees</span>
          <span className="material-icons-round text-xs">chevron_right</span>
          <span className="font-semibold text-gray-900">{employee.name}</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm">
          <span className="material-icons-round text-lg">arrow_back</span>
          Back to List
        </button>
      </div>

      {/* Employee Profile Card (Static for this example) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={employee.avatar} alt={employee.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-500 text-sm">{employee.role}</p>
          </div>
        </div>
        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span className="material-icons-round text-sm">edit</span> Edit Payroll
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-sm">Save</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* --- LEFT COLUMN: FINANCIALS --- */}
        <div className="xl:col-span-2 space-y-6">
          <div className={`bg-white rounded-2xl border shadow-sm p-6 md:p-8 transition-all ${isEditing ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-100'}`}>

            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
              <h2 className="text-lg font-bold text-gray-900">Salary Breakdown</h2>
              {isEditing && <span className="text-xs font-bold text-blue-600 animate-pulse bg-blue-50 px-2 py-1 rounded">Editing Mode</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

              {/* 1. EARNINGS SECTION (Static Keys) */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Earnings</h3>
                <div className="space-y-4">
                  {/* Basic Salary */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Basic Salary</span>
                    {isEditing ? (
                      <input type="number" name="basic" value={earnings.basic} onChange={handleEarningChange} className="w-28 px-2 py-1 text-right border border-blue-300 rounded bg-blue-50 font-bold" />
                    ) : (
                      <span className="font-bold text-gray-900">{formatKSh(earnings.basic)}</span>
                    )}
                  </div>
                  {/* Allowances */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">House Allowance</span>
                    {isEditing ? (
                      <input type="number" name="houseAllowance" value={earnings.houseAllowance} onChange={handleEarningChange} className="w-28 px-2 py-1 text-right border border-blue-300 rounded bg-blue-50 font-bold" />
                    ) : (
                      <span className="font-bold text-gray-900">{formatKSh(earnings.houseAllowance)}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Transport</span>
                    {isEditing ? (
                      <input type="number" name="transportAllowance" value={earnings.transportAllowance} onChange={handleEarningChange} className="w-28 px-2 py-1 text-right border border-blue-300 rounded bg-blue-50 font-bold" />
                    ) : (
                      <span className="font-bold text-gray-900">{formatKSh(earnings.transportAllowance)}</span>
                    )}
                  </div>

                  {/* Earnings Total */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-800">Gross Earnings</span>
                    <span className="text-sm font-bold text-green-600">{formatKSh(totalEarnings)}</span>
                  </div>
                </div>
              </div>

              {/* 2. DEDUCTIONS SECTION (Dynamic Array) */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Deductions</h3>
                  {isEditing && (
                    <button onClick={addDeduction} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold hover:bg-blue-200 transition-colors">
                      + Add New
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {deductions.map((deduction) => (
                    <div key={deduction.id} className="flex justify-between items-center text-sm group">

                      {/* Name Field */}
                      {isEditing ? (
                        <input
                          type="text"
                          value={deduction.name}
                          onChange={(e) => handleDeductionChange(deduction.id, 'name', e.target.value)}
                          className="w-32 px-2 py-1 border border-gray-300 rounded text-xs focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-600">{deduction.name}</span>
                      )}

                      {/* Amount Field & Remove Button */}
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <input
                              type="number"
                              value={deduction.amount}
                              onChange={(e) => handleDeductionChange(deduction.id, 'amount', e.target.value)}
                              className="w-24 px-2 py-1 text-right border border-blue-300 rounded bg-blue-50 font-bold text-xs"
                            />
                            <button
                              onClick={() => removeDeduction(deduction.id)}
                              className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded-md"
                            >
                              <span className="material-icons-round text-sm block">delete</span>
                            </button>
                          </>
                        ) : (
                          <span className="font-bold text-gray-900">{formatKSh(deduction.amount)}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Deductions Total */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                    <span className="text-sm font-bold text-gray-800">Total Deductions</span>
                    <span className="text-sm font-bold text-red-500">-{formatKSh(totalDeductions)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Net Salary Highlight */}
            <div className={`mt-8 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors ${isEditing ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">Net Salary Pay</p>
                <p className="text-[10px] mt-1 opacity-70">{isEditing ? 'Calculating Live...' : 'Disbursed on Oct 28, 2023'}</p>
              </div>
              <p className="text-3xl font-bold">{formatKSh(netPay)}</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (Static Info) --- */}
        <div className="space-y-6">
          {/* Payment Method Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Payment Method</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200">
                <span className="material-icons-round text-2xl">account_balance</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Equity Bank Kenya</h3>
                <p className="text-sm text-gray-500 font-mono mt-0.5">**** **** **** 4582</p>
                <p className="text-xs text-gray-400 mt-1">Branch: Westlands</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PayrollDetails;
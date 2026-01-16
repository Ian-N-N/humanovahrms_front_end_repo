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
    { id: 2, name: 'SHIF', amount: 1700 },
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

              {/* 1. EARNINGS SECTION */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Earnings Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Basic Salary</span>
                    <span className="font-bold text-gray-900">{formatKSh(employee.basic_salary)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span className="text-gray-600">Gross Earnings</span>
                    <span className="font-bold">{formatKSh(employee.gross_salary)}</span>
                  </div>
                </div>
              </div>

              {/* 2. DEDUCTIONS SECTION (Kenyan Statutory) */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Statutory Deductions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">NSSF</span>
                    <span className="font-bold text-rose-600">-{formatKSh(employee.nssf)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">SHIF</span>
                    <span className="font-bold text-rose-600">-{formatKSh(employee.shif)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Housing Levy</span>
                    <span className="font-bold text-rose-600">-{formatKSh(employee.housing_levy)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold border-t border-gray-100 pt-2">
                    <span className="text-gray-600">PAYE (Income Tax)</span>
                    <span className="font-bold text-rose-600">-{formatKSh(employee.tax_paid)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Net Salary Highlight */}
            <div className={`mt-8 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-blue-600 text-white`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">Net Salary Pay</p>
                <p className="text-[10px] mt-1 opacity-70">Disbursed on {employee.payment_date || 'N/A'}</p>
              </div>
              <p className="text-3xl font-bold">{formatKSh(employee.net_salary)}</p>
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
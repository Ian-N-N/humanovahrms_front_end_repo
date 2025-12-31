import React from 'react';

const PayrollDetails = ({ employee, onBack }) => {
  if (!employee) return null;

  // Mock specific data for the detailed view
  const detailedStats = {
    earnings: {
      basic: employee.basic,
      houseAllowance: 15000,
      transportAllowance: 10000,
      gross: employee.basic + 15000 + 10000
    },
    deductions: {
      paye: 12500,
      nhif: 1700,
      nssf: 1080,
      pension: 3220,
      total: 18500
    },
    paymentMethod: {
      bank: "Equity Bank Kenya",
      account: "**** **** **** 4582",
      branch: "Westlands"
    },
    payslips: [
      { month: "October 2023", date: "Paid on Oct 28", status: "Paid" },
      { month: "September 2023", date: "Paid on Sep 28", status: "Paid" },
      { month: "August 2023", date: "Paid on Aug 28", status: "Paid" },
      { month: "July 2023", date: "Paid on Jul 28", status: "Paid" },
    ]
  };

  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="w-full animate-fade-in-up pb-8">
      
      {/* 1. Header Navigation & Back Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="material-icons-round text-gray-400">payments</span>
          <span>Payroll</span>
          <span className="material-icons-round text-xs">chevron_right</span>
          <span>Employees</span>
          <span className="material-icons-round text-xs">chevron_right</span>
          <span className="font-semibold text-gray-900">{employee.name}</span>
        </div>

        {/* [NEW] Dedicated Back Button */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <span className="material-icons-round text-lg">arrow_back</span>
          Back to List
        </button>
      </div>

      {/* 2. Employee Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={employee.avatar} alt={employee.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center md:justify-start mt-1">
              <span className="material-icons-round text-sm">work</span> {employee.role}
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="material-icons-round text-sm">business</span> {employee.dept}
            </div>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">Full Time</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-icons-round text-sm">mail</span>
            Contact
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            <span className="material-icons-round text-sm">edit</span>
            Edit Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* --- LEFT COLUMN (2/3 width) --- */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* 3. Salary Breakdown Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
              <h2 className="text-lg font-bold text-gray-900">Salary Breakdown (Oct 2023)</h2>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Paid</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Earnings Column */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Earnings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Basic Salary</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.earnings.basic)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">House Allowance</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.earnings.houseAllowance)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transport Allowance</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.earnings.transportAllowance)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <span className="text-sm font-bold text-gray-800">Gross Earnings</span>
                    <span className="text-sm font-bold text-green-600">{formatKES(detailedStats.earnings.gross)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions Column */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Deductions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">PAYE Tax</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.deductions.paye)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">NHIF</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.deductions.nhif)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">NSSF</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.deductions.nssf)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pension Scheme</span>
                    <span className="font-bold text-gray-900">{formatKES(detailedStats.deductions.pension)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <span className="text-sm font-bold text-gray-800">Total Deductions</span>
                    <span className="text-sm font-bold text-red-500">-{formatKES(detailedStats.deductions.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Net Salary Pay</p>
                <p className="text-[10px] text-blue-400 mt-1">Disbursed on Oct 28, 2023</p>
              </div>
              <p className="text-3xl font-bold text-blue-700">{formatKES(detailedStats.earnings.gross - detailedStats.deductions.total)}</p>
            </div>
          </div>

          {/* 4. Salary Trend Card (Placeholder Chart) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-64 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Salary Trend</h2>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">Last 6 Months</span>
             </div>
             <div className="flex-1 flex items-end justify-between px-4 gap-2">
                {/* CSS Bar Chart Bars */}
                <div className="w-full bg-blue-100 rounded-t-lg h-[40%] relative group"><div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">140k</div></div>
                <div className="w-full bg-blue-100 rounded-t-lg h-[40%]"></div>
                <div className="w-full bg-blue-100 rounded-t-lg h-[42%]"></div>
                <div className="w-full bg-blue-100 rounded-t-lg h-[42%]"></div>
                <div className="w-full bg-blue-200 rounded-t-lg h-[45%]"></div>
                <div className="w-full bg-blue-600 rounded-t-lg h-[60%] relative"><div className="absolute top-2 w-full text-center text-[10px] text-white font-bold">Oct</div></div>
             </div>
             <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span className="text-blue-600 font-bold">Oct</span>
             </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (1/3 width) --- */}
        <div className="space-y-6">
          
          {/* 5. Payslip History Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Payslip History</h2>
                <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
             </div>
             <div className="space-y-4">
                {detailedStats.payslips.map((slip, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <span className="material-icons-round text-lg">description</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">{slip.month}</p>
                          <p className="text-xs text-gray-400">{slip.date}</p>
                       </div>
                    </div>
                    <span className="material-icons-round text-gray-300 group-hover:text-blue-600">download</span>
                  </div>
                ))}
             </div>
          </div>

          {/* 6. Payment Method Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Payment Method</h2>
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200">
                    <span className="material-icons-round text-2xl">account_balance</span>
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">{detailedStats.paymentMethod.bank}</h3>
                    <p className="text-sm text-gray-500 font-mono mt-0.5">{detailedStats.paymentMethod.account}</p>
                    <p className="text-xs text-gray-400 mt-1">Branch: {detailedStats.paymentMethod.branch}</p>
                 </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PayrollDetails;
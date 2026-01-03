import React from 'react';

const AttendanceDetails = ({ record, onBack }) => {
  if (!record) return null;

  return (
    <div className="w-full animate-fade-in-up">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
        >
          <span className="material-icons-round">arrow_back</span>
          Back to Daily Log
        </button>
        <div className="text-right">
           <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
           <p className="text-sm font-bold text-gray-900">{record.date || 'Today'}</p>
        </div>
      </div>

      {/* Employee Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
           <img src={record.employee.avatar} alt={record.employee.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
           <span className={`absolute bottom-1 right-1 w-5 h-5 border-4 border-white rounded-full ${record.status === 'Absent' ? 'bg-red-500' : 'bg-green-500'}`}></span>
        </div>
        <div className="text-center md:text-left flex-1">
           <h1 className="text-2xl font-bold text-gray-900">{record.employee.name}</h1>
           <p className="text-gray-500 text-sm">{record.employee.role} • {record.employee.dept || 'Engineering'}</p>
           <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
              <div className="text-center md:text-left">
                 <p className="text-[10px] text-gray-400 uppercase font-bold">First In</p>
                 <p className="text-sm font-bold text-gray-800">{record.checkIn}</p>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center md:text-left">
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Last Out</p>
                 <p className="text-sm font-bold text-gray-800">{record.checkOut}</p>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center md:text-left">
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Total Hrs</p>
                 <p className="text-sm font-bold text-blue-600">{record.workHours}</p>
              </div>
           </div>
        </div>
        <div>
           <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
             Download Report
           </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
           <h3 className="font-bold text-gray-900 mb-6">Activity Timeline</h3>
           <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              
              {/* Timeline Item 1 */}
              <div className="flex gap-4 relative">
                 <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center border-4 border-white z-10 shrink-0">
                    <span className="material-icons-round text-lg">login</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Checked In</p>
                    <p className="text-xs text-gray-500">Biometric Scan (Main Entrance)</p>
                 </div>
                 <div className="ml-auto text-xs font-bold text-gray-500">{record.checkIn}</div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex gap-4 relative">
                 <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center border-4 border-white z-10 shrink-0">
                    <span className="material-icons-round text-lg">coffee</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Break Started</p>
                    <p className="text-xs text-gray-500">Cafeteria</p>
                 </div>
                 <div className="ml-auto text-xs font-bold text-gray-500">01:00 PM</div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex gap-4 relative">
                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-4 border-white z-10 shrink-0">
                    <span className="material-icons-round text-lg">computer</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Back to Work</p>
                    <p className="text-xs text-gray-500">Active on workstation</p>
                 </div>
                 <div className="ml-auto text-xs font-bold text-gray-500">02:00 PM</div>
              </div>

               {/* Timeline Item 4 */}
              <div className="flex gap-4 relative">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0 ${record.checkOut === '--:--' ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600'}`}>
                    <span className="material-icons-round text-lg">logout</span>
                 </div>
                 <div>
                    <p className={`text-sm font-bold ${record.checkOut === '--:--' ? 'text-gray-400' : 'text-gray-900'}`}>
                       {record.checkOut === '--:--' ? 'Not Checked Out' : 'Checked Out'}
                    </p>
                    <p className="text-xs text-gray-500">Biometric Scan</p>
                 </div>
                 <div className="ml-auto text-xs font-bold text-gray-500">{record.checkOut}</div>
              </div>

           </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-4">Location</h3>
            <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center min-h-[200px] border border-dashed border-gray-300">
               <div className="text-center">
                  <span className="material-icons-round text-4xl text-gray-300">map</span>
                  <p className="text-xs text-gray-500 mt-2">Map view unavailable</p>
                  <p className="text-xs font-bold text-gray-700 mt-1">IP: 192.168.1.45 (Office WiFi)</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;
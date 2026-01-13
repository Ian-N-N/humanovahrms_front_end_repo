import React, { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useNotification } from '../../context/NotificationContext';

const AttendanceDetails = ({ record, onBack }) => {
   const { updateAttendanceRecord } = useAttendance();
   const { showNotification } = useNotification();
   const [isEditing, setIsEditing] = useState(false);
   const [loading, setLoading] = useState(false);
   const [editForm, setEditForm] = useState({
      clock_in: record.checkIn,
      clock_out: record.checkOut === '--:--' ? '' : record.checkOut
   });

   if (!record) return null;

   const handleUpdate = async (e) => {
      e.preventDefault();
      try {
         setLoading(true);
         await updateAttendanceRecord(record.id, {
            clock_in: editForm.clock_in,
            clock_out: editForm.clock_out
         });
         showNotification("Record updated successfully!", 'success');
         setIsEditing(false);
      } catch (err) {
         showNotification("Failed to update record. Please try again.", 'error');
      } finally {
         setLoading(false);
      }
   };

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
            <div className="flex items-center gap-3">
               <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isEditing ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-200'}`}
               >
                  {isEditing ? 'Cancel Edit' : 'Modify Record'}
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Info & Edit */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                     <img src={record.employee.avatar} alt={record.employee.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                     <span className={`absolute bottom-1 right-1 w-5 h-5 border-4 border-white rounded-full ${record.status === 'Absent' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  </div>
                  <div className="text-center md:text-left flex-1">
                     <h1 className="text-2xl font-bold text-gray-900">{record.employee.name}</h1>
                     <p className="text-gray-500 text-sm">{record.employee.role} • {record.employee.dept || 'Engineering'}</p>
                  </div>
               </div>

               {isEditing ? (
                  <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-xl shadow-blue-50/50 animate-fade-in">
                     <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="material-icons-round text-blue-600">edit</span>
                        Correct Record Times
                     </h3>
                     <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-400 uppercase">Clock In Time</label>
                           <input
                              type="text"
                              value={editForm.clock_in}
                              onChange={e => setEditForm(p => ({ ...p, clock_in: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold"
                              placeholder="e.g. 08:30 AM"
                              required
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-400 uppercase">Clock Out Time</label>
                           <input
                              type="text"
                              value={editForm.clock_out}
                              onChange={e => setEditForm(p => ({ ...p, clock_out: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold"
                              placeholder="e.g. 05:30 PM"
                           />
                        </div>
                        <div className="md:col-span-2 pt-4">
                           <button
                              type="submit"
                              disabled={loading}
                              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                           >
                              {loading ? 'Updating...' : 'Save Changes'}
                           </button>
                        </div>
                     </form>
                  </div>
               ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                     <h3 className="font-bold text-gray-900 mb-6">Activity Timeline</h3>
                     {/* Existing Timeline code... */}
                     <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        <div className="flex gap-4 relative">
                           <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center border-4 border-white z-10 shrink-0">
                              <span className="material-icons-round text-lg">login</span>
                           </div>
                           <div>
                              <p className="text-sm font-bold text-gray-900">Checked In</p>
                              <p className="text-xs text-gray-500">Official log entry</p>
                           </div>
                           <div className="ml-auto text-xs font-bold text-gray-500">{record.checkIn}</div>
                        </div>
                        <div className="flex gap-4 relative">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0 ${record.checkOut === '--:--' ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600'}`}>
                              <span className="material-icons-round text-lg">logout</span>
                           </div>
                           <div>
                              <p className={`text-sm font-bold ${record.checkOut === '--:--' ? 'text-gray-400' : 'text-gray-900'}`}>{record.checkOut === '--:--' ? 'Pending Check Out' : 'Checked Out'}</p>
                              <p className="text-xs text-gray-500">Official log entry</p>
                           </div>
                           <div className="ml-auto text-xs font-bold text-gray-500">{record.checkOut}</div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Right: Summary */}
            <div className="space-y-6">
               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Daily Summary</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${record.status === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{record.status}</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 uppercase">Work Hours</span>
                        <span className="text-sm font-bold text-blue-600">{record.workHours}</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 uppercase">Overtime</span>
                        <span className="text-sm font-bold text-gray-700">0h 00m</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AttendanceDetails;
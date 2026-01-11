import httpClient from './httpClient';

const attendanceService = {
    getAll: () => httpClient.get('/attendance'),
    clockIn: (data) => httpClient.post('/attendance/clock-in', data),
    clockOut: () => httpClient.post('/attendance/clock-out'),
    updateRecord: (id, data) => httpClient.put(`/attendance/${id}`, data),
    getPersonalHistory: () => httpClient.get('/attendance/history'), // Keeping this, but context will handle fallback
};

export default attendanceService;

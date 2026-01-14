import httpClient from './httpClient';

const payrollService = {
    getAll: () => httpClient.get('/payroll'),
    getById: (id) => httpClient.get(`/payroll/${id}`),
    runPayroll: (payrollData) => httpClient.post('/payroll', payrollData),
    getCycles: () => httpClient.get('/payroll/cycles'),
    createCycle: (cycleData) => httpClient.post('/payroll/cycles', cycleData),
    getReports: (params) => httpClient.get('/payroll/reports', { params }),
    getPersonalHistory: () => httpClient.get('/payroll/history'),
    deletePayroll: (id) => httpClient.delete(`/payroll/${id}`),
};

export default payrollService;

import httpClient from './httpClient';

const payrollService = {
    getAll: () => httpClient.get('/payroll'),
    getById: (id) => httpClient.get(`/payroll/${id}`),
    runPayroll: (payrollData) => httpClient.post('/payroll', payrollData),
    getCycles: () => httpClient.get('/payroll/cycles'),
    createCycle: (cycleData) => httpClient.post('/payroll/cycles', cycleData),
    getReports: (params) => httpClient.get('/payroll/reports', { params }),
};

export default payrollService;

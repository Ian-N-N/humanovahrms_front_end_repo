import httpClient from './httpClient';

const departmentService = {
    getAll: () => httpClient.get('/departments'),
    getById: (id) => httpClient.get(`/departments/${id}`),
    create: (data) => httpClient.post('/departments', data),
    update: (id, data) => httpClient.put(`/departments/${id}`, data),
    delete: (id) => httpClient.delete(`/departments/${id}`),
};

export default departmentService;

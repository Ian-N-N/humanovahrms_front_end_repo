import httpClient from './httpClient';

const employeeService = {
    getAll: () => httpClient.get('/employees'),
    getById: (id) => httpClient.get(`/employees/${id}`),
    create: (employeeData) => httpClient.post('/employees', employeeData),
    update: (id, employeeData) => httpClient.put(`/employees/${id}`, employeeData),
    deactivate: (id) => httpClient.post(`/employees/${id}/deactivate`),
    activate: (id) => httpClient.post(`/employees/${id}/activate`),
    updatePhoto: (id, photoUrl) => httpClient.patch(`/employees/${id}/photo`, { photo_url: photoUrl }),
};

export default employeeService;

import httpClient from './httpClient';

const leaveService = {
    getAll: () => httpClient.get('/leave'),
    getById: (id) => httpClient.get(`/leave/${id}`),
    request: (leaveData) => httpClient.post('/leave', leaveData),
    approve: (id) => httpClient.put(`/leave/${id}/approve`),
    reject: (id) => httpClient.put(`/leave/${id}/reject`),
};

export default leaveService;

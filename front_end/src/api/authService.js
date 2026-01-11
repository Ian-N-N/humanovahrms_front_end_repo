import httpClient from './httpClient';

const authService = {
    login: (credentials) => httpClient.post('/auth/login', credentials),
    register: (userData) => httpClient.post('/auth/register', userData),
    updateProfile: (data) => httpClient.put('/auth/profile', data),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export default authService;

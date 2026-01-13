import axios from 'axios';

const API_BASE_URL = '/api';

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && token !== 'null' && token !== 'undefined') {
            config.headers.Authorization = `Bearer ${token}`;
            // Detailed log to verify the token being sent
            console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url} | Token: Bearer ${token.substring(0, 10)}...`);
        } else {
            console.warn(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url} | NO TOKEN FOUND`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
httpClient.interceptors.response.use(
    (response) => {
        // DEBUG: Log all headers to find the token
        console.log(`Response from ${response.config.url} Headers:`, response.headers);

        // Sometimes tokens are in headers
        const authHeader = response.headers['authorization'] || response.headers['Authorization'];
        const xAuthToken = response.headers['x-auth-token'];

        let tokenToAttach = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            tokenToAttach = authHeader.substring(7);
        } else if (xAuthToken) {
            tokenToAttach = xAuthToken;
        }

        if (tokenToAttach) {
            // Ensure response.data is an object we can attach to
            if (!response.data || typeof response.data !== 'object') {
                response.data = { _wrapped: response.data };
            }
            if (!response.data.token && !response.data.access_token) {
                response.data.token = tokenToAttach;
                console.log("[HTTP Response] Token extracted from headers and attached to data.");
            }
        }

        return response.data;
    },
    (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        if (status === 401) {
            console.warn(`Unauthorized (401) on ${originalRequest.url}.`);

            // OPTIONAL: Only clear token if it's a critical failure or repeated
            // For now, we stopped auto-clearing to prevent "Ghost Logouts" 
            // caused by background fetches hitting admin-only endpoints.
            // localStorage.removeItem('token'); 
        }
        return Promise.reject(error);
    }
);

export default httpClient;

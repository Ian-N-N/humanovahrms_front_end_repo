import httpClient from './httpClient';

export const activityService = {
    getLogs: () => httpClient.get('/activity-logs')
};

import axiosInstance from './AxiosConfig';

export const getAllRoomByAdminAreaAPI = () => {
    return axiosInstance.get('/api/rooms');
};
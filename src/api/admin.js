import axiosInstance from './AxiosConfig';

export const getAdminInforAPI = () => {
    return axiosInstance.get('/api/admins/adminInfor');
};
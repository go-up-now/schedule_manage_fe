import axiosInstance from './AxiosConfig';

export const getAllSpecializationsAPI = () => {
    return axiosInstance.get('/api/specializations');
};
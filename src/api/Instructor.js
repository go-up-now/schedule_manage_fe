import axiosInstance from './AxiosConfig';

export const getInstructorInforAPI = () => {
    return axiosInstance.get('/api/instructors/instructorInfor');
};
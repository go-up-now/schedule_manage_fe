import axiosInstance from './AxiosConfig';

export const getInstructorInforAPI = () => {
    return axiosInstance.get('/api/instructors/instructorInfor');
};

export const getAllInstructorBySpecializationIdAPI = (specializationId) => {
    return axiosInstance.get('/api/instructors', {
        params: {
            specializationId: specializationId
        }
    });
};
import axiosInstance from "./AxiosConfig";

export const getAllSubject = () => {
  return axiosInstance
    .get(`/api/subjects/getAllSubject`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin sinh viên:", error);
      throw error;
    });
};

export const getAllSubjectBySpecializationIdAPI = (specializationId) => {
  return axiosInstance.get('/api/subjects/getAllSubjectBySpecializationId', {
    params: {
      specializationId: specializationId
    }
  });
};

export const getAllByEducationProgramId = (educationProgramId) => {
  return axiosInstance.get('/api/subjects',
    {
      params: {
        educationProgramId: educationProgramId
      }
    }
  );
};

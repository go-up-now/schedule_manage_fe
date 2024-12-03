import axiosInstance from "./AxiosConfig";

export const getResultStudy = () => {
  return axiosInstance
    .get(`/api/studyResult/learningProgressByStudent`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin sinh viên:", error);
      throw error;
    });
};

export const getAllStudyResult = () => {
  return axiosInstance
    .get(`/api/studyResult`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Không lấy được danh sách các môn đã học:", error);
      throw error;
    });
};

export const getMarkDetail = (clazzId, subjectId) => {
  return axiosInstance
    .get(`/api/studyResult/getMarkDetail`, {
      params: {
        clazzId: clazzId,
        subjectId: subjectId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy bảng điểm chi tiết của sinh viên:", error);
      throw error;
    });
};

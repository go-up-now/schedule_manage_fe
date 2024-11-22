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

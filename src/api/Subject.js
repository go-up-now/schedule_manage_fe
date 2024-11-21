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

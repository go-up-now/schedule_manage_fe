import axiosInstance from "./AxiosConfig";

export const getEvent = () => {
  return axiosInstance
    .get(`/api/events`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin sự kiện:", error);
      throw error;
    });
};

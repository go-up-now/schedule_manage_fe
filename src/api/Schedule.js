import axiosInstance from "./AxiosConfig";

// câph nhật trạng thái lịch dạy của giảng viên
export const cancelSchedule = (scheduleId, request) => {
  return axiosInstance
    .put(`/api/schedules/cancelSchedule`, request, {
      params: {
        scheduleId: scheduleId, // Pass scheduleId as a query param
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Lỗi khi cập nhật trạng thái lịch học cho scheduleId ${scheduleId}:`,
        error
      );
      throw error;
    });
};

// GET NHƯNG NGÀY ĐÃ HUỶ CỦA GIẢNG VIÊN
export const getScheduleStatusFalse = () => {
  return axiosInstance
    .get(`/api/schedules/getscheduleStatusFalse`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin ngày đã huỷ:", error);
      throw error;
    });
};

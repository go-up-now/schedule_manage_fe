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
      return response.data; // Return response data directly
    })
    .catch((error) => {
      console.error(
        `Lỗi khi cập nhật trạng thái lịch học cho scheduleId ${scheduleId}:`,
        error
      );
      throw error;
    });
};

//Lấy lịch học theo id
// Function to get the schedule data by ID
export const getScheduleById = (scheduleId) => {
  return axiosInstance
    .get(`api/schedules/${scheduleId}`) // Make sure this is the correct endpoint
    .then((response) => {
      return response.data; // Assuming the response structure is correct
    })
    .catch((error) => {
      console.error(
        `Error fetching value for scheduleId ${scheduleId}:`,
        error // Log the error for debugging
      );
      throw error; // Throw the error to be handled by the caller
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

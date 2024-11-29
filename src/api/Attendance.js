import axiosInstance from "./AxiosConfig";

export const markAttendance = (attendanceList) => {
  return axiosInstance
    .post(`/api/attendances/attended`, attendanceList)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi đánh dấu điểm danh:", error);
      throw error;
    });
};

export const getAttendanceByClazzId = (clazzId, scheduleId) => {
  return axiosInstance
    .get(`/api/attendances/attendedByClazzId`, {
      params: {
        clazzId: clazzId, // Pass startDate as a query param
        scheduleId: scheduleId, // Pass endDate as a query param
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Lỗi khi lấy thông tin danh sách điểm danh ${clazzId} của giảng viên:`,
        error
      );
      throw error;
    });
};

// Hàm để cập nhật điểm danh
export const updateAttendance = (attendanceList) => {
  return axiosInstance
    .put("/api/attendances/putAttended", attendanceList)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật điểm danh:", error);
      throw error;
    });
};

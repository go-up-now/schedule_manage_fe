import axiosInstance from "./AxiosConfig";

export const getAllExamSchedule = () => {
  return axiosInstance
    .get(`/api/examschedules`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin lịch thi:", error);
      throw error;
    });
};

export const getAllExambyBlockSemesterYearMajorID = (
  block,
  semester,
  year,
  specializationId
) => {
  return axiosInstance
    .get("/api/examschedules/admin/sort", {
      params: {
        block: block,
        semester: semester,
        year: year,
        specializationId: specializationId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching exam schedules:", error);
      throw error;
    });
};

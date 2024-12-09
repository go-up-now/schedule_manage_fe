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

export const getAllExambyBlockSemesterYearSpecialization = (
  block,
  semester,
  year,
  specializationId
) => {
  return axiosInstance
    .get(`/api/examschedules/admin/sort`, {
      params: {
        block: block,
        semester: semester,
        year: year,
        specializationId: specializationId,
      },
    })
    .then((response) => {
      return response.data; // Return response data directly
    })
    .catch((error) => {
      console.error(`Lỗi khi lấy ds sách lịch học:`, error);
      throw error;
    });
};

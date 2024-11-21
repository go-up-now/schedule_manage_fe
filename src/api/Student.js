import axiosInstance from "./AxiosConfig";

export const getStudentInfo = () => {
  return axiosInstance.get(`/api/students/studentInfor`)
};

export const updateStudentByStudent = (studentData, file) => {
  const formData = new FormData();
  formData.append("request", JSON.stringify(studentData)); // Append student data (as JSON)

  if (file) {
    formData.append("file", file); // Append file (avatar) if it exists
  } else {
    // Fallback if no file is selected (you can customize this)
    formData.append("file", "1.png_20241028103613.jpg");
  }

  return axiosInstance
    .put("/api/students/updateStudentByStudent", formData)
    .then((response) => {
      return response.data; // Return the updated student data
    })
    .catch((error) => {
      console.error("Error updating student info:", error);
      throw error; // Throw error to be caught in the handleSubmit function
    });
};

export const getAllStudentbyCourseAndMajor = (course, majorId) => {
  return axiosInstance
    .get(`/api/students/getAllStudentByCourseAndMajor`, {
      params: {
        course: course,
        majorId: majorId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin lịch dạy của giảng viên:", error);
      throw error;
    });
};

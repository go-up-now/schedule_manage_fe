import axiosInstance from './AxiosConfig'; 

export const getStudentInfo = () => {
  return axiosInstance.get(`/api/students/studentInfor`) 
    // .then(response => {
    //   return response.data; 
    // })
    // .catch(error => {
    //   console.error("Lỗi khi lấy thông tin sinh viên:", error);
    //   throw error; 
    // });
};

export const updateStudentByStudent = (studentData, file) => {
  const formData = new FormData();
  formData.append('request', JSON.stringify(studentData)); 
  if (file) {
    formData.append('file', file);
  } else {
    formData.append('file', '1.png_20241028103613.jpg');
  }

  return axiosInstance.put(`/api/students/updateStudentByStudent`, formData)
    .then(response => {
      return response.data; 
    })
    .catch(error => {
      console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
      throw error; 
    });
};




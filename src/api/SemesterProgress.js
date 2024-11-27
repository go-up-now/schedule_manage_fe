import axiosInstance from "./AxiosConfig";
export const getAllSemesterProgressByAdmin = () => {
    return axiosInstance
        .get(`/api/semesterprogresses/getAllSP`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Không lấy được danh sách Semester Progress:", error);
            throw error;
        });
};
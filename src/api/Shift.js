import axiosInstance from "./AxiosConfig"; // Adjust the import path as necessary

export const getAllShiftAvailableAPI = (clazzId, date) => {
  return axiosInstance
    .get("/api/shifts/getAllShiftAvailable", {
      params: {
        clazzId: clazzId,
        date: date,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch all ShiftAvailable:", error);
      throw error;
    });
};

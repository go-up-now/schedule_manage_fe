import axiosInstance from "./AxiosConfig";

export const getAllRoomByAdminAreaAPI = () => {
  return axiosInstance.get("/api/rooms");
};

export const getAllRoomAvailableAPI = (buildingId, date) => {
  return axiosInstance
    .get("/api/rooms/getAllRoomAvailable", {
      params: {
        buildingId: buildingId,
        date: date,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch all RoomAvailable:", error);
      throw error;
    });
};

import axiosInstance from "./AxiosConfig";

export const registerClass = async (clazzId) => {
  try {
    const response = await axiosInstance.post("/api/studyins/register", null, {
      params: {
        clazzId: clazzId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering class:", error);
    throw error;
  }
};

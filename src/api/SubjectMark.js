import axiosInstance from "./AxiosConfig";

export const getSubjectMarkBySubjectIdAPI = (subjectId) => {
    return axiosInstance.get("/api/subjectmarks/subject", {
        params: {
            subjectId: subjectId,
        }
    });
};
import axiosInstance from "./axiosInstance";

export const getBanner = () => axiosInstance.get('/banner');
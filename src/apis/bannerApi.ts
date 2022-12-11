import axiosInstance from "./axiosInstance";

export const getBanner = () => axiosInstance.get('/banner');
export const postBanner = (payload: any) => axiosInstance.post('/admin/banner',payload);
export const deleteBanner = (payload: any) => axiosInstance.delete('/admin/banner',payload);
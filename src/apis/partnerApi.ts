import axiosInstance from './axiosInstance';

export const getPartners = () => axiosInstance.get('/partner');
export const postPartners = (payload: any) => axiosInstance.post('/admin/partner',payload);

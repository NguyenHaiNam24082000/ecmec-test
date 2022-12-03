import axiosInstance from './axiosInstance';

export const getService = () => axiosInstance.get('/service');
export const getServiceDetail = (id: string) => axiosInstance.get('/service' + id);

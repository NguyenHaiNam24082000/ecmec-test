import axiosInstance from './axiosInstance';

export const getService = () => axiosInstance.get('/service');

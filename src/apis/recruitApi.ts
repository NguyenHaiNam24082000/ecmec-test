import axiosInstance from './axiosInstance';

export const getRecruit = () => axiosInstance.get('/recruitment');

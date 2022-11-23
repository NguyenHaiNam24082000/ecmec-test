import axiosInstance from './axiosInstance';

export const getPartners = () => axiosInstance.get('/partner');

import axiosInstance from './axiosInstance';

export const getAbout = () => axiosInstance.get('/about');

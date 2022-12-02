import axiosInstance from './axiosInstance';

export const getIntroduction = () => axiosInstance.get('/introduction');
export const getIntroductionDetail = (id: string) => axiosInstance.get('/introduction/' + id);

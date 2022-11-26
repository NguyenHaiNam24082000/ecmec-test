import axiosInstance from './axiosInstance';

export const getRecruit = () => axiosInstance.get('/recruitment-posts');
export const getRecruitDetail = (id: string) => axiosInstance.get('/recruitment-posts/' + id);

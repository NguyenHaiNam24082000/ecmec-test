import axiosInstance from './axiosInstance';

export const getProjects = () => axiosInstance.get('/projects');

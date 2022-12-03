import axiosInstance from './axiosInstance';

export const getProjects = () => axiosInstance.get('/projects');
export const getProjectDetail = (id: string) => axiosInstance.get('/projects/' + id);

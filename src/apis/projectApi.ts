import axiosInstance from './axiosInstance';

export const getProjects = () => axiosInstance.get('/project');
export const getProjectDetail = (id: string) => axiosInstance.get('/project/' + id);

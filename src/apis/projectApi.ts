import axiosInstance from './axiosInstance';

export const getProjects = () => axiosInstance.get('/project');
export const getProjectDetail = (id: string) => axiosInstance.get('/project/' + id);
export const postProjects = (payload: any) => axiosInstance.post('/admin/project',payload);
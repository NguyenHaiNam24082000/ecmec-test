import axiosInstance from './axiosInstance';

export const getProjects = () => axiosInstance.get('/api/project');
export const getProjectDetail = (id: string) => axiosInstance.get('/project/' + id);
export const postProjectDetail = (payload: any) =>
  axiosInstance.post('/admin/project', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteProjectDetail = (id: number) => axiosInstance.delete(`/admin/project?id=${id}`);

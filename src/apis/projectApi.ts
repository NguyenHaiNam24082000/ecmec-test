import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');

export const getProjects = () => axiosInstance.get('/api/project');
export const getProjectDetail = (id: string) => axiosInstance.get('/project/' + id);
export const postProjectDetail = (payload: any) =>
  axiosInstance.post('/admin/project', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const putProjectDetail = (payload: any) =>
  axiosInstance.put('/admin/project', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const deleteProjectDetail = (id: number) =>
  axiosInstance.delete(`/admin/project?id=${id}`, undefined, {
    headers: { Authorization: `Basic ${token}` },
  });

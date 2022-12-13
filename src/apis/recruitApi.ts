import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');

export const getRecruit = () => axiosInstance.get('/api/recruitment-posts');
export const getRecruitDetail = (id: string) => axiosInstance.get('/api/recruitment-posts/' + id);

export const postRecruitDetail = (payload: any) =>
  axiosInstance.post('/admin/recruitments', payload, {
    headers: { Authorization: `Basic ${token}` },
  });

export const putRecruitDetail = (payload: any) =>
  axiosInstance.put('/admin/recruitments', payload, {
    headers: { Authorization: `Basic ${token}` },
  });

export const deleteRecruitDetail = (id: number) =>
  axiosInstance.delete(`/admin/recruitments?id=${id}`, undefined, {
    headers: { Authorization: `Basic ${token}` },
  });

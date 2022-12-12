import axiosInstance from './axiosInstance';

export const getRecruit = () => axiosInstance.get('/api/recruitment-posts');
export const getRecruitDetail = (id: string) => axiosInstance.get('/api/recruitment-posts/' + id);

export const postRecruitDetail = (payload: any) =>
  axiosInstance.post('/admin/recruitments', payload);

export const putRecruitDetail = (payload: any) => axiosInstance.put('/admin/recruitments', payload);

export const deleteRecruitDetail = (id: number) =>
  axiosInstance.delete(`/admin/recruitments?id=${id}`);

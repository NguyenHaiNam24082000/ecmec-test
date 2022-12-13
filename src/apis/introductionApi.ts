import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');

export const getIntroduction = () => axiosInstance.get('/api/introduction');

export const getIntroductionDetail = (id: string) => axiosInstance.get('/api/introduction/' + id);

export const postIntroductionDetail = (payload: any) =>
  axiosInstance.post('/admin/introductions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const putIntroductionDetail = (payload: any) =>
  axiosInstance.put('/admin/introductions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const deleteIntroductionDetail = (id: number) =>
  axiosInstance.delete(`/admin/introductions?id=${id}`, undefined, {
    headers: { Authorization: `Basic ${token}` },
  });

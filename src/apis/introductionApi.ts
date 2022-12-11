import axiosInstance from './axiosInstance';

export const getIntroduction = () => axiosInstance.get('/api/introduction');

export const getIntroductionDetail = (id: string) => axiosInstance.get('/api/introduction/' + id);

export const postIntroductionDetail = (payload: any) =>
  axiosInstance.post('/admin/introductions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const putIntroductionDetail = (payload: any) =>
  axiosInstance.put('/admin/introductions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteIntroductionDetail = (id: number) =>
  axiosInstance.delete(`/admin/introductions?id=${id}`);

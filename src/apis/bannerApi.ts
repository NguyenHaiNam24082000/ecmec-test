import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');

export const getBanner = () => axiosInstance.get('/api/banner');
export const postBanner = (payload: any) =>
  axiosInstance.post('/admin/banner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });
export const putBanner = (payload: any) =>
  axiosInstance.put('/admin/banner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });
export const deleteBanner = (id: number) =>
  axiosInstance.delete(`/admin/banner?id=${id}`, undefined, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

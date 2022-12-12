import axiosInstance from './axiosInstance';

export const getBanner = () => axiosInstance.get('/api/banner');
export const postBanner = (payload: any) =>
  axiosInstance.post('/admin/banner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const putBanner = (payload: any) =>
  axiosInstance.put('/admin/banner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteBanner = (id: number) => axiosInstance.delete(`/admin/banner?id=${id}`);

import axiosInstance from './axiosInstance';

export const getService = () => axiosInstance.get('/api/service');
export const getServiceDetail = (id: string) => axiosInstance.get('/service' + id);
export const postServiceDetail = (payload: any) =>
  axiosInstance.post('/admin/service', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const putServiceDetail = (payload: any) => axiosInstance.put('/admin/service', payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const deleteServiceDetail = (id: number) =>
  axiosInstance.delete(`/admin/service?id=${id}`);

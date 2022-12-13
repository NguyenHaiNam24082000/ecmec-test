import axiosInstance from './axiosInstance';

export const getService = () => axiosInstance.get('/api/service');
export const getServiceDetail = (id: string) => axiosInstance.get('/service' + id);
export const postServiceDetail = (payload: any) =>
  axiosInstance.post('/admin/service', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

const token = localStorage.getItem('token');

export const putServiceDetail = (payload: any) =>
  axiosInstance.put('/admin/service', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const deleteServiceDetail = (id: number) =>
  axiosInstance.delete(`/admin/service?id=${id}`, undefined, {
    headers: { Authorization: `Basic ${token}` },
  });

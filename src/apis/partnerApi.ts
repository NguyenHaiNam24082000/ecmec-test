import axiosInstance from './axiosInstance';

export const getPartners = () => axiosInstance.get('/api/partner');

const token = localStorage.getItem('token');

export const postPartner = (payload: any) =>
  axiosInstance.post('/admin/partner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const putPartner = (payload: any) =>
  axiosInstance.put('/admin/partner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${token}`,
    },
  });

export const deletePartner = (id: number) => axiosInstance.delete(`/admin/partner?id=${id}`, undefined, {headers:{Authorization: `Basic ${token}`,}});

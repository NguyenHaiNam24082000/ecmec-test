import axiosInstance from './axiosInstance';

export const getPartners = () => axiosInstance.get('/api/partner');

export const postPartner = (payload: any) =>
  axiosInstance.post('/admin/partner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const putPartner = (payload: any) =>
  axiosInstance.put('/admin/partner', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deletePartner = (id: number) => axiosInstance.delete(`/admin/partner?id=${id}`);

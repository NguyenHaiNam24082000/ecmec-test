import axiosInstance from './axiosInstance';

export const getIntroduction = () => axiosInstance.get('/api/introduction');
export const getIntroductionDetail = (id: string) => axiosInstance.get('/introduction/' + id);
export const postIntroductionDetail = (payload: any) => axiosInstance.post('/admin/introductions',payload,{headers: {
    'Content-Type': 'multipart/form-data'
  }});
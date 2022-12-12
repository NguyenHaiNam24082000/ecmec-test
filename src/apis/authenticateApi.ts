import axiosInstance from './axiosInstance';

export const loginApi = (payload: { username: string; password: string }) =>
  axiosInstance.post('/api/authenticate', payload);

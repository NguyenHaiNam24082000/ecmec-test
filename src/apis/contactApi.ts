import axiosInstance from './axiosInstance';

export const getContacts = () => axiosInstance.get('/contacts');

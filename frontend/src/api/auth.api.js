import axiosClient from './axiosClient';

export const loginRequest = async (email, password) => {
  const { data } = await axiosClient.post('/auth/login', { email, password });
  return data; // { success, token, admin }
};

export const getMeRequest = async () => {
  const { data } = await axiosClient.get('/auth/me');
  return data;
};
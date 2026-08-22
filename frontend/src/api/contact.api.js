import axiosClient from './axiosClient';

export const sendContactMessage = async (payload) => {
  const { data } = await axiosClient.post('/contact', payload);
  return data;
};

export const getMessages = async () => {
  const { data } = await axiosClient.get('/contact');
  return data;
};

export const markMessageAsRead = async (id) => {
  const { data } = await axiosClient.patch(`/contact/${id}/read`);
  return data;
};
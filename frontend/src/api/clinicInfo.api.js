import axiosClient from './axiosClient';

export const getClinicInfo = async () => {
  const { data } = await axiosClient.get('/clinic-info');
  return data;
};

export const updateClinicInfo = async (payload) => {
  const { data } = await axiosClient.put('/clinic-info', payload);
  return data;
};
// import axiosClient from './axiosClient';

// export const getWorkingHours = async () => {
//   const { data } = await axiosClient.get('/working-hours');
//   return data;
// };

// export const updateWorkingHours = async (dayOfWeek, payload) => {
//   const { data } = await axiosClient.put(`/working-hours/${dayOfWeek}`, payload);
//   return data;
// };


import axiosClient from './axiosClient';

export const getWorkingHours = async () => {
  const { data } = await axiosClient.get('/working-hours');
  return data; // { success, data: [{ dayOfWeek, isOpen, openTime, closeTime }, ...] }
};

export const updateWorkingHours = async (dayOfWeek, payload) => {
  const { data } = await axiosClient.put(`/working-hours/${dayOfWeek}`, payload);
  return data;
};
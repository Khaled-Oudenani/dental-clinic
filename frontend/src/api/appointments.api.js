import axiosClient from './axiosClient';

export const getAppointments = async (params = {}) => {
  const { data } = await axiosClient.get('/appointments', { params });
  return data; // { success, count, data }
};

export const getAvailableSlots = async (date, serviceId) => {
  const { data } = await axiosClient.get('/appointments/available-slots', {
    params: { date, serviceId },
  });
  return data;
};

export const createAppointment = async (payload) => {
  const { data } = await axiosClient.post('/appointments', payload);
  return data;
};

export const updateAppointmentStatus = async (id, status) => {
  const { data } = await axiosClient.patch(`/appointments/${id}/status`, { status });
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axiosClient.delete(`/appointments/${id}`);
  return data;
};
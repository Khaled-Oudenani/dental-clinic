import axiosClient from './axiosClient';

export const getServices = async (includeInactive = false) => {
  const { data } = await axiosClient.get('/services', {
    params: includeInactive ? { includeInactive: true } : undefined,
  });
  return data;
};

export const createService = async (payload) => {
  const { data } = await axiosClient.post('/services', payload);
  return data;
};

export const updateService = async (id, payload) => {
  const { data } = await axiosClient.put(`/services/${id}`, payload);
  return data;
};

export const deleteService = async (id) => {
  const { data } = await axiosClient.delete(`/services/${id}`);
  return data;
};

export const uploadServiceImage = async (formData) => {
  const { data } = await axiosClient.post('/services/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

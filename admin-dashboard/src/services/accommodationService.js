import api from './api';

export const accommodationService = {
  getAll: () => api.get('/accommodations'),
  getById: (id) => api.get(`/accommodations/${id}`),
  create: (data) => api.post('/accommodations', data),
  update: (id, data) => api.put(`/accommodations/${id}`, data),
  delete: (id) => api.delete(`/accommodations/${id}`),
  search: (query) => api.get(`/accommodations/search?q=${query}`),
  getByType: (type) => api.get(`/accommodations/type/${type}`),
  getFeatured: () => api.get('/accommodations/featured')
};
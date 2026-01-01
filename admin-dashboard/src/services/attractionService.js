import api from './api';

export const attractionService = {
  getAll: () => api.get('/attractions'),
  getById: (id) => api.get(`/attractions/${id}`),
  create: (data) => api.post('/attractions', data),
  update: (id, data) => api.put(`/attractions/${id}`, data),
  delete: (id) => api.delete(`/attractions/${id}`),
  search: (query) => api.get(`/attractions/search?q=${query}`),
  getByCategory: (category) => api.get(`/attractions/category/${category}`),
  getFeatured: () => api.get('/attractions/featured')
};
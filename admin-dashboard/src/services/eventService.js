import api from './api';

export const eventService = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  search: (query) => api.get(`/events/search?q=${query}`),
  filterByDate: (params) => api.get('/events/filter/by-date', { params }),
  getFeatured: () => api.get('/events/featured')
};  
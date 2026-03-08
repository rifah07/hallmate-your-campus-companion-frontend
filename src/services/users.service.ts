import api from '@/lib/api';
import type { QueryParams, CreateUserInput, UpdateUserInput } from '@/types';

export const usersService = {
  getAll: (params?: QueryParams) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: CreateUserInput) => api.post('/users', data),
  update: (id: string, data: UpdateUserInput) => api.patch(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  bulkUpload: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post('/users/bulk-upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  downloadTemplate: () => api.get('/users/template/download', { responseType: 'blob' }),
  statistics: () => api.get('/users/statistics'),
};

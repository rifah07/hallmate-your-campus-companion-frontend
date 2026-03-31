import api from '@/lib/api';
import type { QueryParams, CreateRoomInput, UpdateRoomInput, AssignInput, TransferInput } from '@/types';

export const roomsService = {
  // Collection
  getAll: (params?: QueryParams) => api.get('/rooms', { params }),
  create: (data: CreateRoomInput) => api.post('/rooms', data),

  // Single room
  getById: (id: string) => api.get(`/rooms/${id}`),
  update: (id: string, data: UpdateRoomInput) => api.patch(`/rooms/${id}`, data),
  delete: (id: string) => api.delete(`/rooms/${id}`),

  // Vacancy
  getVacant: () => api.get('/rooms/vacant'),
  getVacantByFloor: (floor: number) => api.get(`/rooms/vacant/floor/${floor}`),

  // Filters
  getByFloor: (floor: number) => api.get(`/rooms/floor/${floor}`),
  getByType: (type: string) => api.get(`/rooms/type/${type}`),
  getMyFloor: () => api.get('/rooms/my-floor'),

  // Assignments
  assignStudent: (roomId: string, data: AssignInput) => api.post(`/rooms/${roomId}/assign`, data),
  unassignStudent: (roomId: string, userId: string) => api.delete(`/rooms/${roomId}/unassign/${userId}`),
  transferStudent: (roomId: string, data: TransferInput) => api.post(`/rooms/${roomId}/transfer`, data),

  // Statistics
  statistics: () => api.get('/rooms/statistics'),
};

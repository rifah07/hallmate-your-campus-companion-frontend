import api from '@/lib/api';
import type { QueryParams, CreateRoomInput, UpdateRoomInput, AssignInput, TransferInput } from '@/types';

export const roomsService = {
  getAll: (params?: QueryParams) => api.get('/rooms', { params }),
  getById: (id: string) => api.get(`/rooms/${id}`),
  getVacant: (floor?: number) => api.get('/rooms/vacant', { params: { floor } }),
  getMyFloor: () => api.get('/rooms/my-floor'),
  create: (data: CreateRoomInput) => api.post('/rooms', data),
  update: (id: string, data: UpdateRoomInput) => api.patch(`/rooms/${id}`, data),
  delete: (id: string) => api.delete(`/rooms/${id}`),
  assignStudent: (id: string, data: AssignInput) => api.post(`/rooms/${id}/assign`, data),
  unassignStudent: (roomId: string, userId: string) => api.delete(`/rooms/${roomId}/unassign/${userId}`),
  transferStudent: (id: string, data: TransferInput) => api.post(`/rooms/${id}/transfer`, data),
  statistics: () => api.get('/rooms/statistics'),
};

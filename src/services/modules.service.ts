import api from '@/lib/api';
import type { QueryParams } from '@/types';

export const applicationsService = {
  getAll: (params?: QueryParams) => api.get('/applications', { params }),
  getById: (id: string) => api.get(`/applications/${id}`),
  getMy: () => api.get('/applications/my'),
  create: (data: any) => api.post('/applications', data),
  approve: (id: string, notes?: string) => api.patch(`/applications/${id}/approve`, { notes }),
  reject: (id: string, notes?: string) => api.patch(`/applications/${id}/reject`, { notes }),
  statistics: () => api.get('/applications/statistics'),
};

export const complaintsService = {
  getAll: (params?: QueryParams) => api.get('/complaints', { params }),
  getById: (id: string) => api.get(`/complaints/${id}`),
  getMy: () => api.get('/complaints/my'),
  create: (data: any) => api.post('/complaints', data),
  update: (id: string, data: any) => api.patch(`/complaints/${id}`, data),
  addComment: (id: string, data: any) => api.post(`/complaints/${id}/comments`, data),
  assign: (id: string, assignedTo: string) => api.patch(`/complaints/${id}/assign`, { assignedTo }),
  statistics: () => api.get('/complaints/statistics'),
};

export const maintenanceService = {
  getAll: (params?: QueryParams) => api.get('/maintenance', { params }),
  getById: (id: string) => api.get(`/maintenance/${id}`),
  getMy: () => api.get('/maintenance/my'),
  create: (data: any) => api.post('/maintenance', data),
  update: (id: string, data: any) => api.patch(`/maintenance/${id}`, data),
  assign: (id: string, assignedTo: string) => api.patch(`/maintenance/${id}/assign`, { assignedTo }),
  complete: (id: string, notes: string) => api.patch(`/maintenance/${id}/complete`, { notes }),
  statistics: () => api.get('/maintenance/statistics'),
};

export const noticesService = {
  getAll: (params?: QueryParams) => api.get('/notices', { params }),
  getById: (id: string) => api.get(`/notices/${id}`),
  create: (data: any) => api.post('/notices', data),
  update: (id: string, data: any) => api.patch(`/notices/${id}`, data),
  delete: (id: string) => api.delete(`/notices/${id}`),
  pin: (id: string) => api.patch(`/notices/${id}/pin`),
  unpin: (id: string) => api.patch(`/notices/${id}/unpin`),
};

export const mealsService = {
  getMenu: (date?: string) => api.get('/meals/menu', { params: { date } }),
  updateMenu: (data: any) => api.post('/meals/menu', data),
  getGuestMeals: (params?: QueryParams) => api.get('/meals/guest', { params }),
  bookGuestMeal: (data: any) => api.post('/meals/guest', data),
  getFeedback: (params?: QueryParams) => api.get('/meals/feedback', { params }),
  submitFeedback: (data: any) => api.post('/meals/feedback', data),
  getAttendance: (date?: string) => api.get('/meals/attendance', { params: { date } }),
  markAttendance: (data: any) => api.post('/meals/attendance', data),
  statistics: () => api.get('/meals/statistics'),
};

export const visitorsService = {
  getAll: (params?: QueryParams) => api.get('/visitors', { params }),
  getById: (id: string) => api.get(`/visitors/${id}`),
  register: (data: any) => api.post('/visitors', data),
  checkout: (id: string) => api.patch(`/visitors/${id}/checkout`),
  getMy: () => api.get('/visitors/my'),
  statistics: () => api.get('/visitors/statistics'),
};

export const attendanceService = {
  getAll: (params?: QueryParams) => api.get('/attendance', { params }),
  mark: (data: any) => api.post('/attendance/mark', data),
  getMy: () => api.get('/attendance/my'),
  getLeaves: (params?: QueryParams) => api.get('/attendance/leaves', { params }),
  applyLeave: (data: any) => api.post('/attendance/leave', data),
  approveLeave: (id: string, notes?: string) => api.patch(`/attendance/leave/${id}/approve`, { notes }),
  rejectLeave: (id: string, notes?: string) => api.patch(`/attendance/leave/${id}/reject`, { notes }),
  reports: (params?: QueryParams) => api.get('/attendance/reports', { params }),
};

export const feesService = {
  getAll: (params?: QueryParams) => api.get('/fees', { params }),
  getStructure: () => api.get('/fees/structure'),
  createFee: (data: any) => api.post('/fees/structure', data),
  generateBills: (data: any) => api.post('/fees/generate', data),
  getBills: (params?: QueryParams) => api.get('/fees/bills', { params }),
  makePayment: (billId: string, data: any) => api.post(`/fees/bills/${billId}/pay`, data),
  approvePayment: (billId: string) => api.patch(`/fees/bills/${billId}/approve`),
  getHistory: (params?: QueryParams) => api.get('/fees/history', { params }),
  statistics: () => api.get('/fees/statistics'),
};

export const eventsService = {
  getAll: (params?: QueryParams) => api.get('/events', { params }),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
  update: (id: string, data: any) => api.patch(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  register: (id: string) => api.post(`/events/${id}/register`),
  getRegistrations: (id: string) => api.get(`/events/${id}/registrations`),
  getMy: () => api.get('/events/my'),
  statistics: () => api.get('/events/statistics'),
};

export const reportsService = {
  generate: (type: string, params: any) => api.post('/reports/generate', { type, ...params }),
  getOccupancy: (params?: any) => api.get('/reports/occupancy', { params }),
  getFinancial: (params?: any) => api.get('/reports/financial', { params }),
  getScheduled: () => api.get('/reports/scheduled'),
  createSchedule: (data: any) => api.post('/reports/scheduled', data),
  deleteSchedule: (id: string) => api.delete(`/reports/scheduled/${id}`),
};

export const settingsService = {
  getGeneral: () => api.get('/settings/general'),
  updateGeneral: (data: any) => api.patch('/settings/general', data),
  getEmail: () => api.get('/settings/email'),
  updateEmail: (data: any) => api.patch('/settings/email', data),
  getSecurity: () => api.get('/settings/security'),
  updateSecurity: (data: any) => api.patch('/settings/security', data),
  getAuditLogs: (params?: QueryParams) => api.get('/settings/audit', { params }),
  getRoles: () => api.get('/settings/roles'),
  updateRolePermissions: (role: string, permissions: any) => api.patch(`/settings/roles/${role}`, { permissions }),
  createBackup: () => api.post('/settings/backup'),
  getBackups: () => api.get('/settings/backups'),
};

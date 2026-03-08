import api from '@/lib/api';

export const publicService = {
  submitApplication: (data: any) => api.post('/public/applications', data),
  trackApplication: (applicationId: string) => api.get(`/public/applications/track/${applicationId}`),
  getPublicNotices: (params?: any) => api.get('/public/notices', { params }),
  submitContactForm: (data: any) => api.post('/public/contact', data),
  getHallInfo: () => api.get('/public/hall-info'),
  getFacilities: () => api.get('/public/facilities'),
  getFAQ: () => api.get('/public/faq'),
  getGallery: (category?: string) => api.get('/public/gallery', { params: { category } }),
};

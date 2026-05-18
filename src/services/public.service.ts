import api from '@/lib/api';
import type {
  HallInfo, AboutPageData, ContactSubmissionBody, PublicApplicationBody,
} from '@/types/public';

// Standard backend envelope: { success, message, data }
interface ApiEnvelope<T> { success: boolean; message?: string; data: T }

export const publicService = {
  // ── Hall / About ────────────────────────────────────────────────
  getHallInfo: () =>
    api.get<ApiEnvelope<HallInfo>>('/public/hall-info').then(r => r.data.data),

  getAbout: () =>
    api.get<ApiEnvelope<AboutPageData>>('/public/about').then(r => r.data.data),

  // ── Notices / Contact / Applications (existing) ────────────────
  getPublicNotices: (params?: { page?: number; limit?: number; category?: string; priority?: string; search?: string }) =>
    api.get('/public/notices', { params }),
  submitContactForm: (data: ContactSubmissionBody) => api.post('/public/contact', data),
  submitApplication: (data: PublicApplicationBody) => api.post('/public/applications', data),
  trackApplication: (applicationId: string) => api.get(`/public/applications/track/${applicationId}`),

  // ── Misc public reads ───────────────────────────────────────────
  getFacilities: () => api.get('/public/facilities'),
  getFAQ: () => api.get('/public/faq'),
  getGallery: (category?: string) => api.get('/public/gallery', { params: { category } }),
};

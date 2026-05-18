import api from '@/lib/api';
import type {
  HallInfo, AboutPageData, ContactSubmissionBody, PublicApplicationBody,
  ProvostUser, ProvostHistory, CreateProvostHistoryBody,
  PublicHouseTutor, PublicStaffProfile, StaffCategory,
  Facility, FacilityCategory, DiningInfo, PublicPaginationMeta,
} from '@/types/public';

// Paginated envelope variant (some endpoints emit { success, data, meta })
interface PaginatedEnvelope<T> { success: boolean; data: T[]; meta: PublicPaginationMeta }

// Standard backend envelope: { success, message, data }
interface ApiEnvelope<T> { success: boolean; message?: string; data: T }

// Build multipart FormData from a partial provost body (skips undefined).
const toProvostFormData = (body: Partial<CreateProvostHistoryBody>): FormData => {
  const fd = new FormData();
  Object.entries(body).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (v instanceof File) fd.append(k, v);
    else fd.append(k, String(v));
  });
  return fd;
};

export const publicService = {
  // ── Hall / About ────────────────────────────────────────────────
  getHallInfo: () =>
    api.get<ApiEnvelope<HallInfo>>('/public/hall-info').then(r => r.data.data),

  getAbout: () =>
    api.get<ApiEnvelope<AboutPageData>>('/public/about').then(r => r.data.data),

  // ── Provost (current + history) ────────────────────────────────
  getCurrentProvost: () =>
    api.get<ApiEnvelope<ProvostUser>>('/public/provost').then(r => r.data.data),

  getProvosts: () =>
    api.get<ApiEnvelope<ProvostHistory[]>>('/public/provosts').then(r => r.data.data),

  createProvost: (body: CreateProvostHistoryBody) =>
    api.post<ApiEnvelope<ProvostHistory>>('/public/provosts', toProvostFormData(body), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data.data),

  updateProvost: (id: string, body: Partial<CreateProvostHistoryBody>) =>
    api.patch<ApiEnvelope<ProvostHistory>>(`/public/provosts/${id}`, toProvostFormData(body), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data.data),

  deleteProvost: (id: string) =>
    api.delete<ApiEnvelope<null>>(`/public/provosts/${id}`).then(r => r.data),

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

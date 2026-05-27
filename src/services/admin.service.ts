/**
 * Admin module API client.
 *
 * All mutations use multipart/form-data so binary `image` fields can ride
 * along with text fields (backend expects FormData and uploads to Cloudinary).
 *
 * Reads (GET list / GET by id) are served by publicService — this file only
 * contains admin-only mutations (POST / PATCH / DELETE).
 */

import api from '@/lib/api';
import type { FacilityCategory } from '@/types/public';

// Standard backend envelope: { success, message, data }
interface ApiEnvelope<T> { success: boolean; message?: string; data: T }

// ── Body types (mirror swagger Admin*Body schemas) ──────────────────
export interface AdminHallInfoBody {
  name: string;
  established: number;
  location: string;
  description: string;
  vision?: string;
  mission?: string;
  capacity: number;
  totalRooms: number;
  mapEmbedUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  /** JSON string e.g. '{"facebook":"https://..."}' */
  socialLinks?: string;
  isActive?: boolean;
  image?: File;
}

export interface AdminFacilityBody {
  name: string;
  slug: string;
  category: FacilityCategory;
  description: string;
  isActive?: boolean;
  sortOrder?: number;
  image?: File;
}

// Generic FormData builder: skips undefined/null, appends Files as-is,
// stringifies everything else (booleans → "true"/"false", numbers → "123").
const toFormData = <T extends object>(body: T): FormData => {
  const fd = new FormData();
  Object.entries(body as Record<string, unknown>).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (v instanceof File || v instanceof Blob) fd.append(k, v);
    else fd.append(k, String(v));
  });
  return fd;
};

export const adminService = {
  // ── Hall Info (SUPER_ADMIN only) ──────────────────────────────────
  createHallInfo: (body: AdminHallInfoBody) =>
    api
      .post<ApiEnvelope<unknown>>('/admin/hall-info', toFormData(body))
      .then(r => r.data.data),

  updateHallInfo: (id: string, body: Partial<AdminHallInfoBody>) =>
    api
      .patch<ApiEnvelope<unknown>>(`/admin/hall-info/${id}`, toFormData(body))
      .then(r => r.data.data),

  deleteHallInfo: (id: string) =>
    api.delete<ApiEnvelope<unknown>>(`/admin/hall-info/${id}`).then(r => r.data),

  // ── Facilities (SUPER_ADMIN, PROVOST) ─────────────────────────────
  createFacility: (body: AdminFacilityBody) =>
    api
      .post<ApiEnvelope<unknown>>('/admin/facilities', toFormData(body))
      .then(r => r.data.data),

  updateFacility: (id: string, body: Partial<AdminFacilityBody>) =>
    api
      .patch<ApiEnvelope<unknown>>(`/admin/facilities/${id}`, toFormData(body))
      .then(r => r.data.data),

  deleteFacility: (id: string) =>
    api.delete<ApiEnvelope<unknown>>(`/admin/facilities/${id}`).then(r => r.data),
};

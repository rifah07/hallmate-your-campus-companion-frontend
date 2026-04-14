/**
 * Data hooks layer — abstracts mock data behind a consistent API.
 * 
 * HOW TO MIGRATE TO REAL APIs:
 * 1. Set VITE_API_URL in .env to your backend URL
 * 2. Replace the `queryFn` in each hook with the corresponding service call:
 *    e.g. queryFn: () => usersService.getAll(params).then(r => r.data)
 * 3. Remove mock-data imports
 * 
 * All components consume these hooks — no direct mock-data imports needed.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mockUsers, mockRooms, mockComplaints, mockApplications, mockMaintenanceRequests,
  mockNotices, mockNotifications, mockMealMenus, mockGuestMeals, mockMealFeedback,
  mockVisitors, mockAttendance, mockLeaveApplications, mockFees, mockBills,
  mockEvents, mockAuditLogs, mockMealCancellations, mockHallOffMeals,
  getHouseTutorForFloor,
} from '@/lib/mock-data';
import type { QueryParams, UserRole } from '@/types';

// ── Helpers ──────────────────────────────────────────────────────
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));
const mockFetch = <T,>(data: T) => delay().then(() => data);

// ── Users ────────────────────────────────────────────────────────
export const useUsers = (params?: QueryParams) =>
  useQuery({ queryKey: ['users', params], queryFn: () => mockFetch(mockUsers) });

export const useUser = (id: string) =>
  useQuery({ queryKey: ['users', id], queryFn: () => mockFetch(mockUsers.find(u => u.id === id)) });

// ── Rooms ────────────────────────────────────────────────────────
export const useRooms = (params?: { floor?: number; status?: string; wing?: string; type?: string }) =>
  useQuery({
    queryKey: ['rooms', params],
    queryFn: () => mockFetch(mockRooms.filter(r => {
      if (params?.floor && r.floor !== params.floor) return false;
      if (params?.status && r.status !== params.status) return false;
      if (params?.wing && r.wing !== params.wing) return false;
      if (params?.type && r.roomType !== params.type) return false;
      return true;
    })),
  });

export const useRoom = (id: string) =>
  useQuery({ queryKey: ['rooms', id], queryFn: () => mockFetch(mockRooms.find(r => r.id === id)) });

export const useVacantRooms = (floor?: number) =>
  useQuery({
    queryKey: ['rooms', 'vacant', floor],
    queryFn: () => mockFetch(mockRooms.filter(r => {
      const hasSpace = r.vacantBeds.length > 0;
      return hasSpace && (!floor || r.floor === floor);
    })),
  });

export const useRoomStatistics = () =>
  useQuery({
    queryKey: ['rooms', 'statistics'],
    queryFn: () => {
      const totalBeds = mockRooms.reduce((s, r) => s + r.capacity, 0);
      const occupiedBeds = mockRooms.reduce((s, r) => s + r.currentOccupancy, 0);
      return mockFetch({
        totalRooms: mockRooms.length,
        occupiedRooms: mockRooms.filter(r => r.status === 'OCCUPIED').length,
        vacantRooms: mockRooms.filter(r => r.status === 'AVAILABLE').length,
        totalBeds,
        occupiedBeds,
        vacantBeds: totalBeds - occupiedBeds,
        overallOccupancyRate: totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0,
      });
    },
  });

// ── Complaints & Requests (unified) ─────────────────────────────
export const useComplaints = (params?: QueryParams) =>
  useQuery({ queryKey: ['complaints', params], queryFn: () => mockFetch(mockComplaints) });

export const useComplaint = (id: string) =>
  useQuery({ queryKey: ['complaints', id], queryFn: () => mockFetch(mockComplaints.find(c => c.id === id)) });

export const useApplications = (params?: QueryParams) =>
  useQuery({ queryKey: ['applications', params], queryFn: () => mockFetch(mockApplications) });

export const useApplication = (id: string) =>
  useQuery({ queryKey: ['applications', id], queryFn: () => mockFetch(mockApplications.find(a => a.id === id)) });

export const useMyApplications = () =>
  useQuery({ queryKey: ['applications', 'my'], queryFn: () => mockFetch(mockApplications.filter(a => a.studentId === '4')) });

export const useApplicationStatistics = () =>
  useQuery({
    queryKey: ['applications', 'statistics'],
    queryFn: () => mockFetch({
      total: mockApplications.length,
      pending: mockApplications.filter(a => a.status === 'PENDING').length,
      approved: mockApplications.filter(a => a.status === 'APPROVED').length,
      rejected: mockApplications.filter(a => a.status === 'REJECTED').length,
      cancelled: mockApplications.filter(a => a.status === 'CANCELLED').length,
    }),
  });

// ── Maintenance ──────────────────────────────────────────────────
export const useMaintenanceRequests = (params?: QueryParams) =>
  useQuery({ queryKey: ['maintenance', params], queryFn: () => mockFetch(mockMaintenanceRequests) });

// ── Notices ──────────────────────────────────────────────────────
export const useNotices = (params?: QueryParams) =>
  useQuery({ queryKey: ['notices', params], queryFn: () => mockFetch(mockNotices) });

export const useNotice = (id: string) =>
  useQuery({ queryKey: ['notices', id], queryFn: () => mockFetch(mockNotices.find(n => n.id === id)) });

// ── Notifications ────────────────────────────────────────────────
export const useNotifications = () =>
  useQuery({ queryKey: ['notifications'], queryFn: () => mockFetch(mockNotifications) });

// ── Meals ────────────────────────────────────────────────────────
export const useMealMenus = () =>
  useQuery({ queryKey: ['meals', 'menus'], queryFn: () => mockFetch(mockMealMenus) });

export const useGuestMeals = () =>
  useQuery({ queryKey: ['meals', 'guest'], queryFn: () => mockFetch(mockGuestMeals) });

export const useMealFeedback = () =>
  useQuery({ queryKey: ['meals', 'feedback'], queryFn: () => mockFetch(mockMealFeedback) });

export const useMealCancellations = () =>
  useQuery({ queryKey: ['meals', 'cancellations'], queryFn: () => mockFetch(mockMealCancellations) });

// ── Visitors ─────────────────────────────────────────────────────
export const useVisitors = (params?: QueryParams) =>
  useQuery({ queryKey: ['visitors', params], queryFn: () => mockFetch(mockVisitors) });

// ── Attendance ───────────────────────────────────────────────────
export const useAttendance = (params?: { floor?: number }) =>
  useQuery({
    queryKey: ['attendance', params],
    queryFn: () => mockFetch(mockAttendance.filter(a =>
      !params?.floor || a.floor === params.floor
    )),
  });

export const useLeaveApplications = () =>
  useQuery({ queryKey: ['leaves'], queryFn: () => mockFetch(mockLeaveApplications) });

// ── Fees ─────────────────────────────────────────────────────────
export const useFees = () =>
  useQuery({ queryKey: ['fees'], queryFn: () => mockFetch(mockFees) });

export const useBills = (params?: { studentId?: string }) =>
  useQuery({
    queryKey: ['bills', params],
    queryFn: () => mockFetch(mockBills.filter(b =>
      !params?.studentId || b.studentId === params.studentId
    )),
  });

// ── Events ───────────────────────────────────────────────────────
export const useEvents = () =>
  useQuery({ queryKey: ['events'], queryFn: () => mockFetch(mockEvents) });

export const useEvent = (id: string) =>
  useQuery({ queryKey: ['events', id], queryFn: () => mockFetch(mockEvents.find(e => e.id === id)) });

// ── Audit Logs ───────────────────────────────────────────────────
export const useAuditLogs = () =>
  useQuery({ queryKey: ['audit-logs'], queryFn: () => mockFetch(mockAuditLogs) });

// ── House Tutors ─────────────────────────────────────────────────
export const useHouseTutorForFloor = (floor: number) =>
  useQuery({
    queryKey: ['house-tutor', floor],
    queryFn: () => mockFetch(getHouseTutorForFloor(floor)),
  });

// ── Gallery (public) ─────────────────────────────────────────────
export const useGallery = (category?: string) =>
  useQuery({
    queryKey: ['gallery', category],
    queryFn: () => mockFetch([]), // Replace with publicService.getGallery(category)
  });

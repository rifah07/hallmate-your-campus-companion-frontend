// Public API types — mirror backend Swagger schemas under /api/public/*

export interface HallInfo {
  id: string;
  name: string;
  established: number;
  location: string;
  description: string;
  vision?: string | null;
  mission?: string | null;
  capacity: number;
  totalRooms: number;
  logoUrl?: string | null;
  coverUrl?: string | null;
  mapEmbedUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  socialLinks?: { facebook?: string; website?: string } | null;
}

export interface ProvostUser {
  name: string;
  photo?: string | null;
  designation: string;
  department?: string | null;
  provostMessage?: string | null;
  tenureStart?: string | null;
  tenureEnd?: string | null;
}

export interface ProvostHistory {
  id: string;
  name: string;
  photoUrl?: string | null;
  designation: string;
  department?: string | null;
  tenureStart: string;
  tenureEnd?: string | null;
  isCurrent: boolean;
  bio?: string | null;
}

export interface CreateProvostHistoryBody {
  name: string;
  designation?: string;
  department?: string;
  tenureStart: string;
  tenureEnd?: string | null;
  isCurrent?: 'true' | 'false';
  bio?: string;
  sortOrder?: number;
  userId?: string;
  photo?: File;
}

export interface PublicHouseTutor {
  id: string;
  name: string;
  designation: string;
  department: string;
  floor?: number | null;
  wing?: string | null;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  officeHours?: string | null;
}

export type StaffCategory = 'ADMINISTRATIVE' | 'ACADEMIC' | 'SUPPORT' | 'SECURITY' | 'DINING' | 'MAINTENANCE';

export interface PublicStaffProfile {
  id: string;
  name: string;
  designation: string;
  category: StaffCategory;
  department?: string | null;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  qualifications?: string | null;
  joiningDate?: string | null;
}

export type FacilityCategory = 'ACCOMMODATION' | 'DINING' | 'SPORTS' | 'ACADEMIC' | 'HEALTH' | 'RECREATION' | 'UTILITIES';

export interface Facility {
  id: string;
  name: string;
  slug: string;
  category: FacilityCategory;
  description: string;
  iconUrl?: string | null;
  imageUrl?: string | null;
}

export interface MealSlot {
  time: string;
  price: number;
  description: string;
}

export interface DiningInfo {
  id: string;
  mealPlan: { breakfast: MealSlot; lunch: MealSlot; dinner: MealSlot };
  weeklyMenu?: Record<string, unknown> | null;
  specialDiets: string[];
  capacity?: number | null;
  location?: string | null;
  imageUrl?: string | null;
  contactPhone?: string | null;
  notice?: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string | null;
  year: number;
  isFeatured: boolean;
}

export interface PublicEvent {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  venue?: string | null;
  imageUrl?: string | null;
  startDate: string;
  endDate?: string | null;
  isAllDay: boolean;
  tags: string[];
  isFeatured: boolean;
}

export type PublicNoticePriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface PublicNotice {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  priority: PublicNoticePriority;
  category: string;
  tags: string[];
  pdfUrl?: string | null;
  publishedAt?: string | null;
  expiresAt?: string | null;
  views: number;
}

export interface PublicNoticeDetail extends PublicNotice {
  content: string;
  imageUrl?: string | null;
  createdAt: string;
}

export type GalleryCategory = 'INFRASTRUCTURE' | 'EVENTS' | 'SPORTS' | 'CULTURAL' | 'ACADEMICS' | 'DINING' | 'GENERAL';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  category: GalleryCategory;
  tags: string[];
  capturedAt?: string | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AdmissionInfo {
  id: string;
  session: string;
  eligibility: string;
  process: string;
  requiredDocs: string[];
  importantDates?: {
    applicationStart?: string;
    applicationEnd?: string;
    resultDate?: string;
    joiningDeadline?: string;
  } | null;
  seatCapacity?: number | null;
  applicationFee?: number | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export interface ContactSubmissionBody {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type PublicApplicationType = 'SEAT_REQUEST' | 'INFORMATION_REQUEST' | 'GENERAL_INQUIRY' | 'ADMISSION_QUERY';

export interface PublicApplicationBody {
  type: PublicApplicationType;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  studentId?: string;
  program?: 'UNDERGRADUATE' | 'MASTERS' | 'PHD';
  department?: string;
  session?: string;
  subject: string;
  message: string;
  attachments?: string[];
}

export interface ApplicationTrackingResponse {
  id: string;
  type: PublicApplicationType;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  subject: string;
  responseNote?: string | null;
  respondedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AboutPageData {
  hallInfo: HallInfo;
  pageContent?: Record<string, unknown> | null;
}

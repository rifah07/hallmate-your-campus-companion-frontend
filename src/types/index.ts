export type UserRole =
  | 'SUPER_ADMIN'
  | 'PROVOST'
  | 'HOUSE_TUTOR'
  | 'ASSISTANT_WARDEN'
  | 'OFFICE_STAFF'
  | 'DINING_STAFF'
  | 'MAINTENANCE_STAFF'
  | 'GUARD'
  | 'STUDENT'
  | 'PARENT';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'GRADUATED';
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';
export type RoomType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'QUAD';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type ApplicationType = 'NEW_SEAT' | 'TRANSFER' | 'GUEST_ROOM';

export type ComplaintStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type ComplaintCategory = 'MAINTENANCE' | 'DINING' | 'BEHAVIOR' | 'SECURITY' | 'OTHER';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type MaintenanceType = 'ELECTRICAL' | 'PLUMBING' | 'CARPENTRY' | 'CLEANING' | 'OTHER';
export type MaintenanceStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type NoticeCategory = 'GENERAL' | 'ACADEMIC' | 'EVENT' | 'URGENT' | 'MAINTENANCE';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'SNACKS' | 'DINNER';
export type MealPlanType = 'FULL_BOARD' | 'BREAKFAST_ONLY' | 'LUNCH_DINNER' | 'CUSTOM';

export type VisitorStatus = 'CHECKED_IN' | 'CHECKED_OUT' | 'PENDING' | 'REJECTED';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LEAVE';
export type LeaveType = 'MEDICAL' | 'PERSONAL' | 'ACADEMIC';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type PaymentMethod = 'ONLINE' | 'BANK_TRANSFER' | 'CASH';
export type FeeType = 'SEAT_RENT' | 'UTILITY' | 'DINING' | 'OTHER';

export type EventCategory = 'CULTURAL' | 'SPORTS' | 'ACADEMIC' | 'SOCIAL' | 'OFFICIAL';

export interface User {
  id: string;
  name: string;
  universityId: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  department?: string;
  year?: number;
  program?: string;
  session?: string;
  bloodGroup?: BloodGroup;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  assignedFloor?: number;
  roomId?: string;
  isFirstLogin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  capacity: number;
  occupants: User[];
  status: RoomStatus;
  features: { ac: boolean; balcony: boolean; attachedBath: boolean };
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  type: ApplicationType;
  status: ApplicationStatus;
  roomPreferences: string[];
  reason: string;
  documents: string[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  category: ComplaintCategory;
  priority: Priority;
  status: ComplaintStatus;
  title: string;
  description: string;
  photos: string[];
  roomNumber?: string;
  assignedTo?: string;
  assignedToName?: string;
  comments: ComplaintComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  roomNumber: string;
  floor: number;
  type: MaintenanceType;
  priority: Priority;
  status: MaintenanceStatus;
  description: string;
  photos: string[];
  assignedTo?: string;
  assignedToName?: string;
  completedAt?: string;
  completionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  targetAudience: string;
  attachments: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface MealMenu {
  id: string;
  date: string;
  meals: { type: MealType; items: string[] }[];
}

export interface GuestMeal {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  mealType: MealType;
  guestCount: number;
  guestNames: string[];
  status: ApplicationStatus;
  createdAt: string;
}

export interface MealFeedback {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  mealType: MealType;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Visitor {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorIdType: string;
  visitorIdNumber: string;
  studentId: string;
  studentName: string;
  purpose: string;
  entryTime: string;
  exitTime?: string;
  status: VisitorStatus;
  passCode?: string;
  guardId?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: AttendanceStatus;
  markedBy?: string;
  floor: number;
}

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  type: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  documents: string[];
  status: LeaveStatus;
  approvedBy?: string;
  notes?: string;
  createdAt: string;
}

export interface Fee {
  id: string;
  type: FeeType;
  name: string;
  amount: number;
  dueDate: string;
  applicableTo: string;
}

export interface Bill {
  id: string;
  studentId: string;
  studentName: string;
  feeId: string;
  feeName: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  receiptUrl?: string;
  referenceNumber?: string;
  createdAt: string;
}

export interface HallEvent {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  date: string;
  time: string;
  venue: string;
  bannerUrl?: string;
  organizerId: string;
  organizerName: string;
  maxAttendees?: number;
  registeredCount: number;
  registrationRequired: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface MealCancellation {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  mealType: MealType;
  reason?: string;
  cancelledAt: string;
}

export interface HallOffMeal {
  id: string;
  date: string;
  mealType: MealType;
  reason: string;
  createdBy: string;
  createdAt: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: string;
  department?: string;
  year?: number;
  floor?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
  priority?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginInput { universityId: string; password: string; rememberMe?: boolean; }
export interface FirstLoginInput { otp: string; newPassword: string; confirmPassword: string; }
export interface CreateUserInput { name: string; universityId: string; email: string; phone?: string; role: UserRole; department?: string; year?: number; program?: string; session?: string; bloodGroup?: BloodGroup; emergencyContactName?: string; emergencyContactPhone?: string; assignedFloor?: number; }
export interface UpdateUserInput extends Partial<CreateUserInput> { status?: UserStatus; }
export interface CreateRoomInput { roomNumber: string; floor: number; type: RoomType; capacity: number; status?: RoomStatus; features?: { ac?: boolean; balcony?: boolean; attachedBath?: boolean }; }
export interface UpdateRoomInput extends Partial<CreateRoomInput> {}
export interface AssignInput { studentId: string; bedNumber: number; assignmentDate: string; notes?: string; }
export interface TransferInput { targetRoomId: string; targetBedNumber: number; transferDate: string; reason: string; }

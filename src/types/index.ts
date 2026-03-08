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
  features: {
    ac: boolean;
    balcony: boolean;
    attachedBath: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
  year?: number;
  floor?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginInput {
  universityId: string;
  password: string;
  rememberMe?: boolean;
}

export interface FirstLoginInput {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateUserInput {
  name: string;
  universityId: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
  year?: number;
  program?: string;
  session?: string;
  bloodGroup?: BloodGroup;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  assignedFloor?: number;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  status?: UserStatus;
}

export interface CreateRoomInput {
  roomNumber: string;
  floor: number;
  type: RoomType;
  capacity: number;
  status?: RoomStatus;
  features?: { ac?: boolean; balcony?: boolean; attachedBath?: boolean };
}

export interface UpdateRoomInput extends Partial<CreateRoomInput> {}

export interface AssignInput {
  studentId: string;
  bedNumber: number;
  assignmentDate: string;
  notes?: string;
}

export interface TransferInput {
  targetRoomId: string;
  targetBedNumber: number;
  transferDate: string;
  reason: string;
}

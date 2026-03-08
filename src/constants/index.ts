import type { UserRole } from '@/types';

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  PROVOST: 'Provost',
  HOUSE_TUTOR: 'House Tutor',
  ASSISTANT_WARDEN: 'Asst. Warden',
  OFFICE_STAFF: 'Office Staff',
  DINING_STAFF: 'Dining Staff',
  MAINTENANCE_STAFF: 'Maintenance',
  GUARD: 'Guard',
  STUDENT: 'Student',
  PARENT: 'Parent',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-primary text-primary-foreground',
  PROVOST: 'bg-rose text-rose-foreground',
  HOUSE_TUTOR: 'bg-teal text-teal-foreground',
  ASSISTANT_WARDEN: 'bg-secondary text-secondary-foreground',
  OFFICE_STAFF: 'bg-muted text-muted-foreground',
  DINING_STAFF: 'bg-warning text-warning-foreground',
  MAINTENANCE_STAFF: 'bg-accent text-accent-foreground',
  GUARD: 'bg-muted text-muted-foreground',
  STUDENT: 'bg-primary/10 text-primary',
  PARENT: 'bg-secondary text-secondary-foreground',
};

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-success/15 text-success border-success/30',
  INACTIVE: 'bg-muted text-muted-foreground border-border',
  SUSPENDED: 'bg-destructive/15 text-destructive border-destructive/30',
  GRADUATED: 'bg-primary/15 text-primary border-primary/30',
  AVAILABLE: 'bg-success/15 text-success border-success/30',
  OCCUPIED: 'bg-rose/15 text-rose border-rose/30',
  MAINTENANCE: 'bg-warning/15 text-warning border-warning/30',
  RESERVED: 'bg-primary/15 text-primary border-primary/30',
  PENDING: 'bg-warning/15 text-warning border-warning/30',
  APPROVED: 'bg-success/15 text-success border-success/30',
  REJECTED: 'bg-destructive/15 text-destructive border-destructive/30',
  CANCELLED: 'bg-muted text-muted-foreground border-border',
  OPEN: 'bg-primary/15 text-primary border-primary/30',
  IN_PROGRESS: 'bg-warning/15 text-warning border-warning/30',
  RESOLVED: 'bg-success/15 text-success border-success/30',
  CLOSED: 'bg-muted text-muted-foreground border-border',
  TODO: 'bg-primary/15 text-primary border-primary/30',
  COMPLETED: 'bg-success/15 text-success border-success/30',
  CHECKED_IN: 'bg-success/15 text-success border-success/30',
  CHECKED_OUT: 'bg-muted text-muted-foreground border-border',
  PRESENT: 'bg-success/15 text-success border-success/30',
  ABSENT: 'bg-destructive/15 text-destructive border-destructive/30',
  LEAVE: 'bg-warning/15 text-warning border-warning/30',
  PAID: 'bg-success/15 text-success border-success/30',
  OVERDUE: 'bg-destructive/15 text-destructive border-destructive/30',
};

export const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'bg-muted text-muted-foreground',
  MEDIUM: 'bg-primary/15 text-primary',
  HIGH: 'bg-warning/15 text-warning',
  URGENT: 'bg-destructive/15 text-destructive',
};

export const ADMIN_ROLES: UserRole[] = ['SUPER_ADMIN', 'PROVOST'];
export const MANAGEMENT_ROLES: UserRole[] = ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN', 'OFFICE_STAFF'];
export const ALL_ROLES: UserRole[] = [
  'SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN',
  'OFFICE_STAFF', 'DINING_STAFF', 'MAINTENANCE_STAFF', 'GUARD',
  'STUDENT', 'PARENT',
];

export const DEPARTMENTS = [
  'Computer Science', 'Electrical Engineering', 'Mechanical Engineering',
  'Civil Engineering', 'Chemistry', 'Physics', 'Mathematics',
  'English', 'Economics', 'Sociology', 'Political Science',
  'Pharmacy', 'Architecture', 'Business Administration',
];

export const FLOORS = Array.from({ length: 14 }, (_, i) => i + 1);

export const COMPLAINT_CATEGORIES = [
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'DINING', label: 'Dining' },
  { value: 'BEHAVIOR', label: 'Behavior' },
  { value: 'SECURITY', label: 'Security' },
  { value: 'OTHER', label: 'Other' },
];

export const MAINTENANCE_TYPES = [
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'PLUMBING', label: 'Plumbing' },
  { value: 'CARPENTRY', label: 'Carpentry' },
  { value: 'CLEANING', label: 'Cleaning' },
  { value: 'OTHER', label: 'Other' },
];

export const EVENT_CATEGORIES = [
  { value: 'CULTURAL', label: 'Cultural' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'SOCIAL', label: 'Social' },
  { value: 'OFFICIAL', label: 'Official' },
];

export const NOTICE_CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'EVENT', label: 'Event' },
  { value: 'URGENT', label: 'Urgent' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
];

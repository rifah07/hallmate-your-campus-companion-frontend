import type { User, Room, Notification, UserRole } from '@/types';

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

export const mockUsers: User[] = [
  { id: '1', name: 'Dr. Fatima Rahman', universityId: '2024000001', email: 'fatima@univ.edu.bd', phone: '01711000001', role: 'SUPER_ADMIN', status: 'ACTIVE', avatar: avatarUrl('Fatima Rahman'), department: 'Administration', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Prof. Nasreen Ahmed', universityId: '2024000002', email: 'nasreen@univ.edu.bd', phone: '01711000002', role: 'PROVOST', status: 'ACTIVE', avatar: avatarUrl('Nasreen Ahmed'), department: 'Physics', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '3', name: 'Ms. Sultana Begum', universityId: '2024000003', email: 'sultana@univ.edu.bd', phone: '01711000003', role: 'HOUSE_TUTOR', status: 'ACTIVE', avatar: avatarUrl('Sultana Begum'), department: 'Chemistry', assignedFloor: 3, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '4', name: 'Anika Islam', universityId: '2024100001', email: 'anika@univ.edu.bd', phone: '01811000001', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Anika Islam'), department: 'Computer Science', year: 3, program: 'BSc', session: '2021-22', bloodGroup: 'B+', roomId: 'r1', createdAt: '2024-01-15', updatedAt: '2024-06-01' },
  { id: '5', name: 'Tasnia Haque', universityId: '2024100002', email: 'tasnia@univ.edu.bd', phone: '01811000002', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Tasnia Haque'), department: 'English', year: 2, program: 'BA', session: '2022-23', bloodGroup: 'A+', roomId: 'r1', createdAt: '2024-02-01', updatedAt: '2024-06-01' },
  { id: '6', name: 'Raisa Kabir', universityId: '2024100003', email: 'raisa@univ.edu.bd', phone: '01811000003', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Raisa Kabir'), department: 'Electrical Engineering', year: 4, program: 'BSc', session: '2020-21', bloodGroup: 'O+', roomId: 'r2', createdAt: '2024-01-20', updatedAt: '2024-06-01' },
  { id: '7', name: 'Nusrat Jahan', universityId: '2024100004', email: 'nusrat@univ.edu.bd', phone: '01811000004', role: 'STUDENT', status: 'SUSPENDED', avatar: avatarUrl('Nusrat Jahan'), department: 'Economics', year: 1, program: 'BSS', session: '2023-24', createdAt: '2024-03-01', updatedAt: '2024-06-01' },
  { id: '8', name: 'Mrs. Rehana Parvin', universityId: '2024000010', email: 'rehana@univ.edu.bd', role: 'OFFICE_STAFF', status: 'ACTIVE', avatar: avatarUrl('Rehana Parvin'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '9', name: 'Mr. Karim', universityId: '2024000020', email: 'karim@univ.edu.bd', role: 'GUARD', status: 'ACTIVE', avatar: avatarUrl('Karim'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '10', name: 'Mrs. Halima', universityId: '2024000030', email: 'halima@univ.edu.bd', role: 'DINING_STAFF', status: 'ACTIVE', avatar: avatarUrl('Halima'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockRooms: Room[] = Array.from({ length: 40 }, (_, i) => {
  const floor = Math.floor(i / 3) + 1;
  const types = ['SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD'] as const;
  const type = types[i % 4];
  const capacity = { SINGLE: 1, DOUBLE: 2, TRIPLE: 3, QUAD: 4 }[type];
  const statuses = ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'AVAILABLE'] as const;
  const status = i < 30 ? statuses[i % 4] : 'AVAILABLE';
  const occupantCount = status === 'OCCUPIED' ? Math.min(capacity, Math.floor(Math.random() * capacity) + 1) : 0;
  const occupants = mockUsers.filter(u => u.role === 'STUDENT').slice(0, occupantCount);

  return {
    id: `r${i + 1}`,
    roomNumber: `${floor}${String(i % 10 + 1).padStart(2, '0')}`,
    floor: Math.min(floor, 14),
    type,
    capacity,
    occupants,
    status: status as Room['status'],
    features: { ac: i % 3 === 0, balcony: i % 5 === 0, attachedBath: i % 4 === 0 },
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  };
});

export const mockNotifications: Notification[] = [
  { id: '1', title: 'New Student Registered', message: 'Anika Islam has been assigned to Room 301', type: 'info', read: false, createdAt: '2024-06-15T10:30:00' },
  { id: '2', title: 'Maintenance Request', message: 'Room 205 reported AC malfunction', type: 'warning', read: false, createdAt: '2024-06-15T09:15:00' },
  { id: '3', title: 'Room Transfer Complete', message: 'Tasnia Haque transferred to Room 401', type: 'success', read: true, createdAt: '2024-06-14T16:00:00' },
  { id: '4', title: 'Security Alert', message: 'Late entry recorded at Gate 2', type: 'error', read: true, createdAt: '2024-06-14T23:30:00' },
];

export const mockCurrentUser: User = mockUsers[0];

export const getDemoUser = (role: UserRole): User => {
  const found = mockUsers.find(u => u.role === role);
  return found || mockUsers[0];
};

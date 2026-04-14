import type { User, Room, Notification, Application, Complaint, ComplaintComment, MaintenanceRequest, Notice, MealMenu, GuestMeal, MealFeedback, Visitor, AttendanceRecord, LeaveApplication, Fee, Bill, HallEvent, AuditLog, UserRole, MealCancellation, HallOffMeal } from '@/types';

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

// Helper to generate house tutors - one per floor
const HOUSE_TUTOR_NAMES = [
  'Ms. Farida Akter', 'Ms. Rubina Khatun', 'Ms. Sultana Begum', 'Ms. Shahana Parveen',
  'Ms. Moushumi Das', 'Ms. Tahmina Akter', 'Ms. Kamrun Nahar', 'Ms. Sabina Yeasmin',
  'Ms. Dilara Begum', 'Ms. Rahima Khatun', 'Ms. Nasima Akter', 'Ms. Shamima Nasrin',
  'Ms. Hasina Begum', 'Ms. Roksana Parvin',
];

const HOUSE_TUTOR_DEPTS = [
  'Physics', 'Chemistry', 'Mathematics', 'English', 'Economics', 'Sociology',
  'Political Science', 'Pharmacy', 'Civil Engineering', 'Electrical Engineering',
  'Computer Science', 'Architecture', 'Business Administration', 'Mechanical Engineering',
];

const houseTutors: User[] = HOUSE_TUTOR_NAMES.map((name, i) => ({
  id: `ht${i + 1}`,
  name,
  universityId: `2024000${100 + i}`,
  email: `${name.split(' ').pop()!.toLowerCase()}${i + 1}@univ.edu.bd`,
  phone: `0171100${String(20 + i).padStart(4, '0')}`,
  role: 'HOUSE_TUTOR' as UserRole,
  status: 'ACTIVE' as const,
  avatar: avatarUrl(name),
  department: HOUSE_TUTOR_DEPTS[i],
  assignedFloor: i + 1,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
}));

export const mockUsers: User[] = [
  { id: '1', name: 'Dr. Fatima Rahman', universityId: '2024000001', email: 'fatima@univ.edu.bd', phone: '01711000001', role: 'SUPER_ADMIN', status: 'ACTIVE', avatar: avatarUrl('Fatima Rahman'), department: 'Administration', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Prof. Nasreen Ahmed', universityId: '2024000002', email: 'nasreen@univ.edu.bd', phone: '01711000002', role: 'PROVOST', status: 'ACTIVE', avatar: avatarUrl('Nasreen Ahmed'), department: 'Physics', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  ...houseTutors,
  { id: '4', name: 'Anika Islam', universityId: '2024100001', email: 'anika@univ.edu.bd', phone: '01811000001', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Anika Islam'), department: 'Computer Science', year: 3, program: 'BSc', session: '2021-22', bloodGroup: 'B+', roomId: 'r1', createdAt: '2024-01-15', updatedAt: '2024-06-01' },
  { id: '5', name: 'Tasnia Haque', universityId: '2024100002', email: 'tasnia@univ.edu.bd', phone: '01811000002', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Tasnia Haque'), department: 'English', year: 2, program: 'BA', session: '2022-23', bloodGroup: 'A+', roomId: 'r1', createdAt: '2024-02-01', updatedAt: '2024-06-01' },
  { id: '6', name: 'Raisa Kabir', universityId: '2024100003', email: 'raisa@univ.edu.bd', phone: '01811000003', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Raisa Kabir'), department: 'Electrical Engineering', year: 4, program: 'BSc', session: '2020-21', bloodGroup: 'O+', roomId: 'r2', createdAt: '2024-01-20', updatedAt: '2024-06-01' },
  { id: '7', name: 'Nusrat Jahan', universityId: '2024100004', email: 'nusrat@univ.edu.bd', phone: '01811000004', role: 'STUDENT', status: 'SUSPENDED', avatar: avatarUrl('Nusrat Jahan'), department: 'Economics', year: 1, program: 'BSS', session: '2023-24', createdAt: '2024-03-01', updatedAt: '2024-06-01' },
  { id: '8', name: 'Mrs. Rehana Parvin', universityId: '2024000010', email: 'rehana@univ.edu.bd', role: 'OFFICE_STAFF', status: 'ACTIVE', avatar: avatarUrl('Rehana Parvin'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '9', name: 'Mr. Karim', universityId: '2024000020', email: 'karim@univ.edu.bd', role: 'GUARD', status: 'ACTIVE', avatar: avatarUrl('Karim'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '10', name: 'Mrs. Halima', universityId: '2024000030', email: 'halima@univ.edu.bd', role: 'DINING_STAFF', status: 'ACTIVE', avatar: avatarUrl('Halima'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '11', name: 'Mr. Rahim', universityId: '2024000040', email: 'rahim@univ.edu.bd', role: 'MAINTENANCE_STAFF', status: 'ACTIVE', avatar: avatarUrl('Rahim'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '12', name: 'Ms. Ayesha Siddiqui', universityId: '2024000050', email: 'ayesha@univ.edu.bd', role: 'ASSISTANT_WARDEN', status: 'ACTIVE', avatar: avatarUrl('Ayesha Siddiqui'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '13', name: 'Mrs. Nasima Begum', universityId: '2024200001', email: 'nasima@parent.edu.bd', role: 'PARENT', status: 'ACTIVE', avatar: avatarUrl('Nasima Begum'), createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '14', name: 'Sadia Akter', universityId: '2024100005', email: 'sadia@univ.edu.bd', phone: '01811000005', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Sadia Akter'), department: 'Mathematics', year: 2, program: 'BSc', session: '2022-23', bloodGroup: 'AB+', roomId: 'r3', createdAt: '2024-02-15', updatedAt: '2024-06-01' },
  { id: '15', name: 'Maryam Khan', universityId: '2024100006', email: 'maryam@univ.edu.bd', phone: '01811000006', role: 'STUDENT', status: 'ACTIVE', avatar: avatarUrl('Maryam Khan'), department: 'Pharmacy', year: 3, program: 'BPharm', session: '2021-22', bloodGroup: 'O-', createdAt: '2024-01-10', updatedAt: '2024-06-01' },
];

// Helper: get house tutor for a floor
export const getHouseTutorForFloor = (floor: number): User | undefined =>
  mockUsers.find(u => u.role === 'HOUSE_TUTOR' && u.assignedFloor === floor);

// Rooms: 10 rooms per floor, 14 floors = 140 rooms (realistic for 1000+ students)
const ROOM_TYPES: Room['roomType'][] = ['SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_SHARING'];
const ROOM_CAPACITY: Record<Room['roomType'], number> = { SINGLE: 1, DOUBLE: 2, TRIPLE: 3, FOUR_SHARING: 4 };
const students = () => mockUsers.filter(u => u.role === 'STUDENT');

export const mockRooms: Room[] = Array.from({ length: 140 }, (_, i) => {
  const floor = Math.floor(i / 10) + 1;
  const roomInFloor = (i % 10) + 1;
  const roomType = ROOM_TYPES[i % 4];
  const capacity = ROOM_CAPACITY[roomType];
  const statuses: Room['status'][] = ['AVAILABLE', 'OCCUPIED', 'PARTIALLY_OCCUPIED', 'OCCUPIED'];
  const status = i < 120 ? statuses[i % 4] : 'AVAILABLE';
  const currentOccupancy = status === 'OCCUPIED' ? capacity : status === 'PARTIALLY_OCCUPIED' ? Math.max(1, capacity - 1) : 0;
  const vacantBeds = Array.from({ length: capacity - currentOccupancy }, (_, j) => currentOccupancy + j + 1);
  const occupants = students().slice(0, currentOccupancy).map((s, j) => ({
    id: s.id, name: s.name, universityId: s.universityId, avatar: s.avatar, bedNumber: j + 1,
  }));
  return {
    id: `r${i + 1}`,
    roomNumber: `${floor}${String(roomInFloor).padStart(2, '0')}`,
    floor,
    wing: (roomInFloor <= 5 ? 'A' : 'B') as Room['wing'],
    roomType,
    capacity,
    currentOccupancy,
    status,
    hasAC: i % 3 === 0,
    hasBalcony: i % 5 === 0,
    hasAttachedBath: i % 4 === 0,
    vacantBeds,
    occupancyRate: capacity > 0 ? (currentOccupancy / capacity) * 100 : 0,
    occupants,
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  };
});

export const mockApplications: Application[] = [
  { id: 'app1', studentId: '4', type: 'SEAT_APPLICATION', status: 'PENDING', data: { reason: 'New admission, need accommodation.', roomPreferences: ['301', '302', '303'] }, attachments: [], createdAt: '2024-06-01', updatedAt: '2024-06-01', student: { id: '4', name: 'Anika Islam', universityId: '2024100001', avatar: avatarUrl('Anika Islam') } },
  { id: 'app2', studentId: '5', type: 'SEAT_TRANSFER', status: 'APPROVED', data: { reason: 'Want to be closer to classmates.', roomPreferences: ['401'] }, attachments: [], responseNote: 'Approved - room available.', respondedAt: '2024-05-22', createdAt: '2024-05-20', updatedAt: '2024-05-22', student: { id: '5', name: 'Tasnia Haque', universityId: '2024100002', avatar: avatarUrl('Tasnia Haque') } },
  { id: 'app3', studentId: '6', type: 'SEAT_APPLICATION', status: 'REJECTED', data: { reason: 'Final year, need single room.', roomPreferences: ['201', '202'] }, attachments: [], responseNote: 'No single rooms available.', respondedAt: '2024-05-17', createdAt: '2024-05-15', updatedAt: '2024-05-17', student: { id: '6', name: 'Raisa Kabir', universityId: '2024100003', avatar: avatarUrl('Raisa Kabir') } },
  { id: 'app4', studentId: '14', type: 'LEAVE', status: 'PENDING', data: { reason: 'Parents visiting for convocation.', leaveFrom: '2024-06-15', leaveTo: '2024-06-20' }, attachments: [], createdAt: '2024-06-10', updatedAt: '2024-06-10', student: { id: '14', name: 'Sadia Akter', universityId: '2024100005', avatar: avatarUrl('Sadia Akter') } },
  { id: 'app5', studentId: '15', type: 'SEAT_TRANSFER', status: 'PENDING', data: { reason: 'AC room needed for medical reasons.', roomPreferences: ['305', '306'] }, attachments: [], createdAt: '2024-06-12', updatedAt: '2024-06-12', student: { id: '15', name: 'Maryam Khan', universityId: '2024100006', avatar: avatarUrl('Maryam Khan') } },
];

export const mockComplaints: Complaint[] = [
  { id: 'cmp1', studentId: '4', studentName: 'Anika Islam', studentAvatar: avatarUrl('Anika Islam'), category: 'MAINTENANCE', priority: 'HIGH', status: 'OPEN', title: 'AC not working in Room 301', description: 'The AC in our room has stopped working since yesterday. It is very hot.', photos: [], roomNumber: '301', comments: [{ id: 'c1', userId: '1', userName: 'Dr. Fatima Rahman', content: 'Forwarded to maintenance team.', isInternal: false, createdAt: '2024-06-15T12:00:00' }], createdAt: '2024-06-15T10:00:00', updatedAt: '2024-06-15T12:00:00' },
  { id: 'cmp2', studentId: '5', studentName: 'Tasnia Haque', studentAvatar: avatarUrl('Tasnia Haque'), category: 'DINING', priority: 'MEDIUM', status: 'IN_PROGRESS', title: 'Poor food quality at dinner', description: 'The dinner quality has declined significantly over the past week.', photos: [], comments: [], createdAt: '2024-06-14T18:00:00', updatedAt: '2024-06-15T09:00:00' },
  { id: 'cmp3', studentId: '6', studentName: 'Raisa Kabir', studentAvatar: avatarUrl('Raisa Kabir'), category: 'SECURITY', priority: 'URGENT', status: 'OPEN', title: 'Broken lock on Room 205', description: 'The main door lock of our room is broken and cannot be locked properly.', photos: [], roomNumber: '205', comments: [], createdAt: '2024-06-16T08:00:00', updatedAt: '2024-06-16T08:00:00' },
  { id: 'cmp4', studentId: '14', studentName: 'Sadia Akter', studentAvatar: avatarUrl('Sadia Akter'), category: 'BEHAVIOR', priority: 'LOW', status: 'RESOLVED', title: 'Noise complaint - Room 310', description: 'Room 310 residents are making excessive noise after midnight.', photos: [], roomNumber: '308', assignedTo: 'ht3', assignedToName: 'Ms. Sultana Begum', comments: [], createdAt: '2024-06-10T22:00:00', updatedAt: '2024-06-12T10:00:00' },
  { id: 'cmp5', studentId: '15', studentName: 'Maryam Khan', studentAvatar: avatarUrl('Maryam Khan'), category: 'OTHER', priority: 'MEDIUM', status: 'CLOSED', title: 'WiFi connectivity issues', description: 'WiFi in Floor 3 is very slow and keeps disconnecting.', photos: [], comments: [], createdAt: '2024-06-05T14:00:00', updatedAt: '2024-06-08T16:00:00' },
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  { id: 'mnt1', roomNumber: '301', floor: 3, type: 'ELECTRICAL', priority: 'HIGH', status: 'TODO', description: 'AC unit not working, needs inspection.', photos: [], assignedTo: '11', assignedToName: 'Mr. Rahim', createdAt: '2024-06-15T12:00:00', updatedAt: '2024-06-15T12:00:00' },
  { id: 'mnt2', roomNumber: '205', floor: 2, type: 'CARPENTRY', priority: 'URGENT', status: 'IN_PROGRESS', description: 'Door lock broken, security risk.', photos: [], assignedTo: '11', assignedToName: 'Mr. Rahim', createdAt: '2024-06-16T08:30:00', updatedAt: '2024-06-16T10:00:00' },
  { id: 'mnt3', roomNumber: '401', floor: 4, type: 'PLUMBING', priority: 'MEDIUM', status: 'COMPLETED', description: 'Leaking faucet in bathroom.', photos: [], assignedTo: '11', assignedToName: 'Mr. Rahim', completedAt: '2024-06-14T16:00:00', completionNotes: 'Replaced washer and tightened fittings.', createdAt: '2024-06-13T09:00:00', updatedAt: '2024-06-14T16:00:00' },
  { id: 'mnt4', roomNumber: '102', floor: 1, type: 'CLEANING', priority: 'LOW', status: 'TODO', description: 'Deep cleaning needed after student checkout.', photos: [], createdAt: '2024-06-16T07:00:00', updatedAt: '2024-06-16T07:00:00' },
  { id: 'mnt5', roomNumber: '503', floor: 5, type: 'ELECTRICAL', priority: 'MEDIUM', status: 'TODO', description: 'Ceiling fan making noise.', photos: [], createdAt: '2024-06-15T15:00:00', updatedAt: '2024-06-15T15:00:00' },
];

export const mockNotices: Notice[] = [
  { id: 'n1', title: 'Hall Fees Payment Deadline', content: 'All students must pay their hall fees by June 30, 2024. Late payment will incur a fine of BDT 500. Please visit the office or use online banking.', category: 'URGENT', authorId: '2', authorName: 'Prof. Nasreen Ahmed', isPinned: true, targetAudience: 'All Students', attachments: [
    { id: 'a1', name: 'Fee_Structure_2024.pdf', url: '#', type: 'pdf', size: '245 KB' },
    { id: 'a2', name: 'Payment_Guidelines.pdf', url: '#', type: 'pdf', size: '120 KB' },
  ], viewCount: 342, createdAt: '2024-06-10T09:00:00', updatedAt: '2024-06-10T09:00:00' },
  { id: 'n2', title: 'Cultural Night - Registration Open', content: 'Annual cultural night will be held on July 15, 2024. Students interested in performing can register at the office by July 5.', category: 'EVENT', authorId: '2', authorName: 'Prof. Nasreen Ahmed', isPinned: true, targetAudience: 'All', attachments: [
    { id: 'a3', name: 'Cultural_Night_Schedule.pdf', url: '#', type: 'pdf', size: '180 KB' },
  ], viewCount: 189, createdAt: '2024-06-12T11:00:00', updatedAt: '2024-06-12T11:00:00' },
  { id: 'n3', title: 'Water Supply Maintenance', content: 'Water supply will be temporarily disrupted on Saturday, June 22 from 8 AM to 12 PM for tank cleaning and pipe maintenance.', category: 'MAINTENANCE', authorId: '1', authorName: 'Dr. Fatima Rahman', isPinned: false, targetAudience: 'All', attachments: [], viewCount: 267, createdAt: '2024-06-14T14:00:00', updatedAt: '2024-06-14T14:00:00' },
  { id: 'n4', title: 'New WiFi Password', content: 'The WiFi password has been updated. New password: HallWiFi@2024. Please connect with SSID "UnivWomensHall".', category: 'GENERAL', authorId: '8', authorName: 'Mrs. Rehana Parvin', isPinned: false, targetAudience: 'All', attachments: [], viewCount: 412, createdAt: '2024-06-08T10:00:00', updatedAt: '2024-06-08T10:00:00' },
  { id: 'n5', title: 'Exam Schedule Reminder', content: 'Final exams begin on July 1, 2024. Study hours (10 PM - 6 AM) will be strictly enforced. Quiet hours must be maintained.', category: 'ACADEMIC', authorId: '2', authorName: 'Prof. Nasreen Ahmed', isPinned: false, targetAudience: 'All Students', attachments: [
    { id: 'a4', name: 'Exam_Timetable_Summer2024.pdf', url: '#', type: 'pdf', size: '310 KB' },
  ], viewCount: 298, createdAt: '2024-06-15T08:00:00', updatedAt: '2024-06-15T08:00:00' },
];

export const mockNotifications: Notification[] = [
  { id: 'nf1', title: 'New Student Registered', message: 'Anika Islam has been assigned to Room 301', type: 'info', read: false, createdAt: '2024-06-15T10:30:00' },
  { id: 'nf2', title: 'Maintenance Request', message: 'Room 205 reported AC malfunction', type: 'warning', read: false, createdAt: '2024-06-15T09:15:00' },
  { id: 'nf3', title: 'Room Transfer Complete', message: 'Tasnia Haque transferred to Room 401', type: 'success', read: true, createdAt: '2024-06-14T16:00:00' },
  { id: 'nf4', title: 'Security Alert', message: 'Late entry recorded at Gate 2', type: 'error', read: true, createdAt: '2024-06-14T23:30:00' },
  { id: 'nf5', title: 'Application Approved', message: 'Your room transfer application has been approved', type: 'success', read: false, link: '/complaints/app2', createdAt: '2024-06-15T11:00:00' },
  { id: 'nf6', title: 'Complaint Update', message: 'Your complaint #CMP1 has been assigned to maintenance', type: 'info', read: false, link: '/complaints/cmp1', createdAt: '2024-06-15T12:30:00' },
  { id: 'nf7', title: 'Fee Payment Due', message: 'Hall fee payment due by June 30, 2024', type: 'warning', read: true, link: '/fees', createdAt: '2024-06-10T09:00:00' },
];

export const mockMealMenus: MealMenu[] = [
  { id: 'mm1', date: '2024-06-17', meals: [{ type: 'BREAKFAST', items: ['Toast', 'Egg', 'Tea'] }, { type: 'LUNCH', items: ['Rice', 'Fish Curry', 'Dal', 'Salad'] }, { type: 'SNACKS', items: ['Singara', 'Tea'] }, { type: 'DINNER', items: ['Rice', 'Chicken Curry', 'Vegetables'] }] },
  { id: 'mm2', date: '2024-06-18', meals: [{ type: 'BREAKFAST', items: ['Paratha', 'Bhaji', 'Tea'] }, { type: 'LUNCH', items: ['Khichuri', 'Egg', 'Salad'] }, { type: 'SNACKS', items: ['Piyaju', 'Tea'] }, { type: 'DINNER', items: ['Rice', 'Beef Curry', 'Dal'] }] },
  { id: 'mm3', date: '2024-06-19', meals: [{ type: 'BREAKFAST', items: ['Bread', 'Jam', 'Banana', 'Milk'] }, { type: 'LUNCH', items: ['Rice', 'Prawn Curry', 'Bhaji'] }, { type: 'SNACKS', items: ['Cake', 'Tea'] }, { type: 'DINNER', items: ['Biryani', 'Raita', 'Salad'] }] },
];

export const mockGuestMeals: GuestMeal[] = [
  { id: 'gm1', studentId: '4', studentName: 'Anika Islam', date: '2024-06-18', mealType: 'LUNCH', guestCount: 2, guestNames: ['Nasima Begum', 'Karim Islam'], status: 'APPROVED', createdAt: '2024-06-16T10:00:00' },
  { id: 'gm2', studentId: '5', studentName: 'Tasnia Haque', date: '2024-06-19', mealType: 'DINNER', guestCount: 1, guestNames: ['Rina Haque'], status: 'PENDING', createdAt: '2024-06-17T08:00:00' },
];

export const mockMealFeedback: MealFeedback[] = [
  { id: 'mf1', studentId: '4', studentName: 'Anika Islam', date: '2024-06-17', mealType: 'LUNCH', rating: 4, comment: 'Fish curry was excellent!', createdAt: '2024-06-17T14:00:00' },
  { id: 'mf2', studentId: '5', studentName: 'Tasnia Haque', date: '2024-06-17', mealType: 'DINNER', rating: 2, comment: 'Too spicy and not enough rice.', createdAt: '2024-06-17T21:00:00' },
  { id: 'mf3', studentId: '6', studentName: 'Raisa Kabir', date: '2024-06-17', mealType: 'LUNCH', rating: 5, comment: 'Best meal this week!', createdAt: '2024-06-17T13:30:00' },
];

export const mockVisitors: Visitor[] = [
  { id: 'v1', visitorName: 'Mrs. Nasima Begum', visitorPhone: '01900000001', visitorIdType: 'NID', visitorIdNumber: '1234567890', studentId: '4', studentName: 'Anika Islam', purpose: 'Parent visit', entryTime: '2024-06-17T10:00:00', exitTime: '2024-06-17T17:00:00', status: 'CHECKED_OUT', passCode: 'VP-2024-001', guardId: '9', createdAt: '2024-06-17T10:00:00' },
  { id: 'v2', visitorName: 'Rina Haque', visitorPhone: '01900000002', visitorIdType: 'Student ID', visitorIdNumber: '2024200010', studentId: '5', studentName: 'Tasnia Haque', purpose: 'Sibling visit', entryTime: '2024-06-17T14:00:00', status: 'CHECKED_IN', passCode: 'VP-2024-002', guardId: '9', createdAt: '2024-06-17T14:00:00' },
  { id: 'v3', visitorName: 'Dr. Amin', visitorPhone: '01900000003', visitorIdType: 'NID', visitorIdNumber: '9876543210', studentId: '6', studentName: 'Raisa Kabir', purpose: 'Medical consultation', entryTime: '2024-06-16T11:00:00', exitTime: '2024-06-16T12:30:00', status: 'CHECKED_OUT', passCode: 'VP-2024-003', guardId: '9', createdAt: '2024-06-16T11:00:00' },
  { id: 'v4', visitorName: 'Ms. Fatema', visitorPhone: '01900000004', visitorIdType: 'Passport', visitorIdNumber: 'BD12345678', studentId: '14', studentName: 'Sadia Akter', purpose: 'Friend visit', entryTime: '2024-06-17T15:00:00', status: 'CHECKED_IN', passCode: 'VP-2024-004', guardId: '9', createdAt: '2024-06-17T15:00:00' },
];

export const mockAttendance: AttendanceRecord[] = mockUsers
  .filter(u => u.role === 'STUDENT')
  .flatMap(u => {
    // Find room, derive floor
    const room = mockRooms.find(r => r.id === u.roomId);
    const floor = room ? room.floor : 3;
    return Array.from({ length: 7 }, (_, i) => ({
      id: `att-${u.id}-${i}`,
      studentId: u.id,
      studentName: u.name,
      date: `2024-06-${String(11 + i).padStart(2, '0')}`,
      status: (Math.random() > 0.15 ? 'PRESENT' : Math.random() > 0.5 ? 'ABSENT' : 'LEAVE') as AttendanceRecord['status'],
      markedBy: getHouseTutorForFloor(floor)?.id || 'ht3',
      floor,
    }));
  });

export const mockLeaveApplications: LeaveApplication[] = [
  { id: 'lv1', studentId: '4', studentName: 'Anika Islam', type: 'MEDICAL', fromDate: '2024-06-20', toDate: '2024-06-22', reason: 'Doctor appointment and rest.', documents: [], status: 'APPROVED', approvedBy: 'ht3', notes: 'Medical certificate verified.', createdAt: '2024-06-18T09:00:00' },
  { id: 'lv2', studentId: '14', studentName: 'Sadia Akter', type: 'PERSONAL', fromDate: '2024-06-25', toDate: '2024-06-27', reason: 'Family event at hometown.', documents: [], status: 'PENDING', createdAt: '2024-06-17T15:00:00' },
  { id: 'lv3', studentId: '6', studentName: 'Raisa Kabir', type: 'ACADEMIC', fromDate: '2024-06-22', toDate: '2024-06-22', reason: 'Academic conference at another university.', documents: [], status: 'APPROVED', approvedBy: '2', createdAt: '2024-06-16T10:00:00' },
];

// Seat rent reduced to 50%: 1200 → 600
export const mockFees: Fee[] = [
  { id: 'f1', type: 'SEAT_RENT', name: 'Monthly Seat Rent', amount: 600, dueDate: '2024-06-30', applicableTo: 'All Students' },
  { id: 'f2', type: 'UTILITY', name: 'Utility Bill (June)', amount: 500, dueDate: '2024-06-30', applicableTo: 'All Students' },
  { id: 'f3', type: 'DINING', name: 'Dining Charge (June)', amount: 3000, dueDate: '2024-06-30', applicableTo: 'Full Board Plan' },
  { id: 'f4', type: 'OTHER', name: 'Development Fund', amount: 2000, dueDate: '2024-07-15', applicableTo: 'All Students' },
];

export const mockBills: Bill[] = [
  { id: 'b1', studentId: '4', studentName: 'Anika Islam', feeId: 'f1', feeName: 'Monthly Seat Rent', amount: 600, dueDate: '2024-06-30', status: 'PAID', paidAt: '2024-06-20T10:00:00', paymentMethod: 'ONLINE', referenceNumber: 'TXN-2024-001', createdAt: '2024-06-01' },
  { id: 'b2', studentId: '4', studentName: 'Anika Islam', feeId: 'f2', feeName: 'Utility Bill', amount: 500, dueDate: '2024-06-30', status: 'PENDING', createdAt: '2024-06-01' },
  { id: 'b3', studentId: '5', studentName: 'Tasnia Haque', feeId: 'f1', feeName: 'Monthly Seat Rent', amount: 600, dueDate: '2024-06-30', status: 'OVERDUE', createdAt: '2024-06-01' },
  { id: 'b4', studentId: '6', studentName: 'Raisa Kabir', feeId: 'f1', feeName: 'Monthly Seat Rent', amount: 600, dueDate: '2024-06-30', status: 'PAID', paidAt: '2024-06-18T14:00:00', paymentMethod: 'BANK_TRANSFER', referenceNumber: 'TXN-2024-002', createdAt: '2024-06-01' },
  { id: 'b5', studentId: '14', studentName: 'Sadia Akter', feeId: 'f1', feeName: 'Monthly Seat Rent', amount: 600, dueDate: '2024-06-30', status: 'PENDING', createdAt: '2024-06-01' },
];

export const mockEvents: HallEvent[] = [
  { id: 'ev1', title: 'Annual Cultural Night', category: 'CULTURAL', description: 'Join us for an evening of music, dance, and drama performances by hall residents.', date: '2024-07-15', time: '18:00', venue: 'Hall Auditorium', organizerId: '2', organizerName: 'Prof. Nasreen Ahmed', maxAttendees: 300, registeredCount: 145, registrationRequired: true, createdAt: '2024-06-01' },
  { id: 'ev2', title: 'Indoor Badminton Tournament', category: 'SPORTS', description: 'Inter-floor badminton tournament. Singles and doubles categories.', date: '2024-07-05', time: '09:00', venue: 'Hall Sports Complex', organizerId: '12', organizerName: 'Ms. Ayesha Siddiqui', maxAttendees: 50, registeredCount: 32, registrationRequired: true, createdAt: '2024-06-10' },
  { id: 'ev3', title: 'Career Guidance Seminar', category: 'ACADEMIC', description: 'Industry experts will share insights on career planning and job market trends.', date: '2024-07-10', time: '15:00', venue: 'Conference Room', organizerId: '2', organizerName: 'Prof. Nasreen Ahmed', maxAttendees: 100, registeredCount: 67, registrationRequired: false, createdAt: '2024-06-12' },
  { id: 'ev4', title: 'Movie Night - Eid Special', category: 'SOCIAL', description: 'Celebrating Eid with a movie screening and snacks.', date: '2024-06-25', time: '19:00', venue: 'Common Room', organizerId: '8', organizerName: 'Mrs. Rehana Parvin', registeredCount: 0, registrationRequired: false, createdAt: '2024-06-15' },
  { id: 'ev5', title: 'Hall Day Celebration', category: 'OFFICIAL', description: 'Annual Hall Day with prize distribution and guest lecture.', date: '2024-08-01', time: '10:00', venue: 'Main Auditorium', organizerId: '2', organizerName: 'Prof. Nasreen Ahmed', maxAttendees: 500, registeredCount: 210, registrationRequired: true, createdAt: '2024-06-05' },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'al1', userId: '1', userName: 'Dr. Fatima Rahman', action: 'CREATE', resource: 'User', details: 'Created user Anika Islam', ipAddress: '192.168.1.10', createdAt: '2024-06-15T10:30:00' },
  { id: 'al2', userId: '1', userName: 'Dr. Fatima Rahman', action: 'UPDATE', resource: 'Room', details: 'Assigned Room 301 to Anika Islam', ipAddress: '192.168.1.10', createdAt: '2024-06-15T10:35:00' },
  { id: 'al3', userId: '2', userName: 'Prof. Nasreen Ahmed', action: 'APPROVE', resource: 'Application', details: 'Approved transfer application #APP2', ipAddress: '192.168.1.15', createdAt: '2024-06-14T14:00:00' },
  { id: 'al4', userId: '9', userName: 'Mr. Karim', action: 'CREATE', resource: 'Visitor', details: 'Registered visitor Mrs. Nasima Begum', ipAddress: '192.168.1.50', createdAt: '2024-06-17T10:00:00' },
  { id: 'al5', userId: 'ht3', userName: 'Ms. Sultana Begum', action: 'UPDATE', resource: 'Attendance', details: 'Marked attendance for Floor 3', ipAddress: '192.168.1.20', createdAt: '2024-06-17T09:00:00' },
];

export const mockMealCancellations: MealCancellation[] = [
  { id: 'mc1', studentId: '4', studentName: 'Anika Islam', date: '2024-06-18', mealType: 'LUNCH', cancelledAt: '2024-06-17T10:00:00' },
  { id: 'mc2', studentId: '5', studentName: 'Tasnia Haque', date: '2024-06-18', mealType: 'DINNER', reason: 'Going home', cancelledAt: '2024-06-17T08:00:00' },
  { id: 'mc3', studentId: '4', studentName: 'Anika Islam', date: '2024-06-19', mealType: 'BREAKFAST', cancelledAt: '2024-06-17T10:00:00' },
  { id: 'mc4', studentId: '6', studentName: 'Raisa Kabir', date: '2024-06-18', mealType: 'BREAKFAST', reason: 'Fasting', cancelledAt: '2024-06-16T20:00:00' },
];

export const mockHallOffMeals: HallOffMeal[] = [
  { id: 'ho1', date: '2024-06-25', mealType: 'LUNCH', reason: 'Eid vacation - Hall closed', createdBy: '10', createdAt: '2024-06-20T10:00:00' },
  { id: 'ho2', date: '2024-06-25', mealType: 'DINNER', reason: 'Eid vacation - Hall closed', createdBy: '10', createdAt: '2024-06-20T10:00:00' },
];

export const mockCurrentUser: User = mockUsers[0];

export const getDemoUser = (role: UserRole): User => {
  const found = mockUsers.find(u => u.role === role);
  return found || mockUsers[0];
};

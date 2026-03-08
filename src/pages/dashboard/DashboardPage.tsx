import { useAuthStore } from '@/store/auth.store';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { HouseTutorDashboard } from '@/components/dashboard/HouseTutorDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { StaffDashboard } from '@/components/dashboard/StaffDashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;

  switch (user.role) {
    case 'SUPER_ADMIN':
    case 'PROVOST':
      return <AdminDashboard />;
    case 'HOUSE_TUTOR':
      return <HouseTutorDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    default:
      return <StaffDashboard />;
  }
}

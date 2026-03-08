import { useAuthStore } from '@/store/auth.store';
import { mockRooms } from '@/lib/mock-data';
import RoomsListPage from './RoomsListPage';

export default function MyFloorPage() {
  const { user } = useAuthStore();
  // This page reuses the rooms list but filtered to the tutor's floor
  // In a real app, this would call roomsService.getMyFloor()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Floor (Floor {user?.assignedFloor || 3})</h1>
        <p className="text-muted-foreground">Manage rooms on your assigned floor</p>
      </div>
      <RoomsListPage />
    </div>
  );
}

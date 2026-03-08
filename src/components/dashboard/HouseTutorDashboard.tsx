import { Users, BedDouble, DoorOpen, Wrench, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { mockRooms, mockUsers } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function HouseTutorDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const floor = user?.assignedFloor ?? 1;

  const { floorRooms, floorStudents } = useMemo(() => {
    const rooms = mockRooms.filter(r => r.floor === floor);
    // Collect unique students from room occupants on this floor
    const studentIds = new Set<string>();
    const students: typeof mockUsers = [];
    for (const room of rooms) {
      for (const o of room.occupants) {
        if (!studentIds.has(o.id)) { studentIds.add(o.id); students.push(o); }
      }
    }
    return { floorRooms: rooms, floorStudents: students };
  }, [floor]);

  const stats = [
    { label: `Floor ${floor} Overview`, value: `${floorRooms.length} Rooms`, icon: BedDouble, color: 'bg-primary/10 text-primary' },
    { label: 'Students on Floor', value: floorStudents.length, icon: Users, color: 'bg-success/10 text-success' },
    { label: 'Vacant Rooms', value: floorRooms.filter(r => r.status === 'AVAILABLE').length, icon: DoorOpen, color: 'bg-warning/10 text-warning' },
    { label: 'Maintenance Requests', value: floorRooms.filter(r => r.status === 'MAINTENANCE').length, icon: Wrench, color: 'bg-rose/10 text-rose' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Floor {floor} Dashboard</h1>
        <p className="text-muted-foreground">Manage your assigned floor</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-5">
                <div className={`p-2.5 rounded-xl w-fit ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/rooms/my-floor')}><BedDouble className="mr-2 h-4 w-4" /> View My Floor</Button>
          <Button variant="outline" onClick={() => navigate('/rooms/vacant')}><UserPlus className="mr-2 h-4 w-4" /> Assign Student</Button>
        </CardContent>
      </Card>
    </div>
  );
}

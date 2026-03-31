import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRooms } from '@/lib/mock-data';
import { FLOORS } from '@/constants';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ROOM_TYPE_LABELS: Record<string, string> = {
  SINGLE: 'Single', DOUBLE: 'Double', TRIPLE: 'Triple', FOUR_SHARING: '4-Sharing',
};

export default function VacantRoomsPage() {
  const navigate = useNavigate();
  const [floorFilter, setFloorFilter] = useState<string>('all');

  const vacant = mockRooms.filter(r => {
    const hasSpace = r.vacantBeds.length > 0;
    const matchFloor = floorFilter === 'all' || r.floor === Number(floorFilter);
    return hasSpace && matchFloor;
  });

  const vacantByFloor = FLOORS.map(f => ({
    floor: f,
    beds: mockRooms.filter(r => r.floor === f).reduce((sum, r) => sum + r.vacantBeds.length, 0),
  })).filter(f => f.beds > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vacant Rooms</h1>
          <p className="text-muted-foreground">Rooms with available beds</p>
        </div>
        <Select value={floorFilter} onValueChange={setFloorFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Floor" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {FLOORS.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Vacant Beds Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {vacantByFloor.map(f => (
              <Badge key={f.floor} variant="secondary" className="text-sm py-1 px-3">
                Floor {f.floor}: {f.beds} bed{f.beds > 1 ? 's' : ''}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {vacant.map((room, i) => (
          <motion.div key={room.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold">{room.roomNumber}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">Floor {room.floor}</Badge>
                      <Badge variant="outline" className="text-xs">Wing {room.wing}</Badge>
                    </div>
                  </div>
                  <Badge className="bg-success/15 text-success border-success/30 text-xs">
                    {room.vacantBeds.length} bed{room.vacantBeds.length > 1 ? 's' : ''} free
                  </Badge>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <div className="flex justify-between text-muted-foreground"><span>Type</span><span className="text-foreground">{ROOM_TYPE_LABELS[room.roomType]}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Occupancy</span><span className="text-foreground">{room.currentOccupancy}/{room.capacity}</span></div>
                </div>
                <Button size="sm" className="w-full" onClick={() => navigate(`/rooms/${room.id}`)}>
                  <UserPlus className="mr-2 h-4 w-4" /> Assign Student
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

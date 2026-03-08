import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, DoorOpen, Wrench, BedDouble } from 'lucide-react';
import { mockRooms } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

export default function RoomStatisticsPage() {
  const total = mockRooms.length;
  const occupied = mockRooms.filter(r => r.status === 'OCCUPIED').length;
  const available = mockRooms.filter(r => r.status === 'AVAILABLE').length;
  const maintenance = mockRooms.filter(r => r.status === 'MAINTENANCE').length;

  const stats = [
    { label: 'Total Rooms', value: total, icon: Building, color: 'bg-primary/10 text-primary' },
    { label: 'Occupied', value: occupied, icon: BedDouble, color: 'bg-rose/10 text-rose' },
    { label: 'Available', value: available, icon: DoorOpen, color: 'bg-success/10 text-success' },
    { label: 'Maintenance', value: maintenance, icon: Wrench, color: 'bg-warning/10 text-warning' },
  ];

  const typeData = [
    { name: 'Single', value: mockRooms.filter(r => r.type === 'SINGLE').length, color: 'hsl(252, 56%, 57%)' },
    { name: 'Double', value: mockRooms.filter(r => r.type === 'DOUBLE').length, color: 'hsl(340, 65%, 60%)' },
    { name: 'Triple', value: mockRooms.filter(r => r.type === 'TRIPLE').length, color: 'hsl(174, 50%, 45%)' },
    { name: 'Quad', value: mockRooms.filter(r => r.type === 'QUAD').length, color: 'hsl(38, 92%, 50%)' },
  ];

  const floorData = Array.from({ length: 7 }, (_, i) => ({
    floor: `F${i + 1}`,
    rooms: mockRooms.filter(r => r.floor === i + 1).length,
  }));

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Room Statistics</h1><p className="text-muted-foreground">Overview of room occupancy and distribution</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card><CardContent className="p-5">
              <div className={`p-2.5 rounded-xl w-fit ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div className="mt-3"><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Rooms by Type</CardTitle></CardHeader>
          <CardContent><div className="h-56">
            <ResponsiveContainer width="100%" height="100%"><PieChart>
              <Pie data={typeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                {typeData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie><Tooltip />
            </PieChart></ResponsiveContainer>
          </div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Rooms by Floor</CardTitle></CardHeader>
          <CardContent><div className="h-56">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={floorData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 12 }} /><YAxis dataKey="floor" type="category" tick={{ fontSize: 12 }} />
              <Tooltip /><Bar dataKey="rooms" fill="hsl(252, 56%, 57%)" radius={[0, 4, 4, 0]} />
            </BarChart></ResponsiveContainer>
          </div></CardContent>
        </Card>
      </div>
    </div>
  );
}

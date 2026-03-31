import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List, Building, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRooms } from '@/lib/mock-data';
import { STATUS_COLORS, FLOORS } from '@/constants';
import { motion } from 'framer-motion';

const ROOM_TYPE_LABELS: Record<string, string> = {
  SINGLE: 'Single', DOUBLE: 'Double', TRIPLE: 'Triple', FOUR_SHARING: '4-Sharing',
};

export default function RoomsListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = mockRooms.filter(r => {
    const matchSearch = !search || r.roomNumber.includes(search);
    const matchFloor = floorFilter === 'all' || r.floor === Number(floorFilter);
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchFloor && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">Manage hall rooms and assignments</p>
        </div>
        <Button size="sm" onClick={() => navigate('/rooms/new')}><Plus className="mr-2 h-4 w-4" /> Add Room</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search room number..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={floorFilter} onValueChange={setFloorFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Floor" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {FLOORS.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[170px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="OCCUPIED">Occupied</SelectItem>
            <SelectItem value="PARTIALLY_OCCUPIED">Partially Occupied</SelectItem>
            <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
            <SelectItem value="RESERVED">Reserved</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border rounded-lg overflow-hidden">
          <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" className="rounded-none" onClick={() => setViewMode('grid')}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" className="rounded-none" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((room, i) => (
            <motion.div key={room.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/rooms/${room.id}`)}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold">{room.roomNumber}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs">Floor {room.floor}</Badge>
                        <Badge variant="outline" className="text-xs">Wing {room.wing}</Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${STATUS_COLORS[room.status]}`}>{room.status.replace('_', ' ')}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Type</span><span className="font-medium text-foreground">{ROOM_TYPE_LABELS[room.roomType]}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Occupancy</span><span className="font-medium text-foreground">{room.currentOccupancy}/{room.capacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Room</TableHead><TableHead>Floor</TableHead><TableHead>Wing</TableHead><TableHead>Type</TableHead><TableHead>Occupancy</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(room => (
                  <TableRow key={room.id} className="cursor-pointer" onClick={() => navigate(`/rooms/${room.id}`)}>
                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>{room.wing}</TableCell>
                    <TableCell>{ROOM_TYPE_LABELS[room.roomType]}</TableCell>
                    <TableCell>{room.currentOccupancy}/{room.capacity}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[room.status]}`}>{room.status.replace('_', ' ')}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

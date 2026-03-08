import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List, Building, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRooms } from '@/lib/mock-data';
import { STATUS_COLORS, FLOORS } from '@/constants';
import { motion } from 'framer-motion';

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
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="OCCUPIED">Occupied</SelectItem>
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
                      <Badge variant="secondary" className="text-xs mt-1">Floor {room.floor}</Badge>
                    </div>
                    <Badge variant="outline" className={`text-xs ${STATUS_COLORS[room.status]}`}>{room.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Type</span><span className="font-medium text-foreground">{room.type}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Capacity</span><span className="font-medium text-foreground">{room.occupants.length}/{room.capacity}</span>
                    </div>
                  </div>
                  {room.occupants.length > 0 && (
                    <div className="flex -space-x-2 mt-3">
                      {room.occupants.slice(0, 3).map((o, j) => (
                        <Avatar key={j} className="h-7 w-7 border-2 border-card">
                          <AvatarImage src={o.avatar} />
                          <AvatarFallback className="text-[10px]">{o.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {room.occupants.length > 3 && <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium border-2 border-card">+{room.occupants.length - 3}</div>}
                    </div>
                  )}
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
                <TableRow><TableHead>Room</TableHead><TableHead>Floor</TableHead><TableHead>Type</TableHead><TableHead>Occupancy</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(room => (
                  <TableRow key={room.id} className="cursor-pointer" onClick={() => navigate(`/rooms/${room.id}`)}>
                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.occupants.length}/{room.capacity}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[room.status]}`}>{room.status}</Badge></TableCell>
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

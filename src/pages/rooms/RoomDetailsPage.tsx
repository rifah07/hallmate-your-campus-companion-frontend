import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, UserPlus, UserMinus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRooms } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ROOM_TYPE_LABELS: Record<string, string> = {
  SINGLE: 'Single', DOUBLE: 'Double', TRIPLE: 'Triple', FOUR_SHARING: '4-Sharing',
};

export default function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = mockRooms.find(r => r.id === id) || mockRooms[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/rooms')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Room {room.roomNumber}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          ['Room', room.roomNumber],
          ['Floor', String(room.floor)],
          ['Wing', room.wing],
          ['Type', ROOM_TYPE_LABELS[room.roomType]],
          ['Status', room.status.replace('_', ' ')],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-bold mt-1">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'AC', active: room.hasAC },
          { label: 'Balcony', active: room.hasBalcony },
          { label: 'Attached Bath', active: room.hasAttachedBath },
        ].map(f => (
          <Badge key={f.label} variant={f.active ? 'default' : 'secondary'} className="justify-center py-2">
            {f.label}: {f.active ? 'Yes' : 'No'}
          </Badge>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Occupants ({room.currentOccupancy}/{room.capacity})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {(room.occupants || []).map(o => (
            <div key={o.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={o.avatar} />
                  <AvatarFallback>{o.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{o.name}</p>
                  <p className="text-xs text-muted-foreground">{o.universityId} · Bed {o.bedNumber}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive"><UserMinus className="h-4 w-4" /></Button>
            </div>
          ))}

          {room.vacantBeds.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-dashed">
                  <UserPlus className="mr-2 h-4 w-4" /> Assign Student ({room.vacantBeds.length} bed{room.vacantBeds.length > 1 ? 's' : ''} available)
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Assign Student</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Student ID (UUID)</Label><Input placeholder="Enter student user ID" /></div>
                  <div className="space-y-2">
                    <Label>Bed Number</Label>
                    <div className="flex gap-2">
                      {room.vacantBeds.map(b => (
                        <Badge key={b} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-3 py-1">
                          Bed {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Confirm Assignment</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Maintenance History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Issue</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>AC repair</TableCell><TableCell>May 2024</TableCell><TableCell><Badge className="bg-success/15 text-success text-xs">Resolved</Badge></TableCell></TableRow>
              <TableRow><TableCell>Plumbing</TableCell><TableCell>Feb 2024</TableCell><TableCell><Badge className="bg-success/15 text-success text-xs">Resolved</Badge></TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

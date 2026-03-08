import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Key, Trash2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUsers } from '@/lib/mock-data';
import { ROLE_LABELS, ROLE_COLORS, STATUS_COLORS } from '@/constants';

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/users')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/users/${id}/edit`)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="outline" size="sm"><Key className="mr-2 h-4 w-4" /> Reset Password</Button>
          <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={ROLE_COLORS[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                <Badge variant="outline" className={STATUS_COLORS[user.status]}>{user.status}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rooms">Room History</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {[
                  ['University ID', user.universityId],
                  ['Phone', user.phone || '—'],
                  ['Blood Group', user.bloodGroup || '—'],
                  ['Department', user.department || '—'],
                  ['Year', user.year ? `Year ${user.year}` : '—'],
                  ['Program', user.program || '—'],
                  ['Session', user.session || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Emergency Contact</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{user.emergencyContactName || '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{user.emergencyContactPhone || '—'}</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Room</TableHead><TableHead>Floor</TableHead><TableHead>From</TableHead><TableHead>To</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>301</TableCell><TableCell>3</TableCell><TableCell>Jan 2024</TableCell><TableCell>Present</TableCell></TableRow>
                  <TableRow><TableCell>205</TableCell><TableCell>2</TableCell><TableCell>Aug 2023</TableCell><TableCell>Dec 2023</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6 space-y-4">
              {['Account created', 'Room 205 assigned', 'Transferred to Room 301', 'Profile updated'].map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm font-medium">{act}</p>
                    <p className="text-xs text-muted-foreground">{i + 1} months ago</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

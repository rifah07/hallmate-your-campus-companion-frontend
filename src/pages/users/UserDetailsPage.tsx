import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Edit, Key, Trash2, Shield, Upload, RotateCcw, UserCog, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockUsers } from '@/lib/mock-data';
import { ROLE_LABELS, ROLE_COLORS, STATUS_COLORS, ALL_ROLES } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import type { UserRole, UserStatus } from '@/types';

const ALL_STATUSES: UserStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'GRADUATED', 'SEAT_CANCELLED'];

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [selectedStatus, setSelectedStatus] = useState(user.status);

  const handleDelete = () => {
    // Ready for API: DELETE /api/users/{userId}
    toast({ title: 'User Deleted', description: `${user.name} has been soft-deleted.` });
    setDeleteOpen(false);
    navigate('/users');
  };

  const handleRoleChange = () => {
    // Ready for API: PATCH /api/users/{userId}/role
    toast({ title: 'Role Updated', description: `Role changed to ${ROLE_LABELS[selectedRole]}` });
    setRoleOpen(false);
  };

  const handleStatusChange = () => {
    // Ready for API: PATCH /api/users/{userId}/status
    toast({ title: 'Status Updated', description: `Status changed to ${selectedStatus}` });
    setStatusOpen(false);
  };

  const handleRestore = () => {
    // Ready for API: POST /api/users/{userId}/restore
    toast({ title: 'User Restored', description: `${user.name} has been restored.` });
  };

  const handleProfilePicture = () => {
    // Ready for API: POST /api/users/{userId}/profile-picture (multipart/form-data)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp,image/gif';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast({ title: 'File Too Large', description: 'Max 5MB allowed', variant: 'destructive' });
          return;
        }
        toast({ title: 'Profile Picture Updated', description: 'Photo uploaded to Cloudinary' });
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/users')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold">User Details</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => navigate(`/users/${id}/edit`)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="outline" size="sm"><Key className="mr-2 h-4 w-4" /> Reset Password</Button>

          {/* Role Change Dialog */}
          <Dialog open={roleOpen} onOpenChange={setRoleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><UserCog className="mr-2 h-4 w-4" /> Change Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change User Role</DialogTitle>
                <DialogDescription>Update the role for {user.name}. This affects their access permissions.</DialogDescription>
              </DialogHeader>
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ALL_ROLES.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}</SelectContent>
              </Select>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRoleOpen(false)}>Cancel</Button>
                <Button onClick={handleRoleChange}>Update Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Status Change Dialog */}
          <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><Shield className="mr-2 h-4 w-4" /> Change Status</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Account Status</DialogTitle>
                <DialogDescription>Update the account status for {user.name}.</DialogDescription>
              </DialogHeader>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as UserStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ALL_STATUSES.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}</SelectContent>
              </Select>
              <DialogFooter>
                <Button variant="outline" onClick={() => setStatusOpen(false)}>Cancel</Button>
                <Button onClick={handleStatusChange}>Update Status</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={handleRestore}><RotateCcw className="mr-2 h-4 w-4" /> Restore</Button>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  This will soft-delete {user.name}. Their email and phone will be anonymized, all sessions revoked, and status set to INACTIVE. This can be undone via Restore.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Confirm Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || user.photo} />
                <AvatarFallback className="text-xl font-display">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <button
                onClick={handleProfilePicture}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-xl font-display font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge className={ROLE_COLORS[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                <Badge variant="outline" className={STATUS_COLORS[user.status]}>{user.status}</Badge>
                {user.assignedFloor && <Badge variant="secondary">Floor {user.assignedFloor}</Badge>}
                {user.designation && <Badge variant="outline">{user.designation}</Badge>}
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
              <CardHeader className="pb-3"><CardTitle className="text-base font-display">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-2.5 text-sm">
                {[
                  ['University ID', user.universityId],
                  ['Phone', user.phone || '—'],
                  ['Blood Group', user.bloodGroup || '—'],
                  ['Department', user.department || '—'],
                  ['Year', user.year ? `Year ${user.year}` : '—'],
                  ['Program', user.program || '—'],
                  ['Session', user.session || '—'],
                  ['Designation', user.designation || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-1 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-base font-display">Emergency Contact</CardTitle></CardHeader>
                <CardContent className="space-y-2.5 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/30"><span className="text-muted-foreground">Name</span><span className="font-medium">{user.emergencyContactName || '—'}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Phone</span><span className="font-medium">{user.emergencyContactPhone || '—'}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-base font-display">Medical Information</CardTitle></CardHeader>
                <CardContent className="space-y-2.5 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/30"><span className="text-muted-foreground">Medical Conditions</span><span className="font-medium">{user.medicalConditions || '—'}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Allergies</span><span className="font-medium">{user.allergies || '—'}</span></div>
                </CardContent>
              </Card>
            </div>
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
              {['Account created', 'Room 205 assigned', 'Transferred to Room 301', 'Profile updated', 'Password reset'].map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
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

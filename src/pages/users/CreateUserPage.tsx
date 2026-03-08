import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ALL_ROLES, ROLE_LABELS, DEPARTMENTS, FLOORS } from '@/constants';
import { ArrowLeft, Save } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  universityId: z.string().min(10).max(10),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  department: z.string().optional(),
  year: z.string().optional(),
  program: z.string().optional(),
  session: z.string().optional(),
  bloodGroup: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  assignedFloor: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedRole = watch('role');

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'User Created', description: `${data.name} has been created successfully.` });
      navigate('/users');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/users')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Create User</h1>
          <p className="text-muted-foreground">Add a new user to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input {...register('name')} placeholder="Enter full name" />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>University ID *</Label>
                    <Input {...register('universityId')} placeholder="10-digit ID" maxLength={10} />
                    {errors.universityId && <p className="text-xs text-destructive">{errors.universityId.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input {...register('email')} type="email" placeholder="email@univ.edu.bd" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input {...register('phone')} placeholder="01XXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Select onValueChange={v => setValue('role', v)}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {ALL_ROLES.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select onValueChange={v => setValue('bloodGroup', v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select onValueChange={v => setValue('department', v)}>
                      <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                      <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Select onValueChange={v => setValue('year', v)}>
                      <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                      <SelectContent>{[1,2,3,4,5].map(y => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Program</Label>
                    <Input {...register('program')} placeholder="e.g., BSc, BA, MSc" />
                  </div>
                  <div className="space-y-2">
                    <Label>Session</Label>
                    <Input {...register('session')} placeholder="e.g., 2021-22" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Emergency Contact Name</Label>
                    <Input {...register('emergencyContactName')} placeholder="Parent/guardian name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Contact Phone</Label>
                    <Input {...register('emergencyContactPhone')} placeholder="01XXXXXXXXX" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6 space-y-4">
                {selectedRole === 'HOUSE_TUTOR' && (
                  <div className="space-y-2">
                    <Label>Assigned Floor</Label>
                    <Select onValueChange={v => setValue('assignedFloor', v)}>
                      <SelectTrigger><SelectValue placeholder="Select floor" /></SelectTrigger>
                      <SelectContent>{FLOORS.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Account will be created with Active status. User will receive login credentials via email.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/users')}>Cancel</Button>
          <Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? 'Creating...' : 'Create User'}</Button>
        </div>
      </form>
    </div>
  );
}

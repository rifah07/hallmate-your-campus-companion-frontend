import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ALL_ROLES, ROLE_LABELS, DEPARTMENTS, FLOORS } from '@/constants';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BLOOD_GROUPS = [
  { value: 'A_POSITIVE', label: 'A+' },
  { value: 'A_NEGATIVE', label: 'A−' },
  { value: 'B_POSITIVE', label: 'B+' },
  { value: 'B_NEGATIVE', label: 'B−' },
  { value: 'O_POSITIVE', label: 'O+' },
  { value: 'O_NEGATIVE', label: 'O−' },
  { value: 'AB_POSITIVE', label: 'AB+' },
  { value: 'AB_NEGATIVE', label: 'AB−' },
];

const PROGRAMS = [
  { value: 'UNDERGRADUATE', label: 'Undergraduate' },
  { value: 'MASTERS', label: 'Masters' },
  { value: 'PHD', label: 'PhD' },
];

const STUDENT_ROLES = ['STUDENT'];
const HOUSE_TUTOR_ROLE = 'HOUSE_TUTOR';
const STAFF_ROLES = ['OFFICE_STAFF', 'DINING_STAFF', 'MAINTENANCE_STAFF', 'GUARD', 'ASSISTANT_WARDEN'];

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be under 100 characters'),
  universityId: z.string().regex(/^\d{10}$/, 'Must be exactly 10 digits'),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().min(1, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
  department: z.string().optional(),
  year: z.string().optional(),
  program: z.string().optional(),
  session: z.string().optional(),
  bloodGroup: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  assignedFloor: z.string().optional(),
  designation: z.string().optional(),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
}).superRefine((data, ctx) => {
  if (STUDENT_ROLES.includes(data.role)) {
    if (!data.department) ctx.addIssue({ code: 'custom', path: ['department'], message: 'Required for students' });
    if (!data.year) ctx.addIssue({ code: 'custom', path: ['year'], message: 'Required for students' });
    if (!data.program) ctx.addIssue({ code: 'custom', path: ['program'], message: 'Required for students' });
    if (!data.session) ctx.addIssue({ code: 'custom', path: ['session'], message: 'Required for students' });
  }
  if (data.role === HOUSE_TUTOR_ROLE && !data.assignedFloor) {
    ctx.addIssue({ code: 'custom', path: ['assignedFloor'], message: 'Required for House Tutors' });
  }
});

type FormData = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{message}</p>;
}

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', universityId: '', email: '', phone: '', role: '' },
  });

  const selectedRole = watch('role');
  const isStudent = STUDENT_ROLES.includes(selectedRole);
  const isHouseTutor = selectedRole === HOUSE_TUTOR_ROLE;
  const isStaff = STAFF_ROLES.includes(selectedRole);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Ready for API: POST /api/users
    setTimeout(() => {
      toast({ title: 'User Created', description: `${data.name} has been created. OTP sent to ${data.email}.` });
      navigate('/users');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/users')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-display font-bold">Create User</h1>
          <p className="text-muted-foreground text-sm">Add a new user to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="academic">
              Academic
              {isStudent && Object.keys(errors).some(k => ['department', 'year', 'program', 'session'].includes(k)) && (
                <span className="ml-1.5 w-2 h-2 bg-destructive rounded-full inline-block" />
              )}
            </TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* ── Basic Info ── */}
          <TabsContent value="basic">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">Personal Details</CardTitle>
                <CardDescription>Required fields are marked with *</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full Name *</Label>
                    <Input {...register('name')} placeholder="Enter full name" />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>University ID *</Label>
                    <Input {...register('universityId')} placeholder="10-digit ID" maxLength={10} />
                    <FieldError message={errors.universityId?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email *</Label>
                    <Input {...register('email')} type="email" placeholder="email@univ.edu.bd" />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone *</Label>
                    <Input {...register('phone')} placeholder="01XXXXXXXXX" />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Role *</Label>
                    <Select onValueChange={v => setValue('role', v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {ALL_ROLES.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.role?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Blood Group</Label>
                    <Select onValueChange={v => setValue('bloodGroup', v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {BLOOD_GROUPS.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedRole && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {isStudent && 'Students require: Department, Year, Program, and Session fields.'}
                      {isHouseTutor && 'House Tutors require: Assigned Floor (1–14).'}
                      {isStaff && 'Staff roles may include: Designation field.'}
                      {!isStudent && !isHouseTutor && !isStaff && 'Fill in additional details as needed.'}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Academic ── */}
          <TabsContent value="academic">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">Academic Information</CardTitle>
                <CardDescription>{isStudent ? 'All fields required for students' : 'Optional for non-student roles'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Department {isStudent && '*'}</Label>
                    <Select onValueChange={v => setValue('department', v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                      <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError message={errors.department?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Year {isStudent && '*'}</Label>
                    <Select onValueChange={v => setValue('year', v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                      <SelectContent>{[1,2,3,4,5].map(y => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError message={errors.year?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Program {isStudent && '*'}</Label>
                    <Select onValueChange={v => setValue('program', v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                      <SelectContent>{PROGRAMS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError message={errors.program?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Session {isStudent && '*'}</Label>
                    <Input {...register('session')} placeholder="e.g., 2020-21" />
                    <FieldError message={errors.session?.message} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Medical ── */}
          <TabsContent value="medical">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">Medical Information</CardTitle>
                <CardDescription>Optional medical details for emergency purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Medical Conditions</Label>
                  <Textarea {...register('medicalConditions')} placeholder="Any known medical conditions..." className="min-h-[80px]" />
                </div>
                <div className="space-y-1.5">
                  <Label>Allergies</Label>
                  <Textarea {...register('allergies')} placeholder="Any known allergies..." className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Contact ── */}
          <TabsContent value="contact">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Emergency Contact Name</Label>
                    <Input {...register('emergencyContactName')} placeholder="Parent/guardian name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Emergency Contact Phone</Label>
                    <Input {...register('emergencyContactPhone')} placeholder="01XXXXXXXXX" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Settings ── */}
          <TabsContent value="settings">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">Role-Specific Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isHouseTutor && (
                  <div className="space-y-1.5">
                    <Label>Assigned Floor *</Label>
                    <Select onValueChange={v => setValue('assignedFloor', v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select floor" /></SelectTrigger>
                      <SelectContent>{FLOORS.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError message={errors.assignedFloor?.message} />
                  </div>
                )}
                {(isStaff || isHouseTutor || ['PROVOST', 'SUPER_ADMIN'].includes(selectedRole)) && (
                  <div className="space-y-1.5">
                    <Label>Designation</Label>
                    <Input {...register('designation')} placeholder="e.g., Associate Professor" />
                  </div>
                )}
                {!isHouseTutor && !isStaff && !['PROVOST', 'SUPER_ADMIN'].includes(selectedRole) && (
                  <p className="text-sm text-muted-foreground">No additional settings required for this role.</p>
                )}
                <div className="bg-muted/50 rounded-lg p-4 mt-2">
                  <p className="text-sm text-muted-foreground">
                    ✉ Account will be created with <strong>Active</strong> status. A one-time password (OTP) will be sent to the user's email. The OTP expires in 7 days.
                  </p>
                </div>
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

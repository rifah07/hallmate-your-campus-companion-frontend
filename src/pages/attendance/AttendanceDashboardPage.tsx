import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { mockUsers, mockAttendance, mockLeaveApplications } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AttendanceDashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const students = mockUsers.filter(u => u.role === 'STUDENT');
  const todayRecords = mockAttendance.filter(a => a.date === '2024-06-17');
  const present = todayRecords.filter(a => a.status === 'PRESENT').length;
  const absent = todayRecords.filter(a => a.status === 'ABSENT').length;
  const onLeave = todayRecords.filter(a => a.status === 'LEAVE').length;

  const stats = [
    { l: 'Total Students', v: students.length, icon: Users, c: 'bg-primary/10 text-primary' },
    { l: 'Present Today', v: present, icon: CheckCircle, c: 'bg-success/10 text-success' },
    { l: 'Absent', v: absent, icon: XCircle, c: 'bg-destructive/10 text-destructive' },
    { l: 'On Leave', v: onLeave, icon: Clock, c: 'bg-warning/10 text-warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold">Attendance</h1><p className="text-muted-foreground">Track student attendance</p></div>
        <div className="flex gap-2"><Button variant="outline" onClick={() => navigate('/attendance/leave')}>Leave Approvals</Button><Button onClick={() => toast({ title: 'Attendance Saved' })}>Save Attendance</Button></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card></motion.div>))}
      </div>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Mark Attendance — Today</CardTitle></CardHeader><CardContent>
        <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead className="w-12">Present</TableHead><TableHead>Student</TableHead><TableHead>Department</TableHead><TableHead>Room</TableHead></TableRow></TableHeader>
          <TableBody>{students.map(s => (
            <TableRow key={s.id}><TableCell><Checkbox defaultChecked={Math.random() > 0.15} /></TableCell><TableCell className="font-medium text-sm">{s.name}</TableCell><TableCell className="text-sm">{s.department || '—'}</TableCell><TableCell className="text-sm">{s.roomId || '—'}</TableCell></TableRow>
          ))}</TableBody></Table></div>
      </CardContent></Card>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Pending Leave Applications</CardTitle></CardHeader><CardContent>
        {mockLeaveApplications.filter(l => l.status === 'PENDING').map(l => (
          <div key={l.id} className="flex items-center justify-between p-3 rounded-lg border mb-2">
            <div><p className="text-sm font-medium">{l.studentName}</p><p className="text-xs text-muted-foreground">{l.type} • {l.fromDate} to {l.toDate}</p><p className="text-xs text-muted-foreground">{l.reason}</p></div>
            <div className="flex gap-1"><Button size="sm" className="bg-success hover:bg-success/90 h-8">Approve</Button><Button size="sm" variant="destructive" className="h-8">Reject</Button></div>
          </div>
        ))}
      </CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockVisitors } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth.store';
import { STATUS_COLORS } from '@/constants';
import { UserPlus, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VisitorsLogPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [statusFilter, setStatusFilter] = useState('all');

  const isStudent = user?.role === 'STUDENT';

  // Students only see their own visitors
  const visitorData = isStudent
    ? mockVisitors.filter(v => v.studentId === user?.id)
    : mockVisitors;

  const filtered = visitorData.filter(v => statusFilter === 'all' || v.status === statusFilter);
  const checkedIn = visitorData.filter(v => v.status === 'CHECKED_IN').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{isStudent ? 'My Visitors' : 'Visitors Log'}</h1>
          <p className="text-muted-foreground">{isStudent ? 'Your visitor records' : 'Track hall visitors'}</p>
        </div>
        {!isStudent && <Button onClick={() => navigate('/visitors/new')}><UserPlus className="mr-2 h-4 w-4" />Register Visitor</Button>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { l: isStudent ? 'My Visitors' : 'Total Today', v: visitorData.length, c: 'text-primary' },
          { l: 'Checked In', v: checkedIn, c: 'text-success' },
          { l: 'Checked Out', v: visitorData.length - checkedIn, c: 'text-muted-foreground' },
        ].map(s => (
          <Card key={s.l}><CardContent className="p-4 text-center"><p className={`text-2xl font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></CardContent></Card>
        ))}
      </div>
      <Card><CardContent className="p-4">
        <div className="flex gap-3 mb-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="CHECKED_IN">Checked In</SelectItem><SelectItem value="CHECKED_OUT">Checked Out</SelectItem></SelectContent></Select>
        </div>
        <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>Visitor</TableHead>{!isStudent && <TableHead>Visiting</TableHead>}<TableHead>Purpose</TableHead><TableHead>Entry</TableHead><TableHead>Status</TableHead>{!isStudent && <TableHead className="w-10"></TableHead>}</TableRow></TableHeader>
          <TableBody>{filtered.length === 0 ? (
            <TableRow><TableCell colSpan={isStudent ? 4 : 6} className="text-center py-8 text-muted-foreground">No visitors found</TableCell></TableRow>
          ) : filtered.map(v => (
            <TableRow key={v.id}>
              <TableCell><p className="font-medium text-sm">{v.visitorName}</p><p className="text-xs text-muted-foreground">{v.visitorPhone}</p></TableCell>
              {!isStudent && <TableCell className="text-sm">{v.studentName}</TableCell>}
              <TableCell className="text-sm">{v.purpose}</TableCell>
              <TableCell className="text-sm">{new Date(v.entryTime).toLocaleTimeString()}</TableCell>
              <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[v.status]}`}>{v.status.replace('_', ' ')}</Badge></TableCell>
              {!isStudent && <TableCell>{v.status === 'CHECKED_IN' && <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Checked Out', description: `${v.visitorName} checked out.` })}><LogOut className="h-4 w-4" /></Button>}</TableCell>}
            </TableRow>
          ))}</TableBody></Table></div>
      </CardContent></Card>
    </div>
  );
}

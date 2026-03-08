import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockApplications } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { motion } from 'framer-motion';

export default function ApplicationsListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const filtered = mockApplications.filter(a => {
    return (statusFilter === 'all' || a.status === statusFilter) && (typeFilter === 'all' || a.type === typeFilter);
  });
  const pending = mockApplications.filter(a => a.status === 'PENDING').length;
  const approved = mockApplications.filter(a => a.status === 'APPROVED').length;
  const rejected = mockApplications.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold">Applications</h1><p className="text-muted-foreground">Manage room applications</p></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[{ l: 'Total', v: mockApplications.length, c: 'text-primary' }, { l: 'Pending', v: pending, c: 'text-warning' }, { l: 'Approved', v: approved, c: 'text-success' }, { l: 'Rejected', v: rejected, c: 'text-destructive' }].map(s => (
          <Card key={s.l}><CardContent className="p-4 text-center"><p className={`text-2xl font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></CardContent></Card>
        ))}
      </div>
      <Card><CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="PENDING">Pending</SelectItem><SelectItem value="APPROVED">Approved</SelectItem><SelectItem value="REJECTED">Rejected</SelectItem></SelectContent></Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="NEW_SEAT">New Seat</SelectItem><SelectItem value="TRANSFER">Transfer</SelectItem><SelectItem value="GUEST_ROOM">Guest Room</SelectItem></SelectContent></Select>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <Table><TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Type</TableHead><TableHead>Preferences</TableHead><TableHead>Status</TableHead><TableHead className="hidden md:table-cell">Date</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
            <TableBody>{filtered.map(app => (
              <TableRow key={app.id} className="cursor-pointer" onClick={() => navigate(`/applications/${app.id}`)}>
                <TableCell><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src={app.studentAvatar} /><AvatarFallback>{app.studentName[0]}</AvatarFallback></Avatar><span className="font-medium text-sm">{app.studentName}</span></div></TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{app.type.replace('_', ' ')}</Badge></TableCell>
                <TableCell className="text-sm">{app.roomPreferences.join(', ') || '—'}</TableCell>
                <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[app.status]}`}>{app.status}</Badge></TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                <TableCell><DropdownMenu><DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => navigate(`/applications/${app.id}`)}><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem><DropdownMenuItem><CheckCircle className="mr-2 h-4 w-4" />Approve</DropdownMenuItem><DropdownMenuItem className="text-destructive"><XCircle className="mr-2 h-4 w-4" />Reject</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
              </TableRow>
            ))}</TableBody></Table>
        </div>
      </CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, MoreHorizontal, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockComplaints } from '@/lib/mock-data';
import { STATUS_COLORS, PRIORITY_COLORS, COMPLAINT_CATEGORIES } from '@/constants';

export default function ComplaintsListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockComplaints.filter(c => {
    const matchS = statusFilter === 'all' || c.status === statusFilter;
    const matchC = categoryFilter === 'all' || c.category === categoryFilter;
    const matchP = priorityFilter === 'all' || c.priority === priorityFilter;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.studentName.toLowerCase().includes(search.toLowerCase());
    return matchS && matchC && matchP && matchSearch;
  });

  const open = mockComplaints.filter(c => c.status === 'OPEN').length;
  const inProgress = mockComplaints.filter(c => c.status === 'IN_PROGRESS').length;
  const resolved = mockComplaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Complaints</h1><p className="text-muted-foreground">Manage student complaints</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ l: 'Total', v: mockComplaints.length, c: 'text-primary' }, { l: 'Open', v: open, c: 'text-primary' }, { l: 'In Progress', v: inProgress, c: 'text-warning' }, { l: 'Resolved', v: resolved, c: 'text-success' }].map(s => (
          <Card key={s.l}><CardContent className="p-4 text-center"><p className={`text-2xl font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></CardContent></Card>
        ))}
      </div>
      <Card><CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search complaints..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="w-[140px]"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{COMPLAINT_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-[130px]"><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent><SelectItem value="all">All Priority</SelectItem><SelectItem value="LOW">Low</SelectItem><SelectItem value="MEDIUM">Medium</SelectItem><SelectItem value="HIGH">High</SelectItem><SelectItem value="URGENT">Urgent</SelectItem></SelectContent></Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="OPEN">Open</SelectItem><SelectItem value="IN_PROGRESS">In Progress</SelectItem><SelectItem value="RESOLVED">Resolved</SelectItem><SelectItem value="CLOSED">Closed</SelectItem></SelectContent></Select>
        </div>
        <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Student</TableHead><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
          <TableBody>{filtered.map(c => (
            <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate(`/complaints/${c.id}`)}>
              <TableCell className="text-xs font-mono">{c.id.toUpperCase()}</TableCell>
              <TableCell><div className="flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarImage src={c.studentAvatar} /><AvatarFallback className="text-xs">{c.studentName[0]}</AvatarFallback></Avatar><span className="text-sm">{c.studentName}</span></div></TableCell>
              <TableCell className="text-sm max-w-[200px] truncate">{c.title}</TableCell>
              <TableCell><Badge variant="secondary" className="text-xs">{c.category}</Badge></TableCell>
              <TableCell><Badge variant="outline" className={`text-xs ${PRIORITY_COLORS[c.priority]}`}>{c.priority}</Badge></TableCell>
              <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[c.status]}`}>{c.status.replace('_', ' ')}</Badge></TableCell>
              <TableCell><DropdownMenu><DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => navigate(`/complaints/${c.id}`)}><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem><DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" />Assign</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
            </TableRow>
          ))}</TableBody></Table></div>
      </CardContent></Card>
    </div>
  );
}

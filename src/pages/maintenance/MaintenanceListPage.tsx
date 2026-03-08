import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockMaintenanceRequests } from '@/lib/mock-data';
import { STATUS_COLORS, PRIORITY_COLORS, MAINTENANCE_TYPES } from '@/constants';

export default function MaintenanceListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const filtered = mockMaintenanceRequests.filter(m => statusFilter === 'all' || m.status === statusFilter);
  const todo = mockMaintenanceRequests.filter(m => m.status === 'TODO');
  const inProg = mockMaintenanceRequests.filter(m => m.status === 'IN_PROGRESS');
  const done = mockMaintenanceRequests.filter(m => m.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold">Maintenance Requests</h1><p className="text-muted-foreground">Track and manage maintenance tasks</p></div>
        <div className="flex gap-2">
          <div className="flex border rounded-lg overflow-hidden">
            <Button variant={view === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => setView('table')}><List className="h-4 w-4 mr-1" />Table</Button>
            <Button variant={view === 'kanban' ? 'default' : 'ghost'} size="sm" onClick={() => setView('kanban')}><LayoutGrid className="h-4 w-4 mr-1" />Kanban</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ l: 'Total', v: mockMaintenanceRequests.length, c: 'text-primary' }, { l: 'To Do', v: todo.length, c: 'text-primary' }, { l: 'In Progress', v: inProg.length, c: 'text-warning' }, { l: 'Completed', v: done.length, c: 'text-success' }].map(s => (
          <Card key={s.l}><CardContent className="p-4 text-center"><p className={`text-2xl font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></CardContent></Card>
        ))}
      </div>

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ title: 'To Do', items: todo, color: 'border-primary/30' }, { title: 'In Progress', items: inProg, color: 'border-warning/30' }, { title: 'Completed', items: done, color: 'border-success/30' }].map(col => (
            <div key={col.title} className={`rounded-lg border-2 ${col.color} p-3`}>
              <h3 className="font-semibold text-sm mb-3">{col.title} ({col.items.length})</h3>
              <div className="space-y-2">{col.items.map(m => (
                <Card key={m.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/maintenance/${m.id}`)}>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium">Room {m.roomNumber}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.description}</p>
                    <div className="flex gap-1 mt-2"><Badge variant="secondary" className="text-[10px]">{m.type}</Badge><Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[m.priority]}`}>{m.priority}</Badge></div>
                  </CardContent>
                </Card>
              ))}</div>
            </div>
          ))}
        </div>
      ) : (
        <Card><CardContent className="p-4">
          <div className="flex gap-3 mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="TODO">To Do</SelectItem><SelectItem value="IN_PROGRESS">In Progress</SelectItem><SelectItem value="COMPLETED">Completed</SelectItem></SelectContent></Select>
          </div>
          <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Room</TableHead><TableHead>Type</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Assignee</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
            <TableBody>{filtered.map(m => (
              <TableRow key={m.id} className="cursor-pointer" onClick={() => navigate(`/maintenance/${m.id}`)}>
                <TableCell className="text-xs font-mono">{m.id.toUpperCase()}</TableCell>
                <TableCell className="font-medium">{m.roomNumber}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{m.type}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={`text-xs ${PRIORITY_COLORS[m.priority]}`}>{m.priority}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[m.status]}`}>{m.status.replace('_', ' ')}</Badge></TableCell>
                <TableCell className="text-sm">{m.assignedToName || '—'}</TableCell>
                <TableCell><Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => { e.stopPropagation(); navigate(`/maintenance/${m.id}`); }}><Eye className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}</TableBody></Table></div>
        </CardContent></Card>
      )}
    </div>
  );
}

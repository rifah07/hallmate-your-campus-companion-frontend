import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Download, Eye, Edit, Trash2, MoreHorizontal, ArrowUpDown, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockUsers } from '@/lib/mock-data';
import { ROLE_LABELS, STATUS_COLORS, ALL_ROLES, DEPARTMENTS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { UserRole, UserStatus } from '@/types';

const PAGE_SIZE = 20;
const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'universityId-asc', label: 'ID Ascending' },
];

export default function UsersListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = mockUsers.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.universityId.includes(search) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchDept = deptFilter === 'all' || u.department === deptFilter;
      return matchSearch && matchRole && matchStatus && matchDept;
    });

    const [field, order] = sortBy.split('-');
    result.sort((a, b) => {
      const valA = (a as any)[field] || '';
      const valB = (b as any)[field] || '';
      const cmp = typeof valA === 'string' ? valA.localeCompare(valB) : valA - valB;
      return order === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, roleFilter, statusFilter, deptFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    // Ready for API: Generates CSV from current filtered data
    const headers = ['Name', 'University ID', 'Email', 'Role', 'Status', 'Department'];
    const rows = filtered.map(u => [u.name, u.universityId, u.email, u.role, u.status, u.department || ''].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${filtered.length} users exported to CSV` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Users</h1>
          <p className="text-muted-foreground text-sm">Manage hall residents and staff</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/users/bulk-upload')}><Upload className="mr-2 h-4 w-4" /> Bulk Upload</Button>
          <Button size="sm" onClick={() => navigate('/users/new')}><UserPlus className="mr-2 h-4 w-4" /> Create User</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, or email..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </div>
            <Select value={roleFilter} onValueChange={v => { setRoleFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {ALL_ROLES.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="GRADUATED">Graduated</SelectItem>
                <SelectItem value="SEAT_CANCELLED">Seat Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={v => { setDeptFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[170px]"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]"><ArrowUpDown className="mr-2 h-3 w-3" /><SelectValue /></SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">University ID</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Department</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(user => (
                  <TableRow key={user.id} className="cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/users/${user.id}`)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{user.universityId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm font-mono text-muted-foreground">{user.universityId}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{ROLE_LABELS[user.role]}</Badge></TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={`text-xs ${STATUS_COLORS[user.status]}`}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">{user.department || '—'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}`)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}/edit`)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No users found matching your criteria</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} users</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <span className="flex items-center px-3 text-sm">{page} / {totalPages || 1}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save, Download, Shield } from 'lucide-react';
import { mockAuditLogs } from '@/lib/mock-data';

export default function SettingsPage() {
  const { toast } = useToast();
  const handleSave = () => toast({ title: 'Settings Saved' });

  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Configure system settings</p></div>
      <Tabs defaultValue="general">
        <TabsList className="flex-wrap"><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="audit">Audit Logs</TabsTrigger><TabsTrigger value="roles">Roles</TabsTrigger><TabsTrigger value="backup">Backup</TabsTrigger></TabsList>

        <TabsContent value="general"><Card><CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Hall Name</Label><Input defaultValue="University Women's Hall" /></div>
            <div className="space-y-2"><Label>Academic Year</Label><Input defaultValue="2024-2025" /></div>
            <div className="space-y-2"><Label>Semester</Label><Input defaultValue="Spring 2025" /></div>
            <div className="space-y-2"><Label>Total Floors</Label><Input type="number" defaultValue="14" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Address</Label><Input defaultValue="University Campus, Dhaka, Bangladesh" /></div>
          </div>
          <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardContent></Card></TabsContent>

        <TabsContent value="email"><Card><CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>SMTP Host</Label><Input placeholder="smtp.example.com" /></div>
            <div className="space-y-2"><Label>SMTP Port</Label><Input placeholder="587" /></div>
            <div className="space-y-2"><Label>Username</Label><Input placeholder="noreply@univ.edu.bd" /></div>
            <div className="space-y-2"><Label>Password</Label><Input type="password" /></div>
          </div>
          <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardContent></Card></TabsContent>

        <TabsContent value="security"><Card><CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Session Timeout (min)</Label><Input type="number" defaultValue="15" /></div>
            <div className="space-y-2"><Label>Max Login Attempts</Label><Input type="number" defaultValue="5" /></div>
            <div className="space-y-2"><Label>Min Password Length</Label><Input type="number" defaultValue="8" /></div>
            <div className="space-y-2"><Label>Lockout Duration (min)</Label><Input type="number" defaultValue="30" /></div>
          </div>
          <div className="flex items-center justify-between pt-2"><div><p className="font-medium">Require Two-Factor Auth</p><p className="text-sm text-muted-foreground">For all admin accounts</p></div><Switch /></div>
          <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardContent></Card></TabsContent>

        <TabsContent value="notifications"><Card><CardContent className="p-6 space-y-4">
          {['New user registration', 'Room assignment changes', 'Maintenance requests', 'Security alerts', 'Fee payment reminders', 'Complaint updates'].map(label => (
            <div key={label} className="flex items-center justify-between"><p className="text-sm font-medium">{label}</p><Switch defaultChecked /></div>
          ))}
          <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardContent></Card></TabsContent>

        <TabsContent value="audit"><Card><CardContent className="p-4">
          <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Resource</TableHead><TableHead>Details</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
            <TableBody>{mockAuditLogs.map(l => (<TableRow key={l.id}><TableCell className="text-sm">{l.userName}</TableCell><TableCell><Badge variant="secondary" className="text-xs">{l.action}</Badge></TableCell><TableCell className="text-sm">{l.resource}</TableCell><TableCell className="text-sm max-w-[200px] truncate">{l.details}</TableCell><TableCell className="text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</TableCell></TableRow>))}</TableBody></Table></div>
        </CardContent></Card></TabsContent>

        <TabsContent value="roles"><Card><CardContent className="p-6">
          <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>Role</TableHead><TableHead>Users</TableHead><TableHead>Dashboard</TableHead><TableHead>Rooms</TableHead><TableHead>Settings</TableHead></TableRow></TableHeader>
            <TableBody>{['Super Admin', 'Provost', 'House Tutor', 'Office Staff', 'Student'].map(role => (
              <TableRow key={role}><TableCell className="font-medium">{role}</TableCell><TableCell><Badge variant="secondary">✓</Badge></TableCell><TableCell><Badge variant="secondary">✓</Badge></TableCell><TableCell>{role !== 'Student' ? <Badge variant="secondary">✓</Badge> : <Badge variant="outline">—</Badge>}</TableCell><TableCell>{['Super Admin', 'Provost'].includes(role) ? <Badge variant="secondary">✓</Badge> : <Badge variant="outline">—</Badge>}</TableCell></TableRow>
            ))}</TableBody></Table></div>
        </CardContent></Card></TabsContent>

        <TabsContent value="backup"><Card><CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border"><div><p className="font-medium">Create Backup</p><p className="text-sm text-muted-foreground">Export all data</p></div><Button onClick={() => toast({ title: 'Backup Created' })}><Download className="mr-2 h-4 w-4" />Create Backup</Button></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Auto Backup</p><p className="text-sm text-muted-foreground">Daily automatic backups</p></div><Switch defaultChecked /></div>
          <div className="space-y-2"><p className="text-sm font-medium">Recent Backups</p>
            {['2024-06-17 02:00 AM', '2024-06-16 02:00 AM', '2024-06-15 02:00 AM'].map(d => (
              <div key={d} className="flex items-center justify-between p-2 rounded border text-sm"><span>{d}</span><Button variant="ghost" size="sm">Restore</Button></div>
            ))}
          </div>
        </CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}

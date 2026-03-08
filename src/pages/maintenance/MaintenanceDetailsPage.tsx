import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { mockMaintenanceRequests } from '@/lib/mock-data';
import { STATUS_COLORS, PRIORITY_COLORS } from '@/constants';
import { useToast } from '@/hooks/use-toast';

export default function MaintenanceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const m = mockMaintenanceRequests.find(x => x.id === id) || mockMaintenanceRequests[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/maintenance')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Request #{m.id.toUpperCase()}</h1></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><UserCheck className="mr-2 h-4 w-4" />Assign</Button>
          <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => toast({ title: 'Completed' })}><CheckCircle className="mr-2 h-4 w-4" />Complete</Button>
        </div>
      </div>
      <Card><CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div><p className="text-xs text-muted-foreground">Room</p><p className="font-bold text-lg">{m.roomNumber}</p></div>
          <div><p className="text-xs text-muted-foreground">Floor</p><p className="font-bold text-lg">{m.floor}</p></div>
          <div><p className="text-xs text-muted-foreground">Type</p><Badge variant="secondary">{m.type}</Badge></div>
          <div><p className="text-xs text-muted-foreground">Priority</p><Badge variant="outline" className={PRIORITY_COLORS[m.priority]}>{m.priority}</Badge></div>
        </div>
        <div className="flex gap-2 mb-4"><Badge variant="outline" className={STATUS_COLORS[m.status]}>{m.status.replace('_', ' ')}</Badge></div>
        <p className="text-sm">{m.description}</p>
        {m.assignedToName && <p className="text-sm mt-3">Assigned to: <span className="font-medium">{m.assignedToName}</span></p>}
        {m.completionNotes && <div className="mt-3 p-3 rounded-lg bg-success/10 border border-success/20"><p className="text-sm font-medium text-success">Completion Notes</p><p className="text-sm mt-1">{m.completionNotes}</p></div>}
      </CardContent></Card>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Timeline</CardTitle></CardHeader>
        <CardContent><div className="space-y-3">
          <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-2" /><div><p className="text-sm font-medium">Request created</p><p className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</p></div></div>
          {m.assignedToName && <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-warning mt-2" /><div><p className="text-sm font-medium">Assigned to {m.assignedToName}</p></div></div>}
          {m.completedAt && <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-success mt-2" /><div><p className="text-sm font-medium">Completed</p><p className="text-xs text-muted-foreground">{new Date(m.completedAt).toLocaleString()}</p></div></div>}
        </div></CardContent>
      </Card>
    </div>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { mockApplications } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { useToast } from '@/hooks/use-toast';

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const app = mockApplications.find(a => a.id === id) || mockApplications[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/applications')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Application #{app.id}</h1></div>
        {app.status === 'PENDING' && <div className="flex gap-2">
          <Button className="bg-success hover:bg-success/90" onClick={() => toast({ title: 'Approved', description: 'Application has been approved.' })}><CheckCircle className="mr-2 h-4 w-4" />Approve</Button>
          <Button variant="destructive" onClick={() => toast({ title: 'Rejected', description: 'Application has been rejected.', variant: 'destructive' })}><XCircle className="mr-2 h-4 w-4" />Reject</Button>
        </div>}
      </div>

      <Card><CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-14 w-14"><AvatarImage src={app.studentAvatar} /><AvatarFallback>{app.studentName[0]}</AvatarFallback></Avatar>
          <div><p className="font-bold text-lg">{app.studentName}</p>
            <div className="flex gap-2 mt-1"><Badge variant="secondary">{app.type.replace('_', ' ')}</Badge><Badge variant="outline" className={STATUS_COLORS[app.status]}>{app.status}</Badge></div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Room Preferences</span><span className="font-medium">{app.roomPreferences.join(', ') || 'None'}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Applied</span><span>{new Date(app.createdAt).toLocaleString()}</span></div>
          <div><span className="text-muted-foreground">Reason</span><p className="mt-1">{app.reason}</p></div>
          {app.adminNotes && <div><span className="text-muted-foreground">Admin Notes</span><p className="mt-1 text-primary">{app.adminNotes}</p></div>}
        </div>
      </CardContent></Card>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Timeline</CardTitle></CardHeader>
        <CardContent><div className="space-y-3">
          <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-2" /><div><p className="text-sm font-medium">Application submitted</p><p className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleString()}</p></div></div>
          {app.status !== 'PENDING' && <div className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-2 ${app.status === 'APPROVED' ? 'bg-success' : 'bg-destructive'}`} /><div><p className="text-sm font-medium">Application {app.status.toLowerCase()}</p><p className="text-xs text-muted-foreground">{new Date(app.updatedAt).toLocaleString()}</p></div></div>}
        </div></CardContent>
      </Card>

      {app.status === 'PENDING' && <Card><CardHeader className="pb-3"><CardTitle className="text-base">Admin Notes</CardTitle></CardHeader>
        <CardContent className="space-y-3"><Textarea placeholder="Add notes for this application..." /><Button variant="outline">Save Notes</Button></CardContent>
      </Card>}
    </div>
  );
}

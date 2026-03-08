import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, CheckCircle, XCircle, Send, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { mockComplaints } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth.store';
import { STATUS_COLORS, PRIORITY_COLORS } from '@/constants';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const c = mockComplaints.find(x => x.id === id) || mockComplaints[0];
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(c.status);

  const canManage = ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR'].includes(user?.role || '');
  const isStudent = user?.role === 'STUDENT';

  const handleResolve = () => {
    setStatus('RESOLVED');
    toast({ title: '✅ Complaint Resolved', description: `${c.studentName} will be notified that the complaint has been resolved.` });
  };

  const handleClose = () => {
    setStatus('CLOSED');
    toast({ title: 'Complaint Closed', description: `Complaint has been closed. ${c.studentName} will be notified.`, variant: 'destructive' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Complaint #{c.id.toUpperCase()}</h1></div>
        {canManage && (status === 'OPEN' || status === 'IN_PROGRESS') && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><UserCheck className="mr-2 h-4 w-4" />Assign</Button>
            <Button size="sm" className="bg-success hover:bg-success/90" onClick={handleResolve}><CheckCircle className="mr-2 h-4 w-4" />Resolve</Button>
            <Button size="sm" variant="destructive" onClick={handleClose}><XCircle className="mr-2 h-4 w-4" />Close</Button>
          </div>
        )}
      </div>

      {/* Status notification for students */}
      {isStudent && (status === 'RESOLVED' || status === 'CLOSED') && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${status === 'RESOLVED' ? 'bg-success/10 border-success/30' : 'bg-muted border-border'}`}>
          <Bell className={`h-5 w-5 ${status === 'RESOLVED' ? 'text-success' : 'text-muted-foreground'}`} />
          <div>
            <p className={`font-medium text-sm ${status === 'RESOLVED' ? 'text-success' : 'text-muted-foreground'}`}>
              Complaint {status === 'RESOLVED' ? 'Resolved' : 'Closed'}
            </p>
            <p className="text-xs text-muted-foreground">
              {status === 'RESOLVED' ? 'Your complaint has been resolved. If the issue persists, you can reopen it.' : 'This complaint has been closed by the administration.'}
            </p>
          </div>
        </div>
      )}

      <Card><CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12"><AvatarImage src={c.studentAvatar} /><AvatarFallback>{c.studentName[0]}</AvatarFallback></Avatar>
          <div><p className="font-bold">{c.studentName}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">{c.category}</Badge>
              <Badge variant="outline" className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge>
              <Badge variant="outline" className={STATUS_COLORS[status]}>{status.replace('_', ' ')}</Badge>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
        <p className="text-sm text-muted-foreground">{c.description}</p>
        {c.roomNumber && <p className="text-sm mt-2">Room: <span className="font-medium">{c.roomNumber}</span></p>}
        {c.assignedToName && <p className="text-sm mt-1">Assigned to: <span className="font-medium">{c.assignedToName}</span></p>}
        <p className="text-xs text-muted-foreground mt-3">Filed: {new Date(c.createdAt).toLocaleString()}</p>
      </CardContent></Card>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Timeline</CardTitle></CardHeader>
        <CardContent><div className="space-y-3">
          <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-2" /><div><p className="text-sm font-medium">Complaint filed</p><p className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</p></div></div>
          {c.comments.map(cm => <div key={cm.id} className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-teal mt-2" /><div><p className="text-sm"><span className="font-medium">{cm.userName}:</span> {cm.content}</p><p className="text-xs text-muted-foreground">{new Date(cm.createdAt).toLocaleString()}</p></div></div>)}
          {(status === 'RESOLVED' || status === 'CLOSED') && (
            <div className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-2 ${status === 'RESOLVED' ? 'bg-success' : 'bg-muted-foreground'}`} /><div><p className="text-sm font-medium">Complaint {status.toLowerCase()}</p><p className="text-xs text-muted-foreground">Just now</p></div></div>
          )}
        </div></CardContent>
      </Card>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Comments</CardTitle></CardHeader>
        <CardContent><div className="flex gap-2"><Input placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} className="flex-1" /><Button onClick={() => { if (comment.trim()) { toast({ title: 'Comment added' }); setComment(''); } }}><Send className="h-4 w-4" /></Button></div></CardContent>
      </Card>
    </div>
  );
}

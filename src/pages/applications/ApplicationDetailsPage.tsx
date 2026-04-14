import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Bell, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useApplication } from '@/hooks/use-data';
import { useAuthStore } from '@/store/auth.store';
import { STATUS_COLORS, APPLICATION_TYPES } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { applicationsService } from '@/services/modules.service';

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { data: app, isLoading } = useApplication(id || '');
  const [responseNote, setResponseNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canRespond = ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'OFFICE_STAFF', 'ASSISTANT_WARDEN'].includes(user?.role || '');
  const isStudent = user?.role === 'STUDENT';
  const canCancel = (isStudent || ['SUPER_ADMIN', 'PROVOST'].includes(user?.role || ''));

  const getTypeLabel = (type: string) => APPLICATION_TYPES.find(t => t.value === type)?.label || type.replace(/_/g, ' ');
  const studentName = app?.student?.name || 'Unknown';
  const studentAvatar = app?.student?.avatar;

  const handleRespond = async (status: 'APPROVED' | 'REJECTED') => {
    if (!id) return;
    setSubmitting(true);
    try {
      await applicationsService.respond(id, { status, responseNote });
      toast({
        title: status === 'APPROVED' ? '✅ Application Approved' : '❌ Application Rejected',
        description: `${studentName}'s application has been ${status.toLowerCase()}.`,
      });
    } catch {
      toast({ title: 'Error', description: 'Failed to respond to application.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await applicationsService.cancel(id);
      toast({ title: 'Application Cancelled', description: 'The application has been cancelled.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to cancel application.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  if (!app) return <div className="p-8 text-center text-muted-foreground">Application not found.</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Application #{app.id.slice(0, 8)}</h1></div>
        {canRespond && app.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button className="bg-success hover:bg-success/90" onClick={() => handleRespond('APPROVED')} disabled={submitting}>
              <CheckCircle className="mr-2 h-4 w-4" />Approve
            </Button>
            <Button variant="destructive" onClick={() => handleRespond('REJECTED')} disabled={submitting}>
              <XCircle className="mr-2 h-4 w-4" />Reject
            </Button>
          </div>
        )}
        {canCancel && app.status === 'PENDING' && (
          <Button variant="outline" onClick={handleCancel} disabled={submitting}>
            <Ban className="mr-2 h-4 w-4" />Cancel
          </Button>
        )}
      </div>

      {isStudent && app.status !== 'PENDING' && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${app.status === 'APPROVED' ? 'bg-success/10 border-success/30' : app.status === 'CANCELLED' ? 'bg-muted border-border' : 'bg-destructive/10 border-destructive/30'}`}>
          <Bell className={`h-5 w-5 ${app.status === 'APPROVED' ? 'text-success' : app.status === 'CANCELLED' ? 'text-muted-foreground' : 'text-destructive'}`} />
          <div>
            <p className={`font-medium text-sm ${app.status === 'APPROVED' ? 'text-success' : app.status === 'CANCELLED' ? 'text-muted-foreground' : 'text-destructive'}`}>
              Application {app.status === 'APPROVED' ? 'Approved' : app.status === 'CANCELLED' ? 'Cancelled' : 'Rejected'}
            </p>
            <p className="text-xs text-muted-foreground">
              {app.responseNote || (app.status === 'APPROVED' ? 'Your application has been approved.' : app.status === 'CANCELLED' ? 'This application was cancelled.' : 'Your application was not approved.')}
            </p>
          </div>
        </div>
      )}

      <Card><CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-14 w-14"><AvatarImage src={studentAvatar} /><AvatarFallback>{studentName[0]}</AvatarFallback></Avatar>
          <div>
            <p className="font-bold text-lg">{studentName}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">{getTypeLabel(app.type)}</Badge>
              <Badge variant="outline" className={STATUS_COLORS[app.status]}>{app.status}</Badge>
            </div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          {app.data?.roomPreferences?.length > 0 && (
            <div className="flex justify-between"><span className="text-muted-foreground">Room Preferences</span><span className="font-medium">{app.data.roomPreferences.join(', ')}</span></div>
          )}
          <div className="flex justify-between"><span className="text-muted-foreground">Applied</span><span>{new Date(app.createdAt).toLocaleString()}</span></div>
          {app.data?.reason && <div><span className="text-muted-foreground">Reason</span><p className="mt-1">{app.data.reason}</p></div>}
          {app.assignedTo && <div className="flex justify-between"><span className="text-muted-foreground">Assigned To</span><span className="font-medium">{app.assignedToRole}</span></div>}
          {app.responseNote && <div><span className="text-muted-foreground">Response Note</span><p className="mt-1 text-primary">{app.responseNote}</p></div>}
          {app.attachments?.length > 0 && (
            <div>
              <span className="text-muted-foreground">Attachments</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {app.attachments.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">Attachment {i + 1}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent></Card>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Timeline</CardTitle></CardHeader>
        <CardContent><div className="space-y-3">
          <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-2" /><div><p className="text-sm font-medium">Application submitted</p><p className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleString()}</p></div></div>
          {app.respondedAt && <div className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-2 ${app.status === 'APPROVED' ? 'bg-success' : app.status === 'CANCELLED' ? 'bg-muted-foreground' : 'bg-destructive'}`} /><div><p className="text-sm font-medium">Application {app.status.toLowerCase()}</p><p className="text-xs text-muted-foreground">{new Date(app.respondedAt).toLocaleString()}</p></div></div>}
        </div></CardContent>
      </Card>

      {canRespond && app.status === 'PENDING' && (
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">Response Note</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Textarea placeholder="Add a note for this application..." value={responseNote} onChange={e => setResponseNote(e.target.value)} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { mockComplaints } from '@/lib/mock-data';
import { STATUS_COLORS, PRIORITY_COLORS } from '@/constants';
import { useState } from 'react';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = mockComplaints.find(x => x.id === id) || mockComplaints[0];
  const [comment, setComment] = useState('');

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/complaints')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Complaint #{c.id.toUpperCase()}</h1></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><UserCheck className="mr-2 h-4 w-4" />Assign</Button>
          <Button size="sm" className="bg-success hover:bg-success/90"><CheckCircle className="mr-2 h-4 w-4" />Resolve</Button>
        </div>
      </div>

      <Card><CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12"><AvatarImage src={c.studentAvatar} /><AvatarFallback>{c.studentName[0]}</AvatarFallback></Avatar>
          <div><p className="font-bold">{c.studentName}</p>
            <div className="flex gap-2 mt-1"><Badge variant="secondary">{c.category}</Badge><Badge variant="outline" className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge><Badge variant="outline" className={STATUS_COLORS[c.status]}>{c.status.replace('_', ' ')}</Badge></div>
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
        </div></CardContent>
      </Card>

      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Comments</CardTitle></CardHeader>
        <CardContent><div className="flex gap-2"><Input placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} className="flex-1" /><Button><Send className="h-4 w-4" /></Button></div></CardContent>
      </Card>
    </div>
  );
}

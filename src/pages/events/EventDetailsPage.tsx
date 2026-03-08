import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const ev = mockEvents.find(e => e.id === id) || mockEvents[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate('/events')}><ArrowLeft className="h-4 w-4" /></Button><h1 className="text-2xl font-bold flex-1">Event Details</h1></div>
      <Card><CardContent className="p-6">
        <Badge className="mb-3">{ev.category}</Badge>
        <h2 className="text-xl font-bold mb-2">{ev.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{ev.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{new Date(ev.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" />{ev.time}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{ev.venue}</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" />{ev.registeredCount}{ev.maxAttendees ? `/${ev.maxAttendees}` : ''} registered</div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Organized by {ev.organizerName}</p>
        {ev.registrationRequired && <Button className="mt-4 w-full" onClick={() => toast({ title: 'Registered!', description: `You've registered for ${ev.title}` })}>Register for Event</Button>}
      </CardContent></Card>
    </div>
  );
}

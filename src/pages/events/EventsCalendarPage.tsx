import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/lib/mock-data';
import { EVENT_CATEGORIES } from '@/constants';
import { Calendar, Plus, Users, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const catColors: Record<string, string> = { CULTURAL: 'bg-rose/15 text-rose', SPORTS: 'bg-success/15 text-success', ACADEMIC: 'bg-primary/15 text-primary', SOCIAL: 'bg-teal/15 text-teal', OFFICIAL: 'bg-warning/15 text-warning' };

export default function EventsCalendarPage() {
  const navigate = useNavigate();
  const upcoming = mockEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold">Events</h1><p className="text-muted-foreground">Hall events and activities</p></div>
        <Button onClick={() => navigate('/events/new')}><Plus className="mr-2 h-4 w-4" />Create Event</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcoming.map((ev, i) => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden" onClick={() => navigate(`/events/${ev.id}`)}>
              <div className="h-2 w-full" style={{ background: catColors[ev.category]?.includes('rose') ? 'hsl(340, 65%, 60%)' : catColors[ev.category]?.includes('success') ? 'hsl(160, 60%, 45%)' : catColors[ev.category]?.includes('primary') ? 'hsl(252, 56%, 57%)' : catColors[ev.category]?.includes('teal') ? 'hsl(174, 50%, 45%)' : 'hsl(38, 92%, 50%)' }} />
              <CardContent className="p-5">
                <Badge className={`text-xs mb-2 ${catColors[ev.category] || ''}`}>{ev.category}</Badge>
                <h3 className="font-semibold">{ev.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{ev.description}</p>
                <div className="flex flex-col gap-1 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.venue}</span>
                  {ev.registrationRequired && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.registeredCount}{ev.maxAttendees ? `/${ev.maxAttendees}` : ''} registered</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

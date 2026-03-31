import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Calendar, MapPin, Clock, Users, Tag, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const upcomingEvents = [
  { title: 'Annual Cultural Night 2024', date: 'July 15, 2024', time: '6:00 PM – 10:00 PM', venue: 'Hall Auditorium', category: 'Cultural', desc: 'An evening of music, dance, drama, and poetry by hall residents. Guest performances from renowned artists.', attendees: 300, registered: 145, image: 'https://ui-avatars.com/api/?name=Cultural+Night&background=0f766e&color=fff&size=400' },
  { title: 'Inter-Floor Badminton Tournament', date: 'July 5, 2024', time: '9:00 AM – 5:00 PM', venue: 'Hall Sports Complex', category: 'Sports', desc: 'Annual inter-floor badminton championship. Singles and doubles categories. Trophies for top 3.', attendees: 50, registered: 32, image: 'https://ui-avatars.com/api/?name=Badminton&background=115e59&color=fff&size=400' },
  { title: 'Career Guidance Seminar', date: 'July 10, 2024', time: '3:00 PM – 5:00 PM', venue: 'Seminar Room', category: 'Academic', desc: 'Industry experts share insights on career planning, job market trends, and interview preparation.', attendees: 100, registered: 67, image: 'https://ui-avatars.com/api/?name=Career+Seminar&background=134e4a&color=fff&size=400' },
  { title: 'Hall Day Celebration', date: 'August 1, 2024', time: '10:00 AM – 8:00 PM', venue: 'Main Auditorium & Grounds', category: 'Official', desc: 'Annual hall day featuring prize distribution, alumni reunion, cultural performances, and guest lecture by distinguished alumni.', attendees: 500, registered: 210, image: 'https://ui-avatars.com/api/?name=Hall+Day&background=047857&color=fff&size=400' },
];

const pastEvents = [
  { title: 'Freshers\' Welcome 2024', date: 'February 15, 2024', venue: 'Hall Auditorium', category: 'Social', desc: 'Welcomed 200+ new residents with performances, games, and refreshments.', photos: 45 },
  { title: 'Blood Donation Camp', date: 'March 8, 2024', venue: 'Hall Ground Floor', category: 'Social', desc: 'Collected 120+ units of blood in collaboration with Red Crescent Society.', photos: 28 },
  { title: 'International Women\'s Day', date: 'March 8, 2024', venue: 'Seminar Room', category: 'Official', desc: 'Panel discussion on women in leadership with distinguished speakers.', photos: 32 },
  { title: 'Pohela Boishakh Celebration', date: 'April 14, 2024', venue: 'Hall Premises', category: 'Cultural', desc: 'Traditional Bengali New Year celebration with food, music, and rangoli.', photos: 56 },
  { title: 'Study Skills Workshop', date: 'May 5, 2024', venue: 'Seminar Room', category: 'Academic', desc: 'Expert-led workshop on effective study habits, time management, and exam preparation.', photos: 15 },
  { title: 'Movie Night - Eid Special', date: 'June 25, 2024', venue: 'Common Room', category: 'Social', desc: 'Eid celebration with movie screening, snacks, and gift exchange.', photos: 22 },
];

const categoryColors: Record<string, string> = {
  Cultural: 'bg-primary/10 text-primary',
  Sports: 'bg-success/10 text-success',
  Academic: 'bg-info/10 text-info',
  Official: 'bg-warning/10 text-warning',
  Social: 'bg-secondary/10 text-secondary-foreground',
};

export default function EventsPublicPage() {
  return (
    <div className="min-h-screen">
      <div className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Events & Activities
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-foreground/80 text-lg">
            Never a dull moment at the University Women's Hall
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        <Tabs defaultValue="upcoming">
          <TabsList className="mx-auto flex w-fit">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            <div className="space-y-6">
              {upcomingEvents.map((ev, i) => (
                <motion.div key={ev.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto gradient-teal flex items-center justify-center p-6">
                        <div className="text-center text-primary-foreground">
                          <Calendar className="w-10 h-10 mx-auto mb-2 opacity-80" />
                          <p className="text-lg font-bold">{ev.date.split(',')[0]}</p>
                          <p className="text-sm opacity-80">{ev.date.split(', ')[1]}</p>
                        </div>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={categoryColors[ev.category] || 'bg-muted text-muted-foreground'}>
                                <Tag className="w-3 h-3 mr-1" /> {ev.category}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{ev.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{ev.desc}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{ev.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{ev.venue}</span>
                          <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{ev.registered}/{ev.attendees} registered</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map((ev, i) => (
                <motion.div key={ev.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <Badge className={`mb-2 ${categoryColors[ev.category] || 'bg-muted text-muted-foreground'}`}>
                        {ev.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground mb-1">{ev.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Calendar className="w-3 h-3" /> {ev.date} • <MapPin className="w-3 h-3" /> {ev.venue}
                      </p>
                      <p className="text-sm text-muted-foreground">{ev.desc}</p>
                      <p className="text-xs text-primary mt-3 font-medium">📷 {ev.photos} Photos</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

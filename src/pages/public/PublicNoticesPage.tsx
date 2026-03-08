import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const notices = [
  { id: 1, title: 'Hall Seat Application for Session 2026-27', category: 'Admission', date: '2026-03-05', excerpt: 'Applications for new hall seats are now open. Eligible students are encouraged to apply before the deadline.' },
  { id: 2, title: 'Dining Hall Renovation Schedule', category: 'Maintenance', date: '2026-03-03', excerpt: 'The dining hall will undergo renovation from March 15-20. Temporary arrangements will be in place.' },
  { id: 3, title: 'Annual Cultural Program 2026', category: 'Events', date: '2026-03-01', excerpt: 'Join us for the annual cultural program on March 25th. Registration for performances is now open.' },
  { id: 4, title: 'Important: Updated Hall Rules', category: 'General', date: '2026-02-28', excerpt: 'Please review the updated hall rules and regulations effective from April 1, 2026.' },
  { id: 5, title: 'Wi-Fi Maintenance Notice', category: 'Maintenance', date: '2026-02-25', excerpt: 'Wi-Fi services will be briefly interrupted on March 8th for system upgrades. Expected downtime: 2 hours.' },
  { id: 6, title: 'Blood Donation Camp', category: 'Events', date: '2026-02-20', excerpt: 'Hall is organizing a blood donation camp on March 10th in collaboration with the Red Cross Society.' },
];

const categoryColors: Record<string, string> = {
  Admission: 'bg-primary text-primary-foreground',
  Maintenance: 'bg-warning text-warning-foreground',
  Events: 'bg-sea text-sea-foreground',
  General: 'bg-secondary text-secondary-foreground',
};

export default function PublicNoticesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = notices.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || n.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Notice Board</h1>
          <p className="text-lg opacity-90">Stay updated with the latest announcements</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search notices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {['Admission', 'Maintenance', 'Events', 'General'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filtered.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={categoryColors[n.category] || 'bg-muted text-muted-foreground'}>{n.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {n.date}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{n.title}</h3>
                      <p className="text-sm text-muted-foreground">{n.excerpt}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 text-primary hover:text-primary">
                      Read More <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No notices found matching your criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}

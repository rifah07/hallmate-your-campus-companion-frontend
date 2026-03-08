import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockNotices } from '@/lib/mock-data';

const CATEGORY_COLORS: Record<string, string> = {
  URGENT: 'bg-destructive text-destructive-foreground',
  EVENT: 'bg-primary text-primary-foreground',
  MAINTENANCE: 'bg-warning text-warning-foreground',
  ACADEMIC: 'bg-sea text-sea-foreground',
  GENERAL: 'bg-secondary text-secondary-foreground',
};

const CATEGORIES = ['URGENT', 'EVENT', 'MAINTENANCE', 'ACADEMIC', 'GENERAL'];

export default function PublicNoticesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = mockNotices.filter(n => {
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
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filtered.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/public-notices/${n.id}`}>
                <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-0.5 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={CATEGORY_COLORS[n.category] || 'bg-muted text-muted-foreground'}>{n.category}</Badge>
                          {n.isPinned && <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">📌 Pinned</Badge>}
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" /> {n.viewCount}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{n.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{n.content}</p>
                        <p className="text-xs text-muted-foreground/60 mt-2">By {n.authorName}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
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

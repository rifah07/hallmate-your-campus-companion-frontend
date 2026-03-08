import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNotices } from '@/lib/mock-data';
import { Pin, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const catColors: Record<string, string> = { GENERAL: 'bg-muted text-muted-foreground', ACADEMIC: 'bg-primary/15 text-primary', EVENT: 'bg-teal/15 text-teal', URGENT: 'bg-destructive/15 text-destructive', MAINTENANCE: 'bg-warning/15 text-warning' };

export default function NoticeBoardPage() {
  const navigate = useNavigate();
  const pinned = mockNotices.filter(n => n.isPinned);
  const regular = mockNotices.filter(n => !n.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Notice Board</h1><p className="text-muted-foreground">Hall announcements and notices</p></div>
        <Button onClick={() => navigate('/notices/new')}><Plus className="mr-2 h-4 w-4" />Create Notice</Button>
      </div>
      {pinned.length > 0 && <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Pin className="h-3 w-3" />Pinned</h3>
        {pinned.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-primary/20 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/notices/${n.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div><div className="flex gap-2 mb-2"><Badge className={catColors[n.category] || ''}>{n.category}</Badge><Pin className="h-3 w-3 text-primary" /></div>
                    <h3 className="font-semibold">{n.title}</h3><p className="text-sm text-muted-foreground mt-1 line-clamp-2">{n.content}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground"><span>{n.authorName}</span><span>•</span><span>{new Date(n.createdAt).toLocaleDateString()}</span><span>•</span><span>{n.viewCount} views</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>}
      <div className="space-y-3">
        {regular.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (pinned.length + i) * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/notices/${n.id}`)}>
              <CardContent className="p-5">
                <div className="flex gap-2 mb-2"><Badge className={catColors[n.category] || ''}>{n.category}</Badge></div>
                <h3 className="font-semibold">{n.title}</h3><p className="text-sm text-muted-foreground mt-1 line-clamp-2">{n.content}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground"><span>{n.authorName}</span><span>•</span><span>{new Date(n.createdAt).toLocaleDateString()}</span><span>•</span><span>{n.viewCount} views</span></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

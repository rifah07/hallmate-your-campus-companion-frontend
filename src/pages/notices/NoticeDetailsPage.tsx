import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pin, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNotices } from '@/lib/mock-data';

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notice = mockNotices.find(n => n.id === id) || mockNotices[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/notices')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-bold">Notice</h1></div>
        {notice.isPinned && <Badge variant="outline" className="text-xs"><Pin className="h-3 w-3 mr-1" />Pinned</Badge>}
      </div>
      <Card><CardContent className="p-6">
        <Badge className="mb-3">{notice.category}</Badge>
        <h2 className="text-xl font-bold mb-4">{notice.title}</h2>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{notice.content}</p>
        <div className="flex items-center gap-3 mt-6 text-xs text-muted-foreground border-t pt-4">
          <span>By {notice.authorName}</span><span>•</span>
          <span>{new Date(notice.createdAt).toLocaleString()}</span><span>•</span>
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{notice.viewCount} views</span><span>•</span>
          <span>Target: {notice.targetAudience}</span>
        </div>
      </CardContent></Card>
    </div>
  );
}

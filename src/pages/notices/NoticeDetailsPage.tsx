import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pin, Eye, FileText, Download, Paperclip } from 'lucide-react';
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

        {notice.attachments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              Attachments ({notice.attachments.length})
            </h3>
            <div className="space-y-2">
              {notice.attachments.map(att => (
                <a
                  key={att.id}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{att.name}</p>
                    <p className="text-xs text-muted-foreground">{att.type.toUpperCase()} • {att.size}</p>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

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

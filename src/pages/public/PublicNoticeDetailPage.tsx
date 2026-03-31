import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Eye, FileText, Download, Paperclip } from 'lucide-react';
import { mockNotices } from '@/lib/mock-data';

const CATEGORY_COLORS: Record<string, string> = {
  URGENT: 'bg-destructive/10 text-destructive border-destructive/20',
  EVENT: 'bg-primary/10 text-primary border-primary/20',
  MAINTENANCE: 'bg-warning/10 text-warning border-warning/20',
  ACADEMIC: 'bg-sea/10 text-sea border-sea/20',
  GENERAL: 'bg-muted text-muted-foreground border-border',
};

export default function PublicNoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const notice = mockNotices.find(n => n.id === id);

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Notice Not Found</h1>
        <p className="text-muted-foreground mb-6">The notice you're looking for doesn't exist.</p>
        <Link to="/public-notices"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Notices</Button></Link>
      </div>
    );
  }

  return (
    <div className="gradient-teal-subtle min-h-[60vh]">
      <section className="relative overflow-hidden py-14">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800/90 via-teal-700/85 to-teal-900/90" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <Link to="/public-notices" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> All Notices
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-white/15 text-white border-white/30 text-xs">{notice.category}</Badge>
            {notice.isPinned && <Badge variant="outline" className="bg-white/15 text-white border-white/30 text-xs">📌 Pinned</Badge>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{notice.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {notice.authorName}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {notice.viewCount} views</span>
              <Badge variant="outline" className={`text-xs ${CATEGORY_COLORS[notice.category] || CATEGORY_COLORS.GENERAL}`}>{notice.category}</Badge>
            </div>

            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line mb-8">
              {notice.content}
            </div>

            {notice.attachments.length > 0 && (
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
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
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-destructive" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, X, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NOTICE_CATEGORIES } from '@/constants';
import { useToast } from '@/hooks/use-toast';

interface FileItem { name: string; size: string; file: File }

export default function CreateNoticePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map(f => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
      file: f,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { toast({ title: 'Notice Published' }); navigate('/notices'); setLoading(false); }, 600);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate('/notices')}><ArrowLeft className="h-4 w-4" /></Button><div><h1 className="text-2xl font-bold">Create Notice</h1></div></div>
      <Card><CardContent className="p-6"><form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2"><Label>Title *</Label><Input placeholder="Notice title" required /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Category *</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{NOTICE_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Target Audience</Label><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="students">Students Only</SelectItem><SelectItem value="staff">Staff Only</SelectItem></SelectContent></Select></div>
        </div>
        <div className="space-y-2"><Label>Content *</Label><Textarea placeholder="Write notice content..." className="min-h-[200px]" required /></div>

        {/* Attachments */}
        <div className="space-y-3">
          <Label>Attachments</Label>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple className="hidden" onChange={handleFiles} />
          <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Paperclip className="mr-2 h-4 w-4" /> Add Files
          </Button>
          <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, JPG, PNG</p>
          {files.length > 0 && (
            <div className="space-y-2 mt-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-muted/30">
                  <div className="w-8 h-8 rounded bg-destructive/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.size}</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeFile(i)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Switch id="pin" /><Label htmlFor="pin" className="font-normal">Pin to top</Label></div><div className="flex items-center gap-2"><Switch id="email" /><Label htmlFor="email" className="font-normal">Send email notification</Label></div></div>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate('/notices')}>Cancel</Button><Button type="submit" disabled={loading}><Send className="mr-2 h-4 w-4" />{loading ? 'Publishing...' : 'Publish'}</Button></div>
      </form></CardContent></Card>
    </div>
  );
}

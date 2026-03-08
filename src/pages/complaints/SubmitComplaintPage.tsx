import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPLAINT_CATEGORIES } from '@/constants';
import { useToast } from '@/hooks/use-toast';

export default function SubmitComplaintPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { toast({ title: 'Complaint Submitted', description: 'Your complaint has been recorded.' }); navigate('/complaints/my'); setLoading(false); }, 800);
  };
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button><div><h1 className="text-2xl font-bold">Submit Complaint</h1><p className="text-muted-foreground">Report an issue</p></div></div>
      <Card><CardContent className="p-6"><form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Category *</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{COMPLAINT_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Priority *</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="LOW">Low</SelectItem><SelectItem value="MEDIUM">Medium</SelectItem><SelectItem value="HIGH">High</SelectItem><SelectItem value="URGENT">Urgent</SelectItem></SelectContent></Select></div>
        </div>
        <div className="space-y-2"><Label>Title *</Label><Input placeholder="Brief title of the issue" required /></div>
        <div className="space-y-2"><Label>Description *</Label><Textarea placeholder="Describe the issue in detail..." className="min-h-[120px]" required /></div>
        <div className="space-y-2"><Label>Room Number</Label><Input defaultValue="301" /></div>
        <div className="space-y-2"><Label>Photos (up to 5)</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center"><Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Drag & drop photos or click to browse</p><input type="file" className="hidden" multiple accept="image/*" /></div>
        </div>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button><Button type="submit" disabled={loading}><Send className="mr-2 h-4 w-4" />{loading ? 'Submitting...' : 'Submit'}</Button></div>
      </form></CardContent></Card>
    </div>
  );
}

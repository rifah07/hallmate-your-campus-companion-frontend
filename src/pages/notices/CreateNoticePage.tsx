import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NOTICE_CATEGORIES } from '@/constants';
import { useToast } from '@/hooks/use-toast';

export default function CreateNoticePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Switch id="pin" /><Label htmlFor="pin" className="font-normal">Pin to top</Label></div><div className="flex items-center gap-2"><Switch id="email" /><Label htmlFor="email" className="font-normal">Send email notification</Label></div></div>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate('/notices')}>Cancel</Button><Button type="submit" disabled={loading}><Send className="mr-2 h-4 w-4" />{loading ? 'Publishing...' : 'Publish'}</Button></div>
      </form></CardContent></Card>
    </div>
  );
}

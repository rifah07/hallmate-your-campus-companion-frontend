import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { toast({ title: 'Application Submitted', description: 'Your application is under review.' }); navigate('/applications/my'); setLoading(false); }, 800);
  };
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div><h1 className="text-2xl font-bold">New Application</h1><p className="text-muted-foreground">Apply for room allocation</p></div>
      </div>
      <Card><CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label>Application Type *</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="NEW_SEAT">New Seat</SelectItem><SelectItem value="TRANSFER">Transfer</SelectItem><SelectItem value="GUEST_ROOM">Guest Room</SelectItem></SelectContent></Select>
          </div>
          <div className="space-y-2"><Label>Room Preference 1</Label><Input placeholder="Room number" /></div>
          <div className="space-y-2"><Label>Room Preference 2</Label><Input placeholder="Room number (optional)" /></div>
          <div className="space-y-2"><Label>Room Preference 3</Label><Input placeholder="Room number (optional)" /></div>
          <div className="space-y-2"><Label>Reason *</Label><Textarea placeholder="Why are you applying?" className="min-h-[100px]" /></div>
          <div className="space-y-2"><Label>Supporting Documents</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
              <input type="file" className="hidden" multiple />
            </div>
          </div>
          <div className="flex items-center gap-2"><Checkbox id="terms" /><Label htmlFor="terms" className="font-normal text-sm cursor-pointer">I agree to the terms and conditions</Label></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={loading}><Send className="mr-2 h-4 w-4" />{loading ? 'Submitting...' : 'Submit Application'}</Button>
          </div>
        </form>
      </CardContent></Card>
    </div>
  );
}

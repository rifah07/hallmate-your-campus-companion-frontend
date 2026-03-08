import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function RegisterVisitorPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { toast({ title: 'Visitor Registered', description: 'Visitor pass has been generated.' }); navigate('/visitors'); setLoading(false); }, 600);
  };
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate('/visitors')}><ArrowLeft className="h-4 w-4" /></Button><div><h1 className="text-2xl font-bold">Register Visitor</h1></div></div>
      <Card><CardContent className="p-6"><form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Visitor Name *</Label><Input placeholder="Full name" required /></div>
          <div className="space-y-2"><Label>Phone *</Label><Input placeholder="01XXXXXXXXX" required /></div>
          <div className="space-y-2"><Label>ID Type *</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="NID">National ID</SelectItem><SelectItem value="PASSPORT">Passport</SelectItem><SelectItem value="STUDENT_ID">Student ID</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label>ID Number *</Label><Input placeholder="ID number" required /></div>
          <div className="space-y-2"><Label>Student to Visit *</Label><Input placeholder="Search by name or ID" required /></div>
          <div className="space-y-2"><Label>Purpose *</Label><Input placeholder="Reason for visit" required /></div>
        </div>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate('/visitors')}>Cancel</Button><Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? 'Registering...' : 'Register & Generate Pass'}</Button></div>
      </form></CardContent></Card>
    </div>
  );
}

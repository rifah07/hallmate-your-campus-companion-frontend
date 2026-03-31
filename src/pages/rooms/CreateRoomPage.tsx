import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';
import { FLOORS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Room Created', description: 'New room has been added.' });
      navigate('/rooms');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/rooms')}><ArrowLeft className="h-4 w-4" /></Button>
        <div><h1 className="text-2xl font-bold">Create Room</h1><p className="text-muted-foreground">Add a new room to the hall</p></div>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Room Number *</Label><Input placeholder="e.g., 301" required /></div>
              <div className="space-y-2">
                <Label>Floor *</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select floor" /></SelectTrigger>
                  <SelectContent>{FLOORS.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Wing *</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select wing" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Wing A</SelectItem>
                    <SelectItem value="B">Wing B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Room Type *</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="DOUBLE">Double</SelectItem>
                    <SelectItem value="TRIPLE">Triple</SelectItem>
                    <SelectItem value="FOUR_SHARING">4-Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Capacity *</Label><Input type="number" min={1} max={4} placeholder="Number of beds" required /></div>
            </div>
            <div className="space-y-3">
              <Label>Features</Label>
              <div className="flex flex-wrap gap-6">
                {[
                  { id: 'hasAC', label: 'AC' },
                  { id: 'hasBalcony', label: 'Balcony' },
                  { id: 'hasAttachedBath', label: 'Attached Bath' },
                ].map(f => (
                  <div key={f.id} className="flex items-center gap-2">
                    <Checkbox id={f.id} /><Label htmlFor={f.id} className="font-normal cursor-pointer">{f.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/rooms')}>Cancel</Button>
              <Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? 'Creating...' : 'Create Room'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

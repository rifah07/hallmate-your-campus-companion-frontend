import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockComplaints } from '@/lib/mock-data';
import { STATUS_COLORS, PRIORITY_COLORS } from '@/constants';
import { Plus, Eye } from 'lucide-react';

export default function MyComplaintsPage() {
  const navigate = useNavigate();
  const my = mockComplaints.filter(c => c.studentId === '4');
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">My Complaints</h1><p className="text-muted-foreground">Track your filed complaints</p></div>
        <Button onClick={() => navigate('/complaints/new')}><Plus className="mr-2 h-4 w-4" />Submit Complaint</Button>
      </div>
      <div className="space-y-4">
        {my.length === 0 ? <Card><CardContent className="p-8 text-center text-muted-foreground">No complaints filed.</CardContent></Card> : my.map(c => (
          <Card key={c.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/complaints/${c.id}`)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div><p className="font-medium">{c.title}</p>
                  <div className="flex gap-2 mt-2"><Badge variant="secondary" className="text-xs">{c.category}</Badge><Badge variant="outline" className={`text-xs ${PRIORITY_COLORS[c.priority]}`}>{c.priority}</Badge><Badge variant="outline" className={`text-xs ${STATUS_COLORS[c.status]}`}>{c.status.replace('_', ' ')}</Badge></div>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

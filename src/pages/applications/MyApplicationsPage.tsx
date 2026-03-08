import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockApplications } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { Plus, Eye } from 'lucide-react';

export default function MyApplicationsPage() {
  const navigate = useNavigate();
  const myApps = mockApplications.filter(a => a.studentId === '4');
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">My Applications</h1><p className="text-muted-foreground">Track your room applications</p></div>
        <Button onClick={() => navigate('/applications/new')}><Plus className="mr-2 h-4 w-4" />New Application</Button>
      </div>
      <div className="space-y-4">
        {myApps.length === 0 ? <Card><CardContent className="p-8 text-center text-muted-foreground">No applications yet.</CardContent></Card> : myApps.map(app => (
          <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/applications/${app.id}`)}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1"><Badge variant="secondary" className="text-xs">{app.type.replace('_', ' ')}</Badge><Badge variant="outline" className={`text-xs ${STATUS_COLORS[app.status]}`}>{app.status}</Badge></div>
                <p className="text-sm font-medium">Room preferences: {app.roomPreferences.join(', ') || 'None'}</p>
                <p className="text-xs text-muted-foreground mt-1">{app.reason}</p>
                <p className="text-xs text-muted-foreground mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Download, BarChart3, DollarSign, Users, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function ReportsDashboardPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const reportTypes = [
    { title: 'Occupancy Report', desc: 'Room occupancy by floor and type', icon: Building, color: 'bg-primary/10 text-primary' },
    { title: 'Financial Report', desc: 'Fee collection and pending dues', icon: DollarSign, color: 'bg-success/10 text-success' },
    { title: 'User Report', desc: 'Student and staff demographics', icon: Users, color: 'bg-teal/10 text-teal' },
    { title: 'Attendance Report', desc: 'Student attendance trends', icon: BarChart3, color: 'bg-warning/10 text-warning' },
    { title: 'Complaint Report', desc: 'Complaint resolution metrics', icon: FileText, color: 'bg-rose/10 text-rose' },
    { title: 'Maintenance Report', desc: 'Maintenance task completion rates', icon: FileText, color: 'bg-accent text-accent-foreground' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Generate and view reports</p></div>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Quick Generate</CardTitle></CardHeader><CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Report Type</Label><Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="occupancy">Occupancy</SelectItem><SelectItem value="financial">Financial</SelectItem><SelectItem value="user">User</SelectItem><SelectItem value="attendance">Attendance</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label>Format</Label><Select defaultValue="pdf"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="excel">Excel</SelectItem><SelectItem value="csv">CSV</SelectItem></SelectContent></Select></div>
          <div className="flex items-end"><Button className="w-full" onClick={() => toast({ title: 'Report Generated', description: 'Download will start shortly.' })}><Download className="mr-2 h-4 w-4" />Generate</Button></div>
        </div>
      </CardContent></Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map(r => (
          <Card key={r.title} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast({ title: `${r.title} generated` })}>
            <CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${r.color} mb-3`}><r.icon className="h-5 w-5" /></div><h3 className="font-semibold">{r.title}</h3><p className="text-sm text-muted-foreground mt-1">{r.desc}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockComplaints } from '@/lib/mock-data';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { MessageSquare, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComplaintStatisticsPage() {
  const total = mockComplaints.length;
  const open = mockComplaints.filter(c => c.status === 'OPEN').length;
  const inProg = mockComplaints.filter(c => c.status === 'IN_PROGRESS').length;
  const resolved = mockComplaints.filter(c => c.status === 'RESOLVED').length;

  const catData = [
    { name: 'Maintenance', value: mockComplaints.filter(c => c.category === 'MAINTENANCE').length, color: 'hsl(252, 56%, 57%)' },
    { name: 'Dining', value: mockComplaints.filter(c => c.category === 'DINING').length, color: 'hsl(340, 65%, 60%)' },
    { name: 'Security', value: mockComplaints.filter(c => c.category === 'SECURITY').length, color: 'hsl(0, 72%, 56%)' },
    { name: 'Behavior', value: mockComplaints.filter(c => c.category === 'BEHAVIOR').length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Other', value: mockComplaints.filter(c => c.category === 'OTHER').length, color: 'hsl(174, 50%, 45%)' },
  ];
  const prioData = [{ p: 'Low', count: mockComplaints.filter(c => c.priority === 'LOW').length }, { p: 'Medium', count: mockComplaints.filter(c => c.priority === 'MEDIUM').length }, { p: 'High', count: mockComplaints.filter(c => c.priority === 'HIGH').length }, { p: 'Urgent', count: mockComplaints.filter(c => c.priority === 'URGENT').length }];

  const stats = [
    { l: 'Total', v: total, icon: MessageSquare, c: 'bg-primary/10 text-primary' },
    { l: 'Open', v: open, icon: AlertCircle, c: 'bg-primary/10 text-primary' },
    { l: 'In Progress', v: inProg, icon: Clock, c: 'bg-warning/10 text-warning' },
    { l: 'Resolved', v: resolved, icon: CheckCircle, c: 'bg-success/10 text-success' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Complaint Statistics</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card>
        </motion.div>))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Category</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={catData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>{catData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Priority</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={prioData}><XAxis dataKey="p" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="count" fill="hsl(252, 56%, 57%)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent></Card>
      </div>
    </div>
  );
}

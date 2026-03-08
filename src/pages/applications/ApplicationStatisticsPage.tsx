import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApplications } from '@/lib/mock-data';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ApplicationStatisticsPage() {
  const total = mockApplications.length;
  const pending = mockApplications.filter(a => a.status === 'PENDING').length;
  const approved = mockApplications.filter(a => a.status === 'APPROVED').length;
  const rejected = mockApplications.filter(a => a.status === 'REJECTED').length;

  const statusData = [
    { name: 'Pending', value: pending, color: 'hsl(38, 92%, 50%)' },
    { name: 'Approved', value: approved, color: 'hsl(160, 60%, 45%)' },
    { name: 'Rejected', value: rejected, color: 'hsl(0, 72%, 56%)' },
  ];
  const typeData = [
    { type: 'New Seat', count: mockApplications.filter(a => a.type === 'NEW_SEAT').length },
    { type: 'Transfer', count: mockApplications.filter(a => a.type === 'TRANSFER').length },
    { type: 'Guest', count: mockApplications.filter(a => a.type === 'GUEST_ROOM').length },
  ];
  const stats = [
    { l: 'Total', v: total, icon: ClipboardList, c: 'bg-primary/10 text-primary' },
    { l: 'Pending', v: pending, icon: Clock, c: 'bg-warning/10 text-warning' },
    { l: 'Approved', v: approved, icon: CheckCircle, c: 'bg-success/10 text-success' },
    { l: 'Rejected', v: rejected, icon: XCircle, c: 'bg-destructive/10 text-destructive' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Application Statistics</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card>
        </motion.div>))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Status</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>{statusData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Type</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={typeData}><XAxis dataKey="type" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="count" fill="hsl(252, 56%, 57%)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent></Card>
      </div>
    </div>
  );
}

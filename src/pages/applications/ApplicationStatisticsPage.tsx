import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApplications, useApplicationStatistics } from '@/hooks/use-data';
import { APPLICATION_TYPES } from '@/constants';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ClipboardList, Clock, CheckCircle, XCircle, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ApplicationStatisticsPage() {
  const { data: stats } = useApplicationStatistics();
  const { data: applications = [] } = useApplications();

  const statusData = [
    { name: 'Pending', value: stats?.pending ?? 0, color: 'hsl(38, 92%, 50%)' },
    { name: 'Approved', value: stats?.approved ?? 0, color: 'hsl(160, 60%, 45%)' },
    { name: 'Rejected', value: stats?.rejected ?? 0, color: 'hsl(0, 72%, 56%)' },
    { name: 'Cancelled', value: stats?.cancelled ?? 0, color: 'hsl(0, 0%, 60%)' },
  ];

  const typeData = APPLICATION_TYPES.map(t => ({
    type: t.label,
    count: applications.filter(a => a.type === t.value).length,
  })).filter(t => t.count > 0);

  const statCards = [
    { l: 'Total', v: stats?.total ?? 0, icon: ClipboardList, c: 'bg-primary/10 text-primary' },
    { l: 'Pending', v: stats?.pending ?? 0, icon: Clock, c: 'bg-warning/10 text-warning' },
    { l: 'Approved', v: stats?.approved ?? 0, icon: CheckCircle, c: 'bg-success/10 text-success' },
    { l: 'Rejected', v: stats?.rejected ?? 0, icon: XCircle, c: 'bg-destructive/10 text-destructive' },
    { l: 'Cancelled', v: stats?.cancelled ?? 0, icon: Ban, c: 'bg-muted text-muted-foreground' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Application Statistics</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Status</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>{statusData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Type</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={typeData}><XAxis dataKey="type" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={50} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="count" fill="hsl(252, 56%, 57%)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent></Card>
      </div>
    </div>
  );
}
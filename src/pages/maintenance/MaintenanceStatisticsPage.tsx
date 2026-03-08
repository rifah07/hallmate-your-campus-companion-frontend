import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMaintenanceRequests } from '@/lib/mock-data';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Wrench, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenanceStatisticsPage() {
  const total = mockMaintenanceRequests.length;
  const todo = mockMaintenanceRequests.filter(m => m.status === 'TODO').length;
  const inProg = mockMaintenanceRequests.filter(m => m.status === 'IN_PROGRESS').length;
  const done = mockMaintenanceRequests.filter(m => m.status === 'COMPLETED').length;
  const typeData = [
    { name: 'Electrical', value: mockMaintenanceRequests.filter(m => m.type === 'ELECTRICAL').length, color: 'hsl(252, 56%, 57%)' },
    { name: 'Plumbing', value: mockMaintenanceRequests.filter(m => m.type === 'PLUMBING').length, color: 'hsl(174, 50%, 45%)' },
    { name: 'Carpentry', value: mockMaintenanceRequests.filter(m => m.type === 'CARPENTRY').length, color: 'hsl(340, 65%, 60%)' },
    { name: 'Cleaning', value: mockMaintenanceRequests.filter(m => m.type === 'CLEANING').length, color: 'hsl(38, 92%, 50%)' },
  ];
  const stats = [
    { l: 'Total', v: total, icon: Wrench, c: 'bg-primary/10 text-primary' },
    { l: 'Pending', v: todo, icon: AlertTriangle, c: 'bg-warning/10 text-warning' },
    { l: 'In Progress', v: inProg, icon: Clock, c: 'bg-primary/10 text-primary' },
    { l: 'Completed', v: done, icon: CheckCircle, c: 'bg-success/10 text-success' },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Maintenance Statistics</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card></motion.div>))}
      </div>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">By Type</CardTitle></CardHeader><CardContent><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={typeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>{typeData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></CardContent></Card>
    </div>
  );
}

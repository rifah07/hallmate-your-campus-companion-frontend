import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockBills, mockFees } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function FeesDashboardPage() {
  const { toast } = useToast();
  const totalDue = mockBills.filter(b => b.status === 'PENDING' || b.status === 'OVERDUE').reduce((s, b) => s + b.amount, 0);
  const totalPaid = mockBills.filter(b => b.status === 'PAID').reduce((s, b) => s + b.amount, 0);
  const overdue = mockBills.filter(b => b.status === 'OVERDUE').length;

  const stats = [
    { l: 'Total Collected', v: `৳${totalPaid.toLocaleString()}`, icon: DollarSign, c: 'bg-success/10 text-success' },
    { l: 'Pending Dues', v: `৳${totalDue.toLocaleString()}`, icon: Clock, c: 'bg-warning/10 text-warning' },
    { l: 'Paid Bills', v: mockBills.filter(b => b.status === 'PAID').length, icon: CheckCircle, c: 'bg-primary/10 text-primary' },
    { l: 'Overdue', v: overdue, icon: AlertTriangle, c: 'bg-destructive/10 text-destructive' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Fees & Payments</h1><p className="text-muted-foreground">Manage hall fees and payments</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card></motion.div>))}
      </div>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Fee Structure</CardTitle></CardHeader><CardContent>
        <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>Fee Type</TableHead><TableHead>Name</TableHead><TableHead>Amount</TableHead><TableHead>Due Date</TableHead><TableHead>Applicable To</TableHead></TableRow></TableHeader>
          <TableBody>{mockFees.map(f => (<TableRow key={f.id}><TableCell><Badge variant="secondary" className="text-xs">{f.type.replace('_', ' ')}</Badge></TableCell><TableCell className="font-medium">{f.name}</TableCell><TableCell>৳{f.amount}</TableCell><TableCell>{f.dueDate}</TableCell><TableCell className="text-sm">{f.applicableTo}</TableCell></TableRow>))}</TableBody></Table></div>
      </CardContent></Card>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">Recent Bills</CardTitle></CardHeader><CardContent>
        <div className="rounded-lg border overflow-hidden"><Table><TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Fee</TableHead><TableHead>Amount</TableHead><TableHead>Due</TableHead><TableHead>Status</TableHead><TableHead className="w-20"></TableHead></TableRow></TableHeader>
          <TableBody>{mockBills.map(b => (<TableRow key={b.id}><TableCell className="font-medium text-sm">{b.studentName}</TableCell><TableCell className="text-sm">{b.feeName}</TableCell><TableCell>৳{b.amount}</TableCell><TableCell className="text-sm">{b.dueDate}</TableCell><TableCell><Badge variant="outline" className={`text-xs ${STATUS_COLORS[b.status]}`}>{b.status}</Badge></TableCell><TableCell>{b.status === 'PENDING' && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast({ title: 'Payment Approved' })}>Approve</Button>}</TableCell></TableRow>))}</TableBody></Table></div>
      </CardContent></Card>
    </div>
  );
}

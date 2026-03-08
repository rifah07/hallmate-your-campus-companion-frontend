import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBills, mockFees } from '@/lib/mock-data';
import { STATUS_COLORS } from '@/constants';
import { DollarSign, Clock, CheckCircle, AlertTriangle, Receipt, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth.store';

const MONTHLY_FEES = [
  { id: 'mf1', type: 'SEAT_RENT', name: 'Monthly Seat Rent', amount: 600, frequency: 'Monthly', applicableTo: 'All Students' },
  { id: 'mf2', type: 'UTILITY', name: 'Utility Bill', amount: 500, frequency: 'Monthly', applicableTo: 'All Students' },
  { id: 'mf3', type: 'DINING', name: 'Dining Charge', amount: 3000, frequency: 'Monthly', applicableTo: 'Full Board Plan' },
  { id: 'mf4', type: 'INTERNET', name: 'Internet & WiFi', amount: 200, frequency: 'Monthly', applicableTo: 'All Students' },
];

const ONE_TIME_FEES = [
  { id: 'of1', type: 'ADMISSION', name: 'Admission Fee', amount: 5000, frequency: 'One-time', applicableTo: 'New Students' },
  { id: 'of2', type: 'SECURITY_DEPOSIT', name: 'Security Deposit', amount: 3000, frequency: 'One-time (Refundable)', applicableTo: 'All Students' },
  { id: 'of3', type: 'DEVELOPMENT', name: 'Development Fund', amount: 2000, frequency: 'One-time', applicableTo: 'All Students' },
];

// Generate monthly bills for current year
const months = ['January', 'February', 'March', 'April', 'May', 'June'];
const monthlyBills = months.flatMap((month, mi) => 
  MONTHLY_FEES.map((fee, fi) => ({
    id: `mb-${mi}-${fi}`,
    studentId: '4',
    studentName: 'Anika Islam',
    feeId: fee.id,
    feeName: `${fee.name} - ${month} 2024`,
    amount: fee.amount,
    month,
    dueDate: `2024-${String(mi + 1).padStart(2, '0')}-30`,
    status: mi < 4 ? 'PAID' : mi === 4 ? 'PENDING' : 'OVERDUE',
    paidAt: mi < 4 ? `2024-${String(mi + 1).padStart(2, '0')}-25T10:00:00` : undefined,
    paymentMethod: mi < 4 ? 'ONLINE' : undefined,
    referenceNumber: mi < 4 ? `TXN-2024-${String(mi * 4 + fi + 1).padStart(3, '0')}` : undefined,
    createdAt: `2024-${String(mi + 1).padStart(2, '0')}-01`,
  }))
);

export default function FeesDashboardPage() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const isStudent = user?.role === 'STUDENT';

  const allBills = isStudent ? monthlyBills : mockBills;
  const totalDue = allBills.filter(b => b.status === 'PENDING' || b.status === 'OVERDUE').reduce((s, b) => s + b.amount, 0);
  const totalPaid = allBills.filter(b => b.status === 'PAID').reduce((s, b) => s + b.amount, 0);
  const overdue = allBills.filter(b => b.status === 'OVERDUE').length;
  const monthlyTotal = MONTHLY_FEES.reduce((s, f) => s + f.amount, 0);

  const stats = [
    { l: 'Total Paid', v: `৳${totalPaid.toLocaleString()}`, icon: DollarSign, c: 'bg-success/10 text-success' },
    { l: 'Pending Dues', v: `৳${totalDue.toLocaleString()}`, icon: Clock, c: 'bg-warning/10 text-warning' },
    { l: 'Monthly Rate', v: `৳${monthlyTotal.toLocaleString()}`, icon: Calendar, c: 'bg-primary/10 text-primary' },
    { l: 'Overdue', v: overdue, icon: AlertTriangle, c: 'bg-destructive/10 text-destructive' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fees & Payments</h1>
        <p className="text-muted-foreground">Manage hall fees, monthly billing, and payments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{s.v}</p>
                  <p className="text-sm text-muted-foreground">{s.l}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structure"><Receipt className="mr-2 h-4 w-4" />Fee Structure</TabsTrigger>
          <TabsTrigger value="bills"><Calendar className="mr-2 h-4 w-4" />Monthly Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          {/* Monthly Fees */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Monthly Recurring Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Applicable To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MONTHLY_FEES.map(f => (
                      <TableRow key={f.id}>
                        <TableCell><Badge variant="secondary" className="text-xs">{f.type.replace('_', ' ')}</Badge></TableCell>
                        <TableCell className="font-medium">{f.name}</TableCell>
                        <TableCell className="font-semibold">৳{f.amount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">{f.frequency}</Badge></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{f.applicableTo}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-accent/30 font-semibold">
                      <TableCell colSpan={2}>Total Monthly</TableCell>
                      <TableCell>৳{monthlyTotal.toLocaleString()}</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* One-time Fees */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-4 w-4 text-rose" />
                One-time Fees (Admission)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Applicable To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ONE_TIME_FEES.map(f => (
                      <TableRow key={f.id}>
                        <TableCell><Badge variant="secondary" className="text-xs">{f.type.replace('_', ' ')}</Badge></TableCell>
                        <TableCell className="font-medium">{f.name}</TableCell>
                        <TableCell className="font-semibold">৳{f.amount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs bg-rose/10 text-rose border-rose/20">{f.frequency}</Badge></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{f.applicableTo}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-accent/30 font-semibold">
                      <TableCell colSpan={2}>Total Admission</TableCell>
                      <TableCell>৳{ONE_TIME_FEES.reduce((s, f) => s + f.amount, 0).toLocaleString()}</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {isStudent ? 'My Payment History' : 'Recent Bills'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {!isStudent && <TableHead>Student</TableHead>}
                      <TableHead>Fee</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allBills.map(b => (
                      <TableRow key={b.id}>
                        {!isStudent && <TableCell className="font-medium text-sm">{b.studentName}</TableCell>}
                        <TableCell className="text-sm">{b.feeName}</TableCell>
                        <TableCell className="font-semibold">৳{b.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{b.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs ${STATUS_COLORS[b.status]}`}>{b.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {b.status === 'PENDING' && (
                            isStudent ? (
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast({ title: '💳 Payment initiated' })}>
                                Pay Now
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast({ title: '✅ Payment Approved' })}>
                                Approve
                              </Button>
                            )
                          )}
                          {b.status === 'OVERDUE' && (
                            <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                              Overdue
                            </Badge>
                          )}
                          {b.status === 'PAID' && b.referenceNumber && (
                            <span className="text-xs text-muted-foreground font-mono">{b.referenceNumber}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

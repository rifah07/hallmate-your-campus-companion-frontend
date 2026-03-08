import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, GraduationCap } from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

export default function UserStatisticsPage() {
  const total = mockUsers.length;
  const active = mockUsers.filter(u => u.status === 'ACTIVE').length;
  const suspended = mockUsers.filter(u => u.status === 'SUSPENDED').length;

  const stats = [
    { label: 'Total Users', value: total, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Active', value: active, icon: UserCheck, color: 'bg-success/10 text-success' },
    { label: 'Suspended', value: suspended, icon: UserX, color: 'bg-destructive/10 text-destructive' },
    { label: 'Graduated', value: 0, icon: GraduationCap, color: 'bg-teal/10 text-teal' },
  ];

  const roleData = [
    { name: 'Admin', value: 1, color: 'hsl(252, 56%, 57%)' },
    { name: 'Students', value: 4, color: 'hsl(340, 65%, 60%)' },
    { name: 'Staff', value: 5, color: 'hsl(174, 50%, 45%)' },
  ];

  const deptData = [
    { dept: 'CSE', count: 3 }, { dept: 'EEE', count: 2 }, { dept: 'Eng', count: 1 },
    { dept: 'Eco', count: 1 }, { dept: 'Phy', count: 1 }, { dept: 'Che', count: 1 },
  ];

  const trendData = [
    { month: 'Jan', users: 5 }, { month: 'Feb', users: 6 }, { month: 'Mar', users: 7 },
    { month: 'Apr', users: 8 }, { month: 'May', users: 9 }, { month: 'Jun', users: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Statistics</h1>
        <p className="text-muted-foreground">Overview of user demographics and trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-5">
                <div className={`p-2.5 rounded-xl w-fit ${s.color}`}><s.icon className="h-5 w-5" /></div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Users by Role</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                    {roleData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Users by Department</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData}>
                  <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(252, 56%, 57%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3"><CardTitle className="text-base">New Users Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="hsl(252, 56%, 57%)" fill="hsl(252, 56%, 57%)" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

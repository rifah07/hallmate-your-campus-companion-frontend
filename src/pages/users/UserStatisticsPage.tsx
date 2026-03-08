import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, GraduationCap, UserMinus, TrendingUp, Calendar } from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';
import { ROLE_LABELS, ALL_ROLES } from '@/constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function UserStatisticsPage() {
  const total = mockUsers.length;
  const active = mockUsers.filter(u => u.status === 'ACTIVE').length;
  const inactive = mockUsers.filter(u => u.status === 'INACTIVE').length;
  const suspended = mockUsers.filter(u => u.status === 'SUSPENDED').length;
  const graduated = mockUsers.filter(u => u.status === 'GRADUATED').length;

  const stats = [
    { label: 'Total Users', value: total, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Active', value: active, icon: UserCheck, color: 'bg-success/10 text-success' },
    { label: 'Inactive', value: inactive, icon: UserMinus, color: 'bg-muted text-muted-foreground' },
    { label: 'Suspended', value: suspended, icon: UserX, color: 'bg-destructive/10 text-destructive' },
    { label: 'Graduated', value: graduated, icon: GraduationCap, color: 'bg-teal/10 text-teal' },
    { label: 'New This Month', value: 3, icon: TrendingUp, color: 'bg-info/10 text-info' },
  ];

  // byRole — matches UserStatistics.byRole
  const roleData = ALL_ROLES.map(role => ({
    role: ROLE_LABELS[role],
    count: mockUsers.filter(u => u.role === role).length,
  })).filter(r => r.count > 0);

  const rolePieColors = [
    'hsl(var(--primary))', 'hsl(var(--rose))', 'hsl(var(--teal))',
    'hsl(var(--warning))', 'hsl(var(--info))', 'hsl(var(--sea))',
    'hsl(var(--success))', 'hsl(var(--destructive))',
  ];

  // byDepartment — matches UserStatistics.byDepartment
  const deptMap = new Map<string, number>();
  mockUsers.forEach(u => {
    if (u.department) deptMap.set(u.department, (deptMap.get(u.department) || 0) + 1);
  });
  const deptData = Array.from(deptMap.entries()).map(([dept, count]) => ({
    dept: dept.length > 10 ? dept.slice(0, 10) + '…' : dept,
    fullDept: dept,
    count,
  })).sort((a, b) => b.count - a.count);

  // byYear — matches UserStatistics.byYear
  const yearMap = new Map<number, number>();
  mockUsers.forEach(u => {
    if (u.year) yearMap.set(u.year, (yearMap.get(u.year) || 0) + 1);
  });
  const yearData = Array.from(yearMap.entries()).map(([year, count]) => ({
    year: `Year ${year}`,
    count,
  })).sort((a, b) => parseInt(a.year.slice(5)) - parseInt(b.year.slice(5)));

  // newUsersThisMonth / newUsersThisYear trend
  const trendData = [
    { month: 'Jan', users: 2 }, { month: 'Feb', users: 3 }, { month: 'Mar', users: 5 },
    { month: 'Apr', users: 4 }, { month: 'May', users: 6 }, { month: 'Jun', users: 8 },
    { month: 'Jul', users: 3 }, { month: 'Aug', users: 7 }, { month: 'Sep', users: 5 },
    { month: 'Oct', users: 4 }, { month: 'Nov', users: 6 }, { month: 'Dec', users: 3 },
  ];
  const newThisYear = trendData.reduce((s, t) => s + t.users, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">User Statistics</h1>
        <p className="text-muted-foreground text-sm">Overview of user demographics and trends</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="hover-lift">
              <CardContent className="p-4">
                <div className={`p-2 rounded-lg w-fit ${s.color}`}><s.icon className="h-4 w-4" /></div>
                <div className="mt-2.5">
                  <p className="text-2xl font-display font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* byRole pie */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Users by Role</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="count" nameKey="role" label={({ role, count }) => `${role} (${count})`} labelLine={false}>
                    {roleData.map((_, i) => <Cell key={i} fill={rolePieColors[i % rolePieColors.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* byDepartment bar */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Users by Department</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="dept" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip formatter={(value: number, name: string, props: any) => [value, props.payload.fullDept]} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* byYear bar */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-display">Students by Year</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--teal))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New Users Trend — newUsersThisYear */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">New Users Trend</CardTitle>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {newThisYear} this year</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

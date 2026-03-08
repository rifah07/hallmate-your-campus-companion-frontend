import { Users, BedDouble, DoorOpen, ClipboardList, UserPlus, Building, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUsers, mockRooms } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fadeIn = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.3 },
});

export function AdminDashboard() {
  const navigate = useNavigate();
  const totalUsers = mockUsers.length;
  const activeStudents = mockUsers.filter(u => u.role === 'STUDENT' && u.status === 'ACTIVE').length;
  const vacantRooms = mockRooms.filter(r => r.status === 'AVAILABLE').length;
  const pending = 12;

  const roleData = [
    { name: 'Students', value: mockUsers.filter(u => u.role === 'STUDENT').length, color: 'hsl(252, 56%, 57%)' },
    { name: 'Staff', value: mockUsers.filter(u => !['STUDENT', 'PARENT'].includes(u.role)).length, color: 'hsl(340, 65%, 60%)' },
    { name: 'Parents', value: mockUsers.filter(u => u.role === 'PARENT').length, color: 'hsl(174, 50%, 45%)' },
  ];

  const floorData = Array.from({ length: 7 }, (_, i) => ({
    floor: `F${i + 1}`,
    occupied: mockRooms.filter(r => r.floor === i + 1 && r.status === 'OCCUPIED').length,
    available: mockRooms.filter(r => r.floor === i + 1 && r.status === 'AVAILABLE').length,
  }));

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, trend: '+5%', up: true, color: 'bg-primary/10 text-primary' },
    { label: 'Active Students', value: activeStudents, icon: Users, trend: '+2%', up: true, color: 'bg-success/10 text-success' },
    { label: 'Vacant Rooms', value: vacantRooms, icon: DoorOpen, trend: '-3', up: false, color: 'bg-warning/10 text-warning' },
    { label: 'Pending Applications', value: pending, icon: ClipboardList, trend: '+8', up: true, color: 'bg-rose/10 text-rose' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of the hall.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeIn(i)}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? 'text-success' : 'text-destructive'}`}>
                    {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {s.trend}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div {...fadeIn(4)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/users/new')}>
                <UserPlus className="mr-2 h-4 w-4" /> Create User
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/rooms/vacant')}>
                <BedDouble className="mr-2 h-4 w-4" /> Assign Room
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/users/statistics')}>
                <FileText className="mr-2 h-4 w-4" /> View Reports
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(5)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Users by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={roleData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {roleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(6)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Occupancy by Floor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={floorData}>
                    <XAxis dataKey="floor" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="occupied" fill="hsl(252, 56%, 57%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="available" fill="hsl(174, 50%, 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div {...fadeIn(7)}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New student registered', detail: 'Anika Islam – CSE, 3rd Year', time: '2 hours ago', color: 'bg-success' },
                { action: 'Room assigned', detail: 'Room 301 → Tasnia Haque', time: '4 hours ago', color: 'bg-primary' },
                { action: 'Maintenance request', detail: 'Room 205 – AC issue reported', time: '6 hours ago', color: 'bg-warning' },
                { action: 'Student suspended', detail: 'Nusrat Jahan – Disciplinary action', time: '1 day ago', color: 'bg-destructive' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

import { BedDouble, UserCircle, UtensilsCrossed, Megaphone, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/auth.store';
import { motion } from 'framer-motion';

export function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Your hall at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-primary" /> My Room
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Room</span><span className="text-sm font-medium">301</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Floor</span><span className="text-sm font-medium">3rd</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><Badge variant="secondary">Triple</Badge></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Roommates</span><span className="text-sm font-medium">Tasnia, Raisa</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-teal" /> Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Plan</span><Badge className="bg-teal text-teal-foreground">Full Board</Badge></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Today's Lunch</span><span className="text-sm font-medium">Rice, Fish Curry</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Today's Dinner</span><span className="text-sm font-medium">Khichuri, Egg</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-rose" /> Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Hall fees due by June 30', 'Water supply maintenance on Sat', 'Cultural event registration open'].map((n, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose mt-1.5 shrink-0" />
                    <p className="text-sm">{n}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" /> Submit a Complaint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea placeholder="Describe your issue..." className="min-h-[80px]" />
            <Button>Submit Complaint</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

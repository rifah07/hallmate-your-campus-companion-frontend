import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMealMenus, mockGuestMeals, mockMealFeedback } from '@/lib/mock-data';
import { UtensilsCrossed, Users, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MealDashboardPage() {
  const today = mockMealMenus[0];
  const avgRating = mockMealFeedback.reduce((s, f) => s + f.rating, 0) / mockMealFeedback.length;
  const stats = [
    { l: "Today's Meals", v: today?.meals.length || 0, icon: UtensilsCrossed, c: 'bg-primary/10 text-primary' },
    { l: 'Guest Bookings', v: mockGuestMeals.length, icon: Users, c: 'bg-teal/10 text-teal' },
    { l: 'Avg Rating', v: avgRating.toFixed(1), icon: Star, c: 'bg-warning/10 text-warning' },
    { l: 'Menu Days', v: mockMealMenus.length, icon: Calendar, c: 'bg-rose/10 text-rose' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Meal Management</h1><p className="text-muted-foreground">Today's menu and meal overview</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><Card><CardContent className="p-5"><div className={`p-2.5 rounded-xl w-fit ${s.c}`}><s.icon className="h-5 w-5" /></div><div className="mt-3"><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div></CardContent></Card></motion.div>))}
      </div>
      {today && <Card><CardHeader className="pb-3"><CardTitle className="text-base">Today's Menu — {new Date(today.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle></CardHeader>
        <CardContent><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {today.meals.map(meal => (
            <div key={meal.type} className="p-4 rounded-lg border bg-muted/30">
              <Badge variant="secondary" className="mb-2">{meal.type}</Badge>
              <ul className="space-y-1">{meal.items.map(item => <li key={item} className="text-sm">{item}</li>)}</ul>
            </div>
          ))}
        </div></CardContent>
      </Card>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">Guest Meal Bookings</CardTitle></CardHeader><CardContent>
          {mockGuestMeals.map(g => (<div key={g.id} className="flex items-center justify-between p-3 rounded-lg border mb-2">
            <div><p className="text-sm font-medium">{g.studentName}</p><p className="text-xs text-muted-foreground">{g.guestCount} guest(s) for {g.mealType} on {new Date(g.date).toLocaleDateString()}</p></div>
            <Badge variant="outline" className={g.status === 'APPROVED' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}>{g.status}</Badge>
          </div>))}
        </CardContent></Card>
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">Recent Feedback</CardTitle></CardHeader><CardContent>
          {mockMealFeedback.map(f => (<div key={f.id} className="p-3 rounded-lg border mb-2">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">{f.studentName}</span><div className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3 w-3 ${i < f.rating ? 'fill-warning text-warning' : 'text-muted'}`} />)}</div></div>
            {f.comment && <p className="text-xs text-muted-foreground mt-1">{f.comment}</p>}
          </div>))}
        </CardContent></Card>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, CalendarDays, UtensilsCrossed, Ban, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addDays, startOfDay } from 'date-fns';
import type { MealType, HallOffMeal } from '@/types';

const TOTAL_STUDENTS = 1024;

// Mock cancellations per day/meal — in prod from API
const mockCancellationCounts: Record<string, Record<MealType, number>> = {
  [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: { BREAKFAST: 87, LUNCH: 45, SNACKS: 112, DINNER: 62 },
  [format(addDays(new Date(), 2), 'yyyy-MM-dd')]: { BREAKFAST: 134, LUNCH: 78, SNACKS: 156, DINNER: 91 },
  [format(addDays(new Date(), 3), 'yyyy-MM-dd')]: { BREAKFAST: 56, LUNCH: 23, SNACKS: 89, DINNER: 34 },
};

const MEAL_LABELS: Record<MealType, string> = { BREAKFAST: 'Breakfast', LUNCH: 'Lunch', SNACKS: 'Snacks', DINNER: 'Dinner' };

export default function StaffMealOverviewPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [hallOffMeals, setHallOffMeals] = useState<HallOffMeal[]>([]);
  const [offReason, setOffReason] = useState('');
  const [offMealType, setOffMealType] = useState<MealType>('LUNCH');
  const [dialogOpen, setDialogOpen] = useState(false);

  const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const counts = mockCancellationCounts[dateStr] || { BREAKFAST: 0, LUNCH: 0, SNACKS: 0, DINNER: 0 };

  const hallOffForDate = hallOffMeals.filter(h => h.date === dateStr);

  const addHallOff = () => {
    if (!selectedDate || !offReason.trim()) return;
    setHallOffMeals(prev => [...prev, {
      id: `ho-${Date.now()}`,
      date: dateStr,
      mealType: offMealType,
      reason: offReason,
      createdBy: 'Dining Staff',
      createdAt: new Date().toISOString(),
    }]);
    toast({ title: 'Hall-off meal set', description: `${MEAL_LABELS[offMealType]} on ${format(selectedDate, 'MMM d')} marked as hall-off.` });
    setOffReason('');
    setDialogOpen(false);
  };

  const mealCards = (['BREAKFAST', 'LUNCH', 'SNACKS', 'DINNER'] as MealType[]).map(type => {
    const cancelled = counts[type];
    const isOff = hallOffForDate.some(h => h.mealType === type);
    const expected = isOff ? 0 : TOTAL_STUDENTS - cancelled;
    return { type, label: MEAL_LABELS[type], cancelled, expected, isOff };
  });

  const totalExpected = mealCards.reduce((s, m) => s + m.expected, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Meal Count Overview</h1>
          <p className="text-muted-foreground">See how many students are expected for each meal</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-teal text-primary-foreground shadow-teal">
              <Plus className="h-4 w-4 mr-2" /> Set Hall-Off Meal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Mark Hall-Off Meal</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Date</Label>
                <p className="text-sm font-medium mt-1">{selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select date first'}</p>
              </div>
              <div>
                <Label>Meal</Label>
                <Select value={offMealType} onValueChange={(v) => setOffMealType(v as MealType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(['BREAKFAST', 'LUNCH', 'SNACKS', 'DINNER'] as MealType[]).map(t => (
                      <SelectItem key={t} value={t}>{MEAL_LABELS[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Reason</Label>
                <Textarea placeholder="e.g., Hall closed for Eid vacation" value={offReason} onChange={e => setOffReason(e.target.value)} />
              </div>
              <Button onClick={addHallOff} className="w-full" disabled={!offReason.trim() || !selectedDate}>
                Confirm Hall-Off
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Meal counts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mealCards.map((m, i) => (
              <motion.div key={m.type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className={m.isOff ? 'border-destructive/30 bg-destructive/5' : ''}>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                    {m.isOff ? (
                      <Badge variant="destructive" className="text-xs">HALL OFF</Badge>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-foreground">{m.expected}</p>
                        <p className="text-xs text-muted-foreground">{m.cancelled} cancelled</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Summary — {selectedDate ? format(selectedDate, 'EEEE, MMM d') : '—'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <Users className="h-6 w-6 mx-auto text-primary mb-1" />
                  <p className="text-2xl font-bold">{totalExpected}</p>
                  <p className="text-xs text-muted-foreground">Total expected meals</p>
                </div>
                <div className="p-4 rounded-xl bg-destructive/10 text-center">
                  <Ban className="h-6 w-6 mx-auto text-destructive mb-1" />
                  <p className="text-2xl font-bold">{Object.values(counts).reduce((a, b) => a + b, 0)}</p>
                  <p className="text-xs text-muted-foreground">Total cancellations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {hallOffForDate.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-destructive flex items-center gap-2">
                  <Ban className="h-4 w-4" /> Hall-Off Meals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hallOffForDate.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="text-sm font-medium">{MEAL_LABELS[h.mealType]}</p>
                      <p className="text-xs text-muted-foreground">{h.reason}</p>
                    </div>
                    <Badge variant="destructive">Off</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth.store';
import { UtensilsCrossed, CalendarDays, Ban } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addDays, isBefore, startOfDay, isToday } from 'date-fns';
import type { MealType } from '@/types';

const MEAL_TYPES: { type: MealType; label: string; time: string }[] = [
  { type: 'BREAKFAST', label: 'Breakfast', time: '7:30 AM' },
  { type: 'LUNCH', label: 'Lunch', time: '1:00 PM' },
  { type: 'SNACKS', label: 'Snacks', time: '5:00 PM' },
  { type: 'DINNER', label: 'Dinner', time: '8:30 PM' },
];

// Local state for demo — in prod this comes from API
const initialCancellations: { date: string; mealType: MealType }[] = [];

export default function MealCancellationPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [cancellations, setCancellations] = useState(initialCancellations);

  const tomorrow = startOfDay(addDays(new Date(), 1));

  const isDateCancellable = (date: Date) => {
    return !isBefore(startOfDay(date), tomorrow);
  };

  const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  const cancelledMeals = useMemo(() => {
    return cancellations.filter(c => c.date === dateStr).map(c => c.mealType);
  }, [cancellations, dateStr]);

  const toggleMeal = (mealType: MealType) => {
    if (!selectedDate || !isDateCancellable(selectedDate)) return;

    if (cancelledMeals.includes(mealType)) {
      setCancellations(prev => prev.filter(c => !(c.date === dateStr && c.mealType === mealType)));
      toast({ title: 'Meal restored', description: `${mealType} on ${format(selectedDate, 'MMM d')} restored.` });
    } else {
      setCancellations(prev => [...prev, { date: dateStr, mealType }]);
      toast({ title: 'Meal cancelled', description: `${mealType} on ${format(selectedDate, 'MMM d')} cancelled.` });
    }
  };

  const cancelAllForDate = () => {
    if (!selectedDate || !isDateCancellable(selectedDate)) return;
    const newCancellations = MEAL_TYPES
      .filter(m => !cancelledMeals.includes(m.type))
      .map(m => ({ date: dateStr, mealType: m.type }));
    setCancellations(prev => [...prev, ...newCancellations]);
    toast({ title: 'All meals cancelled', description: `All meals on ${format(selectedDate, 'MMM d')} cancelled.` });
  };

  const totalCancelled = cancellations.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meal Cancellation</h1>
        <p className="text-muted-foreground">Cancel meals for upcoming days. You can cancel from tomorrow onwards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Cancelled Meals', value: totalCancelled, icon: Ban, c: 'bg-destructive/10 text-destructive' },
          { label: 'Selected Date', value: selectedDate ? format(selectedDate, 'MMM d') : '—', icon: CalendarDays, c: 'bg-primary/10 text-primary' },
          { label: 'Meals Skipped Today', value: cancelledMeals.length, icon: UtensilsCrossed, c: 'bg-warning/10 text-warning' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${s.c}`}><s.icon className="h-5 w-5" /></div>
                <div><p className="text-xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Select Date
            </CardTitle>
            <CardDescription>Pick a date from tomorrow onwards</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isBefore(startOfDay(date), tomorrow)}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Meal toggle */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            <CardDescription>
              {selectedDate && isDateCancellable(selectedDate)
                ? 'Uncheck meals you want to skip'
                : 'Select a future date to manage meals'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDate && isDateCancellable(selectedDate) ? (
              <>
                {MEAL_TYPES.map(({ type, label, time }) => {
                  const isCancelled = cancelledMeals.includes(type);
                  return (
                    <div
                      key={type}
                      onClick={() => toggleMeal(type)}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        isCancelled
                          ? 'bg-destructive/5 border-destructive/30'
                          : 'bg-success/5 border-success/30 hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={!isCancelled} />
                        <div>
                          <p className="font-medium text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{time}</p>
                        </div>
                      </div>
                      <Badge variant={isCancelled ? 'destructive' : 'secondary'}>
                        {isCancelled ? 'Cancelled' : 'Active'}
                      </Badge>
                    </div>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={cancelAllForDate}
                  disabled={cancelledMeals.length === MEAL_TYPES.length}
                >
                  Cancel All Meals for This Day
                </Button>
              </>
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
                Select a date from tomorrow onwards to manage meals
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

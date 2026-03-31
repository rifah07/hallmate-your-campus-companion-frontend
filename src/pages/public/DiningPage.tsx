import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Utensils, Clock, Star, Users, Coffee, Salad, Soup, CakeSlice, HandPlatter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mealSchedule = [
  { meal: 'Breakfast', time: '7:00 AM – 9:00 AM', icon: Coffee, items: ['Toast/Paratha', 'Egg (Boiled/Omelet)', 'Tea/Milk', 'Banana/Seasonal Fruit', 'Bhaji/Halwa (Alternating)'] },
  { meal: 'Lunch', time: '12:30 PM – 2:30 PM', icon: Salad, items: ['Rice', 'Fish/Chicken Curry', 'Dal', 'Mixed Vegetables', 'Salad', 'Chutney'] },
  { meal: 'Snacks', time: '5:00 PM – 6:00 PM', icon: CakeSlice, items: ['Singara/Piyaju/Samosa', 'Tea', 'Seasonal Snack (Alternating)'] },
  { meal: 'Dinner', time: '8:00 PM – 10:00 PM', icon: Soup, items: ['Rice/Roti', 'Meat Curry (Beef/Chicken/Mutton)', 'Dal', 'Vegetables', 'Dessert (Fridays)'] },
];

const weeklyMenu = {
  Saturday: { breakfast: 'Paratha, Egg Curry, Tea', lunch: 'Rice, Fish Curry, Dal, Salad', snacks: 'Singara, Tea', dinner: 'Rice, Beef Curry, Mixed Vegetables' },
  Sunday: { breakfast: 'Toast, Jam, Boiled Egg, Milk', lunch: 'Rice, Chicken Curry, Aloo Bharta, Dal', snacks: 'Piyaju, Tea', dinner: 'Khichuri, Egg, Salad' },
  Monday: { breakfast: 'Luchi, Halwa, Tea', lunch: 'Rice, Prawn Curry, Bhaji, Dal', snacks: 'Cake, Tea', dinner: 'Rice, Mutton Curry, Dal' },
  Tuesday: { breakfast: 'Paratha, Bhaji, Tea', lunch: 'Rice, Fish Fry, Dal, Vegetables', snacks: 'Samosa, Tea', dinner: 'Rice, Chicken Roast, Salad' },
  Wednesday: { breakfast: 'Toast, Egg, Banana, Tea', lunch: 'Rice, Beef Bhuna, Dal, Mixed Veg', snacks: 'Singara, Tea', dinner: 'Polao, Chicken, Raita' },
  Thursday: { breakfast: 'Paratha, Egg Curry, Milk', lunch: 'Biryani, Salad, Borhani', snacks: 'Piyaju, Tea', dinner: 'Rice, Fish Curry, Dal' },
  Friday: { breakfast: 'Luchi, Halwa, Egg, Tea', lunch: 'Rice, Hilsha Curry (Seasonal), Dal, Bhaji', snacks: 'Cake, Jilapi, Tea', dinner: 'Polao, Chicken Curry, Firni' },
};

const features = [
  { icon: Star, title: 'Quality Assured', desc: 'Fresh ingredients sourced daily from trusted suppliers' },
  { icon: Users, title: '1000+ Meals Daily', desc: 'Serving breakfast, lunch, snacks, and dinner to all residents' },
  { icon: HandPlatter, title: 'Guest Meals', desc: 'Book guest meals in advance through HallMate app' },
  { icon: Utensils, title: 'Special Dietary', desc: 'Allergy management and dietary preference support' },
];

export default function DiningPage() {
  return (
    <div className="min-h-screen">
      <div className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Dining Hall
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-foreground/80 text-lg">
            Nutritious, home-style meals served with care
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="text-center h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mx-auto mb-3">
                    <f.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Meal Schedule */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Daily Meal Schedule</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mealSchedule.map((m, i) => (
              <motion.div key={m.meal} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <m.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{m.meal}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {m.time}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {m.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Menu */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Weekly Menu</h2>
          <Card>
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="Saturday">
                <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
                  {Object.keys(weeklyMenu).map(day => (
                    <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">{day.slice(0, 3)}</TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(weeklyMenu).map(([day, meals]) => (
                  <TabsContent key={day} value={day} className="mt-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.entries(meals).map(([type, items]) => (
                        <div key={type} className="p-4 rounded-lg bg-accent/50 border border-border">
                          <h4 className="font-semibold text-foreground capitalize mb-1">{type}</h4>
                          <p className="text-sm text-muted-foreground">{items}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dining Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-accent/30 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Dining Hall Information</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>📍 <strong className="text-foreground">Location:</strong> Ground Floor, Main Building</p>
                  <p className="mt-2">💺 <strong className="text-foreground">Capacity:</strong> 300 seats (served in shifts)</p>
                  <p className="mt-2">💰 <strong className="text-foreground">Monthly Charge:</strong> ৳3,000 (Full Board)</p>
                </div>
                <div>
                  <p>🍽️ <strong className="text-foreground">Guest Meal Rate:</strong> ৳80/meal</p>
                  <p className="mt-2">📱 <strong className="text-foreground">Booking:</strong> Via HallMate app (24hrs advance)</p>
                  <p className="mt-2">⭐ <strong className="text-foreground">Feedback:</strong> Rate meals daily through the app</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

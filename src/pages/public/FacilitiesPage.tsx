import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Wifi, Shield, Zap, Droplets, BedDouble, Users, Crown, Sparkles, Wind, Bath, Lamp } from 'lucide-react';

const roomTypes = [
  { type: 'Single', capacity: 1, price: '৳3,000/month', features: ['Private room', 'Study desk', 'Wardrobe', 'Bookshelf'], icon: Crown },
  { type: 'Double', capacity: 2, price: '৳2,000/month', features: ['Shared room', '2 Study desks', '2 Wardrobes', 'Bookshelves'], icon: BedDouble },
  { type: 'Triple', capacity: 3, price: '৳1,500/month', features: ['Shared room', '3 Study desks', '3 Wardrobes', 'Shared shelf'], icon: Users },
  { type: 'Quad', capacity: 4, price: '৳1,200/month', features: ['Shared room', '4 Study desks', '4 Wardrobes', 'Common area'], icon: Sparkles },
];

const amenities = [
  { icon: Wifi, name: 'High-Speed Wi-Fi', desc: 'Campus-wide internet connectivity' },
  { icon: Shield, name: '24/7 Security', desc: 'Round-the-clock security personnel' },
  { icon: Zap, name: 'Generator Backup', desc: 'Uninterrupted power supply' },
  { icon: Droplets, name: 'Water Purifier', desc: 'Clean drinking water on every floor' },
  { icon: Wind, name: 'Air Conditioning', desc: 'Available in select rooms' },
  { icon: Bath, name: 'Clean Washrooms', desc: 'Maintained multiple times daily' },
  { icon: Lamp, name: 'Study Rooms', desc: 'Quiet study spaces on each floor' },
  { icon: Users, name: 'Common Room', desc: 'Recreation and socializing area' },
];

export default function FacilitiesPage() {
  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Our Facilities</h1>
          <p className="text-lg opacity-90">Modern amenities for a comfortable living experience</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Room Types */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Room Types</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomTypes.map((r, i) => (
              <motion.div key={r.type} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-teal-lg transition-all hover:-translate-y-1 border-t-2 border-t-primary">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl gradient-teal mb-4 flex items-center justify-center">
                      <r.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{r.type} Room</h3>
                    <p className="text-primary font-semibold text-sm mb-3">{r.price}</p>
                    <Badge variant="secondary" className="mb-3">Capacity: {r.capacity}</Badge>
                    <ul className="space-y-1.5">
                      {r.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Amenities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center shrink-0">
                      <a.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{a.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const categories = ['All', 'Hall Building', 'Rooms', 'Dining Hall', 'Common Areas', 'Events'];

const photos = [
  { id: 1, category: 'Hall Building', title: 'Main Building Entrance', color: 'from-primary/20 to-sea/20' },
  { id: 2, category: 'Rooms', title: 'Single Room', color: 'from-primary/15 to-accent' },
  { id: 3, category: 'Rooms', title: 'Double Room', color: 'from-sea/20 to-primary/15' },
  { id: 4, category: 'Dining Hall', title: 'Dining Area', color: 'from-primary/10 to-sea/15' },
  { id: 5, category: 'Common Areas', title: 'Study Room', color: 'from-accent to-primary/10' },
  { id: 6, category: 'Events', title: 'Cultural Program', color: 'from-sea/15 to-accent' },
  { id: 7, category: 'Hall Building', title: 'Aerial View', color: 'from-primary/20 to-accent' },
  { id: 8, category: 'Common Areas', title: 'Recreation Room', color: 'from-accent to-sea/20' },
  { id: 9, category: 'Events', title: 'Annual Fest', color: 'from-primary/15 to-sea/20' },
  { id: 10, category: 'Rooms', title: 'Quad Room', color: 'from-sea/20 to-accent' },
  { id: 11, category: 'Dining Hall', title: 'Kitchen', color: 'from-primary/10 to-accent' },
  { id: 12, category: 'Hall Building', title: 'Garden Area', color: 'from-accent to-primary/15' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Photo Gallery</h1>
          <p className="text-lg opacity-90">Explore our hall through pictures</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(c => (
            <Button
              key={c}
              variant={activeCategory === c ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="group cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <div className={`aspect-square rounded-xl bg-gradient-to-br ${photo.color} flex items-center justify-center relative overflow-hidden border border-border/60`}>
                <span className="text-4xl opacity-30">📷</span>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-end">
                  <div className="w-full p-3 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-xs font-medium">{photo.title}</p>
                    <p className="text-white/70 text-[10px]">{photo.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-3xl p-0 bg-background/95 backdrop-blur-md">
          {lightboxIndex !== null && (
            <div className="p-6">
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${filtered[lightboxIndex]?.color} flex items-center justify-center`}>
                <span className="text-6xl opacity-30">📷</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{filtered[lightboxIndex]?.title}</h3>
                  <p className="text-sm text-muted-foreground">{filtered[lightboxIndex]?.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

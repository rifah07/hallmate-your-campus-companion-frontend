import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Hall Building', 'Rooms', 'Dining Hall', 'Common Areas', 'Events'] as const;

// Placeholder images from picsum.photos — replace URLs with actual API data later
const photos = [
  { id: 1, category: 'Hall Building', title: 'Main Building Entrance', src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=600&fit=crop' },
  { id: 2, category: 'Rooms', title: 'Single Room Interior', src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=600&fit=crop' },
  { id: 3, category: 'Rooms', title: 'Double Room Setup', src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=600&fit=crop' },
  { id: 4, category: 'Dining Hall', title: 'Dining Area', src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=600&fit=crop' },
  { id: 5, category: 'Common Areas', title: 'Study Room', src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop' },
  { id: 6, category: 'Events', title: 'Cultural Program', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop' },
  { id: 7, category: 'Hall Building', title: 'Aerial View of Campus', src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=600&fit=crop' },
  { id: 8, category: 'Common Areas', title: 'Recreation Room', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop' },
  { id: 9, category: 'Events', title: 'Annual Festival', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop' },
  { id: 10, category: 'Rooms', title: 'Quad Room', src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=600&fit=crop' },
  { id: 11, category: 'Dining Hall', title: 'Kitchen & Serving Area', src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop' },
  { id: 12, category: 'Hall Building', title: 'Garden & Green Area', src: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=600&fit=crop' },
  { id: 13, category: 'Common Areas', title: 'Library Corner', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=600&fit=crop' },
  { id: 14, category: 'Events', title: 'Sports Day', src: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=600&fit=crop' },
  { id: 15, category: 'Hall Building', title: 'Night View', src: 'https://images.unsplash.com/photo-1559135197-8a45ea74d367?w=600&h=600&fit=crop' },
  { id: 16, category: 'Dining Hall', title: 'Breakfast Setup', src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=600&fit=crop' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const navigateLightbox = useCallback((dir: -1 | 1) => {
    setLightboxIndex(i => i !== null ? (i + dir + filtered.length) % filtered.length : null);
  }, [filtered.length]);

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

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
            <Button key={c} variant={activeCategory === c ? 'default' : 'outline'} size="sm" onClick={() => setActiveCategory(c)}>
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
              <div className="aspect-square rounded-xl overflow-hidden relative border border-border/60 bg-muted">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                  <div className="w-full p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm font-medium">{photo.title}</p>
                    <p className="text-white/70 text-xs">{photo.category}</p>
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
          {currentPhoto && (
            <div className="p-6">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <img src={currentPhoto.src} alt={currentPhoto.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{currentPhoto.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentPhoto.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateLightbox(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateLightbox(1)}>
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

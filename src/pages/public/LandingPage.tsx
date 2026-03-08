import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, UtensilsCrossed, ShieldCheck, BookOpen, Users, BedDouble, Building, Clock, Star, ArrowRight, Quote } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ end, label, icon: Icon }: { end: number; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const step = end / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="w-14 h-14 rounded-2xl gradient-teal mx-auto mb-3 flex items-center justify-center shadow-teal">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <div className="text-4xl font-extrabold text-primary">{count}+</div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
}

const features = [
  { icon: Home, title: 'Modern Facilities', desc: 'Well-furnished rooms with all modern amenities for comfortable living and studying.' },
  { icon: UtensilsCrossed, title: 'Nutritious Meals', desc: 'Three meals a day plus snacks, prepared fresh in our hygienic dining hall.' },
  { icon: ShieldCheck, title: 'Safe Environment', desc: '24/7 security with CCTV surveillance and strict visitor management.' },
  { icon: BookOpen, title: 'Study-Friendly', desc: 'Dedicated study rooms, Wi-Fi connectivity, and quiet hours for academic excellence.' },
];

const testimonials = [
  { name: 'Fatima Rahman', dept: 'CSE, 3rd Year', text: 'HallMate has been my second home. The facilities are excellent and the community is wonderful.', avatar: 'FR' },
  { name: 'Nusrat Jahan', dept: 'EEE, 4th Year', text: 'I feel safe and supported here. The house tutors are always available and caring.', avatar: 'NJ' },
  { name: 'Ayesha Siddika', dept: 'BBA, 2nd Year', text: 'The meal quality and study environment make this the best hall on campus.', avatar: 'AS' },
];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-teal py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center text-primary-foreground"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-sm">
              University Women's Hall
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 font-medium">
              A Home Away From Home — Where Safety, Comfort & Academic Excellence Meet
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-8">
                  Apply for Admission <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/15 font-semibold px-8">
                  Student Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Us</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Everything you need for a fulfilling residential experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-teal-lg hover:-translate-y-1 transition-all duration-300 border-border/60">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="w-16 h-16 rounded-2xl gradient-teal mx-auto mb-4 flex items-center justify-center shadow-teal">
                      <f.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter end={500} label="Students" icon={Users} />
            <AnimatedCounter end={200} label="Rooms" icon={BedDouble} />
            <AnimatedCounter end={14} label="Floors" icon={Building} />
            <AnimatedCounter end={24} label="Hour Security" icon={Clock} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">What Our Students Say</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/60 shadow-teal">
              <CardContent className="p-8 text-center">
                <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg text-foreground mb-6 italic leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground text-sm">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].dept}</p>
                    </div>
                  </div>
                </motion.div>
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeTestimonial ? 'bg-primary' : 'bg-border'}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-teal text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
            Apply now and become part of a thriving residential experience.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-10">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Home, UtensilsCrossed, ShieldCheck, BookOpen, Users, BedDouble, Building, Clock,
  ArrowRight, Quote, QrCode, CreditCard, Wrench, AlertTriangle, Star, Smartphone,
  UserCheck, BookMarked, Bell, BarChart3, Eye
} from 'lucide-react';
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
  { icon: Home, title: 'Modern Facilities', desc: 'Well-furnished rooms with study desks, Wi-Fi, and all modern amenities.' },
  { icon: UtensilsCrossed, title: 'Nutritious Meals', desc: 'Three meals a day plus snacks with meal preference & allergy management.' },
  { icon: ShieldCheck, title: 'Safe & Secure', desc: '24/7 security, CCTV surveillance, visitor approval system, and emergency SOS.' },
  { icon: BookOpen, title: 'Study-Friendly', desc: 'Dedicated study rooms with booking system and quiet hours for academic excellence.' },
];

const studentFeatures = [
  { icon: QrCode, title: 'Digital Hall ID', desc: 'QR code-based digital ID card for quick verification' },
  { icon: CreditCard, title: 'Easy Payments', desc: 'Pay via bKash, Nagad, bank transfer, or cards' },
  { icon: Wrench, title: 'Complaint Tracking', desc: 'Submit and track complaints with priority-based SLA' },
  { icon: UserCheck, title: 'Visitor Approval', desc: 'Digital visitor pre-approval and management' },
  { icon: BookMarked, title: 'Study Room Booking', desc: 'Book study rooms online with real-time availability' },
  { icon: AlertTriangle, title: 'Emergency SOS', desc: 'One-tap emergency alert to security and administration' },
];

const adminFeatures = [
  { icon: BarChart3, title: 'Smart Dashboards', desc: 'Role-based dashboards for Provost, House Tutors, and staff' },
  { icon: Eye, title: 'Full Transparency', desc: 'Provost oversight of all hall operations in real-time' },
  { icon: CreditCard, title: 'Automated Billing', desc: 'Automated fee generation, tracking, and payment verification' },
  { icon: Users, title: 'Seat Management', desc: 'Seat allocation, swapping, transfers, and guest room booking' },
];

const testimonials = [
  { name: 'Fatima Rahman', dept: 'CSE, 3rd Year', text: 'HallMate has transformed how we manage our hall life. The digital ID and online payments save so much time!', avatar: 'FR' },
  { name: 'Nusrat Jahan', dept: 'EEE, 4th Year', text: 'I feel safe and supported here. The SOS button and visitor management system give my parents peace of mind.', avatar: 'NJ' },
  { name: 'Ayesha Siddika', dept: 'BBA, 2nd Year', text: 'Booking study rooms and tracking my complaints online is incredibly convenient. Best hall management system!', avatar: 'AS' },
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
              A Home Away From Home — Smart, Safe & Digitally Managed University Hall
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-8">
                  Apply for Seat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="bg-primary-foreground/20 text-white border-2 border-white hover:bg-white hover:text-primary font-semibold px-8 backdrop-blur-sm">
                  Student Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Our Hall</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">A digitally managed residential experience for university women</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
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
            <AnimatedCounter end={1000} label="Students" icon={Users} />
            <AnimatedCounter end={350} label="Rooms" icon={BedDouble} />
            <AnimatedCounter end={14} label="Floors" icon={Building} />
            <AnimatedCounter end={24} label="Hour Security" icon={Clock} />
          </div>
        </div>
      </section>

      {/* Student Features */}
      <section className="py-20 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">For Students</h2>
            <p className="text-muted-foreground mt-2">Smart digital tools to make hall life seamless</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {studentFeatures.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-0.5 border-border/60">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">For Administration</h2>
            <p className="text-muted-foreground mt-2">Comprehensive tools for Provost, House Tutors & staff</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {adminFeatures.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="text-center hover:shadow-teal-lg transition-all hover:-translate-y-1 border-border/60">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl gradient-teal mx-auto mb-3 flex items-center justify-center">
                      <f.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Feature Banner */}
      <section className="py-12 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-accent/40">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-2xl gradient-teal flex items-center justify-center shrink-0 shadow-teal">
                <Smartphone className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-foreground mb-1">Dedicated Parent Portal</h3>
                <p className="text-sm text-muted-foreground">Parents can view attendance, payment status, receive monthly reports, and get emergency notifications — all from a read-only portal.</p>
              </div>
              <Link to="/about">
                <Button variant="outline" size="sm">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
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
            Apply for a seat and become part of a thriving university residential experience.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-10">
              Apply for Seat <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

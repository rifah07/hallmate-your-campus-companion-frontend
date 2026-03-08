import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Home, UtensilsCrossed, ShieldCheck, BookOpen, Users, BedDouble, Building, Clock,
  ArrowRight, Quote, QrCode, CreditCard, Wrench, AlertTriangle, Star, Smartphone,
  UserCheck, BookMarked, Bell, BarChart3, Eye, Sparkles, Heart, LogIn
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ end, label, icon: Icon, suffix = '+' }: { end: number; label: string; icon: React.ElementType; suffix?: string }) {
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
    <div ref={ref} className="text-center group">
      <div className="w-16 h-16 rounded-2xl gradient-teal mx-auto mb-4 flex items-center justify-center shadow-teal group-hover:scale-105 transition-transform">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <div className="text-4xl font-extrabold text-primary tracking-tight">{count}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1.5 font-medium">{label}</div>
    </div>
  );
}

const features = [
  { icon: Home, title: 'Modern Facilities', desc: 'Well-furnished rooms with study desks, Wi-Fi, and all modern amenities for comfortable living.' },
  { icon: UtensilsCrossed, title: 'Nutritious Meals', desc: 'Three meals a day plus snacks with dietary preference management and meal cancellation.' },
  { icon: ShieldCheck, title: 'Safe & Secure', desc: '24/7 security, CCTV surveillance, digital visitor approval, and emergency SOS alerts.' },
  { icon: BookOpen, title: 'Study-Friendly', desc: 'Quiet study rooms, reading lounges, and enforced study hours for academic excellence.' },
];

const studentFeatures = [
  { icon: QrCode, title: 'Digital Hall ID', desc: 'QR code-based digital ID for quick verification at gates and events' },
  { icon: CreditCard, title: 'Easy Payments', desc: 'Pay fees via bKash, Nagad, bank transfer, or cards with instant receipts' },
  { icon: Wrench, title: 'Complaint Tracking', desc: 'Submit and track complaints with real-time status updates' },
  { icon: UserCheck, title: 'Visitor Approval', desc: 'Digital visitor pre-approval and real-time tracking' },
  { icon: BookMarked, title: 'Study Room Booking', desc: 'Reserve study rooms online with real-time availability' },
  { icon: AlertTriangle, title: 'Emergency SOS', desc: 'One-tap emergency alert to security and administration' },
];

const adminFeatures = [
  { icon: BarChart3, title: 'Smart Dashboards', desc: 'Role-based analytics for Provost, House Tutors & staff' },
  { icon: Eye, title: 'Full Transparency', desc: 'Provost oversight of all operations in real-time' },
  { icon: CreditCard, title: 'Automated Billing', desc: 'Monthly fee generation, tracking, and payment verification' },
  { icon: Users, title: 'Seat Management', desc: 'Allocation, transfers, and guest room booking system' },
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
      <section className="relative overflow-hidden gradient-teal py-28 md:py-36 lg:py-44">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center text-primary-foreground"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              Smart Digital Hall Management
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5 drop-shadow-sm">
              University Women's Hall
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
              A Home Away From Home — Safe, Smart & Digitally Managed Residential Experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-8 h-12 text-base">
                  Apply for Seat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="bg-white/15 text-white border-2 border-white/40 hover:bg-white hover:text-primary font-semibold px-8 h-12 text-base backdrop-blur-sm">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Premier Living Experience</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">A digitally managed residential experience designed for university women</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center h-full hover:shadow-teal-lg hover:-translate-y-1.5 transition-all duration-300 border-border/50 group">
                  <CardContent className="pt-10 pb-8 px-6">
                    <div className="w-16 h-16 rounded-2xl gradient-teal mx-auto mb-5 flex items-center justify-center shadow-teal group-hover:scale-110 transition-transform">
                      <f.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatedCounter end={1000} label="Students" icon={Users} />
            <AnimatedCounter end={350} label="Rooms" icon={BedDouble} />
            <AnimatedCounter end={14} label="Floors" icon={Building} />
            <AnimatedCounter end={24} label="Hour Security" icon={Clock} suffix="/7" />
          </div>
        </div>
      </section>

      {/* Student Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Student Portal</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Smart Tools for Students</h2>
            <p className="text-muted-foreground mt-3">Digital tools to make hall life seamless and enjoyable</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {studentFeatures.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-0.5 border-border/50 group h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <f.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-24 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Administration</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Powerful Management Tools</h2>
            <p className="text-muted-foreground mt-3">Comprehensive tools for Provost, House Tutors & staff</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="text-center hover:shadow-teal-lg transition-all hover:-translate-y-1 border-border/50 group h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl gradient-teal mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <f.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Feature Banner */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <Card className="border-primary/15 bg-gradient-to-r from-accent/60 to-secondary/40 overflow-hidden">
            <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center shrink-0 shadow-teal">
                <Smartphone className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">Dedicated Parent Portal</h3>
                <p className="text-muted-foreground leading-relaxed">Parents can view attendance, payment status, receive monthly reports, and get emergency notifications — all from a secure read-only portal.</p>
              </div>
              <Link to="/about">
                <Button variant="outline" className="shrink-0">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Students Say</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 shadow-teal-lg">
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-warning fill-warning" />)}
                </div>
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg text-foreground mb-8 italic leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm shadow-teal">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].dept}</p>
                    </div>
                  </div>
                </motion.div>
                <div className="flex justify-center gap-2.5 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-primary w-8' : 'bg-border w-2'}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-teal text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Heart className="w-10 h-10 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Ready to Join Our Community?</h2>
            <p className="text-lg opacity-90 mb-10 max-w-lg mx-auto leading-relaxed">
              Apply for a seat and become part of a thriving university residential experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold px-10 h-12 text-base">
                  Apply for Seat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="bg-white/15 text-white border-2 border-white/40 hover:bg-white hover:text-primary font-semibold px-10 h-12 text-base backdrop-blur-sm">
                  Sign In <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home, UtensilsCrossed, ShieldCheck, BookOpen, Users, BedDouble, Building, Clock,
  ArrowRight, Quote, QrCode, CreditCard, Wrench, AlertTriangle, Star, Smartphone,
  UserCheck, BookMarked, Bell, BarChart3, Eye, Sparkles, Heart, LogIn, Calendar,
  Megaphone, MessageCircle, ChevronRight, Zap, Shield, Globe,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { mockNotices, mockEvents } from '@/lib/mock-data';

// ── Stagger container ────────────────────────────────────────────
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } } };

// ── Animated Counter ─────────────────────────────────────────────
function AnimatedCounter({ end, label, icon: Icon, suffix = '+' }: { end: number; label: string; icon: React.ElementType; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
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
    <motion.div ref={ref} variants={fadeUp} className="text-center group">
      <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="text-4xl font-extrabold text-primary-foreground tracking-tight">{count}{suffix}</div>
      <div className="text-sm text-primary-foreground/70 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

// ── Section Header ───────────────────────────────────────────────
function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs uppercase tracking-[0.15em] mb-3 bg-primary/8 px-3 py-1 rounded-full border border-primary/15">
        <Sparkles className="w-3 h-3" /> {tag}
      </span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed text-sm">{subtitle}</p>}
    </motion.div>
  );
}

// ── Data ─────────────────────────────────────────────────────────
const features = [
  { icon: Home, title: 'Modern Facilities', desc: 'Well-furnished rooms with study desks, Wi-Fi, and all modern amenities for comfortable living.', color: 'from-primary to-primary-glow' },
  { icon: UtensilsCrossed, title: 'Nutritious Meals', desc: 'Three meals a day plus snacks with dietary preference management and meal cancellation.', color: 'from-sea to-primary' },
  { icon: ShieldCheck, title: 'Safe & Secure', desc: '24/7 security, CCTV surveillance, digital visitor approval, and emergency SOS alerts.', color: 'from-primary-glow to-sea' },
  { icon: BookOpen, title: 'Study-Friendly', desc: 'Quiet study rooms, reading lounges, and enforced study hours for academic excellence.', color: 'from-teal to-primary-glow' },
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

const NOTICE_COLORS: Record<string, string> = {
  URGENT: 'bg-destructive/10 text-destructive border-destructive/20',
  EVENT: 'bg-primary/10 text-primary border-primary/20',
  MAINTENANCE: 'bg-warning/10 text-warning border-warning/20',
  ACADEMIC: 'bg-sea/10 text-sea border-sea/20',
  GENERAL: 'bg-muted text-muted-foreground border-border',
};

// ── Main Component ───────────────────────────────────────────────
export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const recentNotices = mockNotices.slice(0, 5);
  const recentEvents = mockEvents.slice(0, 4);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ═══════ Hero ═══════ */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Parallax background image */}
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }} className="absolute inset-0">
          <img src="/images/hall-building.jpg" alt="University Women's Hall Building" className="w-full h-full object-cover" />
        </motion.div>
        {/* Teal gradient overlay */}
        <div className="absolute inset-0 gradient-teal opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-white/[0.06] rounded-full blur-[100px]" />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 25, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative z-10 py-28">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-white/[0.12] backdrop-blur-md border border-white/[0.15] px-4 py-1.5 rounded-full text-xs font-medium mb-8 tracking-wide">
                <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                Smart Digital Hall Management
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] mb-5">
              University Women's Hall
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base opacity-80 leading-[1.7] max-w-lg mx-auto mb-10 font-normal">
              A Home Away From Home — Safe, Smart & Digitally Managed Residential Experience
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/apply">
                <Button className="bg-white text-primary hover:bg-white/95 shadow-xl shadow-black/10 font-semibold px-8 h-11 text-sm rounded-xl group transition-all duration-200 hover:shadow-2xl">
                  Apply for Seat <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-white/[0.12] text-white border border-white/20 hover:bg-white/[0.2] font-medium px-8 h-11 text-sm backdrop-blur-md rounded-xl transition-all duration-200">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 80V40C360 70 720 10 1080 40C1260 55 1380 50 1440 45V80H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ═══════ Stats ═══════ */}
      <section className="relative mt-4 sm:mt-6 z-10 pb-10">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-4xl mx-auto gradient-teal rounded-2xl p-8 md:p-10 shadow-glow">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatedCounter end={1000} label="Students" icon={Users} />
              <AnimatedCounter end={350} label="Rooms" icon={BedDouble} />
              <AnimatedCounter end={14} label="Floors" icon={Building} />
              <AnimatedCounter end={24} label="Hour Security" icon={Clock} suffix="/7" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Provost's Message ═══════ */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader tag="From the Provost" title="Provost's Message" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="max-w-4xl mx-auto border-border/40 overflow-hidden shadow-elegant hover:shadow-glow transition-shadow duration-500">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 shrink-0 gradient-teal p-10 flex flex-col items-center justify-center text-center text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 border-2 border-white/25 shadow-lg">
                        <img
                          src="https://ui-avatars.com/api/?name=Nasreen+Ahmed&background=random&size=128"
                          alt="Prof. Nasreen Ahmed"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg">Prof. Nasreen Ahmed</h3>
                      <p className="text-sm opacity-80 mt-0.5">Provost</p>
                      <p className="text-xs opacity-60 mt-1">Department of Physics</p>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 lg:p-12 flex-1">
                    <Quote className="w-10 h-10 text-primary/15 mb-5" />
                    <p className="text-foreground leading-[1.8] text-base mb-4">
                      Welcome to University Women's Hall — a vibrant community that nurtures academic excellence, personal growth, and lifelong friendships. Our commitment is to provide a safe, inclusive, and digitally-empowered living environment for every resident.
                    </p>
                    <p className="text-muted-foreground leading-[1.8] text-sm mb-8">
                      With HallMate, we have embraced technology to streamline hall operations, from room management to meal planning, ensuring transparency and efficiency in every aspect of residential life.
                    </p>
                    <Link to="/provost">
                      <Button variant="outline" size="sm" className="group rounded-lg font-semibold">
                        Read Full Message <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Core Features ═══════ */}
      <section className="py-14 md:py-16 relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-4 relative">
          <SectionHeader tag="Why Choose Us" title="A Premier Living Experience" subtitle="A digitally managed residential experience designed for university women" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="text-center h-full hover-lift border-border/40 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="pt-10 pb-8 px-6 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} mx-auto mb-5 flex items-center justify-center shadow-teal group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}>
                      <f.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ Recent Notices ═══════ */}
      <section className="py-14 md:py-16 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Stay Updated" title="Recent Notices" subtitle="Important announcements and updates from the hall administration" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto space-y-3">
            {recentNotices.map((notice) => (
              <motion.div key={notice.id} variants={fadeUp}>
                <Link to={`/public-notices/${notice.id}`}>
                  <Card className="border-border/40 hover:border-primary/25 hover:shadow-teal transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl gradient-teal flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:shadow-teal transition-all duration-300">
                        <Megaphone className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200">{notice.title}</h3>
                          {notice.isPinned && (
                            <Badge variant="outline" className="text-[10px] bg-primary/8 text-primary border-primary/15 shrink-0">📌 Pinned</Badge>
                          )}
                          <Badge variant="outline" className={`text-[10px] shrink-0 ${NOTICE_COLORS[notice.category] || NOTICE_COLORS.GENERAL}`}>
                            {notice.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{notice.content}</p>
                        <p className="text-xs text-muted-foreground/50 mt-2">{new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {notice.authorName}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-2 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/public-notices">
              <Button variant="outline" size="lg" className="group font-semibold rounded-xl shadow-soft hover:shadow-teal transition-all">
                View All Notices <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Recent Events ═══════ */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Happening Now" title="Upcoming Events" subtitle="Stay connected with hall activities and celebrations" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <Card className="h-full border-border/40 hover-lift group overflow-hidden">
                  <div className="gradient-teal p-5 text-center text-primary-foreground relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                    <div className="relative">
                      <p className="text-3xl font-extrabold leading-none">{new Date(event.date).getDate()}</p>
                      <p className="text-sm font-medium opacity-80 mt-1">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="text-[10px] mb-3 bg-primary/8 text-primary border-primary/15">{event.category}</Badge>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{event.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                      {event.registrationRequired && (
                        <Badge variant="secondary" className="text-[10px]">{event.registeredCount}/{event.maxAttendees}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/events-public">
              <Button variant="outline" size="lg" className="group font-semibold rounded-xl shadow-soft hover:shadow-teal transition-all">
                View All Events <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Student Features ═══════ */}
      <section className="py-14 md:py-16 relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-4 relative">
          <SectionHeader tag="Student Portal" title="Smart Tools for Students" subtitle="Digital tools to make hall life seamless and enjoyable" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {studentFeatures.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="hover-lift border-border/40 group h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-teal transition-all duration-300">
                      <f.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ Admin Features ═══════ */}
      <section className="py-14 md:py-16 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Administration" title="Powerful Management Tools" subtitle="Comprehensive tools for Provost, House Tutors & staff" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="text-center hover-lift border-border/40 group h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl gradient-teal mx-auto mb-5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                      <f.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1.5">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ Parent Portal Banner ═══════ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="border-primary/10 overflow-hidden shadow-elegant relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-secondary/30" />
              <CardContent className="p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 relative">
                <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center shrink-0 shadow-glow">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">Dedicated Parent Portal</h3>
                  <p className="text-muted-foreground leading-relaxed">Parents can view attendance, payment status, receive monthly reports, and get emergency notifications — all from a secure read-only portal.</p>
                </div>
                <Link to="/about">
                  <Button variant="outline" className="shrink-0 rounded-xl font-semibold">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Testimonials ═══════ */}
      <section className="py-14 md:py-16 gradient-teal-subtle">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Testimonials" title="What Our Students Say" />
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/40 shadow-elegant overflow-hidden">
              <CardContent className="p-10 md:p-12 text-center relative">
                <div className="absolute top-0 left-0 right-0 h-1 gradient-teal" />
                <div className="flex justify-center mb-6 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-warning fill-warning" />)}
                </div>
                <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-lg text-foreground mb-8 italic leading-[1.8]">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm shadow-teal">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-foreground">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].dept}</p>
                    </div>
                  </div>
                </motion.div>
                <div className="flex justify-center gap-2.5 mt-8">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestimonial(i)}
                      className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-primary w-8 h-2.5' : 'bg-border hover:bg-primary/30 w-2.5 h-2.5'}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-16 md:py-20 gradient-teal text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-3xl" />
          <motion.div animate={{ x: [0, -30, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mx-auto mb-8 flex items-center justify-center border border-white/15">
              <Heart className="w-8 h-8 opacity-90" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-snug">Ready to Join Our<br />Community?</h2>
            <p className="text-sm sm:text-base opacity-80 mb-10 max-w-md mx-auto leading-relaxed font-normal">
              Apply for a seat and become part of a thriving university residential experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply">
                <Button size="sm" className="bg-white text-primary hover:bg-white/95 shadow-lg shadow-black/8 font-semibold px-7 h-11 text-sm rounded-xl group">
                  Apply for Seat <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="bg-white/10 text-white border border-white/25 hover:bg-white/18 font-medium px-7 h-11 text-sm backdrop-blur-md rounded-xl">
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

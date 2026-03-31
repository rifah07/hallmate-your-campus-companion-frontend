import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import PageBanner from '@/components/public/PageBanner';
import { Target, Eye, Heart, Award, Users, GraduationCap } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const provost = { name: 'Prof. Dr. Nasreen Ahmed', role: 'Provost', initials: 'NA', desc: 'Professor, Dept. of Chemistry. Leading the hall administration since 2020.' };

const houseTutors = [
  { name: 'Dr. Shahana Akter', floor: 'Floors 1–3', initials: 'SA', dept: 'Dept. of Physics' },
  { name: 'Ms. Rubina Islam', floor: 'Floors 4–6', initials: 'RI', dept: 'Dept. of English' },
  { name: 'Dr. Farzana Karim', floor: 'Floors 7–9', initials: 'FK', dept: 'Dept. of Mathematics' },
  { name: 'Ms. Taslima Begum', floor: 'Floors 10–12', initials: 'TB', dept: 'Dept. of Sociology' },
  { name: 'Dr. Nargis Sultana', floor: 'Floors 13–14', initials: 'NS', dept: 'Dept. of Economics' },
];

const values = [
  { icon: Heart, title: 'Care & Safety', desc: 'Every student\'s wellbeing and security is our top priority — 24/7.' },
  { icon: Award, title: 'Academic Excellence', desc: 'Fostering an environment that promotes learning, research, and intellectual growth.' },
  { icon: Users, title: 'Community Spirit', desc: 'Building sisterhood and bonds that last a lifetime among university women.' },
];

const achievements = [
  { title: 'Inter-Hall Debate Champions 2025', desc: 'Our students won the university-wide debate championship for the third consecutive year.' },
  { title: 'Academic Excellence Award', desc: '12 students from our hall received the Dean\'s List recognition this semester.' },
  { title: 'Community Service Award', desc: 'Hall volunteers completed 500+ hours of community service in local schools.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="gradient-teal py-20 text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 tracking-tight">About Our Hall</h1>
            <p className="text-base opacity-80 max-w-lg mx-auto">A legacy of excellence in university women's residential education</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 space-y-24 max-w-5xl">
        {/* History */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 tracking-tight">Our History</h2>
          <div className="w-12 h-0.5 bg-primary mb-6 rounded-full" />
          <p className="text-muted-foreground leading-[1.8] max-w-3xl">
            Established in 1965, the University Women's Hall has been a beacon of empowerment for thousands of female students.
            For over five decades, we have provided a safe, nurturing environment where young women can pursue academic excellence
            while building lifelong friendships. What began as a modest 50-room building has grown into a modern 14-floor facility
            housing over 1,000 students from diverse departments and backgrounds across the university.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <section>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: 'Our Mission', text: 'To provide a safe, inclusive, and digitally-managed residential experience that supports the academic, personal, and social development of every university student.' },
              { icon: Eye, title: 'Our Vision', text: 'To be the premier women\'s residential hall in Bangladesh, recognized for smart management, student welfare, modern facilities, and a thriving academic community.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-border/50 hover:shadow-teal-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mb-5 shadow-teal">
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-[1.7]">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tight">Our Values</h2>
            <div className="w-12 h-0.5 bg-primary mb-8 rounded-full" />
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp}>
                <Card className="text-center h-full border-border/50 hover:shadow-teal-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 rounded-xl gradient-teal mx-auto mb-4 flex items-center justify-center shadow-teal">
                      <v.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 tracking-tight">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Provost */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tight">Provost</h2>
            <div className="w-12 h-0.5 bg-primary mb-8 rounded-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="max-w-sm mx-auto text-center border-border/50 overflow-hidden hover:shadow-teal-lg transition-shadow duration-300">
              <div className="h-1 gradient-teal" />
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-full gradient-teal mx-auto mb-5 flex items-center justify-center text-primary-foreground text-xl font-bold shadow-teal">
                  {provost.initials}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground tracking-tight">{provost.name}</h3>
                <p className="text-primary font-semibold text-sm mt-1">{provost.role}</p>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{provost.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* House Tutors */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tight">House Tutors</h2>
            <div className="w-12 h-0.5 bg-primary mb-8 rounded-full" />
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {houseTutors.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="border-border/50 hover:shadow-teal-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 shadow-teal">
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{t.name}</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">{t.floor}</p>
                      <p className="text-xs text-muted-foreground">{t.dept}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Student Achievements */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tight">Student Achievements</h2>
            <div className="w-12 h-0.5 bg-primary mb-8 rounded-full" />
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-5">
            {achievements.map((a) => (
              <motion.div key={a.title} variants={fadeUp}>
                <Card className="h-full border-border/50 hover:shadow-teal-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <GraduationCap className="w-7 h-7 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground text-sm mb-2">{a.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

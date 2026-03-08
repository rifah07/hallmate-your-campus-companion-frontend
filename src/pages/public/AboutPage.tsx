import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Award, Users, BookOpen, GraduationCap } from 'lucide-react';

const provost = { name: 'Prof. Dr. Nasreen Ahmed', role: 'Provost', initials: 'NA', desc: 'Professor, Dept. of Chemistry. Leading the hall administration since 2020.' };

const houseTutors = [
  { name: 'Dr. Shahana Akter', floor: 'Floors 1–3', initials: 'SA', dept: 'Dept. of Physics' },
  { name: 'Ms. Rubina Islam', floor: 'Floors 4–6', initials: 'RI', dept: 'Dept. of English' },
  { name: 'Dr. Farzana Karim', floor: 'Floors 7–9', initials: 'FK', dept: 'Dept. of Mathematics' },
  { name: 'Ms. Taslima Begum', floor: 'Floors 10–12', initials: 'TB', dept: 'Dept. of Sociology' },
  { name: 'Dr. Nargis Sultana', floor: 'Floors 13–14', initials: 'NS', dept: 'Dept. of Economics' },
];

export default function AboutPage() {
  return (
    <div className="gradient-teal-subtle">
      {/* Header */}
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">About Our Hall</h1>
          <p className="text-lg opacity-90">A legacy of excellence in university women's residential education</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* History */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-primary pb-2 inline-block">Our History</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Established in 1965, the University Women's Hall has been a beacon of empowerment for thousands of female students.
            For over five decades, we have provided a safe, nurturing environment where young women can pursue academic excellence
            while building lifelong friendships. What began as a modest 50-room building has grown into a modern 14-floor facility
            housing over 1,000 students from diverse departments and backgrounds across the university.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: 'Our Mission', text: 'To provide a safe, inclusive, and digitally-managed residential experience that supports the academic, personal, and social development of every university student.' },
            { icon: Eye, title: 'Our Vision', text: 'To be the premier women\'s residential hall in Bangladesh, recognized for smart management, student welfare, modern facilities, and a thriving academic community.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full hover:shadow-teal-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mb-4 shadow-teal">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Our Values</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Care & Safety', desc: 'Every student\'s wellbeing and security is our top priority — 24/7.' },
              { icon: Award, title: 'Academic Excellence', desc: 'Fostering an environment that promotes learning, research, and intellectual growth.' },
              { icon: Users, title: 'Community Spirit', desc: 'Building sisterhood and bonds that last a lifetime among university women.' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center hover:shadow-teal-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl gradient-teal mx-auto mb-3 flex items-center justify-center">
                      <v.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Provost */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Provost</h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="max-w-md mx-auto text-center border-t-2 border-t-primary hover:shadow-teal-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-full gradient-teal mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-teal">
                  {provost.initials}
                </div>
                <h3 className="text-lg font-bold text-foreground">{provost.name}</h3>
                <p className="text-primary font-semibold text-sm">{provost.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{provost.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* House Tutors */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">House Tutors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {houseTutors.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-teal-lg transition-all hover:-translate-y-1 border-l-2 border-l-primary">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{t.name}</h3>
                      <p className="text-xs text-primary font-medium">{t.floor}</p>
                      <p className="text-xs text-muted-foreground">{t.dept}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Student Achievements placeholder */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Student Achievements</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: 'Inter-Hall Debate Champions 2025', desc: 'Our students won the university-wide debate championship for the third consecutive year.' },
              { title: 'Academic Excellence Award', desc: '12 students from our hall received the Dean\'s List recognition this semester.' },
              { title: 'Community Service Award', desc: 'Hall volunteers completed 500+ hours of community service in local schools.' },
            ].map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-teal-lg transition-all">
                  <CardContent className="p-5">
                    <GraduationCap className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground text-sm mb-1">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
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

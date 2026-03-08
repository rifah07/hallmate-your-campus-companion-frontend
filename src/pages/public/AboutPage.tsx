import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Award, Users, BookOpen } from 'lucide-react';

const leaders = [
  { name: 'Prof. Dr. Nasreen Ahmed', role: 'Provost', initials: 'NA' },
  { name: 'Dr. Shahana Akter', role: 'Assistant Provost', initials: 'SA' },
  { name: 'Ms. Rubina Islam', role: 'Office Manager', initials: 'RI' },
];

export default function AboutPage() {
  return (
    <div className="gradient-teal-subtle">
      {/* Header */}
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">About Our Hall</h1>
          <p className="text-lg opacity-90">A legacy of excellence in women's residential education</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* History */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-primary pb-2 inline-block">Our History</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Established in 1965, University Women's Hall has been a beacon of empowerment for thousands of female students.
            For over five decades, we have provided a safe, nurturing environment where young women can pursue academic excellence
            while building lifelong friendships. Our hall has grown from a modest 50-room building to a modern 14-floor facility
            housing over 500 students from diverse backgrounds.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: 'Our Mission', text: 'To provide a safe, inclusive, and stimulating residential experience that supports the academic, personal, and social development of every student.' },
            { icon: Eye, title: 'Our Vision', text: 'To be the premier women\'s residential hall in Bangladesh, recognized for excellence in student welfare, modern facilities, and community spirit.' },
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
              { icon: Heart, title: 'Care & Safety', desc: 'Every student\'s wellbeing is our top priority.' },
              { icon: Award, title: 'Academic Excellence', desc: 'Fostering an environment that promotes learning.' },
              { icon: Users, title: 'Community', desc: 'Building bonds that last a lifetime.' },
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

        {/* Leadership */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Leadership Team</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {leaders.map((l, i) => (
              <motion.div key={l.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center hover:shadow-teal-lg transition-all hover:-translate-y-1 border-t-2 border-t-primary">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full gradient-teal mx-auto mb-3 flex items-center justify-center text-primary-foreground text-xl font-bold">
                      {l.initials}
                    </div>
                    <h3 className="font-semibold text-foreground">{l.name}</h3>
                    <p className="text-sm text-primary font-medium">{l.role}</p>
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

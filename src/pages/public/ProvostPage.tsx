import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Mail, Phone, BookOpen, Award, Calendar, Quote, GraduationCap, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const provost = {
  name: 'Prof. Dr. Nasreen Ahmed',
  designation: 'Provost, University Women\'s Hall',
  department: 'Department of Physics',
  university: 'University of Dhaka',
  photo: 'https://ui-avatars.com/api/?name=Nasreen+Ahmed&background=0f766e&color=fff&size=300&bold=true',
  email: 'provost.womenshall@univ.edu.bd',
  phone: '+880 2 9661920 (Ext. 4501)',
  education: [
    'Ph.D. in Condensed Matter Physics, University of Cambridge, UK',
    'M.Sc. in Physics, University of Dhaka',
    'B.Sc. (Hons.) in Physics, University of Dhaka',
  ],
  research: ['Nanomaterials', 'Semiconductor Physics', 'Renewable Energy'],
  awards: [
    'University Gold Medal, 2005',
    'National Science Award, 2012',
    'Best Teacher Award, Faculty of Science, 2018',
    'UGC Research Fellowship, 2020',
  ],
  tenure: 'January 2022 – Present',
  message: `It is my great privilege to serve as the Provost of the University Women's Hall — one of the most prestigious residential halls of our university, with a legacy spanning over five decades.

Our hall is more than just a place to stay; it is a vibrant community where young women grow intellectually, socially, and emotionally. We are committed to providing a safe, supportive, and enriching environment that fosters academic excellence and personal development.

With the introduction of HallMate, our digital management system, we are embracing technology to ensure transparency, efficiency, and better communication between students, staff, and administration. From online seat applications to digital meal management and automated billing — every aspect of hall life is now at your fingertips.

I encourage every resident to take full advantage of the facilities and opportunities available. Your years at the hall will be among the most memorable of your university life. Let us work together to make this hall a true home away from home.

I warmly welcome all new and returning students to our hall family.`,
};

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

export default function ProvostPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageBanner
        title="Message from the Provost"
        subtitle="Nawab Faizunnesa Chowdhurani Hall"
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Provost Profile Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card className="sticky top-24 overflow-hidden">
              <div className="gradient-teal p-8 text-center">
                <img
                  src={provost.photo}
                  alt={provost.name}
                  className="w-40 h-40 rounded-full mx-auto border-4 border-primary-foreground/30 mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-primary-foreground">{provost.name}</h2>
                <p className="text-primary-foreground/80 text-sm mt-1">{provost.designation}</p>
                <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground border-0">
                  <Calendar className="w-3 h-3 mr-1" /> {provost.tenure}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{provost.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{provost.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{provost.phone}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-primary" /> Education
                  </h3>
                  <ul className="space-y-1.5">
                    {provost.education.map((edu, i) => (
                      <li key={i} className="text-xs text-muted-foreground">• {edu}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {provost.research.map((r, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{r}</Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-primary" /> Awards
                  </h3>
                  <ul className="space-y-1.5">
                    {provost.awards.map((a, i) => (
                      <li key={i} className="text-xs text-muted-foreground">🏆 {a}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Provost's Message */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-10 h-10 text-primary/30 shrink-0 rotate-180" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">Provost's Message</h2>
                    <div className="w-16 h-1 rounded-full bg-primary" />
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  {provost.message.split('\n\n').map((para, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                  <img src={provost.photo} alt="" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-foreground">{provost.name}</p>
                    <p className="text-sm text-muted-foreground">{provost.designation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

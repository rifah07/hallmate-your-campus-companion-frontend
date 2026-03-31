import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Award, GraduationCap, Lightbulb, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageBanner from '@/components/public/PageBanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const achievements = [
  {
    category: 'Academic',
    icon: GraduationCap,
    items: [
      { title: 'University Gold Medal', name: 'Nafisa Tabassum', dept: 'Computer Science', year: '2024', desc: 'Secured 1st position in BSc final examination with a CGPA of 3.98/4.00' },
      { title: 'Dean\'s List Award', name: '47 Students', dept: 'Various Departments', year: '2024', desc: 'Record number of hall residents made it to the Dean\'s List this year' },
      { title: 'National Science Olympiad', name: 'Raisa Kabir', dept: 'Electrical Engineering', year: '2024', desc: 'Won gold medal at the National Science Olympiad competition' },
      { title: 'Best Research Paper', name: 'Anika Islam', dept: 'Computer Science', year: '2023', desc: 'Published AI research paper in IEEE conference proceedings' },
    ],
  },
  {
    category: 'Sports',
    icon: Medal,
    items: [
      { title: 'Inter-Hall Badminton Champions', name: 'Hall Badminton Team', dept: '', year: '2024', desc: 'Won the university inter-hall badminton championship for the 3rd consecutive year' },
      { title: 'National Table Tennis', name: 'Maryam Khan', dept: 'Pharmacy', year: '2024', desc: 'Represented Bangladesh in South Asian Table Tennis Championship' },
      { title: 'Inter-Hall Athletics', name: 'Hall Athletics Team', dept: '', year: '2023', desc: 'Won 5 gold, 3 silver, and 2 bronze medals in the inter-hall athletics meet' },
      { title: 'Chess Champion', name: 'Tasnia Haque', dept: 'English', year: '2023', desc: 'Won university chess championship in women\'s category' },
    ],
  },
  {
    category: 'Cultural',
    icon: Star,
    items: [
      { title: 'Best Cultural Performance', name: 'Hall Drama Club', dept: '', year: '2024', desc: 'Won Best Play award at the National University Drama Festival' },
      { title: 'Poetry Recitation Winner', name: 'Sadia Akter', dept: 'Mathematics', year: '2024', desc: 'Won 1st place at inter-university poetry competition' },
      { title: 'Photography Exhibition', name: 'Hall Photo Club', dept: '', year: '2023', desc: 'Organized and won awards at the national photography exhibition' },
      { title: 'Music Competition', name: 'Farzana Yasmin', dept: 'Music', year: '2023', desc: 'Won Best Vocalist award at national university music competition' },
    ],
  },
  {
    category: 'Leadership',
    icon: Lightbulb,
    items: [
      { title: 'Social Impact Award', name: 'Hall Social Service Club', dept: '', year: '2024', desc: 'Organized blood donation camps collecting 500+ units and free medical camps' },
      { title: 'Innovation Challenge Winner', name: 'Sabrina Noor', dept: 'Business Admin', year: '2024', desc: 'Won 1st place at national startup innovation challenge with HallMate concept' },
      { title: 'Model United Nations', name: 'Lamia Hasan', dept: 'International Relations', year: '2023', desc: 'Best Delegate award at Harvard National Model United Nations' },
      { title: 'Community Service Award', name: 'Hall Volunteer Team', dept: '', year: '2023', desc: 'Recognized by the university for outstanding community service during floods' },
    ],
  },
];

const hallAchievements = [
  { icon: Trophy, label: 'Best Hall Award', value: '2023, 2024', desc: 'Awarded best managed residential hall by the university' },
  { icon: Globe, label: 'Digital Pioneer', value: '1st in Bangladesh', desc: 'First university hall to implement complete digital management' },
  { icon: Heart, label: 'Blood Donations', value: '500+ Units', desc: 'Annual blood donation camp organized by hall residents' },
  { icon: Award, label: 'Cultural Champions', value: '12 Awards', desc: 'Won in university inter-hall cultural competitions this year' },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen">
      <PageBanner
        title="Achievements & Accomplishments"
        subtitle="Celebrating excellence across academics, sports, culture, and leadership"
        backgroundImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80"
      />

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Hall-level achievements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hallAchievements.map((a, i) => (
            <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="text-center h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mx-auto mb-3">
                    <a.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-bold text-primary">{a.value}</p>
                  <h3 className="font-semibold text-foreground text-sm mt-1">{a.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Student Achievements by Category */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Student Achievements</h2>
          <Tabs defaultValue="Academic">
            <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1 justify-center">
              {achievements.map(cat => (
                <TabsTrigger key={cat.category} value={cat.category} className="gap-1.5">
                  <cat.icon className="w-4 h-4" /> {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {achievements.map(cat => (
              <TabsContent key={cat.category} value={cat.category} className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {cat.items.map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-5 h-5 text-primary" />
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                            </div>
                            <Badge variant="secondary" className="text-xs">{item.year}</Badge>
                          </div>
                          <p className="text-sm font-medium text-primary">{item.name}</p>
                          {item.dept && <p className="text-xs text-muted-foreground">{item.dept}</p>}
                          <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

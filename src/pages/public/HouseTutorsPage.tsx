import { motion } from 'framer-motion';
import { Mail, Phone, Building, MapPin, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tutors = [
  {
    name: 'Ms. Sultana Begum',
    department: 'Department of Chemistry',
    designation: 'Associate Professor',
    floors: 'Floor 1–3',
    photo: 'https://ui-avatars.com/api/?name=Sultana+Begum&background=0f766e&color=fff&size=200&bold=true',
    email: 'sultana.ht@univ.edu.bd',
    phone: '+880 1711-000003',
    specialization: 'Organic Chemistry',
    students: 210,
    joinedAs: 'House Tutor since 2020',
  },
  {
    name: 'Dr. Mahfuza Khanam',
    department: 'Department of Sociology',
    designation: 'Associate Professor',
    floors: 'Floor 4–6',
    photo: 'https://ui-avatars.com/api/?name=Mahfuza+Khanam&background=115e59&color=fff&size=200&bold=true',
    email: 'mahfuza.ht@univ.edu.bd',
    phone: '+880 1711-000004',
    specialization: 'Gender Studies',
    students: 225,
    joinedAs: 'House Tutor since 2019',
  },
  {
    name: 'Dr. Taslima Nasreen',
    department: 'Department of Bangla',
    designation: 'Professor',
    floors: 'Floor 7–9',
    photo: 'https://ui-avatars.com/api/?name=Taslima+Nasreen&background=134e4a&color=fff&size=200&bold=true',
    email: 'taslima.ht@univ.edu.bd',
    phone: '+880 1711-000005',
    specialization: 'Modern Bangla Literature',
    students: 230,
    joinedAs: 'House Tutor since 2018',
  },
  {
    name: 'Ms. Farzana Amin',
    department: 'Department of Botany',
    designation: 'Associate Professor',
    floors: 'Floor 10–12',
    photo: 'https://ui-avatars.com/api/?name=Farzana+Amin&background=0d9488&color=fff&size=200&bold=true',
    email: 'farzana.ht@univ.edu.bd',
    phone: '+880 1711-000006',
    specialization: 'Plant Genetics',
    students: 195,
    joinedAs: 'House Tutor since 2021',
  },
  {
    name: 'Dr. Sabrina Hossain',
    department: 'Department of Political Science',
    designation: 'Associate Professor',
    floors: 'Floor 13–14',
    photo: 'https://ui-avatars.com/api/?name=Sabrina+Hossain&background=047857&color=fff&size=200&bold=true',
    email: 'sabrina.ht@univ.edu.bd',
    phone: '+880 1711-000007',
    specialization: 'South Asian Politics',
    students: 140,
    joinedAs: 'House Tutor since 2022',
  },
];

export default function HouseTutorsPage() {
  return (
    <div className="min-h-screen">
      <div className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            House Tutors
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-foreground/80 text-lg">
            Dedicated mentors caring for residents on every floor
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="gradient-teal p-6 text-center group-hover:brightness-110 transition-all">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-24 h-24 rounded-full mx-auto border-3 border-primary-foreground/30 mb-3"
                  />
                  <h3 className="text-lg font-bold text-primary-foreground">{t.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{t.designation}</p>
                  <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground border-0">
                    <MapPin className="w-3 h-3 mr-1" /> {t.floors}
                  </Badge>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Building className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.department}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground text-xs">{t.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.phone}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t.joinedAs}</span>
                    <Badge variant="secondary" className="text-xs">{t.students} Students</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

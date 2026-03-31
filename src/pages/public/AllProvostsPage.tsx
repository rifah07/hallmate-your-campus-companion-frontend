import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Calendar, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const provosts = [
  {
    name: 'Prof. Dr. Nasreen Ahmed',
    department: 'Department of Physics',
    tenure: 'January 2022 – Present',
    current: true,
    photo: 'https://ui-avatars.com/api/?name=Nasreen+Ahmed&background=0f766e&color=fff&size=200&bold=true',
    highlights: ['Introduced HallMate digital system', 'Renovated dining hall', 'Established Provost Fund for needy students'],
  },
  {
    name: 'Prof. Dr. Shamima Akhter',
    department: 'Department of Chemistry',
    tenure: 'June 2017 – December 2021',
    current: false,
    photo: 'https://ui-avatars.com/api/?name=Shamima+Akhter&background=115e59&color=fff&size=200&bold=true',
    highlights: ['Built new 14th floor extension', 'Started annual cultural festival', 'Improved security with CCTV installation'],
  },
  {
    name: 'Prof. Dr. Fatema Begum',
    department: 'Department of Botany',
    tenure: 'March 2012 – May 2017',
    current: false,
    photo: 'https://ui-avatars.com/api/?name=Fatema+Begum&background=134e4a&color=fff&size=200&bold=true',
    highlights: ['Established reading room library', 'Launched student mentorship program', 'Beautified hall garden'],
  },
  {
    name: 'Prof. Dr. Hasina Rahman',
    department: 'Department of English',
    tenure: 'July 2007 – February 2012',
    current: false,
    photo: 'https://ui-avatars.com/api/?name=Hasina+Rahman&background=0d3d56&color=fff&size=200&bold=true',
    highlights: ['Started guest room facility', 'Organized first inter-hall debate', 'Introduced generator backup'],
  },
  {
    name: 'Prof. Dr. Nurun Nahar',
    department: 'Department of Mathematics',
    tenure: 'January 2002 – June 2007',
    current: false,
    photo: 'https://ui-avatars.com/api/?name=Nurun+Nahar&background=1e3a5f&color=fff&size=200&bold=true',
    highlights: ['Expanded hall from 200 to 500 seats', 'Built the seminar hall', 'Started annual sports competition'],
  },
  {
    name: 'Prof. Dr. Rahima Khatun',
    department: 'Department of History',
    tenure: 'August 1995 – December 2001',
    current: false,
    photo: 'https://ui-avatars.com/api/?name=Rahima+Khatun&background=374151&color=fff&size=200&bold=true',
    highlights: ['Founding Provost', 'Established hall traditions', 'Built the original 8-floor building'],
  },
];

export default function AllProvostsPage() {
  return (
    <div className="min-h-screen">
      <div className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Our Provosts
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-foreground/80 text-lg">
            Leaders who shaped our hall's legacy since 1995
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {provosts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-primary bg-background z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <Card className={`overflow-hidden ${p.current ? 'border-primary/50 shadow-md' : ''}`}>
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <img
                          src={p.photo}
                          alt={p.name}
                          className="w-20 h-20 rounded-full border-2 border-primary/20 shrink-0"
                        />
                        <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                          <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                          <p className="text-sm text-muted-foreground">{p.department}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-muted-foreground">{p.tenure}</span>
                          </div>
                          {p.current && (
                            <Badge className="mt-1.5 bg-primary text-primary-foreground">Current Provost</Badge>
                          )}
                        </div>
                      </div>
                      <div className={`border-t border-border pt-3 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-primary" /> Key Contributions
                        </h4>
                        <ul className="space-y-1">
                          {p.highlights.map((h, j) => (
                            <li key={j} className="text-sm text-muted-foreground">• {h}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Phone, Mail, Shield, Utensils, Wrench, ClipboardList, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const staffSections = [
  {
    title: 'Administrative Staff',
    icon: ClipboardList,
    color: 'bg-primary/10 text-primary',
    members: [
      { name: 'Mrs. Rehana Parvin', role: 'Office Manager', phone: '+880 1711-000010', email: 'rehana@univ.edu.bd', photo: 'https://ui-avatars.com/api/?name=Rehana+Parvin&background=0f766e&color=fff&size=150', since: '2015' },
      { name: 'Mr. Ashraf Ali', role: 'Accountant', phone: '+880 1711-000011', email: 'ashraf@univ.edu.bd', photo: 'https://ui-avatars.com/api/?name=Ashraf+Ali&background=115e59&color=fff&size=150', since: '2018' },
      { name: 'Ms. Rumi Akter', role: 'Office Assistant', phone: '+880 1711-000012', email: 'rumi@univ.edu.bd', photo: 'https://ui-avatars.com/api/?name=Rumi+Akter&background=134e4a&color=fff&size=150', since: '2021' },
    ],
  },
  {
    title: 'Dining Staff',
    icon: Utensils,
    color: 'bg-warning/10 text-warning',
    members: [
      { name: 'Mrs. Halima Begum', role: 'Head Cook', phone: '+880 1711-000020', email: 'halima@univ.edu.bd', photo: 'https://ui-avatars.com/api/?name=Halima+Begum&background=d97706&color=fff&size=150', since: '2010' },
      { name: 'Mr. Jamal Uddin', role: 'Assistant Cook', phone: '+880 1711-000021', email: '', photo: 'https://ui-avatars.com/api/?name=Jamal+Uddin&background=b45309&color=fff&size=150', since: '2016' },
      { name: 'Mrs. Salma', role: 'Dining Supervisor', phone: '+880 1711-000022', email: '', photo: 'https://ui-avatars.com/api/?name=Salma&background=92400e&color=fff&size=150', since: '2019' },
    ],
  },
  {
    title: 'Maintenance Staff',
    icon: Wrench,
    color: 'bg-info/10 text-info',
    members: [
      { name: 'Mr. Rahim Mia', role: 'Head Maintenance', phone: '+880 1711-000030', email: 'rahim@univ.edu.bd', photo: 'https://ui-avatars.com/api/?name=Rahim+Mia&background=0891b2&color=fff&size=150', since: '2012' },
      { name: 'Mr. Babul', role: 'Electrician', phone: '+880 1711-000031', email: '', photo: 'https://ui-avatars.com/api/?name=Babul&background=0e7490&color=fff&size=150', since: '2017' },
      { name: 'Mr. Sohel', role: 'Plumber', phone: '+880 1711-000032', email: '', photo: 'https://ui-avatars.com/api/?name=Sohel&background=155e75&color=fff&size=150', since: '2020' },
    ],
  },
  {
    title: 'Security Staff',
    icon: Shield,
    color: 'bg-destructive/10 text-destructive',
    members: [
      { name: 'Mr. Karim Hossain', role: 'Head Guard', phone: '+880 1711-000040', email: '', photo: 'https://ui-avatars.com/api/?name=Karim+Hossain&background=dc2626&color=fff&size=150', since: '2013' },
      { name: 'Mr. Rafiq', role: 'Day Guard', phone: '+880 1711-000041', email: '', photo: 'https://ui-avatars.com/api/?name=Rafiq&background=b91c1c&color=fff&size=150', since: '2019' },
      { name: 'Mr. Manik', role: 'Night Guard', phone: '+880 1711-000042', email: '', photo: 'https://ui-avatars.com/api/?name=Manik&background=991b1b&color=fff&size=150', since: '2020' },
    ],
  },
];

export default function StaffPage() {
  return (
    <div className="min-h-screen">
      <PageBanner
        title="Our Staff"
        subtitle="The dedicated team keeping our hall running smoothly"
        backgroundImage="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1600&q=80"
      />

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {staffSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${section.color}`}>
                <section.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              <Badge variant="secondary">{section.members.length} members</Badge>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.members.map((m, i) => (
                <Card key={m.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-foreground">{m.name}</h3>
                        <p className="text-sm text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs">{m.phone}</span>
                      </div>
                      {m.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs">{m.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs">Serving since {m.since}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

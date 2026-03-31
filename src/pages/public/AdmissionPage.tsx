import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, FileText, Calendar, CreditCard, ClipboardList, UserCheck, Home } from 'lucide-react';
import PageBanner from '@/components/public/PageBanner';

const steps = [
  { icon: ClipboardList, title: 'Apply Online', desc: 'Fill out the online application form with your details.' },
  { icon: FileText, title: 'Document Submission', desc: 'Upload required documents including ID, photos, and certificates.' },
  { icon: UserCheck, title: 'Interview', desc: 'Attend a brief interview if required for your application type.' },
  { icon: Check, title: 'Seat Allocation', desc: 'Receive your room and bed allocation confirmation.' },
  { icon: CreditCard, title: 'Fee Payment', desc: 'Complete the payment for hall fees and dining charges.' },
  { icon: Home, title: 'Move In', desc: 'Arrive at the hall and settle into your new home!' },
];

const documents = [
  'Recent Passport-size Photograph (2 copies)',
  'University ID Card (photocopy)',
  'Admit Card / Enrollment Letter',
  'Previous Hall Clearance Certificate (if applicable)',
  'Medical Certificate (if any condition)',
  'National ID / Birth Certificate (photocopy)',
];

const dates = [
  { event: 'Application Opens', date: 'June 1, 2026' },
  { event: 'Application Deadline', date: 'July 15, 2026' },
  { event: 'Interview Period', date: 'July 20 – 25, 2026' },
  { event: 'Results Announcement', date: 'August 1, 2026' },
  { event: 'Fee Payment Deadline', date: 'August 10, 2026' },
  { event: 'Move-in Day', date: 'August 20, 2026' },
];

export default function AdmissionPage() {
  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Admission</h1>
          <p className="text-lg opacity-90">Your journey to a new home starts here</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Steps */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8 border-b-2 border-primary pb-2 inline-block">Admission Process</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <div className="relative z-10 w-12 h-12 rounded-full gradient-teal flex items-center justify-center shrink-0 shadow-teal text-primary-foreground font-bold">
                    {i + 1}
                  </div>
                  <Card className="flex-1 hover:shadow-teal-lg transition-shadow">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents & Dates */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Required Documents</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {documents.map(d => (
                    <li key={d} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2 inline-block">Important Dates</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {dates.map(d => (
                    <div key={d.event} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{d.event}</span>
                      <Badge variant="secondary" className="font-medium">{d.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link to="/apply">
            <Button size="lg" className="shadow-teal font-semibold px-10">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

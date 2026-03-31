import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

const faqCategories = [
  {
    title: 'Admission Process',
    items: [
      { q: 'How do I apply for a seat in the hall?', a: 'You can apply online through the "Apply" page on our website. Fill in all required details, upload documents, and submit your application.' },
      { q: 'What documents are required?', a: 'You need a passport photo, university ID, admit card, and a medical certificate if applicable. Previous hall clearance is needed for transfer students.' },
      { q: 'When is the application deadline?', a: 'Applications typically open in June and close by mid-July. Check the Admission page for exact dates each year.' },
    ],
  },
  {
    title: 'Room Facilities',
    items: [
      { q: 'What room types are available?', a: 'We offer Single, Double, Triple, and Quad rooms. Each comes with study desks, wardrobes, and basic amenities.' },
      { q: 'Is Wi-Fi available?', a: 'Yes, high-speed Wi-Fi is available throughout the hall including all rooms and common areas.' },
      { q: 'Can I choose my roommate?', a: 'You can request a specific roommate during application. We try to accommodate requests subject to availability.' },
    ],
  },
  {
    title: 'Fees & Payments',
    items: [
      { q: 'What are the hall fees?', a: 'Fees vary by room type. Single rooms start at ৳3,000/month. See the Facilities page for the full fee structure.' },
      { q: 'How do I pay hall fees?', a: 'Fees can be paid online through the student portal, via bank transfer, or at the hall office during office hours.' },
      { q: 'What happens if I miss a payment?', a: 'Late payments incur a fine. Consistent non-payment may result in seat cancellation after due notice.' },
    ],
  },
  {
    title: 'Rules & Regulations',
    items: [
      { q: 'What are the visiting hours?', a: 'Visitors are allowed from 10:00 AM to 6:00 PM. All visitors must register at the gate and carry valid ID.' },
      { q: 'Is there a curfew?', a: 'The main gate closes at 9:30 PM. Entry after curfew requires prior permission from the house tutor.' },
      { q: 'Can I bring electrical appliances?', a: 'Small appliances like laptops and phone chargers are allowed. Cooking appliances and heaters are not permitted in rooms.' },
    ],
  },
  {
    title: 'Food & Dining',
    items: [
      { q: 'How many meals are provided?', a: 'The dining hall serves breakfast, lunch, snacks, and dinner. Different meal plans are available.' },
      { q: 'Can I bring guests for meals?', a: 'Yes, guest meals can be booked through the student portal at least 24 hours in advance.' },
      { q: 'Is the menu flexible for dietary needs?', a: 'We try to accommodate dietary requirements. Please inform the dining staff about any allergies or restrictions.' },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const filtered = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(i => !search || i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="gradient-teal-subtle">
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions"
        backgroundImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&q=80"
      />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <div className="space-y-6">
          {filtered.map((cat, ci) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.05 }}>
              <h2 className="text-lg font-bold text-foreground mb-3 border-b-2 border-primary pb-1 inline-block">{cat.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`${ci}-${i}`} className="bg-card border border-border rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-3">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-3 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

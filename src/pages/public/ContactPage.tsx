import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'University Women\'s Hall, University Road, Dhaka-1000, Bangladesh' },
  { icon: Phone, label: 'Phone', value: '+880 2 9661920' },
  { icon: Mail, label: 'Email', value: 'hallmate@university.edu.bd' },
  { icon: Clock, label: 'Office Hours', value: 'Sun – Thu: 9:00 AM – 5:00 PM' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Message sent!', description: 'We\'ll get back to you within 24 hours.' });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-lg opacity-90">We'd love to hear from you</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="shadow-teal">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Name *</Label>
                      <Input placeholder="Your name" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email *</Label>
                      <Input type="email" placeholder="you@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Subject *</Label>
                    <Input placeholder="What's this about?" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Message *</Label>
                    <Textarea placeholder="Your message..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full shadow-teal" disabled={loading}>
                    {loading ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">Contact Information</h2>
            {contactInfo.map(c => (
              <Card key={c.label} className="hover:shadow-teal-lg transition-shadow">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{c.label}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Map placeholder */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-accent flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Interactive Map</p>
                  <p className="text-xs">Google Maps integration ready</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

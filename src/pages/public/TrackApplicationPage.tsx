import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/public/PageBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Check, Clock, FileSearch, XCircle } from 'lucide-react';

const statusSteps = [
  { label: 'Submitted', icon: Check },
  { label: 'Under Review', icon: FileSearch },
  { label: 'Interview', icon: Clock },
  { label: 'Decision', icon: Check },
];

export default function TrackApplicationPage() {
  const [appId, setAppId] = useState('');
  const [result, setResult] = useState<null | 'found' | 'not_found'>(null);

  const handleSearch = () => {
    if (appId.trim()) setResult('found');
    else setResult('not_found');
  };

  return (
    <div className="gradient-teal-subtle min-h-[70vh]">
      <PageBanner
        title="Track Your Application"
        subtitle="Enter your Application ID to check your status"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
      />

      <div className="container mx-auto px-4 py-12 max-w-xl">
        <Card className="shadow-teal-lg">
          <CardContent className="p-8">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., APP-2026-00142"
                value={appId}
                onChange={e => setAppId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="text-center font-medium"
              />
              <Button onClick={handleSearch} className="shadow-teal shrink-0">
                <Search className="w-4 h-4 mr-2" /> Track
              </Button>
            </div>

            {result === 'found' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">Application ID</p>
                  <p className="font-bold text-primary text-lg">{appId}</p>
                  <Badge className="mt-2 gradient-teal text-primary-foreground border-0">Under Review</Badge>
                </div>

                <div className="flex items-center justify-between relative mt-8">
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
                  <div className="absolute top-5 left-0 h-0.5 bg-primary" style={{ width: '40%' }} />
                  {statusSteps.map((s, i) => (
                    <div key={s.label} className="relative z-10 flex flex-col items-center gap-1.5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        i < 2 ? 'gradient-teal text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-medium ${i < 2 ? 'text-primary' : 'text-muted-foreground'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-accent/50 p-4 rounded-lg text-sm">
                  <p className="font-medium text-foreground mb-1">Current Status: Under Review</p>
                  <p className="text-muted-foreground">Your application is being reviewed by the hall administration. You will be notified via email once a decision is made.</p>
                  <p className="text-xs text-muted-foreground mt-2">Last updated: March 5, 2026</p>
                </div>
              </motion.div>
            )}

            {result === 'not_found' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                <XCircle className="w-10 h-10 text-destructive mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Please enter a valid Application ID.</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

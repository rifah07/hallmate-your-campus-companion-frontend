import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Check, Upload, FileText, X, Image as ImageIcon } from 'lucide-react';

const STEPS = ['Personal Info', 'Academic Info', 'Guardian Info', 'Room Preference', 'Documents', 'Declaration'];

export default function ApplicationFormPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1); };
  const prev = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = () => {
    if (!agreed) { toast({ title: 'Please accept the declaration', variant: 'destructive' }); return; }
    setSubmitted(true);
    toast({ title: 'Application Submitted!', description: 'Your Application ID: APP-2026-00142' });
  };

  if (submitted) {
    return (
      <div className="gradient-teal-subtle min-h-[60vh] flex items-center justify-center py-16">
        <Card className="max-w-md w-full mx-4 text-center shadow-teal-lg">
          <CardContent className="p-10">
            <div className="w-16 h-16 rounded-full gradient-teal mx-auto mb-4 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-4">Your application has been received. Track your status with the ID below.</p>
            <div className="bg-accent p-3 rounded-lg mb-4">
              <p className="text-xs text-muted-foreground">Application ID</p>
              <p className="text-lg font-bold text-primary">APP-2026-00142</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setSubmitted(false); setStep(0); }}>
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="gradient-teal-subtle">
      <section className="gradient-teal py-12 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold mb-2">Apply for Admission</h1>
          <p className="opacity-90">Complete all steps to submit your application</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex items-center gap-1 text-xs font-medium ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < step ? 'gradient-teal text-primary-foreground' : i === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{i < step ? <Check className="w-3 h-3" /> : i + 1}</div>
                <span className="hidden sm:inline">{s}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-teal">
          <CardHeader>
            <CardTitle className="text-lg">Step {step + 1}: {STEPS[step]}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {step === 0 && <PersonalInfo />}
              {step === 1 && <AcademicInfo />}
              {step === 2 && <GuardianInfo />}
              {step === 3 && <RoomPreference />}
              {step === 4 && <DocumentsUpload />}
              {step === 5 && <Declaration agreed={agreed} setAgreed={setAgreed} />}
            </motion.div>

            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              <Button variant="outline" onClick={prev} disabled={step === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="shadow-teal">
                  Submit Application <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormField({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label} {required && <span className="text-destructive">*</span>}</Label>
      {children}
    </div>
  );
}

function PersonalInfo() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.size > 5 * 1024 * 1024) { alert('File too large. Max 5MB.'); return; }
      setPhoto(f);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const removePhoto = () => { setPhoto(null); setPhotoPreview(null); if (photoRef.current) photoRef.current.value = ''; };

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormField label="Full Name" required><Input placeholder="Enter your full name" /></FormField>
      <FormField label="Date of Birth" required><Input type="date" /></FormField>
      <FormField label="Blood Group" required>
        <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>{['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <FormField label="Contact Number" required><Input placeholder="01XXXXXXXXX" /></FormField>
      <FormField label="Email" required><Input type="email" placeholder="you@email.com" /></FormField>
      <FormField label="Photo Upload">
        <input type="file" ref={photoRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
        {photoPreview ? (
          <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-border group">
            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            <button type="button" onClick={removePhoto} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => photoRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Click to upload photo</p>
          </div>
        )}
      </FormField>
      <div className="sm:col-span-2"><FormField label="Present Address" required><Textarea placeholder="Enter your present address" rows={2} /></FormField></div>
      <div className="sm:col-span-2"><FormField label="Permanent Address" required><Textarea placeholder="Enter your permanent address" rows={2} /></FormField></div>
    </div>
  );
}

function AcademicInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormField label="University Name" required><Input placeholder="University of Dhaka" /></FormField>
      <FormField label="University ID"><Input placeholder="e.g., 2024000001" /></FormField>
      <FormField label="Department" required><Input placeholder="e.g., Computer Science" /></FormField>
      <FormField label="Program" required>
        <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>{['Undergraduate','Masters','PhD','Diploma'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <FormField label="Year/Semester" required><Input placeholder="e.g., 3rd Year" /></FormField>
      <FormField label="Session" required><Input placeholder="e.g., 2023-24" /></FormField>
      <FormField label="CGPA/GPA"><Input placeholder="e.g., 3.75" type="number" step="0.01" /></FormField>
    </div>
  );
}

function GuardianInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormField label="Father's Name" required><Input placeholder="Enter father's name" /></FormField>
      <FormField label="Father's Occupation"><Input placeholder="Enter occupation" /></FormField>
      <FormField label="Father's Contact" required><Input placeholder="01XXXXXXXXX" /></FormField>
      <div />
      <FormField label="Mother's Name" required><Input placeholder="Enter mother's name" /></FormField>
      <FormField label="Mother's Occupation"><Input placeholder="Enter occupation" /></FormField>
      <FormField label="Mother's Contact" required><Input placeholder="01XXXXXXXXX" /></FormField>
      <div />
      <FormField label="Emergency Contact Name" required><Input placeholder="Name" /></FormField>
      <FormField label="Emergency Contact Number" required><Input placeholder="01XXXXXXXXX" /></FormField>
    </div>
  );
}

function RoomPreference() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormField label="Preferred Room Type" required>
        <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>{['Single','Double','Triple','Quad'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <FormField label="Floor Preference">
        <Select><SelectTrigger><SelectValue placeholder="No preference" /></SelectTrigger>
          <SelectContent>{Array.from({ length: 14 }, (_, i) => <SelectItem key={i+1} value={String(i+1)}>Floor {i + 1}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <FormField label="Roommate Request (Name)"><Input placeholder="Preferred roommate name (optional)" /></FormField>
      <FormField label="Roommate Request (ID)"><Input placeholder="Roommate's University ID" /></FormField>
      <div className="sm:col-span-2"><FormField label="Special Requirements"><Textarea placeholder="Any medical, accessibility, or other special requirements..." rows={3} /></FormField></div>
    </div>
  );
}

function DocumentsUpload() {
  const docs = ['Passport Photo', 'University ID Card', 'Admit Card / Enrollment Letter', 'Previous Hall Clearance', 'Medical Certificate'];
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">Upload the required documents. Accepted formats: PDF, JPG, PNG (max 5MB each).</p>
      {docs.map(d => (
        <div key={d} className="flex items-center gap-4 p-3 border border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{d}</p>
            <p className="text-xs text-muted-foreground">Click to upload</p>
          </div>
          <Button variant="outline" size="sm">Browse</Button>
        </div>
      ))}
    </div>
  );
}

function Declaration({ agreed, setAgreed }: { agreed: boolean; setAgreed: (v: boolean) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-accent/50 p-4 rounded-lg text-sm text-muted-foreground leading-relaxed">
        <p className="font-semibold text-foreground mb-2">Declaration</p>
        <p>I hereby declare that all the information provided in this application is true and correct to the best of my knowledge.
        I understand that any false information may result in the cancellation of my application or expulsion from the hall.</p>
        <p className="mt-2">I agree to abide by all the rules and regulations of the University Women's Hall as outlined in the student handbook.
        I understand that room allocation is subject to availability and the administration's decision is final.</p>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="agree" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5" />
        <Label htmlFor="agree" className="text-sm cursor-pointer leading-relaxed">
          I have read and agree to the terms and conditions, rules and regulations of the University Women's Hall. I declare that all information provided is accurate.
        </Label>
      </div>
    </div>
  );
}

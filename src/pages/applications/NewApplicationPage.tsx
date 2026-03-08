import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Upload, X, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Application Submitted', description: 'Your application is under review. You will be notified once a decision is made.' });
      navigate('/applications/my');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div><h1 className="text-2xl font-bold">New Application</h1><p className="text-muted-foreground">Apply for room allocation or transfer</p></div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Application Title *</Label>
              <Input placeholder="e.g., Request for new seat allocation" required />
            </div>

            <div className="space-y-2">
              <Label>Application Type *</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW_SEAT">New Seat</SelectItem>
                  <SelectItem value="TRANSFER">Transfer</SelectItem>
                  <SelectItem value="GUEST_ROOM">Guest Room</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Room Preference 1</Label><Input placeholder="Room number" /></div>
              <div className="space-y-2"><Label>Room Preference 2</Label><Input placeholder="Optional" /></div>
              <div className="space-y-2"><Label>Room Preference 3</Label><Input placeholder="Optional" /></div>
            </div>

            <div className="space-y-2">
              <Label>Reason *</Label>
              <Textarea placeholder="Explain why you are applying..." className="min-h-[100px]" required />
            </div>

            <div className="space-y-2">
              <Label>Supporting Document (optional)</Label>
              <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
              {file ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload a document</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF, DOC (max 5MB)</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="font-normal text-sm cursor-pointer">I agree to the terms and conditions</Label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={loading} className="gradient-teal text-primary-foreground shadow-teal">
                <Send className="mr-2 h-4 w-4" />{loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

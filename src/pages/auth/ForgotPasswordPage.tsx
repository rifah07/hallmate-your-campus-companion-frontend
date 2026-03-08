import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { authService } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [universityId, setUniversityId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(universityId)) {
      toast({ title: 'Error', description: 'University ID must be exactly 10 digits', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword({ universityId });
      setSubmitted(true);
    } catch (error: any) {
      const errMsg = error.response?.data?.error?.message;
      if (errMsg) {
        toast({ title: 'Error', description: errMsg, variant: 'destructive' });
      } else {
        // Always show success to prevent user enumeration (matches backend behavior)
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
      <div className="container mx-auto pt-1">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Login
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Forgot Password</h1>
          </div>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-4">
              {submitted ? (
                <>
                  <div className="mx-auto mb-2"><CheckCircle className="h-12 w-12 text-success" /></div>
                  <CardTitle>Check Your Email</CardTitle>
                  <CardDescription>
                    If this account exists, a 6-digit OTP has been sent to your registered email. It expires in 15 minutes.
                  </CardDescription>
                </>
              ) : (
                <>
                  <CardTitle className="text-xl">Reset Password</CardTitle>
                  <CardDescription>Enter your 10-digit University ID to receive a reset OTP via email</CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-3">
                  <Button className="w-full" onClick={() => navigate('/reset-password')}>
                    Enter OTP & Reset Password
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
                    Back to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>University ID</Label>
                    <Input
                      placeholder="e.g., 2020123456"
                      value={universityId}
                      onChange={e => setUniversityId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      required
                    />
                    {universityId && !/^\d{10}$/.test(universityId) && (
                      <p className="text-xs text-destructive">Must be exactly 10 digits</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || !/^\d{10}$/.test(universityId)}>
                    {loading ? 'Sending...' : 'Send Reset OTP'}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => navigate('/login')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

export default function FirstLoginPage() {
  const [universityId, setUniversityId] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();

  const checks = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Special character (@$!%*?&)', met: /[@$!%*?&]/.test(password) },
  ];

  const strength = checks.filter(c => c.met).length;
  const strengthPercent = (strength / checks.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(universityId)) {
      toast({ title: 'Error', description: 'University ID must be exactly 10 digits', variant: 'destructive' });
      return;
    }
    if (password !== confirm) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (strength < checks.length) {
      toast({ title: 'Error', description: 'Password does not meet all requirements', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.firstTimeLogin({
        universityId,
        oneTimePassword: otp,
        newPassword: password,
        confirmPassword: confirm,
      });
      const { user, accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      login(user, accessToken);
      toast({ title: 'Welcome!', description: 'Password set successfully. You are now logged in.' });
      navigate('/dashboard');
    } catch (error: any) {
      const errMsg = error.response?.data?.error?.message || 'Failed to set password';
      toast({ title: 'Error', description: errMsg, variant: 'destructive' });
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
            <h1 className="text-3xl font-bold">First Login Setup</h1>
            <p className="text-muted-foreground mt-1">Use your one-time password to set up your account</p>
          </div>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Create Password</CardTitle>
              <CardDescription>Enter your University ID, the OTP sent to your email, and choose a new password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>University ID</Label>
                  <Input
                    placeholder="e.g., 2020123456"
                    value={universityId}
                    onChange={e => setUniversityId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                  />
                  {universityId && !/^\d{10}$/.test(universityId) && (
                    <p className="text-xs text-destructive">Must be exactly 10 digits</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>One-Time Password (OTP)</Label>
                  <Input
                    placeholder="Enter OTP from your email"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" />
                  <Progress value={strengthPercent} className="h-2" />
                  <div className="space-y-1 mt-2">
                    {checks.map(c => (
                      <div key={c.label} className="flex items-center gap-2 text-xs">
                        {c.met ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3 text-muted-foreground" />}
                        <span className={c.met ? 'text-success' : 'text-muted-foreground'}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm your password" />
                  {confirm && password !== confirm && <p className="text-xs text-destructive">Passwords do not match</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading || !universityId || !otp}>
                  {loading ? 'Setting up...' : 'Set Password & Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

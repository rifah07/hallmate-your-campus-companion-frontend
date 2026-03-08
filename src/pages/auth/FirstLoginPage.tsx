import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function FirstLoginPage() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checks = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Special character', met: /[!@#$%^&*]/.test(password) },
  ];

  const strength = checks.filter(c => c.met).length;
  const strengthPercent = (strength / checks.length) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (strength < checks.length) {
      toast({ title: 'Error', description: 'Password does not meet all requirements', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Password Updated', description: 'Please login with your new password' });
      navigate('/login');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">First Login Setup</h1>
          <p className="text-muted-foreground mt-1">Set up your new password</p>
        </div>
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create Password</CardTitle>
            <CardDescription>Enter the OTP sent to your email and choose a new password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>OTP Code</Label>
                <Input placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} />
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Setting up...' : 'Set Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

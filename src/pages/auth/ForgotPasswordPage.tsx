import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false); }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
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
                <CardDescription>We've sent a password reset link to your email address.</CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>Enter your University ID or email to receive a reset link</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Button className="w-full" onClick={() => navigate('/login')}>Back to Login</Button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>University ID or Email</Label>
                  <Input placeholder="Enter your University ID or email" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
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
  );
}

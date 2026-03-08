import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { motion } from 'framer-motion';

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuthStore();

  const checks = [
    { label: 'Minimum 8 characters', met: newPassword.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(newPassword) },
    { label: 'Lowercase letter', met: /[a-z]/.test(newPassword) },
    { label: 'Number', met: /\d/.test(newPassword) },
    { label: 'Special character (@$!%*?&)', met: /[@$!%*?&]/.test(newPassword) },
  ];

  const strength = checks.filter(c => c.met).length;
  const strengthPercent = (strength / checks.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (strength < checks.length) {
      toast({ title: 'Error', description: 'Password does not meet all requirements', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({ oldPassword, newPassword, confirmPassword });
      toast({ title: 'Success', description: 'Password changed. Please login again.' });
      logout();
      navigate('/login');
    } catch (error: any) {
      const errMsg = error.response?.data?.error?.message || 'Failed to change password';
      toast({ title: 'Error', description: errMsg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Change Password</h1>
        <p className="text-muted-foreground">Update your password. You'll be logged out after changing.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Update Password
            </CardTitle>
            <CardDescription>All other sessions will be revoked for security</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Enter current password" required />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Create a strong password" required />
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
                <Label>Confirm New Password</Label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-destructive">Passwords do not match</p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={loading || !oldPassword}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

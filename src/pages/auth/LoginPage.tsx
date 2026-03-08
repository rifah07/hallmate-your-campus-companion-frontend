import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Eye, EyeOff, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth.store';
import { mockUsers, getDemoUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { UserRole } from '@/types';

const loginSchema = z.object({
  universityId: z.string().min(10, 'University ID must be 10 digits').max(10),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_ROLES: { role: UserRole; label: string; color: string }[] = [
  { role: 'SUPER_ADMIN', label: 'Super Admin', color: 'bg-destructive/10 text-destructive hover:bg-destructive/20' },
  { role: 'PROVOST', label: 'Provost', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
  { role: 'HOUSE_TUTOR', label: 'House Tutor', color: 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20' },
  { role: 'ASSISTANT_WARDEN', label: 'Asst. Warden', color: 'bg-accent text-accent-foreground hover:bg-accent/80' },
  { role: 'OFFICE_STAFF', label: 'Office Staff', color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
  { role: 'DINING_STAFF', label: 'Dining Staff', color: 'bg-warning/10 text-warning hover:bg-warning/20' },
  { role: 'MAINTENANCE_STAFF', label: 'Maintenance', color: 'bg-info/10 text-info hover:bg-info/20' },
  { role: 'GUARD', label: 'Guard', color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
  { role: 'STUDENT', label: 'Student', color: 'bg-success/10 text-success hover:bg-success/20' },
  { role: 'PARENT', label: 'Parent', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setTimeout(() => {
      const user = mockUsers.find(u => u.universityId === data.universityId);
      if (user) {
        login(user, 'mock-jwt-token');
        toast({ title: 'Welcome back!', description: `Logged in as ${user.name}` });
        navigate('/dashboard');
      } else {
        const demoUser = mockUsers[0];
        login(demoUser, 'mock-jwt-token');
        toast({ title: 'Demo Login', description: `Logged in as ${demoUser.name} (demo)` });
        navigate('/dashboard');
      }
      setLoading(false);
    }, 800);
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = getDemoUser(role);
    login(user, 'mock-jwt-token');
    toast({ title: 'Demo Login', description: `Logged in as ${user.name} (${role})` });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">HallMate</h1>
          <p className="text-muted-foreground mt-1">University Women's Hall Management</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your university credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="universityId">University ID</Label>
                <Input
                  id="universityId"
                  placeholder="e.g., 2024000001"
                  {...register('universityId')}
                  className={errors.universityId ? 'border-destructive' : ''}
                />
                {errors.universityId && <p className="text-xs text-destructive">{errors.universityId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(v) => setRememberMe(!!v)} />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
                </div>
                <Button type="button" variant="link" className="px-0 text-sm" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Quick Login */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Quick Demo Login</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEMO_ROLES.map(({ role, label, color }) => (
                  <Button
                    key={role}
                    variant="ghost"
                    size="sm"
                    className={`text-xs h-8 ${color}`}
                    onClick={() => handleDemoLogin(role)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

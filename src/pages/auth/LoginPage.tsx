import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, ShieldCheck, BookOpen, Utensils, Wrench, DoorOpen, Users, UserCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth.store';
import { getDemoUser } from '@/lib/mock-data';
import { authService } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { UserRole } from '@/types';

const loginSchema = z.object({
  universityId: z.string().regex(/^\d{10}$/, 'University ID must be exactly 10 digits'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_ROLES: { role: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { role: 'SUPER_ADMIN', label: 'Super Admin', icon: ShieldCheck, desc: 'Full system access' },
  { role: 'PROVOST', label: 'Provost', icon: GraduationCap, desc: 'Hall oversight' },
  { role: 'HOUSE_TUTOR', label: 'House Tutor', icon: BookOpen, desc: 'Floor management' },
  { role: 'OFFICE_STAFF', label: 'Office Staff', icon: Users, desc: 'Admin operations' },
  { role: 'DINING_STAFF', label: 'Dining Staff', icon: Utensils, desc: 'Meal management' },
  { role: 'MAINTENANCE_STAFF', label: 'Maintenance', icon: Wrench, desc: 'Repair & upkeep' },
  { role: 'GUARD', label: 'Guard', icon: DoorOpen, desc: 'Gate & visitors' },
  { role: 'STUDENT', label: 'Student', icon: UserCheck, desc: 'Resident portal' },
  { role: 'PARENT', label: 'Parent', icon: Users, desc: 'Read-only view' },
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
    try {
      const response = await authService.login({ universityId: data.universityId, password: data.password });
      const { user, accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      login(user, accessToken);
      toast({ title: 'Welcome back!', description: `Logged in as ${user.name}` });
      navigate('/dashboard');
    } catch (error: any) {
      const errMsg = error.response?.data?.error?.message || 'Login failed';
      // Handle first-time login redirect
      if (errMsg.includes('First-time login required') || errMsg.includes('first-time login')) {
        toast({
          title: 'First-Time Login',
          description: 'Please set your password using the one-time password sent to your email.',
        });
        navigate('/first-login');
        return;
      }
      toast({ title: 'Login Failed', description: errMsg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = getDemoUser(role);
    login(user, 'mock-jwt-token');
    toast({ title: 'Demo Login', description: `Logged in as ${user.name} (${role.replace(/_/g, ' ')})` });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      <div className="container mx-auto px-4 pt-5 relative z-20">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Homepage
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left: Login Form */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl gradient-teal flex items-center justify-center shadow-teal">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">HallMate</h1>
                  <p className="text-xs text-muted-foreground">University Hall Management</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Sign in with your university credentials to access your hall portal.
              </p>
            </div>

            <Card className="border-border/40 shadow-xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Sign In</CardTitle>
                <CardDescription>Enter your 10-digit university ID and password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="universityId">University ID</Label>
                    <Input
                      id="universityId"
                      placeholder="e.g., 2024000001"
                      maxLength={10}
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

                  <Button type="submit" className="w-full gradient-teal text-primary-foreground shadow-teal hover:opacity-90 transition-opacity" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    First time here?{' '}
                    <Button type="button" variant="link" className="px-0 text-xs h-auto" onClick={() => navigate('/first-login')}>
                      Set up your account
                    </Button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Demo Quick Login */}
          <div className="flex flex-col justify-center">
            <Card className="border-border/40 shadow-xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Quick Demo Access
                </CardTitle>
                <CardDescription>Click any role to explore the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_ROLES.map(({ role, label, icon: Icon, desc }, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                    >
                      <button
                        onClick={() => handleDemoLogin(role)}
                        className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-background/50 hover:bg-accent hover:border-primary/30 hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                          <Icon className="w-4.5 h-4.5 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

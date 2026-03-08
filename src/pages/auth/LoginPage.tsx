import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, ShieldCheck, BookOpen, Utensils, Wrench, DoorOpen, Users, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth.store';
import { getDemoUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { UserRole } from '@/types';

const loginSchema = z.object({
  universityId: z.string().min(10, 'University ID must be 10 digits').max(10),
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
    setTimeout(() => {
      const demoUser = getDemoUser('STUDENT');
      login(demoUser, 'mock-jwt-token');
      toast({ title: 'Welcome back!', description: `Logged in as ${demoUser.name}` });
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = getDemoUser(role);
    login(user, 'mock-jwt-token');
    toast({ title: 'Demo Login', description: `Logged in as ${user.name} (${role.replace(/_/g, ' ')})` });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-secondary/40 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6"
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
            <p className="text-muted-foreground text-sm max-w-sm">
              Sign in with your university credentials to access your hall portal.
            </p>
          </div>

          <Card className="border-border/40 shadow-xl bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Sign In</CardTitle>
              <CardDescription>Enter your university ID and password</CardDescription>
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

                <Button type="submit" className="w-full gradient-teal text-primary-foreground shadow-teal hover:opacity-90 transition-opacity" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Demo Quick Login */}
        <div className="flex flex-col justify-center">
          <Card className="border-border/40 shadow-xl bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Quick Demo Access
              </CardTitle>
              <CardDescription>Click any role to explore the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_ROLES.map(({ role, label, icon: Icon, desc }, i) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  >
                    <button
                      onClick={() => handleDemoLogin(role)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-background/50 hover:bg-accent hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{label}</p>
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
  );
}

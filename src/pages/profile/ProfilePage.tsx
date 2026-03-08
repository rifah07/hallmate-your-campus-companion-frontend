import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ROLE_LABELS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  if (!user) return null;

  const handleSave = () => {
    toast({ title: 'Profile Updated', description: 'Your changes have been saved.' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div><h1 className="text-2xl font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal information</p></div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full"><Camera className="h-4 w-4" /></Button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="mt-2">{ROLE_LABELS[user.role]}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList><TabsTrigger value="personal">Personal Info</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="preferences">Preferences</TabsTrigger></TabsList>

        <TabsContent value="personal">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user.name} /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue={user.email} type="email" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue={user.phone || ''} /></div>
                <div className="space-y-2"><Label>Blood Group</Label><Input defaultValue={user.bloodGroup || ''} /></div>
                <div className="space-y-2"><Label>Emergency Contact</Label><Input defaultValue={user.emergencyContactName || ''} /></div>
                <div className="space-y-2"><Label>Emergency Phone</Label><Input defaultValue={user.emergencyContactPhone || ''} /></div>
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                  <div />
                  <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                  <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
                </div>
                <Button>Update Password</Button>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Add extra security to your account</p></div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="font-medium">Email Notifications</p><p className="text-sm text-muted-foreground">Receive email updates</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="font-medium">SMS Notifications</p><p className="text-sm text-muted-foreground">Receive SMS alerts</p></div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

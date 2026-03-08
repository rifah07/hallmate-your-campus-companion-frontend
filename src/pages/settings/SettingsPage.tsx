import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings Saved', description: 'System settings have been updated.' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Configure system-wide settings</p></div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card><CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Hall Name</Label><Input defaultValue="University Women's Hall" /></div>
              <div className="space-y-2"><Label>Academic Year</Label><Input defaultValue="2024-2025" /></div>
              <div className="space-y-2"><Label>Semester</Label><Input defaultValue="Spring 2025" /></div>
            </div>
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="email">
          <Card><CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>SMTP Host</Label><Input placeholder="smtp.example.com" /></div>
              <div className="space-y-2"><Label>SMTP Port</Label><Input placeholder="587" /></div>
              <div className="space-y-2"><Label>Username</Label><Input placeholder="noreply@univ.edu.bd" /></div>
              <div className="space-y-2"><Label>Password</Label><Input type="password" /></div>
            </div>
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="security">
          <Card><CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Session Timeout (minutes)</Label><Input type="number" defaultValue="15" /></div>
              <div className="space-y-2"><Label>Max Login Attempts</Label><Input type="number" defaultValue="5" /></div>
              <div className="space-y-2"><Label>Min Password Length</Label><Input type="number" defaultValue="8" /></div>
            </div>
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card><CardContent className="p-6 space-y-4">
            {['New user registration', 'Room assignment changes', 'Maintenance requests', 'Security alerts'].map(label => (
              <div key={label} className="flex items-center justify-between">
                <p className="text-sm font-medium">{label}</p>
                <Switch defaultChecked />
              </div>
            ))}
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

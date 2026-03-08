import { Bell, Moon, Search, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/auth.store';
import { useThemeStore } from '@/store/theme.store';
import { mockNotifications } from '@/lib/mock-data';
import { ROLE_LABELS } from '@/constants';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export function TopNavbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const breadcrumb = location.pathname
    .split('/')
    .filter(Boolean)
    .map((seg, i, arr) => {
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
      return { label, path: '/' + arr.slice(0, i + 1).join('/') };
    });

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-30">
      <SidebarTrigger className="shrink-0" />

      <nav className="hidden md:flex items-center text-sm text-muted-foreground gap-1">
        {breadcrumb.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            <span className={i === breadcrumb.length - 1 ? 'text-foreground font-medium' : ''}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="hidden md:flex items-center max-w-xs w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-9 bg-muted/50 border-0" />
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0">
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose text-[10px] text-rose-foreground flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            {mockNotifications.map(n => (
              <div key={n.id} className={`p-3 rounded-lg border ${n.read ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-3">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{ROLE_LABELS[user.role]}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); navigate('/login'); }} className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

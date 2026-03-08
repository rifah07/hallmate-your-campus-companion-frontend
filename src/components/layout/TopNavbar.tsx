import { Bell, Moon, Search, Sun, CheckCheck, X, Info, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/auth.store';
import { useThemeStore } from '@/store/theme.store';
import { useNotificationStore } from '@/store/notification.store';
import { ROLE_LABELS } from '@/constants';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIF_ICONS: Record<string, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: 'text-info', bg: 'bg-info/10' },
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  error: { icon: AlertOctagon, color: 'text-destructive', bg: 'bg-destructive/10' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function TopNavbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const breadcrumb = location.pathname
    .split('/')
    .filter(Boolean)
    .map((seg, i, arr) => {
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
      return { label, path: '/' + arr.slice(0, i + 1).join('/') };
    });

  const handleNotifClick = (notif: typeof notifications[0]) => {
    markAsRead(notif.id);
    if (notif.link) {
      setNotifOpen(false);
      navigate(notif.link);
    }
  };

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center px-4 gap-3 sticky top-0 z-30">
      <SidebarTrigger className="shrink-0" />

      <nav className="hidden md:flex items-center text-sm text-muted-foreground gap-1">
        {breadcrumb.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1">
            {i > 0 && <span className="text-border">/</span>}
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
          <Input placeholder="Search..." className="pl-9 h-9 bg-muted/50 border-0 rounded-lg" />
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0 rounded-lg">
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative shrink-0 rounded-lg">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-0.5 rounded-full bg-rose text-[10px] text-rose-foreground flex items-center justify-center font-bold"
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="font-display text-lg">Notifications</SheetTitle>
                <SheetDescription className="text-xs mt-0.5">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </SheetDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-primary h-8">
                  <CheckCheck className="mr-1.5 h-3.5 w-3.5" /> Mark all read
                </Button>
              )}
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="px-3 py-2">
              <AnimatePresence mode="popLayout">
                {notifications.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No notifications</p>
                  </div>
                ) : (
                  notifications.map(n => {
                    const config = NOTIF_ICONS[n.type] || NOTIF_ICONS.info;
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80 }}
                        className={`flex items-start gap-3 p-3 rounded-xl mb-1 transition-colors cursor-pointer group ${
                          n.read ? 'hover:bg-muted/50' : 'bg-primary/[0.04] hover:bg-primary/[0.07]'
                        }`}
                        onClick={() => handleNotifClick(n)}
                      >
                        <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm leading-tight ${n.read ? 'text-foreground/80' : 'text-foreground font-medium'}`}>
                              {n.title}
                            </p>
                            <button
                              onClick={e => { e.stopPropagation(); removeNotification(n.id); }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            >
                              <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-muted-foreground/60">{timeAgo(n.createdAt)}</span>
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            {n.link && <span className="text-[10px] text-primary">View →</span>}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-3 rounded-lg">
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

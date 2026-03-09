import {
  Home, Users, UserPlus, Upload, BarChart3, Building, DoorOpen, BedDouble,
  ClipboardList, MessageSquare, Wrench, Megaphone, UtensilsCrossed, UserCheck,
  CalendarDays, DollarSign, Calendar, FileText, Settings, UserCircle, Shield, Ban, Eye,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROLE_LABELS } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '@/types';

interface NavItem { title: string; url: string; icon: React.ElementType; roles: UserRole[]; }

const ALL: UserRole[] = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF','DINING_STAFF','MAINTENANCE_STAFF','GUARD','STUDENT','PARENT'];
const ADMIN: UserRole[] = ['SUPER_ADMIN','PROVOST'];
const MGMT: UserRole[] = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF'];

const groups: { label: string; items: NavItem[] }[] = [
  { label: 'Main', items: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, roles: ALL },
  ]},
  { label: 'User Management', items: [
    { title: 'Users', url: '/users', icon: Users, roles: MGMT },
    { title: 'Create User', url: '/users/new', icon: UserPlus, roles: ['SUPER_ADMIN','PROVOST','OFFICE_STAFF'] },
    { title: 'User Stats', url: '/users/statistics', icon: BarChart3, roles: ADMIN },
  ]},
  { label: 'Room Management', items: [
    { title: 'Rooms', url: '/rooms', icon: Building, roles: MGMT },
    { title: 'Vacant Rooms', url: '/rooms/vacant', icon: DoorOpen, roles: ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR'] },
    { title: 'My Floor', url: '/rooms/my-floor', icon: BedDouble, roles: ['HOUSE_TUTOR'] },
  ]},
  { label: 'Complaints & Requests', items: [
    { title: 'All Submissions', url: '/complaints', icon: MessageSquare, roles: MGMT },
    { title: 'My Submissions', url: '/complaints/my', icon: ClipboardList, roles: ['STUDENT'] },
  ]},
  { label: 'Maintenance', items: [
    { title: 'Requests', url: '/maintenance', icon: Wrench, roles: [...MGMT, 'MAINTENANCE_STAFF'] },
  ]},
  { label: 'Notices & Events', items: [
    { title: 'Notice Board', url: '/notices', icon: Megaphone, roles: ALL },
    { title: 'Events', url: '/events', icon: Calendar, roles: ALL },
  ]},
  { label: 'Hall Services', items: [
    { title: 'Meals', url: '/meals', icon: UtensilsCrossed, roles: [...ALL.filter(r => r !== 'PARENT')] },
    { title: 'Cancel Meals', url: '/meals/cancel', icon: Ban, roles: ['STUDENT'] },
    { title: 'Meal Overview', url: '/meals/overview', icon: Eye, roles: ['DINING_STAFF','SUPER_ADMIN','PROVOST'] },
    { title: 'Visitors', url: '/visitors', icon: UserCheck, roles: ['SUPER_ADMIN','PROVOST','GUARD','STUDENT'] },
    { title: 'Attendance', url: '/attendance', icon: CalendarDays, roles: ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','STUDENT'] },
    { title: 'Fees', url: '/fees', icon: DollarSign, roles: ['SUPER_ADMIN','PROVOST','OFFICE_STAFF','STUDENT'] },
  ]},
  { label: 'Analytics', items: [
    { title: 'Reports', url: '/reports', icon: FileText, roles: ADMIN },
  ]},
  { label: 'Account', items: [
    { title: 'Profile', url: '/profile', icon: UserCircle, roles: ALL },
    { title: 'Settings', url: '/settings', icon: Settings, roles: ADMIN },
  ]},
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-teal flex items-center justify-center shadow-teal"><GraduationCap className="w-5 h-5 text-primary-foreground" /></div>
            <div><h2 className="font-bold text-base text-sidebar-foreground">HallMate</h2><p className="text-[10px] text-muted-foreground">নওয়াব ফয়জুন্নেসা চৌধুরানী হল</p></div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg gradient-teal flex items-center justify-center shadow-teal mx-auto"><GraduationCap className="w-5 h-5 text-primary-foreground" /></div>
        )}
      </SidebarHeader>
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10"><AvatarImage src={user.avatar} /><AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
            <div className="min-w-0"><p className="text-sm font-medium truncate text-sidebar-foreground">{user.name}</p><Badge variant="secondary" className="text-[10px] px-1.5 py-0">{ROLE_LABELS[user.role]}</Badge></div>
          </div>
        </div>
      )}
      <SidebarContent className="py-2">
        {groups.map(group => {
          const visibleItems = group.items.filter(i => i.roles.includes(user.role));
          if (visibleItems.length === 0) return null;
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent><SidebarMenu>
                {visibleItems.map(item => (
                  <SidebarMenuItem key={item.title}><SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === '/dashboard'} className="hover:bg-sidebar-accent/50 transition-colors" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />{!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton></SidebarMenuItem>
                ))}
              </SidebarMenu></SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={() => { logout(); navigate('/login'); }}>
          <LogOut className="mr-2 h-4 w-4" />{!collapsed && 'Logout'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

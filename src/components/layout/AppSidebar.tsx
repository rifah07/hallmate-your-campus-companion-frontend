import {
  Home, Users, Building, UserCircle, Settings, Shield, UtensilsCrossed,
  Wrench, Eye, DoorOpen, BarChart3, Upload, UserPlus, BedDouble,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROLE_LABELS } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import type { UserRole } from '@/types';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, roles: ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN', 'OFFICE_STAFF', 'DINING_STAFF', 'MAINTENANCE_STAFF', 'GUARD', 'STUDENT', 'PARENT'] },
  { title: 'Users', url: '/users', icon: Users, roles: ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN', 'OFFICE_STAFF'] },
  { title: 'Create User', url: '/users/new', icon: UserPlus, roles: ['SUPER_ADMIN', 'PROVOST', 'OFFICE_STAFF'] },
  { title: 'Bulk Upload', url: '/users/bulk-upload', icon: Upload, roles: ['SUPER_ADMIN', 'PROVOST', 'OFFICE_STAFF'] },
  { title: 'User Stats', url: '/users/statistics', icon: BarChart3, roles: ['SUPER_ADMIN', 'PROVOST'] },
  { title: 'Rooms', url: '/rooms', icon: Building, roles: ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN', 'OFFICE_STAFF'] },
  { title: 'Vacant Rooms', url: '/rooms/vacant', icon: DoorOpen, roles: ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR'] },
  { title: 'My Floor', url: '/rooms/my-floor', icon: BedDouble, roles: ['HOUSE_TUTOR'] },
  { title: 'Room Stats', url: '/rooms/statistics', icon: BarChart3, roles: ['SUPER_ADMIN', 'PROVOST'] },
  { title: 'Profile', url: '/profile', icon: UserCircle, roles: ['SUPER_ADMIN', 'PROVOST', 'HOUSE_TUTOR', 'ASSISTANT_WARDEN', 'OFFICE_STAFF', 'DINING_STAFF', 'MAINTENANCE_STAFF', 'GUARD', 'STUDENT', 'PARENT'] },
  { title: 'Settings', url: '/settings', icon: Settings, roles: ['SUPER_ADMIN', 'PROVOST'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const filteredItems = navItems.filter(item => item.roles.includes(user.role));

  const mainItems = filteredItems.filter(i => ['Dashboard', 'Profile'].includes(i.title));
  const userItems = filteredItems.filter(i => ['Users', 'Create User', 'Bulk Upload', 'User Stats'].includes(i.title));
  const roomItems = filteredItems.filter(i => ['Rooms', 'Vacant Rooms', 'My Floor', 'Room Stats'].includes(i.title));
  const adminItems = filteredItems.filter(i => ['Settings'].includes(i.title));

  const renderGroup = (label: string, items: NavItem[]) => {
    if (items.length === 0) return null;
    return (
      <SidebarGroup key={label}>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === '/dashboard'}
                    className="hover:bg-sidebar-accent/50 transition-colors"
                    activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-base text-sidebar-foreground">HallMate</h2>
              <p className="text-[10px] text-muted-foreground">Women's Hall Management</p>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>

      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{user.name}</p>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {ROLE_LABELS[user.role]}
              </Badge>
            </div>
          </div>
        </div>
      )}

      <SidebarContent className="py-2">
        {renderGroup('Main', mainItems)}
        {renderGroup('User Management', userItems)}
        {renderGroup('Room Management', roomItems)}
        {renderGroup('Administration', adminItems)}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && 'Logout'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

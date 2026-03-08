import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import LoginPage from "@/pages/auth/LoginPage";
import FirstLoginPage from "@/pages/auth/FirstLoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import UsersListPage from "@/pages/users/UsersListPage";
import CreateUserPage from "@/pages/users/CreateUserPage";
import UserDetailsPage from "@/pages/users/UserDetailsPage";
import BulkUploadPage from "@/pages/users/BulkUploadPage";
import UserStatisticsPage from "@/pages/users/UserStatisticsPage";
import RoomsListPage from "@/pages/rooms/RoomsListPage";
import VacantRoomsPage from "@/pages/rooms/VacantRoomsPage";
import RoomDetailsPage from "@/pages/rooms/RoomDetailsPage";
import CreateRoomPage from "@/pages/rooms/CreateRoomPage";
import RoomStatisticsPage from "@/pages/rooms/RoomStatisticsPage";
import MyFloorPage from "@/pages/rooms/MyFloorPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ALL_ROLES = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF','DINING_STAFF','MAINTENANCE_STAFF','GUARD','STUDENT','PARENT'] as const;
const MGMT = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF'] as const;
const ADMIN = ['SUPER_ADMIN','PROVOST'] as const;

function ThemeInit() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInit />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/first-login" element={<FirstLoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute allowedRoles={[...ALL_ROLES]}><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/users" element={<ProtectedRoute allowedRoles={[...MGMT]}><UsersListPage /></ProtectedRoute>} />
            <Route path="/users/new" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN','PROVOST','OFFICE_STAFF']}><CreateUserPage /></ProtectedRoute>} />
            <Route path="/users/bulk-upload" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN','PROVOST','OFFICE_STAFF']}><BulkUploadPage /></ProtectedRoute>} />
            <Route path="/users/statistics" element={<ProtectedRoute allowedRoles={[...ADMIN]}><UserStatisticsPage /></ProtectedRoute>} />
            <Route path="/users/:id" element={<ProtectedRoute allowedRoles={[...MGMT]}><UserDetailsPage /></ProtectedRoute>} />
            <Route path="/users/:id/edit" element={<ProtectedRoute allowedRoles={[...MGMT]}><CreateUserPage /></ProtectedRoute>} />

            <Route path="/rooms" element={<ProtectedRoute allowedRoles={[...MGMT]}><RoomsListPage /></ProtectedRoute>} />
            <Route path="/rooms/new" element={<ProtectedRoute allowedRoles={[...ADMIN]}><CreateRoomPage /></ProtectedRoute>} />
            <Route path="/rooms/vacant" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN','PROVOST','HOUSE_TUTOR']}><VacantRoomsPage /></ProtectedRoute>} />
            <Route path="/rooms/my-floor" element={<ProtectedRoute allowedRoles={['HOUSE_TUTOR']}><MyFloorPage /></ProtectedRoute>} />
            <Route path="/rooms/statistics" element={<ProtectedRoute allowedRoles={[...ADMIN]}><RoomStatisticsPage /></ProtectedRoute>} />
            <Route path="/rooms/:id" element={<ProtectedRoute allowedRoles={[...MGMT]}><RoomDetailsPage /></ProtectedRoute>} />

            <Route path="/settings" element={<ProtectedRoute allowedRoles={[...ADMIN]}><SettingsPage /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import type { UserRole } from "@/types";

// Public pages
import LandingPage from "@/pages/public/LandingPage";
import AboutPage from "@/pages/public/AboutPage";
import FacilitiesPage from "@/pages/public/FacilitiesPage";
import AdmissionPage from "@/pages/public/AdmissionPage";
import ApplicationFormPage from "@/pages/public/ApplicationFormPage";
import TrackApplicationPage from "@/pages/public/TrackApplicationPage";
import ContactPage from "@/pages/public/ContactPage";
import FAQPage from "@/pages/public/FAQPage";
import GalleryPage from "@/pages/public/GalleryPage";
import PublicNoticesPage from "@/pages/public/PublicNoticesPage";
import PublicNoticeDetailPage from "@/pages/public/PublicNoticeDetailPage";
import ProvostPage from "@/pages/public/ProvostPage";
import AllProvostsPage from "@/pages/public/AllProvostsPage";
import HouseTutorsPage from "@/pages/public/HouseTutorsPage";
import StaffPage from "@/pages/public/StaffPage";
import DiningPage from "@/pages/public/DiningPage";
import AchievementsPage from "@/pages/public/AchievementsPage";
import EventsPublicPage from "@/pages/public/EventsPublicPage";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import FirstLoginPage from "@/pages/auth/FirstLoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Protected pages
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
import ApplicationsListPage from "@/pages/applications/ApplicationsListPage";
import MyApplicationsPage from "@/pages/applications/MyApplicationsPage";
import NewApplicationPage from "@/pages/applications/NewApplicationPage";
import ApplicationDetailsPage from "@/pages/applications/ApplicationDetailsPage";
import ApplicationStatisticsPage from "@/pages/applications/ApplicationStatisticsPage";
import ComplaintsListPage from "@/pages/complaints/ComplaintsListPage";
import MyComplaintsPage from "@/pages/complaints/MyComplaintsPage";
import SubmitComplaintPage from "@/pages/complaints/SubmitComplaintPage";
import ComplaintDetailsPage from "@/pages/complaints/ComplaintDetailsPage";
import ComplaintStatisticsPage from "@/pages/complaints/ComplaintStatisticsPage";
import MaintenanceListPage from "@/pages/maintenance/MaintenanceListPage";
import MaintenanceDetailsPage from "@/pages/maintenance/MaintenanceDetailsPage";
import MaintenanceStatisticsPage from "@/pages/maintenance/MaintenanceStatisticsPage";
import NoticeBoardPage from "@/pages/notices/NoticeBoardPage";
import NoticeDetailsPage from "@/pages/notices/NoticeDetailsPage";
import CreateNoticePage from "@/pages/notices/CreateNoticePage";
import MealDashboardPage from "@/pages/meals/MealDashboardPage";
import MealCancellationPage from "@/pages/meals/MealCancellationPage";
import StaffMealOverviewPage from "@/pages/meals/StaffMealOverviewPage";
import VisitorsLogPage from "@/pages/visitors/VisitorsLogPage";
import RegisterVisitorPage from "@/pages/visitors/RegisterVisitorPage";
import AttendanceDashboardPage from "@/pages/attendance/AttendanceDashboardPage";
import FeesDashboardPage from "@/pages/fees/FeesDashboardPage";
import EventsCalendarPage from "@/pages/events/EventsCalendarPage";
import EventDetailsPage from "@/pages/events/EventDetailsPage";
import ReportsDashboardPage from "@/pages/reports/ReportsDashboardPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();
const ALL: UserRole[] = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF','DINING_STAFF','MAINTENANCE_STAFF','GUARD','STUDENT','PARENT'];
const MGMT: UserRole[] = ['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','ASSISTANT_WARDEN','OFFICE_STAFF'];
const ADMIN: UserRole[] = ['SUPER_ADMIN','PROVOST'];

function ThemeInit() {
  const { theme } = useThemeStore();
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  return null;
}

const P = ({ roles, children }: { roles: UserRole[]; children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInit />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pages with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/apply" element={<ApplicationFormPage />} />
            <Route path="/track-application" element={<TrackApplicationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/public-notices" element={<PublicNoticesPage />} />
            <Route path="/public-notices/:id" element={<PublicNoticeDetailPage />} />
            <Route path="/provost" element={<ProvostPage />} />
            <Route path="/all-provosts" element={<AllProvostsPage />} />
            <Route path="/house-tutors" element={<HouseTutorsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/events-public" element={<EventsPublicPage />} />
          </Route>

          {/* Auth pages (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/first-login" element={<FirstLoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected routes */}
          <Route element={<P roles={ALL}><DashboardLayout /></P>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/users" element={<P roles={MGMT}><UsersListPage /></P>} />
            <Route path="/users/new" element={<P roles={['SUPER_ADMIN','PROVOST','OFFICE_STAFF']}><CreateUserPage /></P>} />
            <Route path="/users/bulk-upload" element={<P roles={['SUPER_ADMIN','PROVOST','OFFICE_STAFF']}><BulkUploadPage /></P>} />
            <Route path="/users/statistics" element={<P roles={ADMIN}><UserStatisticsPage /></P>} />
            <Route path="/users/:id" element={<P roles={MGMT}><UserDetailsPage /></P>} />
            <Route path="/users/:id/edit" element={<P roles={MGMT}><CreateUserPage /></P>} />

            <Route path="/rooms" element={<P roles={MGMT}><RoomsListPage /></P>} />
            <Route path="/rooms/new" element={<P roles={ADMIN}><CreateRoomPage /></P>} />
            <Route path="/rooms/vacant" element={<P roles={['SUPER_ADMIN','PROVOST','HOUSE_TUTOR']}><VacantRoomsPage /></P>} />
            <Route path="/rooms/my-floor" element={<P roles={['HOUSE_TUTOR']}><MyFloorPage /></P>} />
            <Route path="/rooms/statistics" element={<P roles={ADMIN}><RoomStatisticsPage /></P>} />
            <Route path="/rooms/:id" element={<P roles={MGMT}><RoomDetailsPage /></P>} />

            <Route path="/applications" element={<P roles={MGMT}><ApplicationsListPage /></P>} />
            <Route path="/applications/my" element={<P roles={['STUDENT']}><MyApplicationsPage /></P>} />
            <Route path="/applications/new" element={<P roles={['STUDENT']}><NewApplicationPage /></P>} />
            <Route path="/applications/statistics" element={<P roles={ADMIN}><ApplicationStatisticsPage /></P>} />
            <Route path="/applications/:id" element={<P roles={[...MGMT,'STUDENT']}><ApplicationDetailsPage /></P>} />

            <Route path="/complaints" element={<P roles={MGMT}><ComplaintsListPage /></P>} />
            <Route path="/complaints/my" element={<P roles={['STUDENT']}><MyComplaintsPage /></P>} />
            <Route path="/complaints/new" element={<P roles={['STUDENT']}><SubmitComplaintPage /></P>} />
            <Route path="/complaints/statistics" element={<P roles={ADMIN}><ComplaintStatisticsPage /></P>} />
            <Route path="/complaints/:id" element={<P roles={[...MGMT,'STUDENT']}><ComplaintDetailsPage /></P>} />

            <Route path="/maintenance" element={<P roles={[...MGMT,'MAINTENANCE_STAFF']}><MaintenanceListPage /></P>} />
            <Route path="/maintenance/statistics" element={<P roles={ADMIN}><MaintenanceStatisticsPage /></P>} />
            <Route path="/maintenance/:id" element={<P roles={[...MGMT,'MAINTENANCE_STAFF']}><MaintenanceDetailsPage /></P>} />

            <Route path="/notices" element={<NoticeBoardPage />} />
            <Route path="/notices/new" element={<P roles={ADMIN}><CreateNoticePage /></P>} />
            <Route path="/notices/:id" element={<NoticeDetailsPage />} />

            <Route path="/meals" element={<MealDashboardPage />} />
            <Route path="/meals/cancel" element={<P roles={['STUDENT']}><MealCancellationPage /></P>} />
            <Route path="/meals/overview" element={<P roles={['DINING_STAFF','SUPER_ADMIN','PROVOST']}><StaffMealOverviewPage /></P>} />

            <Route path="/visitors" element={<P roles={['SUPER_ADMIN','PROVOST','GUARD','STUDENT']}><VisitorsLogPage /></P>} />
            <Route path="/visitors/new" element={<P roles={['GUARD','SUPER_ADMIN']}><RegisterVisitorPage /></P>} />

            <Route path="/attendance" element={<P roles={['SUPER_ADMIN','PROVOST','HOUSE_TUTOR','STUDENT']}><AttendanceDashboardPage /></P>} />

            <Route path="/fees" element={<P roles={['SUPER_ADMIN','PROVOST','OFFICE_STAFF','STUDENT']}><FeesDashboardPage /></P>} />

            <Route path="/events" element={<EventsCalendarPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />

            <Route path="/reports" element={<P roles={ADMIN}><ReportsDashboardPage /></P>} />
            <Route path="/settings" element={<P roles={ADMIN}><SettingsPage /></P>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

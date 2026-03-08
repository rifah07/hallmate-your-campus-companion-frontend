# HallMate — University Hall Management System

A comprehensive, modern web application for managing university residential halls. Built with a focus on elegance, usability, and role-based access control for 10 distinct user roles.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State Management** | Zustand (persisted stores) |
| **Data Fetching** | TanStack React Query |
| **Forms** | React Hook Form + Zod validation |
| **Routing** | React Router DOM v6 |
| **Charts** | Recharts |
| **Animation** | Framer Motion |
| **HTTP Client** | Axios (with JWT interceptors & token rotation) |
| **Fonts** | Sora (display) + Plus Jakarta Sans (body) + JetBrains Mono (code) |

---

## 👥 Role-Based Access Control (RBAC)

10 roles with granular route-level and UI-level permissions:

| Role | Access Level |
|---|---|
| `SUPER_ADMIN` | Full system access |
| `PROVOST` | Hall oversight & administration |
| `HOUSE_TUTOR` | Floor-specific management |
| `ASSISTANT_WARDEN` | Hall support operations |
| `OFFICE_STAFF` | Administrative operations |
| `DINING_STAFF` | Meal management |
| `MAINTENANCE_STAFF` | Repair & maintenance |
| `GUARD` | Gate & visitor management |
| `STUDENT` | Resident portal |
| `PARENT` | Read-only view |

---

## ✅ Implemented Features

### 🔐 Authentication Module
- [x] Login with 10-digit University ID + password (real API integration)
- [x] First-time login with OTP + password setup
- [x] Forgot password (University ID → 6-digit OTP via email)
- [x] Reset password with OTP verification
- [x] Change password (authenticated, revokes all sessions)
- [x] JWT access token (15min) + httpOnly refresh token cookie (7d)
- [x] Automatic token refresh with rotation & reuse detection
- [x] Request queue during token refresh (no dropped requests)
- [x] Protected routes with role-based guards
- [x] Demo quick-login for all 9 roles

### 👤 User Management Module
- [x] Create user with full validation (conditional fields per role)
- [x] User list with search, filters (role, status, department, year, program), sorting, pagination
- [x] User detail view with full profile information
- [x] Update user profile (name, email, phone, blood group, medical info, etc.)
- [x] Change user role (SUPER_ADMIN only)
- [x] Change account status (ACTIVE, SUSPENDED, SEAT_CANCELLED, INACTIVE, GRADUATED)
- [x] Soft delete with anonymization warning
- [x] Restore soft-deleted users
- [x] Bulk upload users from Excel/CSV file
- [x] Download Excel template for bulk upload
- [x] CSV export of filtered user list
- [x] User statistics dashboard (by role, department, year, trends)
- [x] Profile picture upload/delete (Cloudinary-backed)

### 🏠 Room Management
- [x] Room listing with filters and search
- [x] Create/edit rooms
- [x] Room details view
- [x] Vacant rooms view
- [x] My Floor view (House Tutor)
- [x] Room statistics dashboard

### 📋 Applications
- [x] Application list (admin) with filters
- [x] My applications (student)
- [x] New application form
- [x] Application details & review
- [x] Application statistics

### 📢 Complaints
- [x] Complaints list (admin)
- [x] My complaints (student)
- [x] Submit complaint form
- [x] Complaint details & tracking
- [x] Complaint statistics

### 🔧 Maintenance
- [x] Maintenance request list
- [x] Maintenance details
- [x] Maintenance statistics

### 📌 Notice Board
- [x] Notice list (internal)
- [x] Create notice
- [x] Notice details
- [x] Public notices (external)

### 🍽️ Meals
- [x] Meal dashboard
- [x] Meal cancellation (student)
- [x] Staff meal overview

### 🚪 Visitors
- [x] Visitor log
- [x] Register visitor

### 📊 Other Modules
- [x] Attendance dashboard
- [x] Fees dashboard
- [x] Events calendar & details
- [x] Reports dashboard
- [x] Settings page

### 🌐 Public Website
- [x] Landing page with hero, stats, features, testimonials
- [x] About, Facilities, Admission, Contact, FAQ, Gallery
- [x] Provost, House Tutors, Staff pages
- [x] Dining, Achievements, Public Events, Public Notices
- [x] Application form & tracking

### 🎨 UI/UX
- [x] Glassmorphism design system with semantic tokens
- [x] Dark mode support (persisted)
- [x] Responsive sidebar + top navbar
- [x] Scroll-aware transparent → glass navbar
- [x] Notification panel with mark-as-read, mark-all, delete
- [x] Framer Motion animations throughout
- [x] Elegant typography (Sora + Plus Jakarta Sans)

---

## 🔲 Pending Features (Backend Integration Required)

- [ ] Connect all modules to real REST API endpoints
- [ ] Real-time notifications via WebSocket/SSE
- [ ] File upload to Cloudinary (currently mocked)
- [ ] Excel/CSV bulk upload parsing (currently mocked)
- [ ] Session timeout warning (14-min warning, 15-min auto-logout)
- [ ] Push notifications (browser)
- [ ] Audit log viewer (admin)
- [ ] Payment gateway integration for fees
- [ ] QR code for visitor registration
- [ ] Mobile-optimized PWA support
- [ ] Multi-language support (i18n)

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI, layout, dashboard widgets
├── constants/            # Enums, role lists, static data
├── hooks/                # Custom hooks (use-data, use-mobile, use-toast)
├── lib/                  # API client (Axios), mock data, utilities
├── pages/
│   ├── auth/             # Login, FirstLogin, ForgotPassword, ResetPassword, ChangePassword
│   ├── public/           # Landing, About, Facilities, Gallery, etc.
│   ├── users/            # CRUD, bulk upload, statistics
│   ├── rooms/            # CRUD, vacant, my-floor, statistics
│   ├── applications/     # List, create, details, statistics
│   ├── complaints/       # List, create, details, statistics
│   ├── maintenance/      # List, details, statistics
│   ├── notices/          # Board, create, details
│   ├── meals/            # Dashboard, cancellation, overview
│   ├── visitors/         # Log, register
│   └── ...               # attendance, fees, events, reports, profile, settings
├── services/             # API service layer (auth, users, rooms, modules, public)
├── store/                # Zustand stores (auth, theme, notification)
├── types/                # TypeScript interfaces & enums
└── App.tsx               # Route definitions with RBAC guards
```

---

## 🚀 Getting Started

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm test           # Run tests
```

### Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 API Documentation

The backend API follows RESTful conventions with Swagger/OpenAPI docs:

| Module | Endpoint | Description |
|---|---|---|
| Auth | `/api/auth/*` | Login, logout, token refresh, password flows |
| Users | `/api/users/*` | CRUD, bulk ops, statistics, profile pictures |
| Rooms | `/api/rooms/*` | Room management and allocation |
| Applications | `/api/applications/*` | Seat applications |
| Complaints | `/api/complaints/*` | Complaint tracking |
| Maintenance | `/api/maintenance/*` | Repair requests |
| Meals | `/api/meals/*` | Dining management |
| Notices | `/api/notices/*` | Announcements |
| Visitors | `/api/visitors/*` | Gate management |

---

## 📄 License

This project is proprietary software for university hall management.

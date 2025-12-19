import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './contexts/ToastContext'
import ToastContainer from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import PageTransition from './components/PageTransition'
import Logo from './components/Logo'

// Auth
import Login from './pages/Login'
import Register from './pages/Register'

// Landing
import Landing from './pages/Landing'
import Clubs from './pages/Clubs'
import ClubDetail from './pages/ClubDetail'

// Layout
import DashboardLayout from './layouts/DashboardLayout'

// Student pages
import StudentDashboard from './pages/StudentDashboard'
import StudentHallTicket from './pages/StudentHallTicket'
import StudentSeat from './pages/StudentSeat'
import StudentClubEvents from './pages/StudentClubEvents'
import StudentCalendar from './pages/StudentCalendar'
import StudentStudyContent from './pages/StudentStudyContent'

// Admin pages
import AdminDashboard from './pages/AdminDashboard'
import AdminHallTicket from './pages/AdminHallTicket'
import AdminSeatingView from './pages/AdminSeatingView'
import AdminClubEvents from './pages/AdminClubEvents'
import AdminCalendar from './pages/AdminCalendar'
import AdminStudyContent from './pages/AdminStudyContent'

// Seating Manager pages
import SeatingManagerDashboard from './pages/SeatingManagerDashboard'
import SeatingManagerAllocation from './pages/SeatingManagerAllocation'

// Club Coordinator pages
import ClubCoordinatorDashboard from './pages/ClubCoordinatorDashboard'
import ClubCoordinatorEvents from './pages/ClubCoordinatorEvents'

function AppLayout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">EduManage Pro</div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-button">Get Started</Link>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          © {new Date().getFullYear()} ExamSync. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="*" element={
          <AppLayout>
            <Routes location={location}>
        <Route path="*" element={
          <AppLayout>
            <Routes location={location}>
        {/* ================= PUBLIC ================= */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/clubs"
          element={
            <PageTransition>
              <Clubs />
            </PageTransition>
          }
        />
        <Route
          path="/clubs/:clubName"
          element={
            <PageTransition>
              <ClubDetail />
            </PageTransition>
          }
        />

        {/* ================= STUDENT ================= */}
        <Route
          path="/student"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/student/hall-ticket"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentHallTicket />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/student/seat"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentSeat />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/student/club-events"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentClubEvents />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/student/calendar"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentCalendar />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/student/study-content"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentStudyContent />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin/hall-ticket"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminHallTicket />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin/seating"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminSeatingView />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin/club-events"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminClubEvents />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminCalendar />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin/study-content"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminStudyContent />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* ================= SEATING MANAGER ================= */}
        <Route
          path="/seating-manager"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['SEATING_MANAGER']}>
                <DashboardLayout>
                  <SeatingManagerDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/seating-manager/allocate"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['SEATING_MANAGER']}>
                <DashboardLayout>
                  <SeatingManagerAllocation />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* ================= CLUB COORDINATOR ================= */}
        <Route
          path="/club-coordinator"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['CLUB_COORDINATOR']}>
                <DashboardLayout>
                  <ClubCoordinatorDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/club-coordinator/events"
          element={
            <PageTransition>
              <ProtectedRoute allowedRoles={['CLUB_COORDINATOR']}>
                <DashboardLayout>
                  <ClubCoordinatorEvents />
                </DashboardLayout>
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* ================= DEFAULT ================= */}
        <Route
          path="*"
          element={
            <PageTransition>
              <Navigate to="/" replace />
            </PageTransition>
          }
        />
            </Routes>
          </AppLayout>
        } />
              {/* Public Routes */}
              <Route path="/" element={
                <PageTransition>
                  <Landing />
                </PageTransition>
              } />
              <Route path="/login" element={
                <PageTransition>
                  <Login />
                </PageTransition>
              } />
              <Route path="/register" element={
                <PageTransition>
                  <Register />
                </PageTransition>
              } />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'SEATING_MANAGER', 'CLUB_COORDINATOR']}>
                    <PageTransition>
                      <DashboardLayout>
                        <StudentDashboard />
                      </DashboardLayout>
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              {/* Add other protected routes here */}

              {/* 404 Route */}
              <Route path="*" element={
                <PageTransition>
                  <Navigate to="/" replace />
                </PageTransition>
              } />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

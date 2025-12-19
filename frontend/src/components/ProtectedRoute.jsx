import { Navigate } from 'react-router-dom'
import { isAuthenticated, getUserRole } from '../utils/auth'

function ProtectedRoute({ children, allowedRoles }) {
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  // 1. Not logged in → go to login
  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  // 2. Logged in but role not allowed → redirect to correct dashboard
  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect based on actual role
      switch (userRole) {
        case 'ADMIN':
          return <Navigate to="/admin" replace />
        case 'STUDENT':
          return <Navigate to="/student" replace />
        case 'SEATING_MANAGER':
          return <Navigate to="/seating-manager" replace />
        case 'CLUB_COORDINATOR':
          return <Navigate to="/club-coordinator" replace />
        default:
          return <Navigate to="/login" replace />
      }
    }
  }

  // 3. Authorized → render page
  return children
}

export default ProtectedRoute

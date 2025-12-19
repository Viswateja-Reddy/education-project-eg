import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'

function DashboardLayout({ children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-layout">
      <header className="dashboard-layout-header">
        <div className="dashboard-layout-brand">EduManage Pro</div>

        <button
          onClick={handleLogout}
          className="dashboard-layout-logout"
        >
          Logout
        </button>
      </header>

      <main className="dashboard-layout-content">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

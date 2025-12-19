import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../contexts/ToastContext'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/api/auth/login', { email, password })
      const { token, user } = response.data

      if (!token || !user) {
        setError('Invalid response from server')
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      const role = user.role
      const routeMap = {
        ADMIN: '/admin',
        STUDENT: '/student',
        SEATING_MANAGER: '/seating-manager',
        CLUB_COORDINATOR: '/club-coordinator',
      }

      const target = routeMap[role] || '/login'
      navigate(target, { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>Sign in to EduManage Pro</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p className="register-link">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => navigate('/register')}
                className="register-button"
              >
                Register
              </button>
            </p>
          </form>
        </div>
        
        <footer className="footer">
          © 2025 EduManage Pro. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Login

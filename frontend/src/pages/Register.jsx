import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../contexts/ToastContext'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.role === 'ADMIN') {
      newErrors.role = 'Invalid role selection'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Extra safety check for ADMIN role
    if (formData.role === 'ADMIN') {
      showToast('Invalid role selection', 'error')
      return
    }
    
    setLoading(true)
    
    try {
      await api.post('/api/auth/register', formData)
      
      showToast('Registration successful! Redirecting to login...', 'success')
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed'
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h1>Create Account</h1>
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="John Doe"
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="••••••••"
                minLength={6}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
                required
              >
                <option value="STUDENT">Student</option>
                <option value="SEATING_MANAGER">Seating Manager</option>
                <option value="CLUB_COORDINATOR">Club Coordinator</option>
              </select>
              {errors.role && <p className="error-message">{errors.role}</p>}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <p className="login-link">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => navigate('/login')}
                className="login-button"
              >
                Sign in
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

export default Register

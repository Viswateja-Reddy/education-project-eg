import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './StudentSeat.css';

function StudentSeat() {
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allocation, setAllocation] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setAllocation(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const response = await api.get(`/api/seating/me/${examName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.allocation) {
        setAllocation(response.data.allocation)
      } else {
        setError(response.data.message || 'No seat allocated for this exam')
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch seat allocation'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="seating-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      
      <div className="seating-card">
        <header className="seating-header">
          <h1 className="seating-title">Seating Arrangement</h1>
          <p className="seating-subtitle">View your exam seat details</p>
        </header>

        <form onSubmit={handleSubmit} className="seating-form">
          <div className="form-group">
            <label htmlFor="examName" className="form-label">
              Exam Name
              <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="examName"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="form-input"
              placeholder="Enter exam name"
              required
              disabled={loading}
              autoComplete="off"
            />
            <p className="input-hint">Enter the name of the exam (e.g., 'Mid Term - Computer Science')</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">↻</span>
                Loading...
              </span>
            ) : (
              'View My Seat'
            )}
          </button>
        </form>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {allocation && (
          <motion.div 
            className="allocation-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="allocation-title">Your Seat Details</h2>
            <div className="detail-row">
              <span className="detail-label">Exam Name</span>
              <span className="detail-value">{examName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Room</span>
              <span className="detail-value">{allocation.roomId?.roomName || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Bench Number</span>
              <span className="detail-value">{allocation.benchNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Seat Number</span>
              <span className="detail-value seat-highlight">{allocation.seatNumber}</span>
            </div>
          </motion.div>
        )}
      </div>
      
      <footer className="seating-footer">
        © {new Date().getFullYear()} ExamSync. All rights reserved.
      </footer>
    </div>
  )
}

export default StudentSeat

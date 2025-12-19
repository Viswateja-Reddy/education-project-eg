import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../contexts/ToastContext';
import { SkeletonCard } from '../components/Skeleton';
import { useNavigate } from 'react-router-dom';
import './StudentHallTicket.css';

function StudentHallTicket() {
  const [hallTicket, setHallTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchHallTicket = async () => {
      setLoading(true)
      setError('')

      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/api/hall-tickets/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setHallTicket(response.data.hallTicket || null)
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load hall ticket'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchHallTicket()
  }, [])

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const token = localStorage.getItem('token')

      const response = await api.get('/api/hall-tickets/me/pdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      })

      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'hall-ticket.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      showToast('Hall Ticket Downloaded', 'success')
    } catch (err) {
      const status = err.response?.status
      const message =
        status === 401 || status === 403
          ? 'You are not authorized to download this hall ticket.'
          : err.response?.data?.message || 'Failed to download hall ticket PDF'
      setError(message)
      showToast(message, status === 401 || status === 403 ? 'warning' : 'error')
    } finally {
      setIsDownloading(false)
    }
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="hall-ticket-container">
        <div className="hall-ticket-card">
          <h1 className="hall-ticket-title">Hall Ticket</h1>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error && !hallTicket) {
    return (
      <div className="hall-ticket-container">
        <div className="hall-ticket-card">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!hallTicket) {
    return (
      <div className="hall-ticket-container">
        <div className="hall-ticket-card">
          <p>No hall ticket available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hall-ticket-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      
      <div className="hall-ticket-card">
        <header className="hall-ticket-header">
          <h1 className="hall-ticket-title">Hall Ticket</h1>
          <p className="hall-ticket-subtitle">Student Examination Admit Card</p>
        </header>

        <div className="hall-ticket-details">
          <div className="detail-label">Student Name:</div>
          <div className="detail-value">{hallTicket.studentName || 'N/A'}</div>
          
          <div className="detail-label">Registration No:</div>
          <div className="detail-value">{hallTicket.registrationNumber || 'N/A'}</div>
          
          <div className="detail-label">Exam Name:</div>
          <div className="detail-value">{hallTicket.examName || 'N/A'}</div>
          
          <div className="detail-label">Exam Date:</div>
          <div className="detail-value exam-datetime">
            {hallTicket.examDate ? new Date(hallTicket.examDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            }) : 'N/A'}
          </div>
          
          <div className="detail-label">Exam Time:</div>
          <div className="detail-value exam-datetime">{hallTicket.examTime || 'N/A'}</div>
          
          <div className="detail-label">Venue:</div>
          <div className="detail-value">{hallTicket.venue || 'N/A'}</div>
          
          <div className="detail-label">Seat Number:</div>
          <div className="detail-value">
            <span className="seat-number">{hallTicket.seatNumber || 'N/A'}</span>
          </div>
        </div>

        {error && hallTicket && <p className="error-message">{error}</p>}

        <div className="button-container">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="download-button"
          >
            {isDownloading ? 'Downloading...' : 'Download Hall Ticket (PDF)'}
          </button>
        </div>
      </div>
      
      <footer className="hall-ticket-footer">
        © 2025 ExamSync. All rights reserved.
      </footer>
    </div>
  );
}

export default StudentHallTicket;

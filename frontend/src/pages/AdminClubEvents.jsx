import React, { useEffect, useState } from 'react'
import api from '../services/api'
import Celebration from '../components/Celebration'
import { SkeletonTableRow } from '../components/Skeleton'
import './AdminClubEvents.css'

function AdminClubEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.get('/api/club-events/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setEvents(res.data.events || [])
    } catch (err) {
      setError('Failed to load pending club events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleApprove = async (id) => {
    try {
      setActionLoading(id)
      const token = localStorage.getItem('token')
      await api.put(
        `/api/club-events/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setShowCelebration(true)
      fetchEvents()
    } catch (err) {
      setError('Failed to approve event')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id) => {
    try {
      setActionLoading(id)
      const token = localStorage.getItem('token')
      await api.put(
        `/api/club-events/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      fetchEvents()
    } catch (err) {
      setError('Failed to reject event')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="admin-page-container">
      {showCelebration && (
        <Celebration onComplete={() => setShowCelebration(false)} />
      )}

      <h1 className="admin-page-title">Pending Club Events</h1>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Club</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
              <SkeletonTableRow />
            </tbody>
          </table>
        </div>
      ) : events.length === 0 ? (
        <div className="admin-empty-card">
          <div className="admin-empty-icon">✨</div>
          <h3>All Caught Up!</h3>
          <p>No pending events to review at the moment.</p>
        </div>
      ) : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Club</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.club?.name || 'N/A'}</td>
                  <td>
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{event.venue}</td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(event._id)}
                        disabled={actionLoading === event._id}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(event._id)}
                        disabled={actionLoading === event._id}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminClubEvents

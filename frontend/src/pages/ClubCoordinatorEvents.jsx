import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../contexts/ToastContext';
import Celebration from '../components/Celebration';
import { SkeletonList } from '../components/Skeleton';
import { FiCalendar, FiClock, FiMapPin, FiPlus, FiList } from 'react-icons/fi';
import './ClubCoordinatorEvents.css';

function ClubCoordinatorEvents() {
  const [formData, setFormData] = useState({
    club: '',
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    venue: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const { showToast } = useToast()

  const fetchMyEvents = async () => {
    setEventsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await api.get('/api/club-events/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEvents(response.data.events || [])
    } catch (err) {
      setEvents([])
    } finally {
      setEventsLoading(false)
    }
  }

  useEffect(() => {
    fetchMyEvents()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Log the form data being submitted
    console.log('Submitting form data:', formData)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Log the request details
      console.log('Sending request to /api/club-events with token:', token ? 'Token exists' : 'No token')
      
      const response = await api.post('/api/club-events', formData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      
      console.log('Server response:', response.data)
      setSuccess('Event submitted successfully')
      setShowCelebration(true)
      showToast('Event submitted successfully!', 'success')
      setFormData({
        club: '',
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        venue: '',
      })
      fetchMyEvents()
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to submit event'
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="club-events-page">
      {showCelebration && (
        <Celebration onComplete={() => setShowCelebration(false)} />
      )}
      
      <header className="page-header">
        <h1>Manage Club Events</h1>
        <p>Submit new events and manage your existing ones</p>
      </header>

      <div className="event-form-container">
        <div className="form-header">
          <h2>Submit New Event</h2>
        </div>

        <div className="form-group">
          <label>Club ID</label>
          <input
            type="text"
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your club ID"
            required
          />
        </div>

        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Provide details about your event"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label>Event Date</label>
            <div className="relative">
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="form-control pl-10"
                required
              />
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="form-group">
            <label>Event Time</label>
            <div className="relative">
              <input
                type="text"
                name="eventTime"
                placeholder="e.g., 10:00 AM - 1:00 PM"
                value={formData.eventTime}
                onChange={handleChange}
                className="form-control pl-10"
                required
              />
              <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Venue</label>
          <div className="relative">
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="form-control pl-10"
              placeholder="Enter event location"
              required
            />
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>✓</span> {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full md:w-auto"
        >
          <FiPlus className="mr-2" />
          {loading ? 'Submitting...' : 'Submit Event'}
        </button>
      </div>

      <section className="events-section">
        <div className="section-header">
          <h2>
            <FiList className="inline-block mr-2" />
            My Events
          </h2>
        </div>

        {eventsLoading ? (
          <SkeletonList count={3} />
        ) : events.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">📋</span>
            <h3>No Events Yet</h3>
            <p>You haven't submitted any events yet. Create your first event above!</p>
          </div>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <article key={event._id} className="event-card">
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span>
                      <FiCalendar className="inline mr-1" />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                    {event.eventTime && (
                      <span>
                        <FiClock className="inline mr-1" />
                        {event.eventTime}
                      </span>
                    )}
                    {event.venue && (
                      <span>
                        <FiMapPin className="inline mr-1" />
                        {event.venue}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`event-status status-${event.status.toLowerCase()}`}>
                  {event.status}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ClubCoordinatorEvents

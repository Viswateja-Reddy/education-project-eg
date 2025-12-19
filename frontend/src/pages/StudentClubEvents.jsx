import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { SkeletonCard } from '../components/Skeleton';
import './StudentClubEvents.css';

function StudentClubEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/club-events/approved', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data.events || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedEvents();
  }, []);

  return (
    <div className="student-club-events">
      <h1>Upcoming Club Events</h1>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : events.length === 0 ? (
        <div className="no-events">
          <span>🎉</span>
          <h3>No Upcoming Events</h3>
          <p>Check back later for exciting club activities.</p>
        </div>
      ) : (
        <div className="events-container">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-header">
                <h2>{event.title}</h2>
                <span className="event-club">
                  {event.club?.name || 'N/A'}
                </span>
              </div>

              <div className="event-body">
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="event-detail">
                    <i>📅</i>
                    <span>Date:</span>
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleDateString()
                      : 'N/A'}
                  </div>

                  <div className="event-detail">
                    <i>⏰</i>
                    <span>Time:</span>
                    {event.eventTime}
                  </div>

                  <div className="event-detail">
                    <i>📍</i>
                    <span>Venue:</span>
                    {event.venue}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentClubEvents;

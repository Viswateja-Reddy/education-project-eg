import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { SkeletonCard } from '../components/Skeleton'

function StudentCalendar() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUnifiedCalendar = async () => {
      setLoading(true)
      setError('')
      try {
        const token = localStorage.getItem('token')
        const response = await api.get('/api/calendar/all', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setEntries(response.data.entries || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch calendar')
      } finally {
        setLoading(false)
      }
    }

    fetchUnifiedCalendar()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Academic Calendar</h1>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : entries.length === 0 ? (
        <div className="glass-card ui-card-body text-center py-12">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Calendar Events</h3>
          <p className="text-gray-400">No calendar events at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="glass-card ui-card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-white mb-2">{entry.title}</h2>
                  <p className="text-gray-300 mb-2">{entry.description}</p>
                  <div className="text-sm text-gray-400">
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {entry.eventDate
                        ? new Date(entry.eventDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-sm font-medium text-cyan-400">
                    {entry.eventType}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {entry.source === 'ACADEMIC' ? 'Academic' : 'Club'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentCalendar

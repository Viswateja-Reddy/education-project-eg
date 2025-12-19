import React, { useState } from 'react'
import api from '../services/api'
import './AdminSeatingView.css'

function AdminSeatingView() {
  const [examName, setExamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allocations, setAllocations] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setAllocations(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const response = await api.get(`/api/seating/exam/${examName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setAllocations(response.data.allocations || [])
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch seating data'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-seating-page">
      <div className="admin-seating-container">
        <h1 className="page-title">Seating Allocation</h1>
        <p className="page-subtitle">
          View and manage seating arrangements for examinations
        </p>

        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Exam Name</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Enter exam name"
                required
              />
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View Seating'}
            </button>
          </form>
        </div>

        {error && <p className="error-text">{error}</p>}

        {allocations && allocations.length > 0 && (
          <div className="card table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Room</th>
                  <th>Bench</th>
                  <th>Seat</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((a) => (
                  <tr key={a._id}>
                    <td>{a.studentId?.name || 'N/A'}</td>
                    <td>{a.roomId?.roomName || 'N/A'}</td>
                    <td>{a.benchNumber}</td>
                    <td>{a.seatNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {allocations && allocations.length === 0 && (
          <div className="card empty-state">
            <div className="empty-icon">🪑</div>
            <h3>No Allocations Found</h3>
            <p>No seating allocations exist for this exam.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSeatingView

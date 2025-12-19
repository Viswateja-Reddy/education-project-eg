import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { SkeletonMetric, SkeletonList } from '../components/Skeleton';
import './ClubCoordinatorDashboard.css';

function MetricCard({ icon, label, value, color, index }) {
  const colorClasses = {
    primary: 'text-white',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card ui-card-body group cursor-default"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className={`text-3xl font-bold mb-1 ${colorClasses[color] || 'text-white'}`}>
        {value}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  )
}

function ActionCard({ icon, title, description, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card ui-card-body cursor-pointer group relative"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
        }}
      />
    </motion.div>
  )
}

function StatusPill({ status }) {
  const statusConfig = {
    PENDING: {
      bg: 'rgba(234, 179, 8, 0.15)',
      border: 'rgba(234, 179, 8, 0.4)',
      text: '#eab308',
      label: 'Pending',
    },
    APPROVED: {
      bg: 'rgba(34, 197, 94, 0.15)',
      border: 'rgba(34, 197, 94, 0.4)',
      text: '#22c55e',
      label: 'Approved',
    },
    REJECTED: {
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.4)',
      text: '#ef4444',
      label: 'Rejected',
    },
  }

  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <span
      className="pill text-xs font-semibold"
      style={{
        background: config.bg,
        borderColor: config.border,
        color: config.text,
      }}
    >
      {config.label}
    </span>
  )
}

function ClubCoordinatorDashboard() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })
  const [recentEvents, setRecentEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await api.get('/api/club-events/my', {
          headers: { Authorization: `Bearer ${token}` },
        })

        const events = response.data.events || []
        const pending = events.filter(e => e.status === 'PENDING').length
        const approved = events.filter(e => e.status === 'APPROVED').length
        const rejected = events.filter(e => e.status === 'REJECTED').length

        setMetrics({
          totalEvents: events.length,
          pending,
          approved,
          rejected,
        })

        setRecentEvents(events.slice(0, 5))
      } catch (err) {
        // Graceful fallback
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const actions = [
    {
      icon: '➕',
      title: 'Submit New Event',
      description: 'Create and submit a new club event for approval',
      route: '/club-coordinator/events',
    },
    {
      icon: '📋',
      title: 'View My Events',
      description: 'See all your submitted events and their status',
      route: '/club-coordinator/events',
    },
    {
      icon: '⏳',
      title: 'Track Approval Status',
      description: 'Monitor pending event approvals in real-time',
      route: '/club-coordinator/events',
    },
    {
      icon: '📅',
      title: 'Approved Events Calendar',
      description: 'View calendar of all approved club events',
      route: '/student/club-events',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="club-coordinator-dashboard"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-header"
      >
        <div>
          <h1 className="dashboard-title">Club Coordinator Dashboard</h1>
          <p className="dashboard-subtitle">Manage and track your club event submissions</p>
        </div>
      </motion.div>

      {/* Overview Metrics Section */}
      <div className="metrics-grid">
        {loading ? (
          <>
            <SkeletonMetric />
            <SkeletonMetric />
            <SkeletonMetric />
            <SkeletonMetric />
          </>
        ) : (
          <>
            <MetricCard
              icon="📊"
              label="Total Events Submitted"
              value={metrics.totalEvents || '0'}
              color="primary"
              index={0}
            />
            <MetricCard
              icon="⏳"
              label="Pending Approval"
              value={metrics.pending || '0'}
              color="warning"
              index={1}
            />
            <MetricCard
              icon="✅"
              label="Approved Events"
              value={metrics.approved || '0'}
              color="success"
              index={2}
            />
            <MetricCard
              icon="❌"
              label="Rejected Events"
              value={metrics.rejected || '0'}
              color="danger"
              index={3}
            />
          </>
        )}
      </div>

      {/* Action Cards Section */}
      <div className="actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          {actions.map((action, index) => (
            <ActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              description={action.description}
              onClick={() => navigate(action.route)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Recent Events Section */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card ui-card-body"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Events</h2>
          <SkeletonList />
        </motion.div>
      ) : recentEvents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card ui-card-body"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Events</h2>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between py-3 border-b border-white border-opacity-10 last:border-0"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400">
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleDateString()
                      : 'Date TBD'}
                  </p>
                </div>
                <StatusPill status={event.status} />
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Empty State */}
      {!loading && metrics.totalEvents === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card ui-card-body text-center py-12"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Events Submitted Yet</h3>
          <p className="text-gray-400 mb-4">
            Start by submitting your first club event for approval.
          </p>
          <button
            onClick={() => navigate('/club-coordinator/events')}
            className="ui-button-primary"
          >
            Submit Your First Event
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClubCoordinatorDashboard

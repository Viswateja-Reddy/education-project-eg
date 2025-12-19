import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { SkeletonMetric } from '../components/Skeleton';
import { FiArrowRight, FiPlus, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import './SeatingManagerDashboard.css';

function MetricCard({ icon, label, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="metric-card"
    >
      <div className="metric-icon">{icon}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </motion.div>
  );
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
      className="action-card"
    >
      <div className="action-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="action-arrow">
        <FiArrowRight />
      </div>
    </motion.div>
  );
}

function SeatingManagerDashboard() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState({
    totalRooms: 0,
    totalStudents: 0,
    allocationStatus: 'Not Started',
    lastAllocation: 'Never',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token')

        // Placeholder values (can be replaced with actual APIs when available)
        setMetrics({
          totalRooms: 0,
          totalStudents: 0,
          allocationStatus: 'Not Started',
          lastAllocation: 'Never',
        })
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
      icon: '🪑',
      title: 'Allocate Seating',
      description: 'Create seating arrangements for upcoming exams',
      route: '/seating-manager/allocate',
    },
    {
      icon: '📊',
      title: 'View Seating Charts',
      description: 'Visualize seating arrangements by exam and room',
      route: '/admin/seating',
    },
    {
      icon: '🔄',
      title: 'Reset Allocation',
      description: 'Clear and reallocate seating for specific exams',
      route: '/seating-manager/allocate',
    },
    {
      icon: '🏫',
      title: 'Exam Rooms',
      description: 'View and manage available exam room configurations',
      route: '/admin/seating',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="seating-manager-dashboard"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-header"
      >
        <h1>Seating Manager Dashboard</h1>
        <p>Efficiently manage exam seating arrangements and room configurations with real-time updates</p>
      </motion.div>

      {/* Overview Metrics Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="section-title">Overview</h2>
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
                icon="🏫"
                label="Total Exam Rooms"
                value={metrics.totalRooms || '0'}
                index={0}
              />
              <MetricCard
                icon="🎓"
                label="Total Students"
                value={metrics.totalStudents || '0'}
                index={1}
              />
              <MetricCard
                icon="📋"
                label="Allocation Status"
                value={
                  <span className={`status-${metrics.allocationStatus.toLowerCase().replace(' ', '-')}`}>
                    {metrics.allocationStatus}
                  </span>
                }
                index={2}
              />
              <MetricCard
                icon="📅"
                label="Last Allocation"
                value={metrics.lastAllocation}
                index={3}
              />
            </>
          )}
        </div>
      </motion.section>

      {/* Action Cards Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
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
      </motion.section>

      {/* Empty State */}
      <AnimatePresence>
        {!loading && metrics.totalRooms === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="empty-state"
          >
            <div className="empty-state-icon">
              <FiAlertTriangle size={48} />
            </div>
            <h3>No Exam Rooms Configured</h3>
            <p>
              It looks like you haven't set up any exam rooms yet. 
              You'll need to configure at least one exam room before you can start the allocation process.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/seating-manager/allocate')}
              className="btn btn-primary mt-4 inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              Configure Exam Rooms
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SeatingManagerDashboard



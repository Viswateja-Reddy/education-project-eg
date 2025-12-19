import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import "./AdminDashboard.css";

/* =========================
   METRIC CARD
   ========================= */
function MetricCard({ icon, label, value, delay }) {
  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="metric-icon">{icon}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </motion.div>
  );
}

/* =========================
   ACTION CARD
   ========================= */
function ActionCard({ icon, title, description, onClick, delay }) {
  return (
    <motion.div
      className="action-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="action-icon">{icon}</div>
      <h3 className="action-title">{title}</h3>
      <p className="action-description">{description}</p>
    </motion.div>
  );
}

/* =========================
   ADMIN DASHBOARD
   ========================= */
function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    pendingEvents: 0,
    upcomingExams: 0,
    hallTickets: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");

        try {
          const pendingRes = await api.get("/api/club-events/pending", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setMetrics((prev) => ({
            ...prev,
            pendingEvents: pendingRes.data.events?.length || 0,
          }));
        } catch {
          // graceful fallback
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const actions = [
    {
      icon: "🎉",
      title: "Club Event Approvals",
      description: "Review and approve pending club events",
      route: "/admin/club-events",
    },
    {
      icon: "📅",
      title: "Academic Calendar",
      description: "Manage academic schedules and important dates",
      route: "/admin/calendar",
    },
    {
      icon: "🎫",
      title: "Hall Ticket Generation",
      description: "Create and manage student hall tickets",
      route: "/admin/hall-ticket",
    },
    {
      icon: "🪑",
      title: "Seating Allocation",
      description: "View and manage exam seating arrangements",
      route: "/admin/seating",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage your academic and examination system
          </p>
        </div>
        {/* <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> */}
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Metrics */}
        <div className="metrics-grid">
          <MetricCard
            icon="🎓"
            label="Total Students"
            value={metrics.totalStudents}
            delay={0}
          />
          <MetricCard
            icon="⏳"
            label="Pending Club Events"
            value={metrics.pendingEvents}
            delay={0.1}
          />
          <MetricCard
            icon="📝"
            label="Upcoming Exams"
            value={metrics.upcomingExams}
            delay={0.2}
          />
          <MetricCard
            icon="🎫"
            label="Hall Tickets Generated"
            value={metrics.hallTickets}
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          {actions.map((action, index) => (
            <ActionCard
              key={action.title}
              icon={action.icon}
              title={action.title}
              description={action.description}
              onClick={() => navigate(action.route)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Empty State */}
        {!loading && metrics.pendingEvents === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="empty-icon">✨</div>
            <h3 className="empty-title">All Caught Up!</h3>
            <p className="empty-message">
              No pending club events require your attention at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { SkeletonList } from "../components/Skeleton";
import "./AdminCalendar.css";

function AdminCalendar() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventType: "ACADEMIC",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(true);

  const fetchEntries = async () => {
    setEntriesLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/calendar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(response.data.entries || []);
    } catch {
      setError("Failed to fetch calendar entries");
    } finally {
      setEntriesLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await api.post("/api/calendar", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Calendar event created successfully");
      setFormData({
        title: "",
        description: "",
        eventDate: "",
        eventType: "ACADEMIC",
      });
      fetchEntries();
    } catch {
      setError("Failed to create calendar event");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="admin-calendar-page">
      <div className="admin-calendar-container">
        <motion.h1
          className="admin-calendar-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Academic Calendar
        </motion.h1>

        {/* CREATE EVENT */}
        <div className="admin-calendar-card">
          <h2 className="admin-calendar-section-title">Create Event</h2>

          <form className="admin-calendar-form" onSubmit={handleSubmit}>
            <div className="admin-calendar-field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-calendar-field">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-calendar-row">
              <div className="admin-calendar-field">
                <label>Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-calendar-field">
                <label>Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option value="ACADEMIC">Academic</option>
                  <option value="EXAM">Exam</option>
                  <option value="HOLIDAY">Holiday</option>
                </select>
              </div>
            </div>

            {error && <div className="admin-calendar-error">{error}</div>}
            {success && <div className="admin-calendar-success">{success}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        {/* EVENTS LIST */}
        <div className="admin-calendar-card">
          <h2 className="admin-calendar-section-title">
            Upcoming Events ({entries.length})
          </h2>

          {entriesLoading ? (
            <SkeletonList />
          ) : entries.length === 0 ? (
            <p className="admin-calendar-empty">
              No calendar events created yet.
            </p>
          ) : (
            <div className="admin-calendar-list">
              {entries
                .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
                .map((entry) => (
                  <div key={entry._id} className="admin-calendar-item">
                    <div>
                      <h3>{entry.title}</h3>
                      <p>{formatDate(entry.eventDate)}</p>
                      {entry.description && <p>{entry.description}</p>}
                    </div>
                    <span
                      className={`admin-calendar-badge ${entry.eventType.toLowerCase()}`}
                    >
                      {entry.eventType}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCalendar;

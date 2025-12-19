import React, { useState } from "react";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";
import Celebration from "../components/Celebration";
import "./AdminHallTicket.css";

function AdminHallTicket() {
  const [formData, setFormData] = useState({
    studentId: "",
    examName: "",
    examDate: "",
    examTime: "",
    venue: "",
    seatNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const { showToast } = useToast();

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

      await api.post("/api/hall-tickets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Hall ticket generated successfully");
      setShowCelebration(true);
      showToast("Hall ticket generated successfully!", "success");

      setFormData({
        studentId: "",
        examName: "",
        examDate: "",
        examTime: "",
        venue: "",
        seatNumber: "",
      });
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to generate hall ticket";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-hallticket-page">
      {showCelebration && (
        <Celebration onComplete={() => setShowCelebration(false)} />
      )}

      <div className="admin-hallticket-container">
        <h1 className="admin-hallticket-title">Generate Hall Ticket</h1>

        <div className="hallticket-form-card">
          <form className="hallticket-form" onSubmit={handleSubmit}>
            <label>
              Student ID
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Exam Name
              <input
                type="text"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Exam Date
              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Exam Time
              <input
                type="text"
                name="examTime"
                placeholder="e.g., 10:00 AM - 1:00 PM"
                value={formData.examTime}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Venue
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Seat Number
              <input
                type="text"
                name="seatNumber"
                value={formData.seatNumber}
                onChange={handleChange}
                required
              />
            </label>

            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Hall Ticket"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminHallTicket;

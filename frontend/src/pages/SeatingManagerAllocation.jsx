import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../contexts/ToastContext';
import Celebration from '../components/Celebration';
import { FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import './SeatingManagerAllocation.css';

function SeatingManagerAllocation() {
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!examName.trim()) {
      setError('Please enter an exam name');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/api/seating/allocate',
        { examName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        `Seating allocated successfully! 
        Total students: ${response.data.totalAllocated} 
        • Rooms used: ${response.data.roomsUsed.length}`
      );
      setShowCelebration(true);
      showToast('Seating allocated successfully!', 'success');
      setExamName('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to allocate seating. Please try again.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seating-allocation-container">
      {showCelebration && (
        <Celebration onComplete={() => setShowCelebration(false)} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="allocation-header"
      >
        <h1>Allocate Seating</h1>
        <p>
          Automatically assign students to exam rooms based on availability and requirements.
          Enter the exam details below to begin the allocation process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="allocation-form-container"
      >
        <form onSubmit={handleSubmit} className="allocation-form">
          <div className="form-group">
            <label htmlFor="examName" className="form-label">
              Exam Name
            </label>
            <input
              id="examName"
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="form-input"
              placeholder="e.g., Midterm Exams 2024"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="status-message error">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="status-message success">
              <FiCheckCircle className="mr-2" />
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Allocating Seats...
              </>
            ) : (
              'Run Seating Allocation'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default SeatingManagerAllocation;

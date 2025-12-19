import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const features = [
  {
    icon: '🔐',
    title: 'Role-Based Authentication',
    description: 'Secure access with role-specific dashboards and permissions.'
  },
  {
    icon: '🎫',
    title: 'Hall Ticket Generation',
    description: 'Automated hall ticket generation with QR codes for verification.'
  },
  {
    icon: '💺',
    title: 'Seating Allocation',
    description: 'Smart seating arrangements with conflict resolution.'
  },
  {
    icon: '🎉',
    title: 'Club Events & Approval',
    description: 'Manage and approve club events in one place.'
  }
];

const roles = [
  {
    name: 'Student',
    description: 'Access hall tickets, seating info, and event details.'
  },
  {
    name: 'Admin',
    description: 'Manage users, generate reports, and oversee operations.'
  },
  {
    name: 'Seating Manager',
    description: 'Handle seating arrangements and allocations.'
  },
  {
    name: 'Club Coordinator',
    description: 'Create and manage club events and activities.'
  }
];

const Landing = () => {
  return (
    <div className="landing-page">
{/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Integrated Academic & Examination Management System</h1>
            <p>Streamline your academic processes with our comprehensive platform designed for educational institutions.</p>
            <div className="hero-buttons">
              <a href="#features" className="primary-button">Explore Platform</a>
              <Link to="/login" className="secondary-button">Login</Link>
              <Link to="/clubs" className="secondary-button">Explore MLRIT Clubs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Our Integrated Platform</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Access Section */}
      <section className="role-access">
        <div className="container">
          <h2>Access Your Dashboard</h2>
          <div className="roles-grid">
            {roles.map((role, index) => (
              <div key={index} className="role-card">
                <h3>{role.name}</h3>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of educational institutions managing their academic processes efficiently.</p>
          <Link to="/register" className="primary-button">Get Started Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>© 2025 EduManage Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


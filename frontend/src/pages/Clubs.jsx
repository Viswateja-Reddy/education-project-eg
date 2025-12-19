import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const clubsData = [
  {
    id: 'came',
    name: 'CAME Club',
    description: 'Known for cultural events, stage performances, college fests, and artistic expression.'
  },
  {
    id: 'scope',
    name: 'SCOPE Club',
    description: 'Known for technical events, hackathons, coding contests, and industry-oriented workshops.'
  },
  {
    id: 'nss',
    name: 'NSS Club',
    description: 'Known for social service activities including blood donation camps, plantation drives, and community outreach.'
  },
  {
    id: 'sports',
    name: 'Sports Club',
    description: 'Promoting sportsmanship and physical fitness through various indoor and outdoor sports activities.'
  },
  {
    id: 'literary',
    name: 'Literary Club',
    description: 'Encouraging literary talents through debates, creative writing, and public speaking events.'
  },
  {
    id: 'ecell',
    name: 'E-Cell',
    description: 'Fostering entrepreneurial spirit through startup competitions, mentorship, and networking events.'
  }
];

const Clubs = () => {
  const navigate = useNavigate();

  return (
    <div className="clubs-page">
      <div className="container">
        <div className="clubs-header">
          <h1>MLRIT Clubs & Communities</h1>
          <p className="subtitle">Discover the cultural, technical, and social clubs that define campus life at MLRIT.</p>
        </div>
        
        <div className="clubs-grid">
          {clubsData.map((club) => (
            <div 
              key={club.id} 
              className="club-card"
              onClick={() => navigate(`/clubs/${club.id}`)}
            >
              <h2>{club.name}</h2>
              <p>{club.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;

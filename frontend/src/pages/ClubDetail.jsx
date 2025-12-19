import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const clubData = {
  came: {
    name: 'CAME Club',
    about: 'The Cultural, Arts, Music and Entertainment (CAME) Club is the heart of cultural activities at MLRIT. We provide a platform for students to showcase their talents in various cultural domains including music, dance, drama, and fine arts.',
    knownFor: [
      'Annual cultural fest "Udbhav"',
      'Talent shows and competitions',
      'Traditional and contemporary dance performances',
      'Music and singing events',
      'Drama and theatrical productions'
    ],
    gallery: Array(6).fill('https://via.placeholder.com/300x200?text=CAME+Event')
  },
  scope: {
    name: 'SCOPE Club',
    about: 'The Student Community of Programmers and Engineers (SCOPE) is the technical hub of MLRIT, fostering innovation and technical skills among students through various workshops, hackathons, and coding competitions.',
    knownFor: [
      'Annual hackathons and coding competitions',
      'Technical workshops and webinars',
      'Guest lectures from industry experts',
      'Open source contributions',
      'Coding bootcamps and training sessions'
    ],
    gallery: Array(6).fill('https://via.placeholder.com/300x200?text=SCOPE+Event')
  },
  nss: {
    name: 'NSS Club',
    about: 'The National Service Scheme (NSS) unit of MLRIT is committed to social service and community development. We organize various activities to create social awareness and contribute to the betterment of society.',
    knownFor: [
      'Blood donation camps',
      'Tree plantation drives',
      'Community service activities',
      'Health and hygiene awareness programs',
      'Rural development initiatives'
    ],
    gallery: Array(6).fill('https://via.placeholder.com/300x200?text=NSS+Event')
  }
};

const ClubDetail = () => {
  const { clubName } = useParams();
  const navigate = useNavigate();
  const club = clubData[clubName] || clubData.came; // Default to CAME if club not found

  if (!club) {
    return (
      <div className="club-detail">
        <div className="container">
          <h1>Club not found</h1>
          <button onClick={() => navigate('/clubs')} className="secondary-button">
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="club-detail">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          ← Back to Clubs
        </button>
        
        <h1>{club.name}</h1>
        
        <section className="about-section">
          <h2>About the Club</h2>
          <p>{club.about}</p>
        </section>
        
        <section className="known-for">
          <h2>What This Club Is Known For</h2>
          <ul>
            {club.knownFor.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        
        <section className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {club.gallery.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`${club.name} event ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClubDetail;

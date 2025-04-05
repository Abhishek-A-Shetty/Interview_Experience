import React, { useState, useEffect } from 'react';
import experienceService from '../services/experienceService';
import ExperienceCard from './ExperienceCard';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceService.getAllExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to fetch experiences');
        console.error('Error:', err);
      }
    };

    fetchExperiences();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="experience-list">
      {experiences.map(experience => (
        <ExperienceCard key={experience._id} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceList;

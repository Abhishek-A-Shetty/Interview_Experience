import React from 'react';
import './ExperienceCard.css';

const ExperienceCard = ({ experience }) => {
  // Extract formatted month and year from interview date
  const interviewDate = new Date(experience.interviewDate);
  const interviewMonthYear = interviewDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="experience-card-container">
      <div className="card-header">
        {/* User Information */}
        <div className="user-info">
          <span className="user-info-item">
            {experience.name}
          </span>
          <span className="separator">•</span>
          <span className="user-info-item">{experience.education}</span>
          <span className="separator">•</span>
          <span className="user-info-item">{experience.collegeName}</span>
          <span className="separator">•</span>
          <span className="user-info-item">
            <strong>Class of</strong> {experience.graduationYear}
          </span>
        </div>
      </div>

      <div className="card-main">
        {/* Role and Company */}
        <div className="role-section">
          <h3 className="role-title">{experience.role}</h3>
          <div className="company-name">
            <span className="label">Company:</span> {experience.companyName}
          </div>
        </div>

        {/* Interview Date */}
        <div className="date-badge">
          <span className="label">Interview Date:</span> {interviewMonthYear}
        </div>

        {/* Experience Content */}
        <div className="experience-content">
          {experience.interviewExperience}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

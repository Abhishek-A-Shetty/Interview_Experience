import { useState, useEffect } from 'react';
import axios from 'axios';

const ExperienceForm = ({ onSuccess, initialData = {} }) => {
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [interviewExperience, setInterviewExperience] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEducation(initialData.education || '');
      setCollegeName(initialData.collegeName || '');
      setGraduationYear(initialData.graduationYear || '');
      setCompanyName(initialData.companyName || '');
      setRole(initialData.role || '');
      setInterviewExperience(initialData.interviewExperience || '');
      setInterviewDate(initialData.interviewDate ? initialData.interviewDate.split('T')[0] : '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure interview date is not in the future
    const today = new Date().toISOString().split('T')[0]; 
    if (interviewDate > today) {
      alert('Interview date cannot be in the future.');
      return;
    }

    // Ensure graduation year is not in the future
    const currentYear = new Date().getFullYear();
    if (graduationYear > currentYear) {
      alert('Graduation year cannot be in the future.');
      return;
    }

    const experienceData = {
      name: name.trim(),
      education: education.trim(),
      collegeName: collegeName.trim(),
      graduationYear: graduationYear.trim(),
      companyName: companyName.trim(),
      role: role.trim(),
      interviewExperience: interviewExperience.trim(),
      interviewDate,
    };

    try {
      if (initialData._id) {
        // Edit Experience
        await axios.put(`http://localhost:5000/api/experiences/${initialData._id}`, experienceData, {
          withCredentials: true,
        });
      } else {
        // Post New Experience
        await axios.post('http://localhost:5000/api/experiences', experienceData, {
          withCredentials: true,
        });
      }

      onSuccess();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Degree"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="College Name (Optional)"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="form-control"
          required
          min="1950"
          max={new Date().getFullYear()}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Interview Experience"
          value={interviewExperience}
          onChange={(e) => setInterviewExperience(e.target.value)}
          className="form-control"
          rows="4"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          className="form-control"
          required
          max={new Date().toISOString().split('T')[0]} // Prevents future dates
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData._id ? 'Update Experience' : 'Post Experience'}
      </button>
    </form>
  );
};

export default ExperienceForm;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import ExperienceCard from '../components/ExperienceCard';
import './Dashboard.css'; // Import the custom styles

const Dashboard = () => {
  const [experiences, setExperiences] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    companyName: '',
    rating: '',
    graduationYear: ''
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Send filters as query parameters to the backend
        const response = await axios.get('http://localhost:5000/api/experiences', {
          withCredentials: true,
          params: filters // Send filters as query parameters
        });
        setExperiences(response.data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
      }
    };

    fetchExperiences();
  }, [filters]); // Fetch experiences whenever the filters change

  return (
    <div className="dashboard-container">
      <h2 >Interview Experiences</h2>
      <Filter filters={filters} setFilters={setFilters} /> {/* Filter component */}

      <div className="experience-list">
        {experiences.length > 0 ? (
          experiences.map((exp) => <ExperienceCard key={exp._id} experience={exp} />)
        ) : (
          <p className="no-data">No experiences found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

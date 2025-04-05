import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './PostExperience.css';
import moment from 'moment';

const PostExperience = ({ sessionGoogleId }) => {
  const initialExperience = {
    name: '',
    education: '',
    collegeName: '',
    graduationYear: '',
    interviewDate: '',
    interviewExperience: '',
    role: '',
    companyName: ''
  };

  const [experience, setExperience] = useState(initialExperience);
  const [userExperiences, setUserExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetch user experiences (Uses `/my-experiences` for security)
   */
  const fetchUserExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/experiences/my-experiences', {
        withCredentials: true
      });
      setUserExperiences(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load experiences. Please try again.');
      console.error('Error fetching user experiences:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserExperiences();
  }, [fetchUserExperiences]);

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submit new experience
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/experiences',
        experience,
        { withCredentials: true }
      );

      setUserExperiences((prev) => [response.data, ...prev]);
      setExperience(initialExperience);
      alert('Experience Posted Successfully!');
    } catch (error) {
      setError('Error posting experience. Please try again.');
      console.error('Error posting experience:', error);
    } finally {
      setPosting(false);
    }
  };

  /**
   * Delete an experience (Only if sessionGoogleId matches)
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/experiences/${id}`, { withCredentials: true });
      setUserExperiences((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert(error.response?.data?.message || 'Error deleting experience. Please try again.');
    }
  };
  

  return (
    <div className="experience-container">
      <h2 className="heading">Post Your Interview Experience</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="experience-form">
        <input type="text" name="name" placeholder="Your Name" value={experience.name} onChange={handleChange} className="input-field" required />
        <input type="text" name="education" placeholder="Degree" value={experience.education} onChange={handleChange} className="input-field" required />
        <input type="text" name="collegeName" placeholder="College Name (Optional)" value={experience.collegeName} onChange={handleChange} className="input-field" />
        <input type="number" name="graduationYear" placeholder="Graduation Year" value={experience.graduationYear} onChange={handleChange} className="input-field" required />
        
        <label style={{ color: "white" }}>Interview Date</label>
        <input type="date" name="interviewDate" value={experience.interviewDate} onChange={handleChange} className="input-field" required />
        
        <textarea name="interviewExperience" placeholder="Share your experience" value={experience.interviewExperience} onChange={handleChange} className="input-field textarea" required />
        <input type="text" name="role" placeholder="Role" value={experience.role} onChange={handleChange} className="input-field" required />
        <input type="text" name="companyName" placeholder="Company Name" value={experience.companyName} onChange={handleChange} className="input-field" required />

        <button 
  type="submit" 
  className="submit-btn" 
  disabled={posting} 
  style={{
    border: "2px solid rgb(6, 12, 12)",
    color: "rgb(1, 16, 16)",
    backgroundColor: "gray",
    transition: "background-color 0.3s, color 0.3s" // Smooth hover transition
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "whitesmoke";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "gray";
    e.target.style.color = "rgb(1, 16, 16)";
  }}
>
  {posting ? "Posting..." : "Post Experience"}
</button>

      </form>

      <h3 className="heading">Your Posted Experiences</h3>

      {loading ? <p className="loading-text">Loading...</p> : null}

      {userExperiences.length === 0 && !loading ? (
        <p className="no-experience">You have not posted any experiences yet.</p>
      ) : (
        <div className="experience-list">
          {userExperiences.map((exp) => (
            <div key={exp._id} className="experience-card">
              <div className="card-content">
                <h5>{exp.role} at {exp.companyName}</h5>
                <p>{exp.interviewExperience}</p>
                <p><strong>Interview Date:</strong> {moment(exp.interviewDate).format("MMM YYYY")}</p>
                <p><strong>Graduation Year:</strong> {exp.graduationYear}</p>
                <p><strong>Education:</strong> {exp.education} | {exp.collegeName}</p>

                <button 
  className="delete-btn" 
  onClick={() => handleDelete(exp._id, exp.googleId)}
  style={{
    border: "2px solid rgb(6, 12, 12)",
    color: "rgb(1, 16, 16)",
    backgroundColor: "gray",
    padding: "5px 10px",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease" // Smooth transition effect
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "whitesmoke";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "gray";
    e.target.style.color = "rgb(1, 16, 16)";
  }}
>
  Delete
</button>


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostExperience;

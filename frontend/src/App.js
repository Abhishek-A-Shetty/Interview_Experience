import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PostExperience from './pages/PostExperience';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); // State to store user data

  // Check for user data on app load, for example, from cookies or API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
        setUser(response.data.user || null); // Set user data if authenticated
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); // Run the function to check if user is logged in
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-experience" element={<PostExperience />} />
      </Routes>
    </Router>
  );
}

export default App;

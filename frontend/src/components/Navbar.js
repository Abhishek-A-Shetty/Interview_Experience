import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      setUser(null); // Clear the user data
      navigate('/'); // Redirect to Login Page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm mb-4">
      <div className="container-fluid">
      <Link 
  className="navbar-brand fw-bold" 
  to="/dashboard"
  style={{
    border: "2px solid rgb(6, 12, 12)",
    color: "rgb(1, 16, 16)",
    backgroundColor: "gray",
    padding: "5px 10px", // Optional: Adds spacing for better appearance
    textDecoration: "none", // Keeps it styled like a button
    borderRadius: "5px" // Optional: Makes it look smoother
  }}
>
  Interview Experience
</Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-danger" to="/post-experience">
                    Post Experience
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li className="nav-item">
                <Link className="btn btn-outline-danger" to="/">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

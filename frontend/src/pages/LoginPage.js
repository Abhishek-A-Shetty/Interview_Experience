import React from "react";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Continue</h2>
        <button className="neon-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

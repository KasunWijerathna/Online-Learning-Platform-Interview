import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Online Learning Platform</h1>
      <Link to="/register" className="btn btn-primary">Register</Link>
      <Link to="/login" className="btn btn-secondary">Login</Link>
    </div>
  );
};

export default LandingPage;

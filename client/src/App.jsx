import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// API URL configuration - using relative paths with proxy setup
const API_URL = '';  // Empty string means use relative URLs with proxy

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check user authentication status
    axios.get(`${API_URL}/api/user`, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setLoading(true);
    setError(null);
    
    // Call logout API
    axios.get(`${API_URL}/api/logout`, { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log("Logout successful", response.data);
        setUser(null);
        // Wait a moment before redirecting
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      })
      .catch(error => {
        console.error('Error logging out:', error);
        setError('Failed to logout. Please try again.');
        // If error, still redirect after a delay
        setTimeout(() => {
          setUser(null);
          window.location.href = '/';
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <h1 className="display-4 mb-4">Welcome to My App</h1>
                {user ? (
                  <div>
                    <img 
                      src={user.photos?.[0]?.value} 
                      alt={user.displayName}
                      className="rounded-circle mb-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <p className="lead mb-3">Hello, {user.displayName}!</p>
                    <p className="mb-4">Email: {user.emails[0].value}</p>
                    <button
                      onClick={handleLogout}
                      className="btn btn-danger"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : null}
                      Logout
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4">Please log in to continue</p>
                    <a
                      href={`${API_URL}/api/auth/google`}
                      className="btn btn-primary"
                    >
                      <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google"
                        className="me-2"
                        style={{ width: '20px', height: '20px' }}
                      />
                      Login with Google
                    </a>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state variable to track login status
  const history = useNavigate();

  useEffect(() => {
    // Get user information using the JWT token
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Make an authenticated request to your server to get user data
      axios.get('http://localhost:5000/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data && response.data.userName) {
            setUserName(response.data.userName);
            setIsLoggedIn(true); // User is logged in
          } else {
            console.error('User data request error: Invalid response format');
          }
        })
        .catch((error) => console.error('User data request error', error));
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    // Perform the logout action, e.g., clear the JWT token and redirect to the login page.
    localStorage.removeItem('jwtToken');
    // Redirect to the login page or any other desired page
    history('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      {isLoggedIn ? ( // Conditionally render content if the user is logged in
        <>
          <button onClick={handleLogout} className="cursor-pointer">
            <img src={user} alt="userimg" className="max-w-xs " />
          </button>
          <p className="text-6xl">Hi {userName} you are logged in!</p>
        </>
      ) : (
        // Display a message if the user is not logged in
        <p className="text-6xl">You are not logged in.</p>
      )}
    </div>
  );
};

export default Homepage;

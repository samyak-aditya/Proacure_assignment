import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user from '../assets/user.png';

const Homepage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user information using the JWT token
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Make an authenticated request to your server to get user data
      console.log(token);
      axios.get('http://localhost:5000/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
            console.log(response)
          if (response.data && response.data.userName) {
            setUserName(response.data.userName);
          } else {
            console.error('User data request error: Invalid response format');
          }
        })
        .catch((error) => console.error('User data request error', error));
    }
  }, []);

  return (
    <div>
        <div className="flex items-center ">
        <img src={user} alt='userimg' />
      <h1>Hi {userName} you are logged in !</h1>
      </div>
      {/* Other content for the homepage */}
    </div>
  );
};

export default Homepage;

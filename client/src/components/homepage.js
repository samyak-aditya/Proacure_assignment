import React, { useEffect, useState } from 'react';
import axios from 'axios';
import user from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const history = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('jwtToken');

    if (token) {
      
      axios.get('http://localhost:5000/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data && response.data.userName) {
            setUserName(response.data.userName);
            setIsLoggedIn(true); 
          } else {
            console.error('User data request error: Invalid response format');
          }
        })
        .catch((error) => console.error('User data request error', error));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('jwtToken');
    
    history('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      {isLoggedIn ? ( 
        <>
          <button onClick={handleLogout} className="cursor-pointer">
            <img src={user} alt="userimg" className="max-w-xs " />
          </button>
          <p className="text-6xl">Hi {userName} you are logged in!</p>
        </>
      ) : (
        
        <p className="text-6xl">You are not logged in.</p>
      )}
    </div>
  );
};

export default Homepage;

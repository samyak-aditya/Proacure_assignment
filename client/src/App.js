import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login.js';
import SignupPage from './components/Signup.js';
import Authenticate from './components/otpverify.js';
import Homepage from './components/homepage.js';

function App() {
  return (
    <Routes>
      
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/authenticate/:email" element={<Authenticate/>} />
        <Route path="/homepage" element={<Homepage/>} />
        {/* Add routes for other pages as needed */}
      
    </Routes>
  );
}

export default App;
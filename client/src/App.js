import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login.js';
import SignupPage from './components/Signup.js';

function App() {
  return (
    <Routes>
      
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        {/* Add routes for other pages as needed */}
      
    </Routes>
  );
}

export default App;